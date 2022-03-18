import math
import numpy as np
import pandas as pd
import webbrowser, os
import yaml
from census_interactive.process import *

# Launch visualizations
def main():
    ################ SETTINGS ################
    with open ("config.yaml", 'r') as stream:
        config = yaml.safe_load(stream)
    langs = [] if config["languages"] is None else config["languages"]
    ##########################################

    # Contributor 
    for lang in langs:
        dat_path = './raw_data/contributor_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/contributor/'
        load_contributor(lang, dat_path, store_path)

    # Commits
    for lang in langs:  
        dat_path = './raw_data/commits_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/commit/'
        load_commit(lang, dat_path, store_path)

    # Project 
    for lang in langs:
        dat_path = './raw_data/final_proj_by_win/full.csv'
        store_path = './census_interactive/data/project/'
        load_project(lang, dat_path, store_path)

if __name__== "__main__" :
    main()
    