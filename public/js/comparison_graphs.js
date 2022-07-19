/* Functions to add, update, and delete HTML primarily on comparison page */

// Global var tracks number of graphs
numRows = 1 
maxGraphs = 10

function updateDropdown(graph_num) {
    // Takes integer representing graph number

    var selectYear = document.getElementById('year-select');
    var selectLang = document.getElementById('language-select-' + String(graph_num));
    // Only one category toggled at a time
    var selectCat = document.getElementById('category-select');

    localStorage.setItem("year", selectYear.options[selectYear.selectedIndex].value);
    localStorage.setItem("language-" + String(graph_num), selectLang.options[selectLang.selectedIndex].value);
    localStorage.setItem("category", selectCat.options[selectCat.selectedIndex].value);

    // Automatically select "All" for year dropdown if language is not "All"
    if (selectLang.options[selectLang.selectedIndex].value != "All") {
        // Warning message if user does not select All Years for individual lanugage
        if (selectYear.options[selectYear.selectedIndex].value != "All"
         && selectYear.selectedIndex != "0"){
            alert("Individual Ecosystems can only be graphed across 'All' Years")
        }
        selectYear.selectedIndex = "0";
    }
} 


function graph() {
    // Shows specific graphs by altering appropriate 'display' style element

    let cat;
    let lang;
    let noEmptyOptions = true;
    
    let langOpt = localStorage.getItem("language-1");

    // Ensure all dropdowns are selected
    for (let num = 1; num < numRows + 1; num++) {
        cat = localStorage.getItem("category");
        lang = localStorage.getItem("language-" + String(num));

        if (lang == "" || lang == null) {
            alert('Please select a language');
            noEmptyOptions = false;
        }
        else if (cat == "" || cat == null) {
            alert('Please select a category');
            noEmptyOptions = false;
        }
    }

    // Only graph if all options are selected, language cannot be "All"
    if (!noEmptyOptions) {
        return
    }

    // Graph Polar or Stack charts comparing all languages
    handleAllLangs(langOpt);
    // Display Commit or Contributor graphs
    handleSingleCategory();
    handleMultipleCategories(langOpt);

}


// Functions to Hide/Display Contributor and Commit Graphs

function handleSingleCategory() {
    // Display one commit or contributor graph

    cat = localStorage.getItem("category");
    // Default to first dropdown selection
    lang = localStorage.getItem("language-1");

    // Retrieve category HTML
    cont = document.getElementById("contributor-single");
    comm = document.getElementById("commit-single");

    // Hide Single graphs if multiple to be displayed
    if (numRows > 1) {
        setDisplay(cont, comm, "none", "none");
        return 
    }

    // Show Commit or Contributor graphs
    if (cat == "contributor" ) {
        // Update JSON object referenced for graphs
        parseData("Contributor", lang)
        setDisplay(cont, comm, "show", "none");
        // Reloads graph with updated data vars
        graphContributor("0")
    }
    else {
        parseData("Commit", lang)
        setDisplay(cont, comm, "none", "show");
        // Reloads graph with updated data vars
        graphCommit("0")            
    }
}

function handleMultipleCategories(langOpt) {
    // Display multiple contributor and/or commit graphs across 2 columns
    let cont;
    let comm;

    if ((langOpt == 'All') || (numRows == 1) ) {
        // Hide comparison columns if single graphs displayed

        cont = document.getElementById("contributor-1");
        comm = document.getElementById("commit-1");
        setDisplay(cont, comm, "none", "none");
        return
    }
    
    for (let num = 1; num < numRows + 1; num++) {
        cat = localStorage.getItem("category");
        lang = localStorage.getItem("language-" + String(num));
    
        // Retrieve category HTML
        cont = document.getElementById("contributor-" + String(num));
        comm = document.getElementById("commit-" + String(num));
    
        // Show Contributor graph
        if (cat == "contributor" ) {
            // Update JSON object referenced for graphs
            parseData("Contributor", lang)
            setDisplay(cont, comm, "show", "none");
        
            // Reloads graph with updated data vars
            graphContributor(String(num))
        }
        // Show Commit Graph
        else {
            parseData("Commit", lang)
            setDisplay(cont, comm, "none", "show");

            // Reloads graph with updated data vars
            graphCommit(String(num))            
        }
    }
}

