/* Functions to add, update, and delete HTML for viewing single graphs */

function update() {
    var selectLang = document.getElementById('language-select');
    var selectCat = document.getElementById('category-select');
    var selectGraph = document.getElementById('graph-select');
    // TODO: Add year select menu
    var selectYear = '2008';

    localStorage.setItem("language", selectLang.options[selectLang.selectedIndex].value);
    localStorage.setItem("category", selectCat.options[selectCat.selectedIndex].value);
    localStorage.setItem("year", selectYear);
    localStorage.setItem("graph", selectGraph.options[selectGraph.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let yearOpt;
    let graphOpt;

    cat = localStorage.getItem("category");
    yearOpt = localStorage.getItem("year");
    graphOpt = localStorage.getItem("graph")

    if (cat == "" || cat == null) {
        alert('Please select a category');
    }
    else if (yearOpt == "" || yearOpt == null) {
        alert('Please select a year option');
    }
    else if (graphOpt == "" || graphOpt == null) {
        alert('Please select a graph option');
    }

    let graphOpts = ['bar', 'pie']; 
  
    // Show proper graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, compareOpt, graphOpt)

        for (let i = 0; i < graphOpts.length; i++) {
            let opt = graphOpts[i];

            if (opt == graphOpt) {
                // Display html for selected option
                document.getElementById(opt).setAttribute("style", "display:show");
            }
            else {
                // Hide html for non displaying options
                document.getElementById(opt).setAttribute("style", "display:none");
            }
        }
        // Reloads graph from script.js function call
        if (graphOpt == "pie") {
            graphPie(yearOpt);
        }
        else if (graphOpt == "bar") {
            graphBar();
        }
        else {
            error("Invalid graph option chosen");
        }
    }
    else {
        alert("Only Contributor graphs available at this time");
    }
}