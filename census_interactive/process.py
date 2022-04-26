
import math
import os, webbrowser
import numpy as np
import pandas as pd
import json


def load_contributor_pie(lang, dat_path, store_path, compare_opt, year_opt):
    """
    :string lang: programming language
    :string dat_path: CSV pandas data
    :string store_path: path to Contributor graph settings
    :string compare_opt: "male" or "all" gender(s) that is compared against data for females
    :string year_opt: "single" or "all" years considered. Taking in a value of single will
                         automatically select most recent year
    :return: None
    """ 
    lang = lang.lower()
    dat = pd.read_csv(dat_path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]

    if year_opt == "single":
        # Single year
        female_total = list(dat["female_" + lang])[-1]
        male_total = list(dat["male_" + lang])[-1]
        all_total = list(dat["all_" + lang])[-1]
    else: 
        # Combine all year data
        female_total = sum(list(dat["female_" + lang]))
        male_total = sum(list(dat["male_" + lang]))
        all_total = sum(list(dat["all_" + lang]))

    # Set num_comparison to value of data for "all" if compared against female data
    if compare_opt == "all":
        num_comparison = all_total
    else:
        num_comparison = male_total
    num_contributors = female_total + num_comparison

    # Format column data of contributors by gender
    female_data = {}
    female_data["name"] = "Female"
    # Take most recent year of contributors at index -1
    female_data["y"] = 100 * (female_total / num_contributors)
    
    compare_data = {}
    compare_data["name"] = compare_opt.capitalize()
    # Take most recent year of contributors at index -1
    compare_data["y"] = 100 * (num_comparison / num_contributors)
    
    out_dict = {"data": [] }
    out_dict["data"].append(female_data)
    out_dict["data"].append(compare_data)
    
    # Set Title
    out_dict["title"] = "Female vs. " + compare_opt.capitalize() + " for " + lang.capitalize()

    if year_opt == "single":
        # Select most recent year
        year = dat["win"].iloc[-1]
        out_dict["subtitle"] = _format_date(year)
    else:
        # Select All Years in range
        start_date = _format_date(dat["win"].iloc[0])
        end_date = _format_date(dat["win"].iloc[-1])
        out_dict["subtitle"] = start_date + " to " + end_date

    with open(store_path + '/' + lang + '.json', 'w') as out_file:
        json.dump(out_dict, out_file)


def _format_date(year):
    # Format year and month of dataframe value "{}-{}".format(year,month)

    time = 3 * year
    year = 2008 + math.floor(time/12)
    month = time - math.floor(time/12)*12
    if not month:
        month = 12

    return "{}-{}".format(year,month)