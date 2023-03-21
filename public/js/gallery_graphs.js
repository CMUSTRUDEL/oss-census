/* Functions to add HTML primarily on gallery page */

function addGraph(lang, graph_type) {
    // Adds HTML for new graph and selects appropriate column

    const div = document.createElement('div');
    div.className = 'flex flex-col text-center';
    div.id = `graph-${graph_type}-${lang}`;

    div.innerHTML = `
    <div class="line-graphs-title">
        <img class="ecosystem_logo" src="img/LibLogos/${lang}_logo_colored.png" alt="${lang} logo">
        <h2 class="text-primary lato-bold text-paragraph" style="color: ${visualization_props[lang]["color"]};">
            ${lang}
        </h2>
    </div>
    <div class="mx-auto w-full">
        <div style="display: show" class="flex-col items-center w-full my-3">                
            <a href="#!" class="hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure" onclick="return false;">
                    <div id="cont-${graph_type}-${lang}"></div>
                    <!-- JS file link -->
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    </div>
    `;

    const container = document.getElementById(`${graph_type}-graphs`);
    container.appendChild(div);
    
    parseData("Contributor", `${lang}_${graph_type}`);
    graphGallery(`${graph_type}-${lang}`);
}

function loadGraphs() {
    langs = ["Atom", "Bower", "CPAN", "CRAN", "Cargo", "Clojars", "CocoaPods", "Go", "Hackage", "Hex", "Maven", "Meteor", "NPM", "NuGet", "Packagist", "PlatformIO", "Pub", "Puppet", "Pypi", "Rubygems"];
    
    // All the graphs
    for (let i = 0; i < langs.length; i++) {
        addGraph(langs[i], 'line');
        addGraph(langs[i], 'women-bar');
        console.log(langs[i]);
    }
}

function scrollTo(graph_type) {
    document.getElementById(graph_type+'-title').scrollIntoView();
}