import math
import numpy as np
import pandas as pd
import webbrowser, os
import yaml

"""
All active contributor by gender by window: './contributor/all/'
Core active contributor by gender by window: './contributor/core/'
"""
def plot_contributors(lang):
    path = './data/contributor_by_win/'+lang+'.csv'
    # Import data
    dat = pd.read_csv(path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    
    # Change window to date
    wins = dat["win"]
    new_wins = []
    for win in wins:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            new_wins.append("{}".format(year))
        else:
            new_wins.append("{}-{}".format(year,month))
    wins = new_wins

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

    # Graph setup information
    lang_title = lang
    if lang == "C#":
        lang_title = "C\#"
    title = "Active Contributors in "  + lang_title + " Public Projects"
    label_x = 'Time (quarter)'
    label_y = 'Number of Contributors (thousand)'
    label_y_secondary = "Female Ratio = F/(F + M)"
    x_categories = wins
    data = [all_unknown, all_male, all_female, among_all, among_core]
   
    # write data to js file that creates variables referenced in script.js file
    path_vis = 'census_graphs_interactive/1_Contributor'
    with open(path_vis + '/data.js', 'w') as out_file:
        out_file.write('var title = "%s";' % title)
        out_file.write('var label_x = "%s";' % label_x)
        out_file.write('var label_y = "%s";' % label_y)
        out_file.write('var label_y_secondary = "%s";' % label_y_secondary)
        out_file.write('var x_categories = %s;' % x_categories)
        out_file.write('var data = %s;' % data)
    path = path_vis + '/index.html'
    webbrowser.open('file://' + os.path.realpath(path))



"""
Commit count by gender by window: './commit/graph'
"""
def plot_commits(lang):
    path = './data/commits_by_win/'+lang+'.csv'

    # Import data
    dat = pd.read_csv(path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    
    # Change window to date
    wins = dat["win"]
    new_wins = []
    for win in wins:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            new_wins.append("{}".format(year))
        else:
            new_wins.append("{}-{}".format(year,month))
    wins = new_wins
    
    # Plot information
    fig,ax = plt.subplots()
    title = lang
    if lang == "C#":
        title = "C\#"
    ax.set_title("Commits in " + r"$\bf{" + title + "}$" +" Public Projects", fontsize=18)
    ax.set_xlabel('Time (quarter)', fontsize=16)
    ax.set_ylabel('Commit Numbers (thousand)', fontsize=16, labelpad=5.0)
    
    # Plot commit number bar
    female = dat["female_commit"] / 1000
    male = (dat["female_commit"] + dat["male_commit"]) / 1000
    unknown = dat["all_commit"] / 1000
    ax.bar(wins, unknown, label = "unknown", color = "blanchedalmond")
    ax.bar(wins, male, label = "male", color = "#f29d4b")
    ax.bar(wins, female, label = "female", color = "#de2d26")
    plt.legend(loc=(0.02, 0.80),fontsize=12, frameon=False)
    
    # Plot ratio line for female in all commits
    ax2=ax.twinx()
    male = dat["male_commit"].replace(0, 1)
    ratio = dat["female_commit"] / (dat["female_commit"] + male)
    for win in dat["win"]:
        win = win - 1
        if dat["female_commit"][win] + male[win] <= 1000:
            ratio[win] = 0
    ax2.plot(wins, ratio,color="darkblue",marker="o", markerfacecolor='white', markeredgecolor='darkblue', markeredgewidth=1, label="female ratio")
    ax2.set_ylabel('Female Commit Ratio = F/(F+M)', fontsize=16, labelpad=25.0).set_rotation(270)
    
    # Set x ticks
    ax.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    ax2.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    
    # Set y ticks
    upper = math.ceil(max(dat["all_commit"])/600000)*600
    ax.set_yticks(np.arange(0, upper *7/6, upper/6))
    ax.set_ylim(ymin = 0, ymax = upper)
    ax2.set_yticks(np.arange(0, 0.36, 0.05))
    ax2.set_ylim(ymin = 0, ymax = 0.35)

    # No Frame
    ax.spines['top'].set_visible(False)
    ax2.spines['top'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax2.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax2.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    #ax.grid(axis='y')
    #ax2.grid(axis='y')
    
    # Set Size
    plt.legend(loc=(0.75, 0.85),fontsize=12, frameon=True, edgecolor="white")
    plt.rcParams["figure.figsize"] = (10,7)
    
    # Save figure
    plt.savefig("./commit/graph/"+lang+"_commit.pdf", facecolor='white', transparent=False)
    plt.savefig("./commit/graph/"+lang+"_commit.png", facecolor='white', transparent=False)
    #plt.show()
    plt.clf()
    


"""
All active project count by window: './project/'
"""
def proj_count(lang):
    path = './data/proj_by_win/full.csv'

    dat = pd.read_csv(path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]

    # Plot information
    fig,ax = plt.subplots()
    title = lang
    if lang == "C#":
        title = "C\#"
    ax.set_title("Active Public Projects in " + r"$\bf{" + title + "}$" +" Ecosystem", fontsize=18)
    ax.set_xlabel('Time (quarter)', fontsize=16)
    ax.set_ylabel('Active Public Project Numbers (thousand)', fontsize=16, labelpad=5.0)
    
    # Change window to date
    x = dat["win"]
    new_x = []
    for win in x:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            new_x.append("{}".format(year))
        else:
            new_x.append("{}-{}".format(year,month))
    x = new_x
    
    # Plot left y axis
    ax.bar(new_x, dat[lang+"_all"] / 1000, label = "All", color = "#f29d4b")
    ax.bar(new_x, dat[lang+"_fem"] / 1000, label = "Has female", color = "#de2d26")
    plt.legend(loc="upper left",fontsize=12, frameon=False)
    
    # Plot ratio line for female in all commits
    ax2=ax.twinx()
    ratio = dat[lang+"_fem"] / dat[lang+"_all"]
    for win in dat["win"]:
        win = win - 1
        if dat[lang+"_all"][win] <= 5:
            ratio[win] = 0
    ax2.plot(new_x, ratio,color="darkblue",marker="o", markerfacecolor='white', markeredgecolor='darkblue', markeredgewidth=1, label="female ratio")
    ax2.set_ylabel('Female Participated Project Ratio', fontsize=16, labelpad=25.0).set_rotation(270)
    
    # Set x ticks
    ax.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    ax2.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    
    # Set y ticks
    upper = math.ceil(max(dat[lang+"_all"])/50000)*50
    ax.set_yticks(np.arange(0, upper *6/5, upper/5))
    ax.set_ylim(ymin = 0, ymax = upper)
    ax2.set_yticks(np.arange(0, 0.36, 0.05))
    ax2.set_ylim(ymin = 0, ymax = 0.35)

    # No Frame
    ax.spines['top'].set_visible(False)
    ax2.spines['top'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax2.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax2.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    
    # Set Size
    plt.legend(loc="upper right",fontsize=12, frameon=True, edgecolor="white")
    plt.rcParams["figure.figsize"] = (10,7)
    
    plt.savefig("./project/graph/"+lang+"_project.pdf", facecolor='white', transparent=False)
    plt.savefig("./project/graph/"+lang+"_project.png", facecolor='white', transparent=False)
    #plt.show()
    plt.clf()



    """
    Continued Script
    """

    dat = pd.read_csv('./project/data/proj_create_win.csv', error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    dat = dat[dat['win']>0]

    # Plot information
    fig,ax = plt.subplots()
    ax.set_title("Number of Newly Created Projects on GHTorrent", fontsize=18)
    ax.set_xlabel('Time (quarter)', fontsize=16)
    ax.set_ylabel('Number of Projects', fontsize=16, labelpad=5.0)

    # No Frame
    ax.spines['top'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)

    # Change window to date
    x = dat["win"]
    new_x = []
    for win in x:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            new_x.append("{}".format(year))
        else:
            new_x.append("{}-{}".format(year,month))
    x = new_x
    y = dat["new_all"]
    ax.bar(new_x, y, label="All newly created", color="#f29d4b")

    # Set Size
    plt.legend(loc="upper left",fontsize=12, frameon = False)
    plt.rcParams["figure.figsize"] = (10,7)

    # Set ticks
    plt.xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))

    # Original Graph
    #plt.savefig("./project/graph/All_New_Created_Project_Orig.pdf", facecolor='white', transparent=False)
    #plt.savefig("./project/graph/All_New_Created_Project_Orig.png", facecolor='white', transparent=False)

    # Log Scaled Graph
    #plt.yscale('log')
    #plt.savefig("./project/graph/All_New_Created_Project_Log.pdf", facecolor='white', transparent=False)
    #plt.savefig("./project/graph/All_New_Created_Project_Log.png", facecolor='white', transparent=False)
    plt.show()
    plt.clf()



"""
Output: Tie distribution count by window: './tie/graph'
"""
def plot_ties(lang):
    path = './data/gender_homophily/'+lang+'.csv'

    # Import data
    dat = pd.read_csv(path, error_bad_lines=False, warn_bad_lines=False, index_col=False)
    max_win = 45
    dat = dat[dat['win']<=max_win]
    
    # Change window to date
    wins = dat["win"]
    new_wins = []
    for win in wins:
        time = 3 * win
        year = 2008 + math.floor(time/12)
        month = time - math.floor(time/12)*12
        if not month:
            month = 12
        if month == 3:
            new_wins.append("{}".format(year))
        else:
            new_wins.append("{}-{}".format(year,month))
    wins = new_wins
    
    # Plot information
    fig,ax = plt.subplots()
    title = lang
    if lang == "C#":
        title = "C\#"
    ax.set_title("Gender-Identifiable Tie Count in "+ r"$\bf{" + title + "}$" +" Public Projects", fontsize=18)
    ax.set_xlabel('Time (quarter)', fontsize=16)
    ax.set_ylabel('Female-Related Tie Percentage', fontsize=16, labelpad=5.0)
    
    # Plot tie number bar
    total = dat["m_m"].replace(0, 1) + dat["f_m"] + dat["f_f"]
    m_m = (dat["m_m"] + dat["f_m"] + dat["f_f"]) / total * 100
    f_m = (dat["f_m"] + dat["f_f"]) / total * 100
    f_f = dat["f_f"] / total * 100
    #ax.bar(wins, m_m , label = "male-male", color = "steelblue")
    ax.bar(wins, f_m, label = "female-male", color = "#f29d4b")
    ax.bar(wins, f_f, label = "female-female", color = "#de2d26")
    plt.legend(loc=(0.02, 0.85),fontsize=12, frameon=False)
    
    # Plot ratio 
    ax2=ax.twinx()
    f_m = f_m.replace(0, 1)
    ratio = f_f / f_m
    ax2.plot(wins, ratio,color="darkblue",marker="o", markerfacecolor='white', markeredgecolor='darkblue', markeredgewidth=3, label="Among all")
    ax2.set_ylabel('Female Ratio = f-f / (f-f + f-m)', fontsize=16, labelpad=25.0).set_rotation(270)
    
     # Set x ticks
    ax.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    ax2.set_xticks(np.arange(min(dat["win"])-1, max(dat["win"])+1, 4))
    
    # Set y ticks
    upper = math.ceil(max(f_m)/30)*30
    ax.set_yticks(np.arange(0, upper *7/6, upper/6))
    ax.set_ylim(ymin = 0, ymax = upper)
    ax2.set_yticks(np.arange(0, 0.31, 0.03))
    ax2.set_ylim(ymin = 0, ymax = 0.30)
    
    # Set Size
    plt.legend(loc=(0.6, 0.85),fontsize=12, frameon=False)
    plt.rcParams["figure.figsize"] = (10,7)
    #plt.figtext(0.1, 0.02,"* percentage calculated out of total number of male-male, female-male, female-female ties")
    
    # No Frame
    ax.spines['top'].set_visible(False)
    ax2.spines['top'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax2.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax2.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    
    plt.savefig("./tie/graph/"+lang+"_tie.pdf", facecolor='white', transparent=False)
    plt.savefig("./tie/graph/"+lang+"_tie.png", facecolor='white', transparent=False)
    #plt.show()
    plt.clf()


"""
Output: Name distribution count by window: './name'
"""
def plot_name(gender):
    path = './data/names/top_names.csv'
    dat = pd.read_csv(path, error_bad_lines=False, warn_bad_lines=False, index_col=False)

    name = []
    freq = []

    for i in range(0, 16):
        name.append(dat.loc[i,"name"])
        freq.append(dat.loc[i,"count"])

    fig,ax = plt.subplots()
    ax.bar(name, freq, color = "#f29d4b")

    ax.set_title("15 Most Common " + r"$\bf{" + gender + "}$" +" Developer Names in GHTorrent", fontsize=18)
    ax.set_xlabel('Name', fontsize=16)
    ax.set_ylabel('Number of Appearance', fontsize=16, labelpad=5.0)

    plt.rcParams["figure.figsize"] = (10,7)
    plt.xticks(rotation=30)
    ran = 800 if gender == "Female" else 8000
    ax.set_yticks(np.arange(0, 10 * ran + 1, ran))
    
    # No Frame
    ax.spines['top'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    plt.savefig("./name/"+gender+"_name.png", facecolor='white', transparent=False)
    plt.savefig("./name/"+gender+"_name.pdf", facecolor='white', transparent=False)
    #plt.show()
    plt.clf()
        
    plot_name("Female")
    plot_name("Male")


# Launch visualizations
def main():
    ################ SETTINGS ################
    with open ("config.yaml", 'r') as stream:
        config = yaml.safe_load(stream)
    langs = [] if config["languages"] is None else config["languages"]
    genders = [] if config["genders"] is None else config["genders"]
    ##########################################

    for lang in langs:
        plot_contributors(lang)
        #proj_count(lang)
        #plot_ties(lang)

    for gender in genders:
        plot_name(gender)

if __name__== "__main__" :
    main()
    