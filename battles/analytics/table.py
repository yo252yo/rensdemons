import os
import re


def translate(verdict):
    if verdict == "win":
        return "W"
    if verdict == "useless":
        return "."


weapons = set()
effect = {}

pattern = re.compile('PLAYER_ACTIONS\.default_(.*)\.(.*)\(\);')

dir = os.path.dirname(os.getcwd())

for root, dirs, files in os.walk(dir):
    for battle in files:
        b = battle[0:7].rjust(7)
        if battle[0] != "_" and ".js" in battle:
            effect[b] = {}
            print(battle)
            try:
                with open(os.path.join(dir, battle), 'r') as f:
                    for line in f:
                         m = pattern.match(line)
                         if m:
                             weapon = m.group(2)[0:7].rjust(7)
                             weapons.add(weapon)
                             effect[b][weapon] = translate ( m.group(1))
            except:
                print("X")

f = open("output.csv", "w")
f.write("....... \t")
for w in weapons:
    f.write(w)
    f.write("\t")

f.write("\n")
for b in effect:
    f.write(b)
    f.write("\t")
    for w in weapons:
        if w in effect[b]:
            f.write(effect[b][w].rjust(7))
            f.write("\t")
        else:
            f.write(" ".rjust(7))
            f.write("\t")
    f.write("\n")
