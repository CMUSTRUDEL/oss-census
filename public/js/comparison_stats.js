function getStats(cat, ecosystem, year) {
    /* We can get the data from `var data` of data.js
     *  which stores all the raw data.
     * Time is arranged in quarters, from 2008-3 to 2019-3
     *  and we will take the data of year-3 for each year
     */
    const eco_data = data[cat][ecosystem].data;
    const all_men = eco_data.find(e => e.name=="All Men").data;
    const all_women = eco_data.find(e => e.name=="All Women").data;
    const time_index = (year-2008)*4; // 2008 -> 0 -> 2008-3, 2019 -> 44 -> 2019-3
    
    // Note that the numbers are recorded in thousands
    const total = Math.round((all_men[time_index] + all_women[time_index]) * 1000);
    const percentage = (all_women[time_index] * 1000 / total) * 100;
    return [total, percentage];
}

function updateLang(lang_num) {
    const selectLanguageDiv = document.getElementById('language-' + lang_num);
    const selectedLanguage = selectLanguageDiv.options[selectLanguageDiv.selectedIndex].value;
    localStorage.setItem("language-" + lang_num, selectedLanguage);
    updateStats(lang_num);
    updateContributorGraphs(lang_num, selectedLanguage);
}


function updateStats(lang_num) {
    
    var selectYear = document.getElementById('year-select-'+lang_num);
    var contributorNum = document.getElementById('contributor-num-'+lang_num);
    var contributorPer = document.getElementById('contributor-percent-'+lang_num);
    var commitNum = document.getElementById('commit-num-'+lang_num);
    var commitPer = document.getElementById('commit-percent-'+lang_num);

    var selectedLanguage = localStorage.getItem("language-" + lang_num);
    console.log("language: " + selectedLanguage);
    var selectedYear = selectYear.options[selectYear.selectedIndex].value;

    const [contributorNumData, contributorPerData] = getStats('Contributor', selectedLanguage, parseInt(selectedYear));
    const [commitNumData, commitPerData] = getStats('Commit', selectedLanguage, parseInt(selectedYear));
    contributorNum.innerHTML = contributorNumData;
    contributorPer.innerHTML = contributorPerData.toFixed(2) + '%';
    commitNum.innerHTML = commitNumData;
    commitPer.innerHTML = commitPerData.toFixed(2) + '%';

}

// wrong graph
function updateContributorGraphs(lang_num, lang) {
    let line_graph = document.getElementById("contributor-line-"+lang_num);
    let bar_graph = document.getElementById("contributor-bar-"+lang_num);

    // Show graphs
    line_graph.style.display = "block";
    bar_graph.style.display = "block";

    // Add diagrams
    line_graph.innerHTML = `
    % Women Contributors
    <div class="mx-auto w-full">
        <div style="display: show" class="flex-col items-center w-full my-3">                
            <a href="#!" class="hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure" onclick="return false;">
                    <div id="cont-line-${lang}"></div>
                    <!-- JS file link -->
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    </div>
    `;

    // Load data
    parseData("Contributor", `${lang}_line`);
    graphGallery(`line-${lang}`);
    
    bar_graph.innerHTML = `
    # Women Contributors
    <div class="mx-auto w-full">
        <div style="display: show" class="flex-col items-center w-full my-3">                
            <a href="#!" class="hover:opacity-75 my-4 md:w-3/3">
                <figure class="highcharts-figure" onclick="return false;">
                    <div id="cont-women-bar-${lang}"></div>
                    <!-- JS file link -->
                    <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                </figure>
            </a>
        </div>
    </div>
    `;
    
    // Load data
    parseData("Contributor", `${lang}_women-bar`);
    graphGallery(`women-bar-${lang}`);
}




// function updateStats() {
    
//     var selectYear = document.getElementById('year-select');
//     var selectLanguage = document.getElementById('language-select');
//     var targetNum = document.getElementById('contributor-num');
//     var targetPer = document.getElementById('contributor-percent');

//     var selectedLanguage = selectLanguage.options[selectLanguage.selectedIndex].value
//     console.log("language " + selectedLanguage)
//     var selectedYear = selectYear.options[selectYear.selectedIndex].value

//     console.log("hi + " + selectedYear);
//     function isCorrectName(obj) {
//         console.log(obj)
//         // console.log("dog " + data_pie["Contributor"][selectedYear.toString()]["data"]["name"]);
//         // return selectedLanguage == data_pie["Contributor"][selectedYear.toString()]["data"]["name"];
//         console.log(obj["name"])
//         return selectedLanguage == obj["name"];
//     }
//     // targetPer = data_pie["Contributor"][selectedYear.toString()]["data"].filter(isCorrectName)["x"];
//     // targetNum = data_pie["Contributor"][selectedYear.toString()]["data"].filter(isCorrectName)["y"];
//     console.log(data_pie["Contributor"][selectedYear]["data"])
//     targetPer.innerHTML = ((data_pie["Contributor"][selectedYear]["data"]).filter(isCorrectName))[0]["z"];
//     targetNum.innerHTML = ((data_pie["Contributor"][selectedYear]["data"]).filter(isCorrectName))[0]["y"];


//     console.log("targetPer")
//     console.log(targetPer)


// }






// def load_contributor_pie(dat_path, store_path, langs, year_opt):
//     """
//     Polar-chart styled pie chart

//     Stores formatted JavaScript variables for graph from:
//     All active project count by window: './project/'

//     :string dat_path: folder of CSV data path
//     :string store_path: path to Contributor graph settings
//     :string year_opt: Year data is examined for
//     :return: None
//     """ 

//     data = []
//     # Data collection begins in 1/2008
//     year_start = (int(year_opt) - 2008) * 4

//     for lang in langs:
//         # Omit "All" language for polar chart
//         if lang.lower() == "all":
//             continue

//         # Retrieve data from language specific csv
//         dat = _convert_csv_to_df(dat_path+lang+'.csv')
   
//         add_data = {}
//         add_data["name"] = lang.capitalize()
//         # Year index moves in 3 month intervals start in 2008
//         total_women = sum(list(dat["female"+"_all"])[year_start:year_start+4])
//         total = sum(list(dat["all"+"_all"])[year_start:year_start+4])

//         # Width correlates with ecosystem size
//         add_data["y"] = total
//         # Length correlated with % of Women 
//         add_data["z"] = 0 if not total else round((total_women / total * 100), 2)

//         if not data:
//             data.append(add_data)
//         else:
//             # Add length value in order smallest to largest
//             for i, lang_data in enumerate(data):
//                 if lang_data["z"] >= add_data["z"]:
//                     data.insert(i, add_data)
//                     break
//                 elif i == len(data) - 1:
//                     data.append(add_data)
        
    

//     # Graph setup info
//     title = "Contributors by Ecosystem Size and % Women"
//     subtitle = str(year_opt)
    
//     # write data to js file that creates variables referenced in script.js file
//     out_dict = dict()
//     out_dict['title'] = title
//     out_dict['subtitle'] = subtitle
//     out_dict['data'] = data
//     with open(store_path+'all_pie'+'.json', 'w') as out_file:
//         json.dump(out_dict, out_file)

//     # Save data to CSV for additional data analysis 
//     csv_data = pd.DataFrame.from_dict(out_dict['data'])
//     csv_data.to_csv(store_path+'all_pie'+'.csv')
