/* Functions to add, update, and delete HTML */

// Global var tracks number of graphs
num_rows = 1 

function update() {
    var select_lang = document.getElementById('language-select');
    var select_cat = document.getElementById('category-select');

    localStorage.setItem("language", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category", select_cat.options[select_cat.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");

    if (lang == "" || lang == null) {
        alert('Please select a language');
    }
    else if (cat == "" || cat == null) {
        alert('Please select a category');
    }

    let cont;
    let comm;
    let proj;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");
    // Store category
    cont = document.getElementById("contributor");
    comm = document.getElementById("commit");
    proj = document.getElementById("project");

    // Show contributor graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parseData("Contributor", lang)
        comm.setAttribute("style", "display:none");
        proj.setAttribute("style", "display:none");
        cont.setAttribute("style", "display:show");

        // Reloads graph with updated data vars
        graphContributor(String(num))
    }
    else {
        alert("Only Contributor graphs available at this time")

    }
    // // Show commit graph, hide others
    // else if (cat === "commit") {
    //     parseData("Commit", lang)

    //     cont.setAttribute("style", "display:none");
    //     proj.setAttribute("style", "display:none");
    //     comm.setAttribute("style", "display:show");

    //     // Reloads graph with updated data vars
    //     graphCommit(String(num))            
    // }
    // // Show project graph, hide others
    // else {           
    //     parseData("Project", lang)

    //     comm.setAttribute("style", "display:none");
    //     cont.setAttribute("style", "display:none");
    //     proj.setAttribute("style", "display:show");

    //     // Reloads graph with updated data variables
    //     graphProject(String(num))  
    // }
}