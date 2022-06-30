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
    console.log("Parsing Data....");
    console.log(cat, lang);

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
        // Stack area graph parsing
        parseStackData(cat) 
    }
    else if (graphOpt == "percent") {
        // Stack percent area parsing
        parsePercentData(cat)
    }
    else {
        error("Invalid graph option passed to parser...");
    }
}

function parsePieData(cat, yearOpt) {
    console.log("Parsing Single Pie graph data...");
    console.log(cat, yearOpt)
    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_pie[cat][yearOpt]["title"];
    obj.subtitle = data_pie[cat][yearOpt]["subtitle"];
    obj.data = data_pie[cat][yearOpt]["data"];
    console.log("Finished parsing Single Pie graph data")
}

function parseStackData(cat) {
    console.log("Parsing Single Stack graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_stack[cat]["title"];
    obj.label_y = data_stack[cat]["label_y"];
    obj.data = data_stack[cat]["data"];
    obj.x_categories = data_stack[cat]["x_categories"];
    obj.height_ratio = data_stack[cat]["height_ratio"];
    console.log("Finished parsing Single Stack Area graph data")
}

function parsePercentData(cat) {
    console.log("Parsing Percent graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_percent[cat]["title"];
    obj.label_y = data_percent[cat]["label_y"];
    obj.data = data_percent[cat]["data"];
    obj.x_categories = data_percent[cat]["x_categories"];
    obj.height_ratio = data_percent[cat]["height_ratio"];
    console.log("Finished parsing Percent Area graph data")
}