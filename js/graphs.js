// Functions for updating side of Graphs page
num_rows = 1 

function update() {
    var select_lang = document.getElementById('language-select');
    var select_cat = document.getElementById('category-select');
    localStorage.setItem("language", select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category", select_cat.options[select_cat.selectedIndex].value);
} 

function showGraph() {
    var cat = localStorage.getItem("category")
    var lang = localStorage.getItem("language")

    // Ensure that user selects language and category
    if (lang === "") {
        alert('Please select a language');
    }
    else if (cat === "") {
        alert('Please select a category');
    }
    else {
        // Store category
        var cont = document.getElementById("contributor");
        var comm = document.getElementById("commit");
        var proj = document.getElementById("project");
    
        // Show contributor graph, hide others
        if (cat === "contributor") {
            // Update JSON object referenced for graphs
            parseData("Contributor", lang)
            comm.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphContributor()
        }
        // Show commit graph, hide others
        else if (cat === "commit") {
            parseData("Commit", lang)

            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            comm.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphCommit()            
        }
        // Show project graph, hide others
        else {           
            parseData("Project", lang)

            comm.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:show");

            // Reloads graph with updated data variables
            graphProject()  
        }
    }
}

function addRow() {
    if (num_rows == 6) {
        alert("Maximum number of graphs reached")
        return
    }
    num_rows += 1;

    const div = document.createElement('div');  
    div.className = 'row';
    div.id = 'row-' + String(num_rows)
    div.innerHTML = `
        <div class="flex flex-row space-x-16">
        <div class="flex flex-row items-center space-x-4">
            <!-- Dropdown for language selection -->
            <label for="language-select" class="font-bold">Language:</label>
            <select name="language" id="language-select-` + String(num_rows) + `" onchange="update()" class="form-select appearance-none 
                block
                w-full
                px-3
                py-1
                my-3
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select">
                <option value="" selected disabled hidden>--Select an Option--</option>
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
        <div class="flex flex-row items-center space-x-4">
            <!-- Dropdown for category selection -->
            <label for="category-select" class="font-bold">Category:</label>
            <select name="category" id="category-select" onload="storedValue()" onchange="updateLeft()" class="form-select appearance-none 
                block
                w-full
                px-3
                py-1
                my-3
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select">
                <option value="" selected disabled hidden>--Select an Option--</option>
                <option value="contributor">Contributors</option>
                <option value="commit">Commits</option>
                <option value="project">Project</option>
                <!-- <option value="all">All</option> -->
            </select>
        </div>
    </div>
    `;
  
    document.getElementById('query').appendChild(div);
  }
  
  function removeRow() {
    if (num_rows == 1) {
        return
    }
    num_rows -= 1;

    let element = document.getElementById('query');
    let remove_element = document.getElementById('row-' + String(num_rows));
    var child = element.lastElementChild;
    element.removeChild(child);
  }