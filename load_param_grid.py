import json

def  load_param_grid(file_path):
    """
    Load the parameter grid from a JSON file.

    Args:
        file_path (str): The path to the JSON file containing the parameter grid.

    Returns:
        dict: The parameter grid as a dictionary.
    """
    with open(file_path, 'r') as f:
        param_grid = json.load(f)
    return param_grid

