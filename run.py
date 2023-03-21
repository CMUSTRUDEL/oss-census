import json
import yaml
from census_interactive.process import (load_commit_stack_line, load_contributor_stack_line, 
    load_contributor_bar, load_contributor_dumbbell, load_contributor_line, 
    load_contributor_percent, load_contributor_pie, load_contributor_stack,
    load_contributor_women_bar)

CONTRIBUTOR_STORE_PATH = './census_interactive/data/processed/contributor/'
COMMIT_STORE_PATH = './census_interactive/data/processed/commit/'
CONTRIBUTOR_RETRIEVE_PATH = './census_interactive/data/raw/final_gender_contrib/'
COMMIT_RETRIEVE_PATH = './census_interactive/data/raw/final_gender_commit/'

# Launch visualizations
def main():
    ################ SETTINGS ################
    with open ("config.yaml", 'r') as stream:
        config = yaml.safe_load(stream)
    langs = [] if config["languages"] is None else config["languages"]
    # Alphabetize langs list
    langs.sort()
    ##########################################


    ## Comparison Graph Data

    data = dict()
    # Contributor 
    data["Contributor"] = dict()
    for lang in langs:
        dat_path = CONTRIBUTOR_RETRIEVE_PATH+lang+'.csv'

        ## Stack Line graphs ##
        load_contributor_stack_line(lang, dat_path, CONTRIBUTOR_STORE_PATH)

        # Save graph data to overall JSON data
        with open(CONTRIBUTOR_STORE_PATH+lang+'.json') as json_file:
            add_data = json.load(json_file)
            data["Contributor"][lang] = add_data

        ## Line graphs ##
        load_contributor_women_bar(lang, dat_path, CONTRIBUTOR_STORE_PATH)

        # Save graph data to overall JSON data
        with open(CONTRIBUTOR_STORE_PATH+lang+'_women-bar.json') as json_file:
            add_data = json.load(json_file)
            data["Contributor"][lang+'_women-bar'] = add_data

        ## Women-only Bar graphs ##
        load_contributor_line(lang, dat_path, CONTRIBUTOR_STORE_PATH)

        # Save graph data to overall JSON data
        with open(CONTRIBUTOR_STORE_PATH+lang+'_line.json') as json_file:
            add_data = json.load(json_file)
            data["Contributor"][lang+'_line'] = add_data

    # Commits
    data["Commit"] = dict()
    for lang in langs:  
        dat_path = COMMIT_RETRIEVE_PATH+lang+'.csv'
        load_commit_stack_line(lang, dat_path, COMMIT_STORE_PATH)

        # Save graph data to overall JSON data
        with open(COMMIT_STORE_PATH+lang+'.json') as json_file:
            add_data = json.load(json_file)
            data["Commit"][lang] = add_data


    ## Single Contributor Graph Data 

    ########################## SINGLE GRAPH SETTINGS ###########################
    # Single graph x axis options, syntax YEAR#
    year_opts = [] if config["years"] is None else config["years"]
    ############################################################################
    
    ## Pie Graph ##
    
    data_pie = dict()   

    # Focus on Contributor for bar graphs
    data_pie["Contributor"] = dict()
    for year_opt in year_opts:
        # Updates processed JSON file
        load_contributor_pie( CONTRIBUTOR_RETRIEVE_PATH, CONTRIBUTOR_STORE_PATH, 
                            langs, year_opt)
        # Save graph data to overall JSON data
        with open(CONTRIBUTOR_STORE_PATH+'all_pie'+'.json') as json_file:
            add_data = json.load(json_file)
        data_pie["Contributor"][year_opt] = add_data

    data_pie["Commit"] = dict()
    for year_opt in year_opts:
        # Updates processed JSON file
        load_contributor_pie( COMMIT_RETRIEVE_PATH, COMMIT_STORE_PATH, 
                            langs, year_opt)
        # Save graph data to overall JSON data
        with open(COMMIT_STORE_PATH+'all_pie'+'.json') as json_file:
            add_data = json.load(json_file)
        data_pie["Commit"][year_opt] = add_data
    ## Bar Graph ##

    data_bar = dict()  

    # Focus on Contributor for bar graphs
    data_bar["Contributor"] = dict()
    # Updates processed JSON file
    load_contributor_bar( CONTRIBUTOR_RETRIEVE_PATH, CONTRIBUTOR_STORE_PATH, langs)
    # Save graph data to overall JSON data
    with open(CONTRIBUTOR_STORE_PATH+'all_bar'+'.json') as json_file:
        add_data = json.load(json_file)
    data_bar["Contributor"]['male_female'] = add_data


    ## Stacked Area Graph ##

    data_stack = dict()   
    
    # Focus on Contributor for bar graphs
    data_stack["Contributor"] = dict()
    # Updates processed JSON file
    load_contributor_stack( CONTRIBUTOR_RETRIEVE_PATH, CONTRIBUTOR_STORE_PATH, langs)
    # Save graph data to overall JSON data
    with open(CONTRIBUTOR_STORE_PATH+'all_stack'+'.json') as json_file:
        add_data = json.load(json_file)
    data_stack["Contributor"] = add_data


    ## Percent Area Graph ##

    data_percent = dict()   
    
    # Focus on Contributor for bar graphs
    data_percent["Contributor"] = dict()
    # Updates processed JSON file
    load_contributor_percent( CONTRIBUTOR_RETRIEVE_PATH, CONTRIBUTOR_STORE_PATH)
    # Save graph data to overall JSON data
    with open(CONTRIBUTOR_STORE_PATH+'all_percent'+'.json') as json_file:
        add_data = json.load(json_file)
    data_percent["Contributor"] = add_data


    ## Dumbbell Graph ##

    data_dumbbell = dict()   
    
    # Focus on Contributor for bar graphs
    data_dumbbell["Contributor"] = dict()
    # Updates processed JSON file
    load_contributor_dumbbell(CONTRIBUTOR_RETRIEVE_PATH, CONTRIBUTOR_STORE_PATH, langs)
    # Save graph data to overall JSON data
    with open(CONTRIBUTOR_STORE_PATH+'all_dumbbell'+'.json') as json_file:
        add_data = json.load(json_file)
    data_dumbbell["Contributor"] = add_data


    ## Combine all JSON to one dictionary in js/

    with open('./public/js/data.js', 'w', encoding="utf-8") as out_file:
        out_file.write(f'var data = {json.dumps(data,indent=4, sort_keys=True)};')
        out_file.write(f'var data_pie = {json.dumps(data_pie,indent=4, sort_keys=True)};')
        out_file.write(f'var data_bar = {json.dumps(data_bar,indent=4, sort_keys=True)};')
        out_file.write(f'var data_stack = {json.dumps(data_stack,indent=4, sort_keys=True)};')
        out_file.write(f'var data_percent = {json.dumps(data_percent,indent=4, sort_keys=True)};')
        out_file.write(f'var data_dumbbell = {json.dumps(data_dumbbell,indent=4, sort_keys=True)};')
if __name__== "__main__" :
    main()    