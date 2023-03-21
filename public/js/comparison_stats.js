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

function updateLang1() {
    var selectLanguage = document.getElementById('language-1');
    localStorage.setItem("language-1", selectLanguage.options[selectLanguage.selectedIndex].value);
    updateContributorGraph();
    updateCommitGraph();

}

function updateLang2() {
    var selectLanguage = document.getElementById('language-2');
    localStorage.setItem("language-2", selectLanguage.options[selectLanguage.selectedIndex].value);
    updateContributorGraph();
    updateCommitGraph();

}


function updateStats() {
    
    var selectYear = document.getElementById('year-select');
    var contributorNum = document.getElementById('contributor-num');
    var contributorPer = document.getElementById('contributor-percent');
    var commitNum = document.getElementById('commit-num');
    var commitPer = document.getElementById('commit-percent');

    var selectedLanguage = localStorage.getItem("language-1");
    console.log("language " + selectedLanguage);
    var selectedYear = selectYear.options[selectYear.selectedIndex].value;

    const [contributorNumData, contributorPerData] = getStats('Contributor', selectedLanguage, parseInt(selectedYear));
    const [commitNumData, commitPerData] = getStats('Commit', selectedLanguage, parseInt(selectedYear));
    contributorNum.innerHTML = contributorNumData;
    contributorPer.innerHTML = contributorPerData.toFixed(2) + '%';
    commitNum.innerHTML = commitNumData;
    commitPer.innerHTML = commitPerData.toFixed(2) + '%';

}

// wrong graph
function updateContributorGraph() {
    let lang = localStorage.getItem("language-1");
    let cont = document.getElementById("contributor-single");
    let comm = document.getElementById("commit-single");

    parseData("Contributor", lang);
    setDisplay(cont, comm, "show", "none");
    // Reloads graph with updated data vars
    graphContributor("0");
}

function updateCommitGraph() {
    let lang = localStorage.getItem("language-1");
    let cont = document.getElementById("contributor-single");
    let comm = document.getElementById("commit-single");
    parseData("Commit", lang);
    setDisplay(cont, comm, "none", "show");
    // Reloads graph with updated data vars
    graphCommit("0");

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
