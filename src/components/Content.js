/**
 * The description / explanation of the chart and table, explains
 * data source, data aggregation, trend calculation, ...
 * Compiles markdown into html, content.md -> html
 * @author Fabian Beuke <mail@beuke.org>
 * @license AGPL-3.0
 */

export default function Content() {
    return (
        <div
            style={{
                margin: "auto",
                marginTop: "40px",
                marginBottom: "40px",
                maxWidth: 760,
                textAlign: "justify",
                fontSize: 18,
            }}
        >
            
            <h1 id="related-work">Other Metrics</h1>

            <p className="responsivity-mobile-modif">
                <center><a href="https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F0134r96j,%2Fg%2F11j7dt82fy,%2Fg%2F11j3r_lybp,%2Fg%2F11f3f1hqn2,%2Fm%2F0ql079r&hl=en">Google Trends</a> for a subset of the langauges above can be found <a href="https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F0134r96j,%2Fg%2F11j7dt82fy,%2Fg%2F11j3r_lybp,%2Fg%2F11f3f1hqn2,%2Fm%2F0ql079r&hl=en">here.</a></center>
            </p>

            <table>
                <thead>
                    <tr>
                        <th>OSS Insight</th>
                        <th>GH Release Stats</th>
                        <th>GH Code Search</th>
                        <th>Custom Statistics (if any)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/coq?period=past_12_months#star-growth">Coq</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=coq&repository=coq">Coq</a></td>
                        <td><a href="https://github.com/search?q=language%3coq&type=code">Coq</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/dafny-lang?period=past_12_months#star-growth">Dafny</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=dafny-lang&repository=dafny">Dafny</a></td>
                        <td><a href="https://github.com/search?q=language%3Adafny&type=code">Dafny</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/FStarLang?period=past_12_months#star-growth">F*</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=fstarlang&repository=fstar">F*</a></td>
                        <td><a href="https://github.com/search?q=language%3Afstar&type=code">F*</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/isabelle-prover?period=past_12_months#star-growth">Isabelle</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=isabelle-prover&repository=mirror-isabelle">Isabelle</a></td>
                        <td><a href="https://github.com/search?q=language%3Aisabelle&type=code">Isabelle</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/leanprover?period=past_12_months#star-growth">Lean</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=leanprover&repository=lean4">Lean</a></td>
                        <td><a href="https://github.com/search?q=language%3Alean&type=code">Lean</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://next.ossinsight.io/analyze/tlaplus?period=past_12_months#star-growth">TLA+</a></td>
                        <td><a href="https://somsubhra.github.io/github-release-stats/?username=tlaplus&repository=tlaplus">TLA+</a></td>
                        <td><a href="https://github.com/search?q=language%3ATLA&type=code">TLA+</a></td>
                        <td><a href="https://metabase.tlapl.us/public/dashboard/cf7e1a79-19b6-4be1-88bf-0a3fd5aa0dec?jvm_vendor=&os_name=&ide_launched=&fp_set_type=&category=tlc&category=apalache">TLA+</a></td>
                    </tr>
                </tbody>
            </table>

            <h1>Legend</h1>
            <p className="responsivity-mobile-modif">
                The language percentage distribution in the line chart shows the eight languages since 2015/Q1. The ranking table shows the languages of the selected quarter.

                The percentage values are the actual fractions of pull requests, pushes, stars or issues in relation to all eight languages in the table. Total is the sum over pull requests, pushes, stars and issues.
                <br/>
                <br/>
                The YoY change shows the difference in percentage compared to the same time period last year. The YoY trend arrows indicate the change in ranking. Two arrows up/down stands for more than three ranks up/down within one year. No arrow indicates
                that nothing has changed and one arrow fills the gap.
                <br/>
                <br/>
               Please note that it is possible that the ranking shown in the table does not match the chart ranking, since they are calculated over a different time period (quarter vs. full history).
            </p>
            <h1>Data collection</h1>
            <p className="responsivity-mobile-modif">
                FMHut is an attempt to measure the popularity of formal verification languages on Github. GitHub is the largest code host in the world, with 40 million users and
                more than 190 million repositories as of January 2020. By analyzing how languages are used in GitHub it&#39;s possible to understand the popularity of programming languages among
                developers and to discover the unique characteristics of each language. GitHub provides a public{" "} <a href="//developer.github.com/v3/">API</a> to interact with its huge dataset of
                events and interaction with the hosted repositories. The{" "} <a href="//githubarchive.org/">GitHub Archive</a> project goes one step further by aggregating and storing the API data over time. 
                <br/>
                <br/>
                The quantitative data used here is collected from the GitHub Archive dataset via{" "} <a href="//developers.google.com/bigquery/">Google BigQuery</a>.  More concretely, the query used to collect the data counts the number of events in every
                Github repository that contains content, i.e., files of any one of the eight formal verification languages.  It relies on Github to correctly identify the language of the files in the repositories.
                This is distinctly different compared to the original Githut project, which determines a repository&#39;s *primary* language based on the number of bytes of code written in a particular language.

                <br/>
                <br/>
                The quantitative data presented here was obtained from the <a href="https://www.gharchive.org">GitHub Archive dataset</a>, accessed through Google BigQuery. Specifically, the data collection involved <a href="https://github.com/lemmy/FMLangStats/blob/3774bd7c8258bc4cc397239e4528e123f9838875/scripts/query.js#L43-L60">
                counting the number of events</a> in each GitHub repository containing files in any
                of the eight formal verification languages. This process depends on GitHub&apos;s ability to accurately identify the language of files in these repositories. This approach differs significantly from the original Githut project, which categorized
                a repository&apos;s primary language <a href="https://github.com/madnight/githut/blob/140f0177224d44d2b81ad541b67fffdea8597260/scripts/query.js#L65-L67">based on the volume of code (measured in bytes) written</a> in that language.

                <br/>
                We posit that our methodology is more fitting for assessing the popularity of formal verification languages for two reasons. Firstly, in practical applications, formal verification languages are typically not the primary programming languages;
                instead, they are utilized to specify and verify certain aspects of the code written in the main programming language. Secondly, the byte count approach, as highlighted in the <a href="https://github.com/madnight/githut/issues/113">Githut issue</a>,
                adheres to a &quot;winner takes all&quot; model. This model is biased towards language verbosity; articulating similar concepts in different languages can require varying amounts of bytes.
            </p>
        </div>
    )
}
