var variablestoraged = localStorage.getItem("category"); 

if(localStorage.getItem("category").length > 0){
    document.getElementById("category-select").selected = "true";
} else{}


// TODO: Update to use localstorage and implement cache
function storedValue() {
    var variableStored = localStorage.getItem("category"); 

    if(variableStored.length > 0){
        document.getElementById("category-select").selected = variableStored;
    } else{}
}