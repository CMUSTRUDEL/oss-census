var obj = '{"title": "", \
            "label_x": "", \
            "label_y": "", \
            "label_y_secondary": "", \
            "x_categories": "", \
            "height_ratio": "", \
            "data": "" }';

// Converting empty JSON to json string object
var obj = JSON.parse(obj);


/* Parsing Functions */

function parseData(cat, lang) {
    // obj data variable stored in data.js, taken into function 
    obj.title = data[cat][lang]["title"];
    obj.label_x = data[cat][lang]["label_x"];
    obj.label_y = data[cat][lang]["label_y"];
    obj.label_y_secondary = data[cat][lang]["label_y_secondary"];
    obj.x_categories = data[cat][lang]["x_categories"];
    obj.height_ratio = data[cat][lang]["height_ratio"];
    obj.data = data[cat][lang]["data"];
}

function parsePieData(cat, lang, year) {
    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_sy[cat][year][lang]["title"];
    obj.label_x = data_sy[cat][year][lang]["subtitle"];
    obj.data = data_sy[cat][year][lang]["data"];
}