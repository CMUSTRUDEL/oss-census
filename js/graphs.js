function updateRight() {
    var select_lang = document.getElementById('language-select-right');
    var select_cat = document.getElementById('category-select-right');
    localStorage.setItem("language-right", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category-right", select_cat.options[select_cat.selectedIndex].value);
} 

function showGraphRight() {
    var cat = localStorage.getItem("category-right")
    var lang = localStorage.getItem("language-right")

    // Ensure that user selects language and category
    if (lang === "") {
        alert('Please select a language');
    }
    else if (cat === "") {
        alert('Please select a category');
    }
    else {
        // Store category
        var cont = document.getElementById("contributor-right");
        var comm = document.getElementById("commit-right");
        var proj = document.getElementById("project-right");
    
        // Show contributor graph, hide others
        if (cat === "contributor") {
            // Update JSON object referenced for graphs
            parseData("Contributor", lang)
            comm.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphContributor()
        }
        // Show commit graph, hide others
        else if (cat === "commit") {
            parseData("Commit", lang)

            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            comm.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphCommit()            
        }
        // Show project graph, hide others
        else {           
            parseData("Project", lang)

            comm.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:show");

            // Reloads graph with updated data variables
            graphProject()  
        }
    }
}


// Functions for updating left side of Graphs page

function updateLeft() {
    var select_lang = document.getElementById('language-select-left');
    var select_cat = document.getElementById('category-select-left');
    localStorage.setItem("language-left", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category-left", select_cat.options[select_cat.selectedIndex].value);
} 

function showGraphLeft() {
    var cat = localStorage.getItem("category-left")
    var lang = localStorage.getItem("language-left")

    // Ensure that user selects language and category
    if (lang === "") {
        alert('Please select a language');
    }
    else if (cat === "") {
        alert('Please select a category');
    }
    else {
        // Store category
        var cont = document.getElementById("contributor-left");
        var comm = document.getElementById("commit-left");
        var proj = document.getElementById("project-left");
    
        // Show contributor graph, hide others
        if (cat === "contributor") {
            // Update JSON object referenced for graphs
            parseData("Contributor", lang)
            comm.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphContributor()
        }
        // Show commit graph, hide others
        else if (cat === "commit") {
            parseData("Commit", lang)

            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            comm.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphCommit()            
        }
        // Show project graph, hide others
        else {           
            parseData("Project", lang)

            comm.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:show");

            // Reloads graph with updated data variables
            graphProject()  
        }
    }
}
