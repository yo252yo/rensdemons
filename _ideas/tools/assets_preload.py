import os
import re

oroot = os.path.dirname(os.getcwd())
dir = os.path.join(oroot, "assets")

for root, dirs, files in os.walk(dir):
    for file in files:
        if ".png" in file or ".jpg" in file:
            fullname = os.path.join(root, file)
            print("RESOURCES.get_img('" + fullname[len(oroot)+1:].replace("\\","/") + "');")

for root, dirs, files in os.walk(dir):
    for file in files:
        if ".wav" in file:
            fullname = os.path.join(root, file)
            print("AUDIO._load_sound('" + fullname[len(oroot)+15:-4].replace("\\","/") + "');")

for root, dirs, files in os.walk(dir):
    for file in files:
        if ".mp3" in file:
            fullname = os.path.join(root, file)
            print("AUDIO._load_music('" + fullname[len(oroot)+14:-4].replace("\\","/") + "');")
