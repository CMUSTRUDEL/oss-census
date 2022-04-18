
import math
import os, webbrowser
import numpy as np
import pandas as pd
import json


# TODO: 1. format the data properly here, update object variables (title, subtitle, data)
#       2. scale for multiple langs

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
    out_dict["title"] = "Male vs female for " + lang
    # TODO: update this year
    out_dict["subtitle"] = "2022"
    with open(store_path + '/' + lang + '.json', 'w') as out_file:
        json.dump(out_dict, out_file)
    