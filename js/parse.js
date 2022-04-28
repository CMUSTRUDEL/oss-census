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

function parsePieData(cat, lang, yearOpt, compareOpt) {
    // obj data variable stored in data.js, taken into function for single graphs
    obj.title = data_pie[cat][yearOpt+'_years'][lang][compareOpt+'_female']["title"];
    obj.label_x = data_pie[cat][yearOpt+'_years'][lang][compareOpt+'_female']["subtitle"];
    obj.data = data_pie[cat][yearOpt+'_years'][lang][compareOpt+'_female']["data"];
}