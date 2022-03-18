function update() {
    var select_lang = document.getElementById('language-select');
    var select_cat = document.getElementById('category-select')
    localStorage.setItem("language", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category", select_cat.options[select_cat.selectedIndex].value);
} 

function showGraphs() {
    var cat = localStorage.getItem("category")
    var lang = localStorage.getItem("language")

    // Ensure that user selects language and category
    if (lang === "") {
        alert('Please select a language');
    }
    else if (cat === "") {
        alert('Please select a category');
    }
    else {
        // Store category
        var cont = document.getElementById("contributor");
        var comm = document.getElementById("commit");
        var proj = document.getElementById("project");
        // identify proper html <script> by category
        parseData('census_interactive/data/'+cat+'/'+lang+'.json')

    
        // Show contributor graph, hide others
        if (cat === "contributor") {
            comm.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:show");
        }
        // Show commit graph, hide others
        else if (cat === "commit") {
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            comm.setAttribute("style", "display:show");
        }
        // Show project graph, hide others
        else {           
            comm.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:show");
        }
    }
}