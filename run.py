import math
import numpy as np
import pandas as pd
import webbrowser, os
import yaml
from census_interactive.process import *
import json

# Launch visualizations
def main():
    ################ SETTINGS ################
    with open ("config.yaml", 'r') as stream:
        config = yaml.safe_load(stream)
    langs = [] if config["languages"] is None else config["languages"]
    ##########################################

    data = dict()    
    # Focus on Contributor for pie graphs
    data["Contributor"] = dict()

    
    for lang in langs:
        dat_path = './census_interactive/data/raw/contributor_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/processed/contributor'
            
        # All Years
        year_option = "all"
        all_years = dict()
        for compare_option in ["all", "male"]:
            load_contributor_pie(lang, dat_path, store_path, compare_option, year_option)

            # Save graph data to overall JSON data
            with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
                add_data = json.load(json_file)
                all_years[lang] = add_data
            data["Contributor"]["All Years"] = single_year
        
        # Single Year
        year_option = "single"
        single_year = dict()
        for compare_option in ["all", "male"]:
            load_contributor_pie(lang, dat_path, store_path, compare_option, year_option)

            # Save graph data to overall JSON data
            with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
                add_data = json.load(json_file)
                all_years[lang] = add_data
            data["Contributor"]["Single Year"] = single_year
        
    # Combine all JSON to one dictionary in js/
    with open('./census_interactive/single_graphs/Pie_Contributor_All/script/data.js', 'w') as out_file:
        out_file.write('var data = %s;' % json.dumps(data,indent=4, sort_keys=True))


if __name__== "__main__" :
    main()    