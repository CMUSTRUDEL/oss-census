### OSS Census Visualizations ###
**See the *gh/pages* branch for website code**

# Customize Visualizations
Highcharts graph JavaScript can be found in *census_interactive/graphs/* for each graph. Results page graphs are each represented by a folder named *FIGURENUMBER_CATEGORY*. For comparison graphs on the Graph Page, folders are named *Graph_CATEGORY*. You can modify the JS to customize each graph. 

All Highchart Imports are linked at the top of each HTML file. 

Each `script.js` file also has a `data` variable accessed as something like this:
```
var obj = data["Commit"]["All"]
```
The `data` variable is located in `js/data.js`. This JS file's data is shared by `<script>` tags in our graph.html file with our `script.js` files. `data` stores information in JSON format (like a Python dictionary), where nested fields store array data for each graphs. 

To see how we modify the data stored in this variable, read more in the next section "Update Data" and check out the `js/data.js` file.


# Update Data
**data/raw** stores CSV data uploaded from our server. Feel free to update these CSV files if there is more update-to-date data.

**data/processed** stores JSON data of each graph's CSV. It's formatted into specific fields via scripts from process.py and these fields are accessed in each graph's script.js file.

**census_interactive/process.py** module contains functions named *load_CATEGORY* to format data from *data/raw*. Each function creates appropriate axis labels, an array (used for plotting line graphs), etc. using this data to store data as JSON in *data/processed*

1. Specify languages in config.yaml
2. Execute `run.py` script
```
python run.py
```

Executing the `run.py` script invokes calls to the process.py functions for specified graphs in config.yaml. It then updates the `data` variable in `js/data.js` with an aggregation of all the JSON files in *data/processed*.


# Everything Else
**js/graphs** defines `onclick` and `onchange` event functions for updating, adding, and deleting data. Variable data is stored via localStorage.

**js/parse** defines the JSON storage structure and a function to access each graph's data given a category and language.