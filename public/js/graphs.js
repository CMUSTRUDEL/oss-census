function updateGraph(type) {
    var selectGraph = document.getElementById(type);
    
    localStorage.setItem("type", type);

    // Update HTML
    changeGraph();
}

function changeGraph() {
    type = localStorage.getItem("type");

 
    types = ["cont", "comm"];

    for (let i = 0; i < 3; i++) {
        currType = types[i];
        currHTML = document.getElementById(currType);
        currButton = document.getElementById(currType+"-button");

        if (currType == type) {
            // display selected graph type
            currHTML.setAttribute("style", "display:show");
            currButton.setAttribute("class", "w-full h-full bg-primary hover:bg-purple-900 text-white text-lg font-semibold rounded-t-2xl")
        }
        else {
            currHTML.setAttribute("style", "display:none");
            currButton.setAttribute("class", "w-full h-full bg-gray-300 hover:bg-gray-500 text-white text-lg font-semibold rounded-t-2xl")
        }
    }
}