
import math
import os, webbrowser
import numpy as np
import pandas as pd
import json


def load_contributor_pie(lang, dat_path, store_path):
    """
    :string lang: programming language
    :string dat_path: CSV pandas data
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    lang = lang.lower()
    dat = pd.read_csv(dat_path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    num_contributors = list(dat["female_" + lang])[-1] + list(dat["male_"+lang])[-1]

    # Format column data of contributors by gender
    female = {}
    female["name"] = "Female"
    # Take most recent year of contributors at index -1
    female["y"] = 100 * (list(dat["female_" + lang])[-1] / num_contributors)
    
    male = {}
    male["name"] = "Male"
    # Take most recent year of contributors at index -1
    male["y"] = 100 * (list(dat["male_" + lang])[-1] / num_contributors)
    
    out_dict = {"data": [] }
    out_dict["data"].append(female)
    out_dict["data"].append(male)
    
    # Set Title
    out_dict["title"] = "Male vs female for " + lang.capitalize()

    # Set Subtitle to (Last) Year in Plot
    time = 3 * dat["win"].iloc[-1]
    year = 2008 + math.floor(time/12)
    month = time - math.floor(time/12)*12
    if not month:
        month = 12
    out_dict["subtitle"] = "{}-{}".format(year,month)

    with open(store_path + '/' + lang + '.json', 'w') as out_file:
        json.dump(out_dict, out_file)