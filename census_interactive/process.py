
import math
import os, webbrowser
import numpy as np
import pandas as pd
import json


def load_contributor_pie(lang, dat_path, store_path, compare):
    """
    :string lang: programming language
    :string dat_path: CSV pandas data
    :string store_path: path to Contributor graph settings
    :string compare: "male" or "all" gender(s) that is compared against data for females
    :return: None
    """ 
    lang = lang.lower()
    dat = pd.read_csv(dat_path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    # Set num_comparison to value of data for "all" if compared against female data
    if compare == "all":
        num_comparison = list(dat["male_"+lang])[-1] +  list(dat["female_" + lang])[-1] 
    else:
        num_comparison = list(dat["male_"+lang])[-1]
    num_contributors = list(dat["female_" + lang])[-1] + num_comparison

    # Format column data of contributors by gender
    female_data = {}
    female_data["name"] = "Female"
    # Take most recent year of contributors at index -1
    female_data["y"] = 100 * (list(dat["female_" + lang])[-1] / num_contributors)
    
    compare_data = {}
    compare_data["name"] = compare.capitalize()
    # Take most recent year of contributors at index -1
    compare_data["y"] = 100 * (list(dat["male_" + lang])[-1] / num_contributors)
    
    out_dict = {"data": [] }
    out_dict["data"].append(female_data)
    out_dict["data"].append(compare_data)
    
    # Set Title
    out_dict["title"] = "Female vs. " + compare.capitalize() + " for " + lang.capitalize()

    # Set Subtitle to (Last) Year in Plot
    time = 3 * dat["win"].iloc[-1]
    year = 2008 + math.floor(time/12)
    month = time - math.floor(time/12)*12
    if not month:
        month = 12
    out_dict["subtitle"] = "{}-{}".format(year,month)

    with open(store_path + '/' + lang + '.json', 'w') as out_file:
        json.dump(out_dict, out_file)