/* Functions to add, update, and delete HTML for viewing single graphs */

function update() {
    var select_lang = document.getElementById('language-select');
    var select_cat = document.getElementById('category-select');
    var select_year = document.getElementById('year-select');

    localStorage.setItem("language", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category", select_cat.options[select_cat.selectedIndex].value);
    localStorage.setItem("year", select_year.options[select_year.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;
    let year;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");
    year = localStorage.getItem("year");

    if (lang == "" || lang == null) {
        alert('Please select a language');
    }
    else if (cat == "" || cat == null) {
        alert('Please select a category');
    }
    else if (year == "" || year == null) {
        alert('Please select a year');
    }

    // Select Pie chart HTML
    pie_single = document.getElementById("pie-single");
    pie_all = document.getElementById("pie-all");

    // Show contributor graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parsePieData("Contributor", lang, year)

        if (year == "single") {
            pie_single.setAttribute("style", "display:show");
        }
        else {
            pie_all.setAttribute("style", "display:show");
        }
        console.log("GRAPHING");
        // Reloads graph with updated data vars
        graphPie();
    }
    else {
        alert("Only Contributor graphs available at this time");
    }
}