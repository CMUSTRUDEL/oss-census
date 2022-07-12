/* Functions to add, update, and delete HTML for viewing single graphs */

function handleAllLangs() {
    // Display div for stack or pie graph
    let cat;
    let yearOpt;
    let langOpt;

    cat = localStorage.getItem("category");
    yearOpt = localStorage.getItem("year");
    langOpt = localStorage.getItem("language-1");

    stack = document.getElementById("stack");
    polar = document.getElementById("pie");
  
    if ((langOpt == 'All') && (cat != "contributor" )) {
        alert("Only Contributor graphs available at this time");
        document.getElementById("category-select").selectedIndex = "1";
    }
    else if (langOpt != 'All') {
        // Hide stack and polar charts if not selected
        setDisplay(stack, polar, "none", "none")
        return
    }

    if ((yearOpt == "All") && (langOpt == "All")) {
        // Display stack graph
        setDisplay(stack, polar, "show", "none")

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "stack");
        // Function taken from visualizations GRAPH.js
        graphStack();
    }
    else if (langOpt == "All") {
        // Display polar chart
        setDisplay(stack, polar, "none", "show")

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "pie");
        // Function taken from visualizations GRAPH.js
        graphPie(yearOpt);
    }
    else {
        error("Single graph display unidentified issue")
    }

    cont = document.getElementById("contributor-single");
    comm = document.getElementById("commit-single");
    setDisplay(cont, comm, "none", "none");
}

function showGraphPercent() {
    // Graphs Percent area graph
    yearOpt = "All";
    // Percent area graph requires same vars as stack area
    graphOpt = "percent";
    parseSingleData("Contributor", yearOpt, graphOpt);
    graphPercent();
}

function showGraphDumbbell() {
    // Graphs Percent area graph
    yearOpt = "All";
    // Percent area graph requires same vars as stack area
    graphOpt = "dumbbell";
    parseSingleData("Contributor", yearOpt, graphOpt);
    graphDumbbell();
}