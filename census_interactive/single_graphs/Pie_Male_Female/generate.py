import json
import math
import random
import numpy as np

import pandas as pd
from pandas import json_normalize
from bson.json_util import dumps


# Import functions for identifying group makeup 

from inspect import getsourcefile
import os.path
import sys

current_path = os.path.abspath(getsourcefile(lambda:0))
current_dir = os.path.dirname(current_path)
parent_dir = current_dir[:current_dir.rfind(os.path.sep)]
parent_of_parent_dir = parent_dir[:parent_dir.rfind(os.path.sep)]

sys.path.insert(0, parent_of_parent_dir)

import sys
sys.path.append(".")
sys.path.append("..")
from cmuacs.helpers.groupMakeupFunctions import get_group_makeup, get_type_names, get_type_index


## generate - create pie graph of group makeups

# filter JSON data from a singular team to get makeup
def process_data(data, iteration_num, team_num):
      
    team_dict = data["iteration_data"][str(iteration_num)]

    # Flatten and convert to pandas Dataframe
    team_data = json_normalize(team_dict, ["members"])
    
    # Select columns memberNum, members of teamNum
    team_data = team_data[["memberNum", "evaluator.type", "teamNum"]]
    choose_team = team_data["teamNum"] == team_num
    team_data = team_data[choose_team]

    # Get percentage of type in evaluator.type column
    num_members = team_data.shape[0]

    # Check if value exists, else will produce key error so store as 0%
    if "reputational" in team_data["evaluator.type"].value_counts():
        rep = team_data["evaluator.type"].value_counts()['reputational'] / num_members
    else:
        rep = 0
    if "ideological" in team_data["evaluator.type"].value_counts():
        ide = team_data["evaluator.type"].value_counts()['ideological'] / num_members
    else:
        ide = 0

    if "financial" in team_data["evaluator.type"].value_counts():
        fin = team_data["evaluator.type"].value_counts()['financial'] / num_members
    else:
        fin = 0
    
    # Store pie "slice" data in array for graphing
    final = {"data": [] }
    if (fin != 0):
        final["data"].append({"name": "Financial", "y": fin})
    if (ide != 0):
        final["data"].append({"name": "Ideological", "y": ide})
    if (rep != 0):
        final["data"].append({"name": "Reputational", "y": rep})
    
    # Get team type name
    type_one, type_two, ratio = get_group_makeup(list(team_data["evaluator.type"]))
    team_type = get_type_names()[get_type_index(type_one, type_two)]
        
    return json.dumps(final), team_type


# Collects data and creates graphing variable, axis labels
def create_graph(path_json, path_script, args=None):
    
    # Retrieves data from data.json file
    with open(path_json)as f:
        json_data = json.load(f)

    if args == None:
        iteration_options = str(np.arange(1, json_data["num_iterations"]))
        # Remove brackets
        iteration_options = iteration_options[1:len(iteration_options) - 1]
        iteration_num = int(input("Choose an iteration from the following Options: " 
                        + iteration_options + "\nEnter Iteration Number: "))
        
        # Select a specific team number
        team_options = str(np.arange(0, len(json_data["teams_data"])))
        # Remove brackets from numpy array
        team_options = team_options[1:len(team_options) - 1]
        team_num = int(input("Choose a Team from the following Options: " 
                        + team_options + "\nEnter Team Number: "))
    else:
        iteration_num, collect_cumulative, team_num = args
    
    # Process data to filter appropriate information as formatted:
    graph, team_type = process_data(json_data, iteration_num, team_num)

    # Titles and labels
    title =  'Team Makeup'
    subtitle = 'Team #' + str(team_num) + " | " + 'Iteration #' + \
                str(iteration_num) + " | " + team_type.upper()

    # write "graph" to a graph.js file that creates JSON object that can be used
    with open(path_script, 'w') as out_file:
        out_file.write('var graph = %s;' % graph)
        out_file.write('var title = "%s";' % title)
        out_file.write('var subtitle = "%s";' % subtitle)

