/* Functions to add, update, and delete HTML for viewing single graphs */

function update() {
    var selectLang = document.getElementById('language-select');
    var selectCat = document.getElementById('category-select');
    var selectYear = document.getElementById('year-select');
    var selectCompare = document.getElementById('compare-select');


    localStorage.setItem("language", selectLang.options[selectLang.selectedIndex].value);
    localStorage.setItem("category", selectCat.options[selectCat.selectedIndex].value);
    localStorage.setItem("year", selectYear.options[selectYear.selectedIndex].value);
    localStorage.setItem("compare", selectCompare.options[selectCompare.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;
    let yearOpt;

    cat = localStorage.getItem("category");
    lang = localStorage.getItem("language");
    yearOpt = localStorage.getItem("year");
    compareOpt = localStorage.getItem("compare");

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

    // Select Pie chart HTML
    pieSingle = document.getElementById("pie-single");
    pieAll = document.getElementById("pie-all");

    // Show contributor graph, hide others
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parsePieData("Contributor", lang, yearOpt, compareOpt)

        if (yearOpt == "single") {
            pieSingle.setAttribute("style", "display:show");
            pieAll.setAttribute("style", "display:none");
        }
        else {
            pieAll.setAttribute("style", "display:show");
            pieSingle.setAttribute("style", "display:none");
        }
        // Reloads graph with updated data vars
        graphPie(yearOpt);
    }
    else {
        alert("Only Contributor graphs available at this time");
    }
}