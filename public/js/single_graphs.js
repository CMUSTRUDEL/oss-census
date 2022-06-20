/* Functions to add, update, and delete HTML for viewing single graphs */

function showGraphSingle() {
    let cat;
    let yearOpt;
    let langOpt;

    cat = localStorage.getItem("category");
    yearOpt = localStorage.getItem("year");
    langOpt = localStorage.getItem("language-1");
  
    if ((langOpt == 'All') && (cat != "contributor" )) {
        alert("Only Contributor graphs available at this time");
        document.getElementById("category-select").selectedIndex = "1";

    }

    if ((yearOpt == "All") && (langOpt == "All")) {
        // Display stack graph
        document.getElementById("stack").setAttribute("style", "display:show");
        document.getElementById("pie").setAttribute("style", "display:none");

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "stack");
        // Function taken from visualizations GRAPH.js
        graphStack();
    }
    else if (langOpt == "All") {
        // Display polar chart
        document.getElementById("stack").setAttribute("style", "display:none");
        document.getElementById("pie").setAttribute("style", "display:show");

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "pie");
        // Function taken from visualizations GRAPH.js
        graphPie(yearOpt);
    }
    else {
        error("Single graph display unidentified issue")
    }
}


