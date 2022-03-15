var variablestoraged = localStorage.getItem("category"); 

if(localStorage.getItem("category").length > 0){
    document.getElementById("category-select").selected = "true";
} else{}