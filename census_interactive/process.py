
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
        female_total = list(dat["female_all"])[-1]
        male_total = list(dat["male_all"])[-1]
        all_total = list(dat["all_all"])[-1]
    else: 
        # Combine all year data
        female_total = sum(list(dat["female_all"]))
        male_total = sum(list(dat["male_all"]))
        all_total = sum(list(dat["all_all"]))

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


def load_project(lang, dat_path, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    All active project count by window: './project/'

    :string lang: programming language
    :string dat_path: CSV data path
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    dat = pd.read_csv(dat_path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]

    # Format column data of contributors by gender
    all = {}
    all["name"] = "All"
    all["type"] = "column"
    all["data"] = list(dat[lang+"_all"] / 1000)
    all["color"] = "#f29d4b"

    has_female = {}
    has_female["name"] = "Has female"
    has_female["type"] = "column"
    has_female["data"] = list(dat[lang+"_fem"] / 1000)
    has_female["color"] = "#de2d26"

    
    # Plot ratio line for female in all commits
    ratio = dat[lang+"_fem"] / dat[lang+"_all"]
    for win in dat["win"]:
        win = win - 1
        if dat[lang+"_all"][win] <= 5:
            ratio[win] = 0

    # Format line data of contributors
    ratio_female = {}
    ratio_female["name"] = "Female ratio"
    ratio_female["type"] = "spline"
    ratio_female["data"] = list(ratio)
    ratio_female["color"] = "darkblue"
    ratio_female["yAxis"] = 1
    ratio_female["marker"] = { 
        "fillColor": '#FFFFFF',
        "radius": 5,
        "lineWidth": 2,
        "lineColor": 'darkblue'
    } 


    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        x.append(_format_date(win))
    wins = x

    # Graph setup information
    lang_title = lang

    title = "Active Public Projects in "+ lang_title +" Ecosystem" 
    label_x = 'Time (quarter)'
    label_y = 'Active Public Project Numbers (thousand)'
    label_y_secondary = "Female Participated Project Ratio"
    x_categories = wins
    height_ratio = (9 / 13 * 100) # 16:9 ratio
    data = [all, has_female, ratio_female]
    
    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['label_x'] = label_x 
    out_dict['label_y'] = label_y
    out_dict['label_y_secondary'] = label_y_secondary
    out_dict['x_categories'] = x_categories
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
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