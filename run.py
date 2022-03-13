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
    store_path = "census_interactive/1_Contributor"
    for lang in langs:
        dat_path = './data/contributor_by_win/'+lang+'.csv'
        load_contributor(lang, dat_path, store_path)

    # Commits
    store_path = "census_interactive/2_Commit"
    for lang in langs:
        dat_path = './data/commits_by_win/'+lang+'.csv'
        load_commit(lang, dat_path, store_path)

    # Project store path
    store_path = "census_interactive/3_Project"
    dat_path = './data/final_proj_by_win/full.csv'
    load_project(lang, dat_path, store_path)

if __name__== "__main__" :
    main()
    