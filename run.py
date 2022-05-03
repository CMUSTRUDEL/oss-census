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
    # Single graph x axis options, syntax as COMPAREOPTION_female and YEAROPTION_years
    compare_options = ["all_female", "male_female"]
    year_options = ["all_years", "single_years"]
    ##########################################


    ## Comparison Graph Data

    data = dict()
    # Contributor 
    data["Contributor"] = dict()
    for lang in langs:
        dat_path = './census_interactive/data/raw/contributor_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/processed/contributor'
        load_contributor(lang, dat_path, store_path)

        # Save graph data to overall JSON data
        with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
            add_data = json.load(json_file)
            data["Contributor"][lang] = add_data

    # Commits
    data["Commit"] = dict()
    for lang in langs:  
        dat_path = './census_interactive/data/raw/commits_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/processed/commit'
        load_commit(lang, dat_path, store_path)

        # Save graph data to overall JSON data
        with open('./census_interactive/data/processed/commit/'+lang+'.json') as json_file:
            add_data = json.load(json_file)
            data["Commit"][lang] = add_data


    # Project 
    data["Project"] = dict()
    for lang in langs:
        dat_path = './census_interactive/data/raw/final_proj_by_win/full.csv'
        store_path = './census_interactive/data/processed/project'
        load_project(lang, dat_path, store_path)

        # Save graph data to overall JSON data
        with open('./census_interactive/data/processed/project/'+lang+'.json') as json_file:
            add_data = json.load(json_file)
            data["Project"][lang] = add_data
            


    ## Single Contributor Graph Data 


    ## Pie Graph ##

    store_path = './census_interactive/data/processed/contributor'
    data_pie = dict()   
    
    # Focus on Contributor for pie graphs
    data_pie["Contributor"] = dict()
    for year_option in year_options:
        data_pie["Contributor"][year_option] = dict()
        for lang in langs:
            dat_path = './census_interactive/data/raw/contributor_by_win/'+lang+'.csv'
            data_pie["Contributor"][year_option][lang] = dict()
            for compare_option in compare_options:
                compare_option = compare_option.lower()

                # Updates processed JSON file
                load_contributor_pie(lang, dat_path, store_path, compare_option, year_option)

                # Save graph data to overall JSON data
                with open(store_path+'/'+lang+'.json') as json_file:
                    add_data = json.load(json_file)
                    data_pie["Contributor"][year_option][lang][compare_option] = add_data

    
    ## Bar Graph ##

    store_path = './census_interactive/data/processed/contributor'
    data_bar = dict()   
    
    # Focus on Contributor for pie graphs
    data_bar["Contributor"] = dict()
    dat_path = './census_interactive/data/raw/contributor_by_win/'
    for compare_option in compare_options:
        compare_option = compare_option.lower()

        # Updates processed JSON file
        load_contributor_bar(dat_path, store_path, compare_option)

        # Save graph data to overall JSON data
        with open(store_path+'/'+'all_bar'+'.json') as json_file:
            add_data = json.load(json_file)
            data_bar["Contributor"][compare_option] = add_data


    # Combine all JSON to one dictionary in js/
    with open('./js/data.js', 'w') as out_file:
        out_file.write('var data = %s;' % json.dumps(data,indent=4, sort_keys=True))
        out_file.write('var data_pie = %s;' % json.dumps(data_pie,indent=4, sort_keys=True))
        out_file.write('var data_bar = %s;' % json.dumps(data_bar,indent=4, sort_keys=True))


if __name__== "__main__" :
    main()    