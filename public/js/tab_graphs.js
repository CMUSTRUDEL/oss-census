function updateTab(type, ecosystem) {
    console.log("HI friend");
    // Save button associated graph type to localstorage 
    localStorage.setItem("type", type);

    // Update HTML
    changeGraph(ecosystem);
}

function updateEco() {
    var selectEco = document.getElementById('ecosystem-select');

    // Save button associated graph type to localstorage 
    localStorage.setItem("ecosystem", selectEco.options[selectEco.selectedIndex].value);

    // Update HTML
    changeGraph(null);
}

function changeGraph(default_ecosystem) {
    type = localStorage.getItem("type");

    if (default_ecosystem == null) {
        ecosystem = localStorage.getItem("ecosystem")
    }
    else {
        ecosystem = default_ecosystem
    }
 
    // Check if a user hasn't selected ecosystem or default wasn't provided 
    if (ecosystem == null) {
        alert("Please select an Ecosystem");
    }

    types = ["cont", "comm"];

    for (let i = 0; i < 2; i++) {
        currType = types[i];
        currHTML = document.getElementById(currType);
        currButton = document.getElementById(currType+"-button");

        if (type == "cont") {
            // TODO: update lang here
            parseData("Contributor", ecosystem)
            graphContributor("1") 
        }
        else {
            parseData("Commit", ecosystem)
            graphCommit("1") 
        }


        if (currType == type) {
            // display selected graph type
            currHTML.setAttribute("style", "display:show");
            currButton.setAttribute("class", "w-full h-full bg-primary hover:bg-green-900 text-white text-lg font-semibold rounded-t-2xl")
        }
        else {
            currHTML.setAttribute("style", "display:none");
            currButton.setAttribute("class", "w-full h-full bg-gray-300 hover:bg-gray-500 text-white text-lg font-semibold rounded-t-2xl")
        }
    }
}