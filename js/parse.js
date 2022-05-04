var obj = '{"title": "", \
            "label_x": "", \
            "label_y": "", \
            "label_y_secondary": "", \
            "x_categories": "", \
            "height_ratio": "", \
            "data": "" }';

// Converting empty JSON to json string object
var obj = JSON.parse(obj);
// obj used to access values throughout shared JS


/* Parsing Functions */

function parseData(cat, lang) {
    console.log("Parsing Data...")
    console.log(cat, lang)
    // data variable stored in data.js
    obj.title = data[cat][lang]["title"];
    obj.label_x = data[cat][lang]["label_x"];
    obj.label_y = data[cat][lang]["label_y"];
    obj.label_y_secondary = data[cat][lang]["label_y_secondary"];
    obj.x_categories = data[cat][lang]["x_categories"];
    obj.height_ratio = data[cat][lang]["height_ratio"];
    obj.data = data[cat][lang]["data"];
}

// Handler for specifying pie or bar graph data parsing
function parseSingleData(cat, lang, yearOpt, compareOpt, graphOpt) {
    if (graphOpt == "pie") {
        // Pie graph parsing
        parsePieData(cat, lang, yearOpt, compareOpt)
    }
    else if (graphOpt == "bar") {
        // Bar graph parsing
        parseBarData(cat, compareOpt) 
    }
    else {
        error("Invalid graph option passed to parser...");
    }
}

function parsePieData(cat, lang, yearOpt, compareOpt) {
    console.log("Parsing Single Pie graph data...");

    yearKey = yearOpt+'_years';
    compareKey = compareOpt+'_female';

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_pie[cat][yearKey][lang][compareKey]["title"];
    obj.label_x = data_pie[cat][yearKey][lang][compareKey]["subtitle"];
    obj.data = data_pie[cat][yearKey][lang][compareKey]["data"];
}

function parseBarData(cat, compareOpt) {
    console.log("Parsing Single Bar graph data...");

    compareKey = compareOpt+'_female';
    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_bar[cat][compareKey]["title"];
    obj.label_x = data_bar[cat][compareKey]["label_x"];
    obj.label_y = data_bar[cat][compareKey]["label_y"];
    obj.data = data_bar[cat][compareKey]["data"];
    obj.x_categories = data_bar[cat][compareKey]["x_categories"];
    obj.height_ratio = data_bar[cat][compareKey]["height_ratio"];
}