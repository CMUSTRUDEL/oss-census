/* Functions to add, update, and delete HTML for viewing single graphs */

function update() {
    var selectLang = document.getElementById('language-select');
    var selectCat = document.getElementById('category-select');
    var selectCompare = document.getElementById('compare-select');
    var selectGraph = document.getElementById('graph-select');
    // Year set to 'all', as it is of less interest to select most recent year
    var selectYear = 'all';
    // var selectGraph = document.getElementById('graph-select');



    localStorage.setItem("language", selectLang.options[selectLang.selectedIndex].value);
    localStorage.setItem("category", selectCat.options[selectCat.selectedIndex].value);
    localStorage.setItem("year", selectYear);
    localStorage.setItem("compare", selectCompare.options[selectCompare.selectedIndex].value);
    localStorage.setItem("graph", selectGraph.options[selectGraph.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;
    let yearOpt;
    let graphOpt;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");
    yearOpt = localStorage.getItem("year");
    compareOpt = localStorage.getItem("compare");
    graphOpt = localStorage.getItem("graph")

    if (lang == "" || lang == null) {
        alert('Please select a language');
    }
    else if (cat == "" || cat == null) {
        alert('Please select a category');
    }
    else if (yearOpt == "" || yearOpt == null) {
        alert('Please select a year option');
    }
    else if (compareOpt == "" || compareOpt == null) {
        alert('Please select a compare option');
    }
    else if (graphOpt == "" || graphOpt == null) {
        alert('Please select a graph option');
    }

    let graphOpts = ['bar', 'pie']; 
  
    // Show proper graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parseSingleData("Contributor", lang, yearOpt, compareOpt, graphOpt)

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