function setDisplay(selectOne, selectTwo, statusOne, statusTwo ) {
    // Selected HTML display set to either "show" or "none" status
    selectOne.setAttribute("style", `display:${statusOne}`);
    selectTwo.setAttribute("style", `display:${statusTwo}`);
}



// Functions to handle Multiple Graphs on page

function addRow() {
    // Add query row
    // Call function to add graph div

    if (numRows == maxGraphs) {
        alert("Maximum number of graphs reached")
        return
    }
    numRows += 1;

    const div = document.createElement('div');  
    div.className = 'row';
    div.id = 'row-' + String(numRows)
    div.innerHTML = `
        <!-- Dropdown for language selection -->
        <select name="language-` + String(numRows) + `" id="language-select-` + String(numRows) + `" onchange="updateDropdown(` + String(numRows) + `)" class="  
            block
            w-full
            px-2
            py-1
            my-3
            text-base
            text-center
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-expanded="true" aria-haspopup="true" aria-label="Default select">                 aria-expanded="true" aria-haspopup="true" aria-label="Default select">
            <option value="" selected disabled hidden>--Select--</option>
            <option value="All">All</option>
            <option value="Atom">Atom</option>
            <option value="Bower">Bower</option>
            <option value="Cargo">Cargo</option>
            <option value="Clojars">Clojars</option>
            <option value="CocoaPods">CocoaPods</option>
            <option value="CPAN">CPAN</option>
            <option value="CRAN">CRAN</option>
            <option value="Go">Go</option>
            <option value="Hackage">Hackage</option>
            <option value="Hex">Hex</option>
            <option value="Maven">Maven</option>
            <option value="Meteor">Meteor</option>
            <option value="NPM">NPM</option>
            <option value="NuGet">NuGet</option>
            <option value="Packagist">Packagist</option>
            <option value="PlatformIO">PlatformIO</option>
            <option value="Pub">Pub</option>
            <option value="Puppet">Puppet</option>
            <option value="PyPi">PyPi</option>
            <option value="RubyGems">RubyGems</option>
        </select>
    `;
  
    document.getElementById('query').appendChild(div);
    addGraph();
  }
  
function removeRow() {
    // Remove query row option
    // Call to remove graph div element
    if (numRows == 1) {
        return
    }
    numRows -= 1;

    let element = document.getElementById('query');
    var child = element.lastElementChild;
    element.removeChild(child);

    // Remove graph div child node
    removeGraph();
}

function addGraph() {
    // Adds HTML for new graph and selects appropriate column
    
    const div = document.createElement('div');  
    div.className = 'graph';
    div.id = 'graph-' + String(numRows)

    div.innerHTML = `
    <div class="mx-auto my-3 w-full"> 
        <div id="contributor-`+ String(numRows) + `" style="display: none" class="flex-col items-center w-full my-3">                
            <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure" onclick="return false;">
                    <div id="cont-`+ String(numRows) + `"></div>
                    <!-- JS file link -->
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    
        <div id="commit-`+ String(numRows) + `" style="display: none" class="flex-col items-center my-3 w-full">
            <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure" onclick="return false;">
                    <div id="comm-`+ String(numRows) + `"></div> 
                    <!-- JS file link -->
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    </div>
    `
    if (numRows % 2 == 0) {
        // Add graph to right column if new number of graphs is even
        document.getElementById('visualizations-right').appendChild(div);
    }
    else {
        document.getElementById('visualizations-left').appendChild(div);
    }

}


function removeGraph() {
    let element;
    let child; 

    if (numRows % 2 == 1) {
        // Remove graph from right column if new number of graphs is odd
        element = document.getElementById('visualizations-right');
        child = element.lastElementChild;
    }
    else {
        element = document.getElementById('visualizations-left');
        child = element.lastElementChild;
    }
   
    element.removeChild(child);
}
