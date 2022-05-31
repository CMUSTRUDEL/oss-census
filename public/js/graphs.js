function updateGraph(type) {
    var selectGraph = document.getElementById(type);
    
    localStorage.setItem("type", type);

    // Update HTML
    changeGraph();
}

function changeGraph() {
    type = localStorage.getItem("type");

 
    types = ["cont", "comm", "proj"];

    for (let i = 0; i < 3; i++) {
        currType = types[i];
        currHTML = document.getElementById(currType);

        if (currType == type) {
            // display selected graph type
            currHTML.setAttribute("style", "display:show");
        }
        else {
            currHTML.setAttribute("style", "display:none");
        }
    }
}