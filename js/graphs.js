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
        
        // TODO: Update data.js variable for language data
        // loadData(lang);

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

// TODO: Update to use localstorage
function storedValue() {
    var variableStored = localStorage.getItem("category"); 

    if(variableStored.length > 0){
        document.getElementById("category-select").selected = variableStored;
    } else{}
}

// Call to python function to update graph JS data
function loadData(input) {
    $.ajax({
        type: "POST",
        url: "/run.py",
        data: { param: input },
        success: callbackFunc
    });
}
function callbackFunc(response) {
    // do something with the response
    console.log("Data loaded!");
}