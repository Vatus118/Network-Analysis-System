import os

IGNORE_DIRS = {'.idea', '.venv', '.git'}
MAX_DEPTH = 3

def print_tree(path, prefix='', depth=0):
    if depth > MAX_DEPTH:
        return
    items = sorted([i for i in os.listdir(path) if i not in IGNORE_DIRS])
    for i, item in enumerate(items):
        full_path = os.path.join(path, item)
        connector = '└── ' if i == len(items) - 1 else '├── '
        print(prefix + connector + item)
        if os.path.isdir(full_path):
            extension = '    ' if i == len(items) - 1 else '│   '
            print_tree(full_path, prefix + extension, depth + 1)

with open('project_tree.txt', 'w', encoding='utf-8') as f:
    from contextlib import redirect_stdout
    with redirect_stdout(f):
        print_tree('.')
