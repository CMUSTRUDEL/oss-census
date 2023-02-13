
import math
import os, webbrowser
import numpy as np
import pandas as pd
import json



import math
import os, webbrowser
import numpy as np
import pandas as pd
import json

def load_contributor_line(lang, dat_path, store_path):
    dat = _convert_csv_to_df(dat_path)

    # Plot ratio line for female in all contributor
    male = dat["male_all"].replace(0, np.nan)
    # Convert to percent
    ratio_all = round((dat["female_all"] / (dat["female_all"] + dat["male_all"]) * 100), 2)
    for win in dat["win"]:
        win = win - 1
        if dat["female_all"][win] + dat["male_all"][win] == 0 and dat["all_all"][win] > 0:
            ratio_all[win] = 0

    # Plot ratio line for female in core contributor
    male = dat["male_core"].replace(0, np.nan)
    # Convert to percent
    ratio_core = round((dat["female_core"] / (dat["female_core"] + dat["male_core"]) * 100), 2)
    for win in dat["win"]:
        win = win - 1
        if dat["female_core"][win] + dat["male_core"][win] == 0 and dat["all_core"][win] > 0:
            ratio_core[win] = 0

    # Format line data of contributors
    among_all = {}
    among_all["name"] = "Among all"
    among_all["type"] = "spline"
    among_all["data"] = list(ratio_all)
    among_all["color"] = "#2D7665"
    among_all["yAxis"] = 1

    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        x.append(_format_year(win))
    wins = x

    # Graph setup information
    lang_title = lang
    x_categories = wins
    height_ratio = (2 / 3 * 100) # 16:9 ratio
    data = [among_all]
   
    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = ''
    out_dict['label_x'] = '' 
    out_dict['label_y'] = ''
    out_dict['label_y_secondary'] = ''
    out_dict['x_categories'] = x_categories
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path + '/' + lang + '_line.json', 'w') as out_file:
        json.dump(out_dict, out_file)



def load_contributor_women_bar(lang, dat_path, store_path):
    dat = _convert_csv_to_df(dat_path)

    # Format column data of contributors by gender
    all_female = {}
    all_female["name"] = "Women"
    all_female["type"] = "column"
    all_female["data"] = list(dat["female_all"])
    all_female["color"] = "#f29d4b"
    all_female["yAxis"] = 1

    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        x.append(_format_year(win))
    wins = x

    # Graph setup information
    lang_title = lang
    x_categories = wins
    height_ratio = (2 / 3 * 100) # 16:9 ratio
    data = [all_female]
   
    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = ''
    out_dict['label_x'] = '' 
    out_dict['label_y'] = ''
    out_dict['label_y_secondary'] = ''
    out_dict['x_categories'] = x_categories
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path + '/' + lang + '_women-bar.json', 'w') as out_file:
        json.dump(out_dict, out_file)



