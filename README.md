### OSS Census Visualizations ###

# Customize Visualizations
Highcharts graph JavaScript can be found in *js/visualizations/* for each graph. You can modify the JS to customize each graph. 

All Highchart Imports are linked at the top of each HTML file. 

In each JS file, you'll see that a JS object `obj` is accessed like the following:
```
obj.title
```
That variable is set based on our functions in `parse.js`. The variable's attributes must be updated to different fields in `data.js` based on the graph.
```
var obj = data["Commit"]["All"]
```
The `data` variable is located in `js/data.js`. This JS file's data is shared by `<script>` tags in our .html files. `data` stores information in JSON format (like a Python dictionary), where nested fields store array data for each graphs. 

To see how we modify data stored in this variable, read in the next section "Update Data" and check out `js/data.js` file.


# Update Data
**census_interactive/data/raw** stores CSV data uploaded from our server. Feel free to update these CSV files if there is more update-to-date data.

**census_interactive/data/processed** stores JSON data of each graph's CSV. It's formatted into specific fields via scripts from process.py and these fields are accessed in each graph's script.js file.

**census_interactive/process.py** module contains functions named *load_CATEGORY* to format data from *data/raw*. Each function creates appropriate axis labels, an array (used for plotting line graphs), etc. using this data to store data as JSON in *data/processed*. All functions are called in the `run.py` script and then compiled into `data.js` for our HTML files to access.

1. Ensure proper setup by ensuring all imports are installed
```
python -m pip install -r requirements.txt
```
2. Specify languages and single graph comparison options in `config.yaml`
3. Execute `run.py` script
```
python run.py
```

Executing the `run.py` script invokes calls to the process.py functions for specified graphs in config.yaml, formatting the data into nested fields (dictionary format) per language, per graph type. The script finally updates the `data` variable in `js/data.js` with an aggregation of all the JSON files in *data/processed*, .

# Update HTML

**INSERT how HTML pages connect and interact**


# Everything Else
**css/** contains style code used in HTML pages. default.css is used for index.html (home) and subpage.css used for remaining pages.

**.html** pages can be tested locally best via localhost through Python command
```
python -m http.server
```
**js/*.js** defines various files to handle `onclick` and `onchange` event functions for updating, adding, and deleting data. Logic for handling changes in user input are also implemented here. Variable data is stored via localStorage.

**js/parse.js** defines the JSON storage structure and a function to access each graph's data given a category and language.

**js/single_graphs.js** and **js/comparison_graphs.js** call JS functions defined in js/visualizations/GRAPHNAME.js to parse each chart data and generate chart. comparison_graphs.js also contains handlers to display multiple graphs on comparison page.

**config.yaml** lists all data that would like to be processed. If only specific ecosystem's (or "language's") CSV files are updated for example, we may not want to wait for everything to update. The following are the maximum options that can be applied:
```
languages:
- Atom
- Bower
- Cargo
- Clojars
- CocoaPods
- CPAN
- CRAN
- Go
- Hackage
- Hex
- Maven
- Meteor
- NPM
- NuGet
- Packagist
- PlatformIO
- Pub
- Puppet
- Pypi
- Rubygems
- All
years:
- 2008
- 2009
- 2010
- 2011
- 2012
- 2013
- 2014
- 2015
- 2016
- 2017
- 2018
- 2019
```

