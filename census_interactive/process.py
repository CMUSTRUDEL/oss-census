
import math
import os, webbrowser
import numpy as np
import pandas as pd


def load_contributor(lang, dat, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    All active contributor by gender by window: './contributor/all/'
    Core active contributor by gender by window: './contributor/core/'

    :string lang: programming language
    :dict dat: CSV data
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    max_win = 45
    dat = dat[dat['win']<=max_win]

    # Format column data of contributors by gender
    all_female = {}
    all_female["name"] = "All female"
    all_female["type"] = "column"
    all_female["data"] = list(dat["female_all"] / 1000)
    all_female["color"] = "#de2d26"

    all_male = {}
    all_male["name"] = "All male"
    all_male["type"] = "column"
    all_male["data"] = list((dat["female_all"] + dat["male_all"]) / 1000)
    all_male["color"] = "#f29d4b"

    all_unknown = {}
    all_unknown["name"] = "All unknown"
    all_unknown["type"] = "column"
    all_unknown["data"] = list(dat["all_all"] / 1000)
    all_unknown["color"] = "blanchedalmond"

    # Plot ratio line for female in all contributor
    male = dat["male_all"].replace(0, 1)
    ratio_all = dat["female_all"] / (dat["female_all"] + male)
    for win in dat["win"]:
        win = win - 1
        if dat["female_all"][win] + male[win] <= 5:
            ratio_all[win] = 0

    # Plot ratio line for female in core contributor
    male = dat["male_core"].replace(0, 1)
    ratio_core = dat["female_core"] / (dat["female_core"] + male)
    for win in dat["win"]:
        win = win - 1
        if dat["female_core"][win] + male[win] <= 10:
            ratio_core[win] = 0

    # Format line data of contributors
    among_all = {}
    among_all["name"] = "Among all"
    among_all["type"] = "spline"
    among_all["data"] = list(ratio_all)
    among_all["color"] = "darkblue"
    among_all["yAxis"] = 1
    
    among_core = {}
    among_core["name"] = "Among core"
    among_core["type"] = "spline"
    among_core["data"] = list(ratio_core)
    among_core["color"] = "darkblue"
    among_core["yAxis"] = 1
    among_core["marker"] = { 
        "fillColor": '#FFFFFF',
        "radius": 5,
        "lineWidth": 2,
        "lineColor": 'darkblue'
    }    


    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            x.append("{}".format(year))
        else:
            x.append("{}-{}".format(year,month))
    wins = x

    # Graph setup information
    lang_title = lang
    if lang == "C#":
        lang_title = "C\#"
    title = "Active Contributors in "  + lang_title + " Public Projects"
    label_x = 'Time (quarter)'
    label_y = 'Number of Contributors (thousand)'
    label_y_secondary = "Female Ratio = F/(F + M)"
    x_categories = wins
    height_ratio = (9 / 16 * 100) # 16:9 ratio
    data = [all_unknown, all_male, all_female, among_all, among_core]
   
    # write data to js file that creates variables referenced in script.js file
    with open(store_path + '/data.js', 'w') as out_file:
        out_file.write('var title = "%s";' % title)
        out_file.write('var label_x = "%s";' % label_x)
        out_file.write('var label_y = "%s";' % label_y)
        out_file.write('var label_y_secondary = "%s";' % label_y_secondary)
        out_file.write('var x_categories = %s;' % x_categories)
        out_file.write('var height_ratio = %s;' % height_ratio)
        out_file.write('var data = %s;' % data)
    webbrowser.open('file://' + os.path.realpath(store_path + '/index.html'))


    

def load_commit(lang, dat, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    Commit count by gender by window: './commit/graph'

    :string lang: programming language
    :dict dat: CSV data
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    max_win = 45
    dat = dat[dat['win']<=max_win]
    
    # Format column data of contributors by gender
    all_female = {}
    all_female["name"] = "All female"
    all_female["type"] = "column"
    all_female["data"] = list(dat["female_commit"] / 1000)
    all_female["color"] = "#de2d26"

    all_male = {}
    all_male["name"] = "All male"
    all_male["type"] = "column"
    all_male["data"] = list((dat["female_commit"] + dat["male_commit"]) / 1000)
    all_male["color"] = "#f29d4b"

    all_unknown = {}
    all_unknown["name"] = "All unknown"
    all_unknown["type"] = "column"
    all_unknown["data"] = list(dat["all_commit"] / 1000)
    all_unknown["color"] = "blanchedalmond"

    # Plot ratio line for female in all commits
    male = dat["male_commit"].replace(0, 1)
    ratio = dat["female_commit"] / (dat["female_commit"] + male)
    for win in dat["win"]:
        win = win - 1
        if dat["female_commit"][win] + male[win] <= 1000:
           ratio[win] = 0
           
    # Format line data of contributors
    ratio_female = {}
    ratio_female["name"] = "Among core"
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
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            x.append("{}".format(year))
        else:
            x.append("{}-{}".format(year,month))
    wins = x

    # Graph setup information
    lang_title = lang
    if lang == "C#":
        lang_title = "C\#"
    title = "Commits in "+ lang_title +" Public Projects" 
    label_x = 'Time (quarter)'
    label_y = 'Commit Numbers (thousand)'
    label_y_secondary = "Female Commit Ratio = F/(F + M)"
    x_categories = wins
    height_ratio = (9 / 16 * 100) # 16:9 ratio
    data = [all_unknown, all_male, all_female, ratio_female]
    
    # write data to js file that creates variables referenced in script.js file
    with open(store_path + '/data.js', 'w') as out_file:
        out_file.write('var title = "%s";' % title)
        out_file.write('var label_x = "%s";' % label_x)
        out_file.write('var label_y = "%s";' % label_y)
        out_file.write('var label_y_secondary = "%s";' % label_y_secondary)
        out_file.write('var x_categories = %s;' % x_categories)
        out_file.write('var height_ratio = %s;' % height_ratio)
        out_file.write('var data = %s;' % data)
    webbrowser.open('file://' + os.path.realpath(store_path + '/index.html'))



def load_project(lang, dat, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    All active project count by window: './project/'

    :string lang: programming language
    :dict dat: CSV data
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
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
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            x.append("{}".format(year))
        else:
            x.append("{}-{}".format(year,month))
    wins = x

    # Graph setup information
    lang_title = lang
    if lang == "C#":
        lang_title = "C\#"
    title = "Active Public Projects in "+ lang_title +" Ecosystem" 
    label_x = 'Time (quarter)'
    label_y = 'Active Public Project Numbers (thousand)'
    label_y_secondary = "Female Participated Project Ratio"
    x_categories = wins
    height_ratio = (9 / 16 * 100) # 16:9 ratio
    data = [all, has_female, ratio_female]
    
    # write data to js file that creates variables referenced in script.js file
    with open(store_path + '/data.js', 'w') as out_file:
        out_file.write('var title = "%s";' % title)
        out_file.write('var label_x = "%s";' % label_x)
        out_file.write('var label_y = "%s";' % label_y)
        out_file.write('var label_y_secondary = "%s";' % label_y_secondary)
        out_file.write('var x_categories = %s;' % x_categories)
        out_file.write('var height_ratio = %s;' % height_ratio)
        out_file.write('var data = %s;' % data)
    webbrowser.open('file://' + os.path.realpath(store_path + '/index.html'))