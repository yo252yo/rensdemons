import os
import re

oroot = os.path.dirname(os.getcwd())
dir = os.path.join(oroot, "levels")

for file in os.listdir(dir):
        if ".js" in file:
            print("<a href='file:///D:/work/rensdemons/debug.html?lvl=" + file[:-3] + "'> " + file[:-3] + "</a><br />")
