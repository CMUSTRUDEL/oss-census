/* Functions to add, update, and delete HTML */

// Global var tracks number of graphs
numRows = 1 
maxGraphs = 10

function update(graph_num) {
    // Takes string representing graph number
    num = parseInt(graph_num)

    var selectLang = document.getElementById('language-select-' + String(num));
    // Only one category toggled at a time
    var selectCat = document.getElementById('category-select');

    localStorage.setItem("language-" + String(graph_num), selectLang.options[selectLang.selectedIndex].value);
    localStorage.setItem("category", selectCat.options[selectCat.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;
    let noEmptyOptions = true;

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

    let cont;
    let comm;
    let proj;

    // Only generate graphs if all options are selected
    if (noEmptyOptions) {
        for (let num = 1; num < numRows + 1; num++) {
            cat = localStorage.getItem("category");
            lang = localStorage.getItem("language-" + String(num));
            // Store category
            cont = document.getElementById("contributor-" + String(num));
            comm = document.getElementById("commit-" + String(num));
            proj = document.getElementById("project-" + String(num));
        
            // Show contributor graph, hide others
            if (cat == "contributor" ) {
                // Update JSON object referenced for graphs
                parseData("Contributor", lang)
                comm.setAttribute("style", "display:none");
                proj.setAttribute("style", "display:none");
                cont.setAttribute("style", "display:show");
    
                // Reloads graph with updated data vars
                graphContributor(String(num))
            }
            // Show commit graph, hide others
            else if (cat === "commit") {
                parseData("Commit", lang)
    
                cont.setAttribute("style", "display:none");
                proj.setAttribute("style", "display:none");
                comm.setAttribute("style", "display:show");
    
                // Reloads graph with updated data vars
                graphCommit(String(num))            
            }
            // Show project graph, hide others
            else {           
                parseData("Project", lang)
    
                comm.setAttribute("style", "display:none");
                cont.setAttribute("style", "display:none");
                proj.setAttribute("style", "display:show");
    
                // Reloads graph with updated data variables
                graphProject(String(num))  
            }
        }
    }
}

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
        <div class="flex flex-row items-center space-x-4">
            <!-- Dropdown for language selection -->
            <select name="language-` + String(numRows) + `" id="language-select-` + String(numRows) + `" onchange="update(` + String(numRows) + `)" class="form-select appearance-none 
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
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select">
                <option value="" selected disabled hidden>--Select--</option>
                <option value="Python">Python</option>
                <option value="C#">C#</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
                <option value="Go">Go</option>
                <option value="Ruby">Ruby</option>
                <option value="C++">C++</option>
                <option value="TypeScript">TypeScript</option>
                <option value="PHP">PHP</option>
                <option value="C">C</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Jupyter">Jupyter</option>
                <option value="Shell">Shell</option>
                <option value="Objective-C">Objective-C</option>
                <option value="All">All</option>
            </select>
        </div>
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
    const div = document.createElement('div');  
    div.className = 'graph';
    div.id = 'graph-' + String(numRows)

    div.innerHTML = `
    <div class="mx-auto my-3 w-full"> 
        <div id="contributor-`+ String(numRows) + `" style="display: none" class="flex-col items-center w-full my-3">                
            <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure">
                    <div id="cont-`+ String(numRows) + `"></div>
                    <!-- JS file link -->
                    <script src="js/data.js"></script>
                    <script src="js/parse.js"></script>
                    <script src="census_interactive/graphs/Graph_Contributor/script.js"></script>
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    
        <div id="commit-`+ String(numRows) + `" style="display: none" class="flex-col items-center my-3 w-full">
            <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure">
                    <div id="comm-`+ String(numRows) + `"></div> 
                    <!-- JS file link -->
                    <script src="js/data.js"></script>
                    <script src="js/parse.js"></script>
                    <script src="census_interactive/graphs/Graph_Commit/script.js"></script>
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>

        <div id="project-`+ String(numRows) + `" style="display: none" class="flex-col items-center my-3 w-full">
            <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure">
                    <div id="proj-`+ String(numRows) + `"></div>
                    <!-- JS file link -->
                    <script src="js/data.js"></script>
                    <script src="js/parse.js"></script>
                    <script src="census_interactive/graphs/Graph_Project/script.js"></script>
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