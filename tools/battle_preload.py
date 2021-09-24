import os
import re

oroot = os.path.dirname(os.getcwd())
dir = os.path.join(oroot, "battles")

for root, dirs, files in os.walk(dir):
    for file in files:
        if ".js" in file and "_" not in file  and "trial" not in file  and "basilisk" not in file and "characters" not in file :
            fullname = os.path.join(root, file)
            print("'" + fullname[len(oroot)+9:-3].replace("\\", "/") + "',")
