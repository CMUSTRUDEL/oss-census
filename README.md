### OSS Census Visualizations ###

# Customize Visualizations
Highchart JS can be found in census_interactive/graphs/ labeled as either FIGURE#_GRAPH for 'Results' page graphs or GRAPH for the 'Graph' page.


# Update Data
CSV files formatted using scripts in the process.py module in census_interactive/

1. Specify languages in config.yaml
2. Execute script to call functions from process.py module
```
python run.py
```

Processed JS variables are stored in census_interactive/data/

*Note: CSV data uploaded from server to raw_data/ 