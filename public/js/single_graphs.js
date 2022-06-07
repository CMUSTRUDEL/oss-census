

/* Functions to add, update, and delete HTML for viewing single graphs */

function updateYear() {
    var selectYear = document.getElementById('year-select');

    localStorage.setItem("year", selectYear.options[selectYear.selectedIndex].value);
} 


function showGraphSingle() {
    let cat;
    let yearOpt;
    let langOpt;

    cat = localStorage.getItem("category");
    yearOpt = localStorage.getItem("year");
    langOpt = localStorage.getItem("lang");
  
    // Only contributor graphs available
    if (cat != "contributor" ) {
        alert("Only Contributor graphs available at this time");
    }

    if ((yearOpt == "all") && (langOpt == "all")) {
        // Display stack graph
        document.getElementById("stack").setAttribute("style", "display:show");
        document.getElementById("pie").setAttribute("style", "display:none");

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "stack")
    }
    else if (langOpt == "all") {
        // Display polar chart
        document.getElementById("stack").setAttribute("style", "display:none");
        document.getElementById("pie").setAttribute("style", "display:show");

        // Update JSON object referenced for graphs
        parseSingleData("Contributor", yearOpt, "pie")
    }
    else {
        document.getElementById("stack").setAttribute("style", "display:none");
        document.getElementById("pie").setAttribute("style", "display:none");
    }

    // Reloads graph from script.js function call
    graphPie(yearOpt);
    graphStack();
}


