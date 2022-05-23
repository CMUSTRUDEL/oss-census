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
function parseSingleData(cat, yearOpt, graphOpt) {
    if (graphOpt == "pie") {
        // Pie graph parsing
        parsePieData(cat, yearOpt)
    }
    else if (graphOpt == "bar") {
        // Bar graph parsing
        parseBarData(cat) 
    }
    else if (graphOpt == "stack") {
        // Bar graph parsing
        parseStackData(cat) 
    }
    else {
        error("Invalid graph option passed to parser...");
    }
}

function parsePieData(cat, yearOpt) {
    console.log("Parsing Single Pie graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_pie[cat][yearOpt]["title"];
    obj.subtitle = data_pie[cat][yearOpt]["subtitle"];
    obj.data = data_pie[cat][yearOpt]["data"];
    console.log("Finished parsing Single Pie graph data")
}

function parseBarData(cat) {
    console.log("Parsing Single Bar graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_bar[cat]['male_female']["title"];
    obj.label_x = data_bar[cat]['male_female']["label_x"];
    obj.label_y = data_bar[cat]['male_female']["label_y"];
    obj.data = data_bar[cat]['male_female']["data"];
    obj.x_categories = data_bar[cat]['male_female']["x_categories"];
    obj.height_ratio = data_bar[cat]['male_female']["height_ratio"];
    console.log("Finished parsing Single Bar graph data")
}

function parseStackData(cat) {
    console.log("Parsing Single Stack graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_bar[cat]["title"];
    obj.label_y = data_bar[cat]["label_y"];
    obj.data = data_bar[cat]["data"];
    obj.x_categories = data_bar[cat]["x_categories"];
    obj.height_ratio = data_bar[cat]["height_ratio"];
    console.log("Finished parsing Single Stack Area graph data")
}