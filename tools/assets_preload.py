import os
import re

oroot = os.path.dirname(os.getcwd())
dir = os.path.join(oroot, "assets")

for root, dirs, files in os.walk(dir):
    for file in files:
        if ".png" in file or ".jpg" in file:
            fullname = os.path.join(root, file)
            print("RESOURCES.get_img('" + fullname[len(oroot)+1:].replace("\\","/") + "');")