def load_contributor_stack_line(lang, dat_path, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    All active contributor by gender by window: './contributor/all/'
    Core active contributor by gender by window: './contributor/core/'

    :string lang: programming language
    :string dat_path: CSV data file path
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    dat = _convert_csv_to_df(dat_path)

    # Format column data of contributors by gender
    all_female = {}
    all_female["name"] = "All Women"
    all_female["type"] = "column"
    all_female["data"] = list(dat["female_all"] / 1000)
    all_female["color"] = "#de2d26"

    all_male = {}
    all_male["name"] = "All Men"
    all_male["type"] = "column"
    all_male["data"] = list((dat["female_all"] + dat["male_all"]) / 1000)
    all_male["color"] = "#f29d4b"

    all_unknown = {}
    all_unknown["name"] = "All Unknown"
    all_unknown["type"] = "column"
    all_unknown["data"] = list(dat["all_all"] / 1000)
    all_unknown["color"] = "blanchedalmond"

    # Plot ratio line for female in all contributor
    male = dat["male_all"].replace(0, 1)
    # Convert to percent
    ratio_all = round((dat["female_all"] / (dat["female_all"] + male) * 100), 2)
    for win in dat["win"]:
        win = win - 1
        if dat["female_all"][win] + male[win] <= 5:
            ratio_all[win] = 0

    # Plot ratio line for female in core contributor
    male = dat["male_core"].replace(0, 1)
    # Convert to percent
    ratio_core = round((dat["female_core"] / (dat["female_core"] + male) * 100), 2)
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
        x.append(_format_date(win))
    wins = x

    # Graph setup information
    lang_title = lang
    title = "Active Contributors in "  + lang_title + " Public Projects"
    label_x = 'Time (quarter)'
    label_y = 'Number of Contributors (thousand)'
    label_y_secondary = "% Women (of total m + w)"
    x_categories = wins
    height_ratio = (9 / 13 * 100) # 16:9 ratio
    data = [all_unknown, all_male, all_female, among_all, among_core]
   
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

    

def load_commit_stack_line(lang, dat_path, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    Commit count by gender by window: './commit/graph'

    :string lang: programming language
    :string dat_path: CSV data file path
    :string store_path: path to Contributor graph settings
    :return: None
    """ 
    dat = _convert_csv_to_df(dat_path)
    
    # Format column data of contributors by gender
    all_female = {}
    all_female["name"] = "All Women"
    all_female["type"] = "column"
    all_female["data"] = list(dat["female_commit"] / 1000)
    all_female["color"] = "#de2d26"

    all_male = {}
    all_male["name"] = "All Men"
    all_male["type"] = "column"
    all_male["data"] = list((dat["female_commit"] + dat["male_commit"]) / 1000)
    all_male["color"] = "#f29d4b"

    all_unknown = {}
    all_unknown["name"] = "All Unknown"
    all_unknown["type"] = "column"
    all_unknown["data"] = list(dat["all_commit"] / 1000)
    all_unknown["color"] = "blanchedalmond"

    # Plot ratio line for female in all commits
    male = dat["male_commit"].replace(0, 1)
    ratio = round((dat["female_commit"] / (dat["female_commit"] + male) * 100), 2)
    for win in dat["win"]:
        win = win - 1
        if dat["female_commit"][win] + male[win] <= 1000:
           ratio[win] = 0
           
    # Format line data of contributors
    among_core = {}
    among_core["name"] = "Among core"
    among_core["type"] = "spline"
    among_core["data"] = list(ratio)
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
        x.append(_format_date(win))
    wins = x

    # Graph setup information
    lang_title = lang

    title = "Commits in "+ lang_title +" Public Projects" 
    label_x = 'Time (quarter)'
    label_y = 'Commit Numbers (thousand)'
    label_y_secondary = "Women Commit Ratio = F/(F + M)"
    x_categories = wins
    height_ratio = (9 / 13 * 100) # 16:9 ratio
    data = [all_unknown, all_male, all_female, among_core]
    
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


## Single Graph functions ##

def load_contributor_bar(dat_path, store_path, langs):
    """
    Stores formatted JavaScript variables for graph from:
    All active project count by window: './project/'

    :string dat_path: folder of CSV data path
    :string store_path: path to Contributor graph settings
    :list langs: alphabetized list of languages used
    :return: None
    """ 

    data = []
    
    colors = ["#f29d4b", "#de2d26"]
    for compare in ['female', 'male']:
        add_data = dict()
        # Change male or female to men or women
        if compare == 'male':
            add_data["name"] = 'Men'
        elif compare == 'female':
            add_data["name"] = 'Women'
        else:
            add_data["name"] = 'All'
        add_data["type"] = "column" 
        add_data["color"] = colors.pop()
        add_data["data"] = []

        # Combine all year data
        for lang in langs:
            dat = _convert_csv_to_df(dat_path+lang+'.csv')
            total = sum(list(dat[compare+"_all"]))
            add_data["data"].append(total)

        data.append(add_data)
        
    # Retrieve time range
    start_date = _format_date(dat["win"].iloc[0])
    end_date = _format_date(dat["win"].iloc[-1])
    date_range = start_date + " - " + end_date

    # Graph setup information

    title = "Active Contributors All Languages "+date_range
    label_x = 'Languages'
    label_y = 'Total Number of Contributors'
    height_ratio = (6 / 13 * 100) # 16:9 ratio
    
    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['label_x'] = label_x 
    out_dict['label_y'] = label_y
    out_dict['x_categories'] = langs
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path+'all_bar'+'.json', 'w') as out_file:
        json.dump(out_dict, out_file)

    # Save data to CSV for additional data analysis 
    csv_data = pd.DataFrame.from_dict(out_dict['data']).explode('data')
    csv_data.to_csv(store_path+'all_bar'+'.csv')



def load_contributor_pie(dat_path, store_path, langs, year_opt):
    """
    Polar-chart styled pie chart

    Stores formatted JavaScript variables for graph from:
    All active project count by window: './project/'

    :string dat_path: folder of CSV data path
    :string store_path: path to Contributor graph settings
    :string year_opt: Year data is examined for
    :return: None
    """ 

    data = []
    # Data collection begins in 1/2008
    year_start = (int(year_opt) - 2008) * 4

    for lang in langs:
        # Omit "All" language for polar chart
        if lang.lower() == "all":
            continue

        # Retrieve data from language specific csv
        dat = _convert_csv_to_df(dat_path+lang+'.csv')
   
        add_data = {}
        add_data["name"] = lang.capitalize()
        # Year index moves in 3 month intervals start in 2008
        total_women = sum(list(dat["female"+"_all"])[year_start:year_start+4])
        total = sum(list(dat["all"+"_all"])[year_start:year_start+4])

        # Width correlates with ecosystem size
        add_data["y"] = total
        # Length correlated with % of Women 
        add_data["z"] = 0 if not total else round((total_women / total * 100), 2)

        if not data:
            data.append(add_data)
        else:
            # Add length value in order smallest to largest
            for i, lang_data in enumerate(data):
                if lang_data["z"] >= add_data["z"]:
                    data.insert(i, add_data)
                    break
                elif i == len(data) - 1:
                    data.append(add_data)
        
    

    # Graph setup info
    title = "Contributors by Ecosystem Size and % Women"
    subtitle = str(year_opt)
    
    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['subtitle'] = subtitle
    out_dict['data'] = data
    with open(store_path+'all_pie'+'.json', 'w') as out_file:
        json.dump(out_dict, out_file)

    # Save data to CSV for additional data analysis 
    csv_data = pd.DataFrame.from_dict(out_dict['data'])
    csv_data.to_csv(store_path+'all_pie'+'.csv')


def load_contributor_stack(dat_path, store_path, langs):
    """
    Stores formatted JavaScript variables for graph from:
    All active contributor by gender by window: './contributor/all/'
    Core active contributor by gender by window: './contributor/core/'

    :string dat_path: folder of CSV data path
    :string store_path: path to Contributor graph settings
    :list langs: alphabetized list of languages used
    :return: None
    """ 

    data = []

    for lang in langs:
        # Omit "All" language for stack area chart
        if lang.lower() == "all":
            continue

        # Retrieve data from language specific csv
        dat = _convert_csv_to_df(dat_path+lang+'.csv')

        # Format column data of contributors by gender
        add_data = {}
        percent_women = (dat["female_all"] / dat["all_all"]) * 100
        add_data["data"] = list(round(percent_women, 2))
        add_data["name"] = lang

        data.append(add_data)


    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        x.append(_format_date(win))
    wins = x

    # Retrieve time range
    start_date = wins[0]
    end_date = wins[-1]
    date_range = start_date + " - " + end_date


    # Graph setup information
    title = "Percentage of Women Across Languages "
    subtitle = date_range
    label_y = 'Women in Projects (%)'
    x_categories = wins
    height_ratio = (9 / 13 * 100) # 16:9 ratio

    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['subtitle'] = subtitle
    out_dict['label_y'] = label_y
    out_dict['x_categories'] = x_categories
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path+'all_stack'+'.json', 'w') as out_file:
            json.dump(out_dict, out_file)

    # Save data to CSV for additional data analysis 
    csv_data = pd.DataFrame(data=out_dict['data']).explode('data')
    csv_data.to_csv(store_path+'all_stack'+'.csv')



def load_contributor_percent(dat_path, store_path):
    """
    Stores formatted JavaScript variables for graph from:
    All active contributor by gender by window: './contributor/all/'
    Core active contributor by gender by window: './contributor/core/'

    :string dat_path: folder of CSV data path
    :string store_path: path to Contributor graph settings
    :list langs: alphabetized list of languages used
    :return: None
    """ 

    data = []

    # Retrieve data from language specific csv
    dat = _convert_csv_to_df(dat_path+'All.csv')

    # Format column data of contributors by gender
    female_data = {}
    female_data["data"] = list(dat["female_all"])
    female_data["name"] = "Female"

    male_data = {}
    male_data["data"] = list(dat["male_all"])
    male_data["name"] = "Male"

    unknown_data = {}
    unknown_data["data"] = list(dat["unknown_all"])
    unknown_data["name"] = "Unknown"

    data.append(unknown_data)
    data.append(male_data)
    data.append(female_data)
    

    # Change window to date
    wins = dat["win"]
    x = []
    for win in wins:
        x.append(_format_date(win))
    wins = x

    # Retrieve time range
    start_date = wins[0]
    end_date = wins[-1]
    date_range = start_date + " - " + end_date


    # Graph setup information
    title = "% OSS Contributors by Gender "
    subtitle =  date_range
    label_y = 'Percent'
    x_categories = wins
    height_ratio = (9 / 13 * 100) # 16:9 ratio

    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['subtitle'] = subtitle
    out_dict['label_y'] = label_y
    out_dict['x_categories'] = x_categories
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path+'all_percent'+'.json', 'w') as out_file:
            json.dump(out_dict, out_file)

    # Save data to CSV for additional data analysis 
    csv_data = pd.DataFrame(data=out_dict['data']).explode('data')
    csv_data.to_csv(store_path+'all_percent'+'.csv')    



def load_contributor_dumbbell(dat_path, store_path, langs):
    """
    Stores formatted JavaScript variables for graph from:
    All active contributor by gender by window: './contributor/all/'
    Core active contributor by gender by window: './contributor/core/'

    :string dat_path: path to CSV data
    :string store_path: path to Contributor graph settings
    :list langs: alphabetized list of languages used
    :return: None
    """ 

    data = []

    for lang in langs:
        # Omit "All" language
        if lang.lower() == "all":
            continue

        # Retrieve data from language specific csv
        dat = _convert_csv_to_df(dat_path+lang+'.csv')

        # Format column data of contributors by gender
        add_data = {}
        percent_women = (dat["female_all"] / dat["all_all"]) * 100
        # Round to second decimal
        percent_women = round(percent_women, 2)
        add_data["low"] = percent_women.min()
        add_data["high"] = percent_women.max()
        add_data["name"] = lang

        # Order dumbell lines in order least to greatest min value
        if not data:
            data.append(add_data)
        for i, lang_data in enumerate(data):
            if lang_data["low"] >= add_data["low"]:
                data.insert(i, add_data)
                break
            elif i == len(data) - 1:
                data.append(add_data)

    # Retrieve time range
    start_date = _format_date(dat["win"].iloc[0])
    end_date = _format_date(dat["win"].iloc[-1])
    date_range = start_date + " - " + end_date


    # Graph setup information
    title = "Min and Max % Women in Ecosystems 2008-2019"
    subtitle = date_range
    label_y = 'Percentage of Women (%)'
    height_ratio = (9 / 13 * 100) # 16:9 ratio

    # write data to js file that creates variables referenced in script.js file
    out_dict = dict()
    out_dict['title'] = title
    out_dict['subtitle'] = subtitle
    out_dict['label_y'] = label_y
    out_dict['height_ratio'] = height_ratio
    out_dict['data'] = data
    with open(store_path+'all_dumbbell'+'.json', 'w') as out_file:
            json.dump(out_dict, out_file)


## Private Functions ##

def _format_date(period):
    # Assumed there are four 3-month periods in each year 
    # Format year and month of dataframe value "year-month"

    time = 3 * period
    year = 2008 + math.floor(time/12)
    month = time - math.floor(time/12)*12
    if not month:
        month = 12
        year -= 1

    return f"{year}-{month}"


def _format_year(period):
    # Assumed there are four 3-month periods in each year 
    # Format year and month of dataframe value "year-month"

    time = 3 * period
    year = 2008 + math.floor(time/12)
    month = time - math.floor(time/12)*12
    if not month:
        year -= 1

    return f"{year}"


def _convert_csv_to_df(dat_path):
    # Converts OSS public data CSV to dataframe
    # Default max 45 rows
    dat = pd.read_csv(dat_path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]

    return dat