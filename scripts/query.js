"use strict"

const { BigQuery } = require("@google-cloud/bigquery")
const fs = require("fs")
const param = require("commander")
const { flatten, flow, map, first, isNumber, defaultTo } = require("lodash/fp")

const query = (sql) => {
    const options_query = {
        query: sql,
        timeoutMs: 1000000,
        useLegacySql: false,
    }

    const options = {
        keyFilename: process.env.GCLOUD_KEY_PATH,
        projectId: process.env.GCLOUD_PROJECT_ID
    }

    const bigqueryClient = new BigQuery(options)
    const client = bigqueryClient.query(options_query)
    return client
}

const writeJsonToFile = (q) => async (j) => {
    const fN = "../src/data/gh-all-event.json"
    fs.readFile(fN, (err, data) => {
        // data is the content of the existing file, not the query result.
        const json = JSON.parse(data)
        if (err) throw new Error("could not append file")
        json.push(j)
        fs.writeFile(fN, JSON.stringify(flatten(json), null, 2), (err) => {
            if (err) throw err
        })
    })
}

const queryBuilder = (table) => {
    const types = [""]

    /* eslint-disable no-useless-escape */
    const sqlQuery = (type) =>
    ` SELECT 
        language.name AS name,
        EXTRACT(YEAR FROM e.created_at) as year,
        EXTRACT(QUARTER FROM e.created_at) as quarter,
        COUNTIF(e.type = 'PullRequestEvent') AS pull_events,
        COUNTIF(e.type = 'PushEvent') AS push_events,
        COUNTIF(e.type = 'IssuesEvent') AS issue_events,
        COUNTIF(e.type = 'WatchEvent') AS star_events,
        COUNTIF(e.type IN ('PullRequestEvent', 'PushEvent', 'IssuesEvent', 'WatchEvent')) AS count
    FROM \`bigquery-public-data.github_repos.languages\` l, UNNEST(l.language) as language
    JOIN 
        \`${table}\` e
    ON 
        l.repo_name = e.repo.name
    WHERE 
        language.name IN ('F*', 'TLA', 'Dafny', 'Lean', 'SMT', 'Coq', 'Isabelle', 'Boogie')
    GROUP BY 
        language.name, year, quarter;`

    /* eslint-enable no-useless-escape */
    return map(sqlQuery)(types)
}

const numToStrReplacer = (key, value) =>
    isNumber(value) ? JSON.stringify(value) : value
const stringifyFP = (x) => (y) => JSON.stringify(y, x)

const exec = async (q) => {
    const res = flow(
        first,
        stringifyFP(numToStrReplacer),
        JSON.parse,
        writeJsonToFile(q)
    )(await query(q))
    return res
}

const main = async () => {
    param
        .version("1.0.0")
        .option(
            "-t, --table <string>",
            "The GitHub Archive table that you want query example usage:" +
                'node query.js -t "githubarchive.year.2023"'
        )
        .parse(process.argv)

    const table = defaultTo(
        "githubarchive.year.2023"
    )(param.table)
    const queries = queryBuilder(table)

    try {
        await Promise.all(map(exec)(queries))
    } catch (err) {
        process.stdout.write(
            "Error while querying the BigQuery Google API " + err + "\n"
        )
    }
}

main()
