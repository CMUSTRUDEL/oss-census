/* Functions to add, update, and delete HTML for viewing single graphs */

function update() {
    var select_lang = document.getElementById('language-select');
    var select_cat = document.getElementById('category-select');
    var select_year = document.getElementById('year-select');
    var select_compare = document.getElementById('compare-select');


    localStorage.setItem("language", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category", select_cat.options[select_cat.selectedIndex].value);
    localStorage.setItem("year", select_year.options[select_year.selectedIndex].value);
    localStorage.setItem("compare", select_compare.options[select_compare.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;
    let year_opt;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");
    year_opt = localStorage.getItem("year");
    compare_opt = localStorage.getItem("compare");

    if (lang == "" || lang == null) {
        alert('Please select a language');
    }
    else if (cat == "" || cat == null) {
        alert('Please select a category');
    }
    else if (year_opt == "" || year_opt == null) {
        alert('Please select a year option');
    }
    else if (compare_opt == "" || compare_opt == null) {
        alert('Please select a compare option');
    }

    // Select Pie chart HTML
    pie_single = document.getElementById("pie-single");
    pie_all = document.getElementById("pie-all");

    // Show contributor graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parsePieData("Contributor", lang, year_opt, compare_opt)

        if (year_opt == "single") {
            pie_single.setAttribute("style", "display:show");
            pie_all.setAttribute("style", "display:none");
        }
        else {
            pie_all.setAttribute("style", "display:show");
            pie_single.setAttribute("style", "display:none");
        }
        // Reloads graph with updated data vars
        graphPie(year_opt);
    }
    else {
        alert("Only Contributor graphs available at this time");
    }
}