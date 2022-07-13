/* JSON format used to access graph variables, functions to set object fields based on graph */

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

// Update this handler for specifying graph data to parse
function parseSingleData(cat, yearOpt, graphOpt) {
    // "Commit" or "Contributor" specified by 'cat'
    if (graphOpt == "pie") {
        parsePieData(cat, yearOpt)
    }
    else if (graphOpt == "bar") {
        parseBarData(cat) 
    }
    else if (graphOpt == "stack") {
        parseStackData(cat) 
    }
    else if (graphOpt == "percent") {
        parsePercentData(cat)
    }
    else if (graphOpt == "dumbbell") {
        parseDumbbellData(cat)
    }
    else {
        error("Invalid graph option passed to parser...");
    }
}

function parsePieData(cat, yearOpt) {
    console.log("Parsing Single Pie graph data...");
    console.log(cat, yearOpt)
    // obj data variable stored in data.js, taken into function for single graphs
    // accessing 'data_pie' variable from data.js
    obj.title = data_pie[cat][yearOpt]["title"];
    obj.subtitle = data_pie[cat][yearOpt]["subtitle"];
    obj.data = data_pie[cat][yearOpt]["data"];
    console.log("Finished parsing Single Pie graph data")
}

function parseStackData(cat) {
    console.log("Parsing Single Stack graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    // accessing 'data_stack' variable from data.js
    obj.title = data_stack[cat]["title"];
    obj.subtitle = data_stack[cat]["subtitle"];
    obj.label_y = data_stack[cat]["label_y"];
    obj.data = data_stack[cat]["data"];
    obj.x_categories = data_stack[cat]["x_categories"];
    obj.height_ratio = data_stack[cat]["height_ratio"];
    console.log("Finished parsing Single Stack Area graph data")
}

function parsePercentData(cat) {
    console.log("Parsing Percent graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    // accessing 'data_percent' variable from data.js    
    obj.title = data_percent[cat]["title"];
    obj.subtitle = data_percent[cat]["subtitle"];
    obj.label_y = data_percent[cat]["label_y"];
    obj.data = data_percent[cat]["data"];
    obj.x_categories = data_percent[cat]["x_categories"];
    obj.height_ratio = data_percent[cat]["height_ratio"];
    console.log("Finished parsing Percent Area graph data")
}

function parseDumbbellData(cat) {
    console.log("Parsing Dumbbell graph data...");

    // obj data variable stored in data.js, taken into function for single graphs
    // accessing 'data_dumbbell' variable from data.js
    obj.title = data_dumbbell[cat]["title"];
    obj.subtitle = data_dumbbell[cat]["subtitle"];
    obj.label_y = data_dumbbell[cat]["label_y"];
    obj.data = data_dumbbell[cat]["data"];
    obj.height_ratio = data_dumbbell[cat]["height_ratio"];
    console.log("Finished parsing Percent Area graph data")
}