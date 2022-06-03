function updateGraph(type) {
    // Save button associated graph type to localstorage 
    localStorage.setItem("type", type);

    // Update HTML
    changeGraph();
    
}

function changeGraph() {
    type = localStorage.getItem("type");

 
    types = ["cont", "comm"];

    for (let i = 0; i < 2; i++) {
        currType = types[i];
        currHTML = document.getElementById(currType);
        currButton = document.getElementById(currType+"-button");

        if (type == "cont") {
            // TODO: update lang here
            parseData("Contributor", "All")
            graphContributor("1") 
        }
        else {
            parseData("Commit", "All")
            graphCommit("1") 
        }


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