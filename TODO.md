PARTY MEMBERS: >  description in party.js >  attacks in langug, >  encounter+battle
# WIP


 FEMME FATALE emd



# MORE HEAVEN  ----------------------------------------------------

WHO makes you do it??
The SYSTEM goddess exploits the energy of someone stuck in a sollipsist simulation (like SNS feeding from ppl's attention by trapping them in truman show filter bubble)
energy from running in the loop


- add a link to the demo in heaven

- the goddess SAVED your soul (save/save) as confirmation when you save



Explain that the console is like magic words that change the fabric of the universe
Link to rend demo
The cycle of replay with the promise of a true ending is precisely what the system exploits

You need to be OK with your lack ie with quitting the game and act outside the system



# BACKSIDE  ----------------------------------------------------
- visual glitches, especially during Maou death (overlay?)
- Sometimes the game would crash with a very peculiar error code or error messags “help us”
- make the buildings/sprites/etc... say NOT READY or smhting


# OPTIONAL CONTENT  ----------------------------------------------------
- town2 survivors rescue!
- hans dog somewhere
- more furniture ^^ (city specific ??)
- more itembattles for dungeons and world,
- more battle encounters (world map ruins, hellsmaw skeleton)
- more bed and jar actions
- review battle_debris add a few more actions for rubble treasures
- villagers topics: hospitality (what are you doing here, etc..., scolding you), games, errands, ancestors, ren, complain about wife, news, other countries, sports, aspiratiosn, siblings (esp. second born), food (fav meal, etc..), travel (did u ever leave the town)



# HAWK DUNGEON  ----------------------------------------------------
baudrillard simulation / lacan themed?
should i have something like "no exit"



theres always something behind the waterfall

DumbMuscles: "DumbMuscles",//  The Big Guy strong and dumb      brute force
// extra  mountain?
>> save him from traps/patrols?? help him set traps?
escort mission, mb he's stuck and you have to help him progress (you need to press this button to advance, etc...)
Assume that a zone is safe once you've cleared it / clear whole floor before moving on
this bridge is gonna collapse/ this piece requires a trigger/  this jewel unlocks something
talk to an objective and exit, go close to the border
talk to one character / talk to a npc trigger the progression
go to the next area and come back
"oh you were on a fetching mission/tutorial"

# TOWN2 CASTLE  ----------------------------------------------------
DisguisedPrincess: "DisguisedPrincess", //magical princess / noble / hidden prince  girl disguised as boi       herboriste/traps/poison
// mb in town2 if you save it or if you rescue the survivors
>> mb infiltration of the castle, you help him escape, by knowing patrols and poisoning guards...
escort mission, ??? see dumbmuscles

# TOWN5 TORTUREDSOUL  ----------------------------------------------------
TorturedSoul: "TorturedSoul", // dark emo antihero maverik trop dark, poet/bard/jester/minstrel/painter:
// town5 acceptance
mb u can help him with suicide? save/load to kill him over and over/ stuff about death
>> I cannot be killed I'm glitched out
>> “Don't sacrifice yourself... “”Don't worry I have a way to cheat death “
>> Save and load : rez someone to kill them again
>> actually you know you survive till the end of the game!!
Triggering  flag, like playing biwa, is as good as murder
Artist vessel for god inspiration

# TOWN5 RetiredProtector  ----------------------------------------------------
RetiredProtector: "RetiredProtector", //  Retired or rebel military / commander / hardboiled warrior / vailiant protector   tactitian
// town5 acceptance
>>?? By giving attention to an element you make it special and imbue it with meaning, ie le rôle du mec qui n'a pas de rôle. you create your universe, quantum observer effect, yada yada
>>protector is like why me im nobody etc...
im too old for this shit

# TOWN4 SNOBRICH MANOR  ----------------------------------------------------
SnobRich: "SnobRich", //the snob/uptight rich merchant   banker
// town4 debauch
>> lost something important, you help them by going in an out and it respawns??
>> special vision to see interactibles
>> you can loot everything and nobody complains << useful to get rigch!
>> All that stuff about looting objects, going into ppl houses etc
>> You always start by dead end for treasures
>> when i wake up somewhere i immediately proceed to loot everything
>> Stuff resets when you exist and come back
>>> sounds like we should go to a dungeon together... treeforest??? or a special building ?? castle/manor


# GRAPHIC REWORK  ----------------------------------------------------
- audit from >= first town
- civilian battlers assets battle civilians suck, also theres some sprites in assets/battle that are not used
- object/buildings: need better buildings and differnt building styles for different cities?
- figure out rocks: mb the rocks that have straight bottom should be reserved for edges??
- check walking on small sprites (ie pebbles, etc):  hills are fixed at the position where they are and the character appears behind them when they walk on it, floors are not rerendered when the sprite has loaded. /   pebbles hide the sprite when walked on /   > mb things should have an option to be indexed by the top
- decorate stores
- the treasure battler should probs be closed
- mb revamp party screen with icons

# TROPES  ----------------------------------------------------
- add comment about how anything can fit in my bags
- i expect more at the end of maou fight cause important enemies usually have stages
- Whale: Fights you're supposed to lose
- a casino in vegas (and lootboxes) > the rng was helpful/not
- when you open a menu, time stops and aerith says something when you're opening menus / matrix effect, you slow down the time when you think
- hellsmaw: dont worry we're supposed to Encounter the big boss before youre ready, we're way too underlevel
- invisible walls dialog at the end of the world
- self awareness of weird hitboxes like church
- review the fissure temple to make sure its obvious "every problem has a solution" "a lock means theres a key" etc... i know we'll find a hint in this place!
- UpbeatDojikko: you have the power to communicate with another world
- UpbeatDojikko:  I cN see your future you'll kill the bosses
- an old lady arrives, ofc she wants to help and gives you crap
- a flashback that you know you survived
- wiseold: “Insanity is doing the same thing and expecting different results”
- add death flag in hells maw before aetith death


# AERITH EVENTS  ----------------------------------------------------
>> should these be a part of a pool of metaevents that can happen anywhere? should they include conversations with other characters???
- event from aerith: Don't you think it's weird how we always find what we need on our way
- event from aerith: isnt it weird that merchants buy all your shit
- event from aerith: do we not need breaks? no sleep or toilet
- event from aerith: how do you know youre immortal
- event from aerith: you have an intuition about where to go O.o
- conversation about open worlds
- event from aerith: i cant hurt you, no friendly fire
      "I know where to go/how to progress/what to do": i.e. when you need to // game gives me clue for next location
- event from aerith: i always pray before a risky event or when i sense the story might branch soon. You should save before risky event,  Save point before bosses
- reference to the fact that there's always a crafting system


# DO A FILLER CHECK  ----------------------------------------------------
- ZONES DONT OVERLAP OR IT MAY DOUBLE SPAWN
- spawn chara on exit bands, its safer
See 051_pandemonium_room and 012_trees

# BUGFIXES  ----------------------------------------------------
- throwaway villagers with random names should always keep the same name otherwise they take way too much space
- the hardcoded temporary items sometimes dont have a placeholder, like 025harpies, mb we should automate placeholding
- test on edge, epsecially functions starting by _, mb the nested ones
- change color scheme doesnt change fog or map bg
- artifact have special sound effects
- Make debug.html user friendly: When you go to game folder, theres a debug.exe game that launches the same environments behind the scenes?
- if theres a guy behind a house interaction interacts with the house (most prominent object)
- different sound walking on map
- check save/disk size
- add rens parent sendoff/house before trial?
- dodger initial position a litl bit more up
- a suicide function?
- break line bug <br><br>When you look at what suits your views<br<br>/&gt;When you idealize the past<br>When you follow that which feels true...
- did i fix word break in little textbox but not in CenteredTextMenu ?? https://github.com/yo252yo/rensdemons/commit/45d726acf5d6e3ff75444e5c90bd045d5150fa40 ?? character descriptions
- poison darts is highlighted after using poison because we use startswith to know which is the ongoing command because of repeated attacks
- why does battletree have lists as leaves and not simply state?
- shop, trainer, player_action have a bit of language text, DISK?
- palette has functions that return objects, strings and functinos that just outright change the colors
- The character encoding of the HTML document was not declared. The document will render with garbled text in some browser configurations if the document contains characters from outside the US-ASCII range. The character encoding of the page must be declared in the document or in the transfer protocol.
- sometimes audio fail with testing.html:1 Uncaught (in promise) DOMException: Failed to load because no supported source was found. << ONLY ON CHROME DEV
- can we remove self adjustement from draw() now that we hardcode the dimensions of all sprites when theres filling?? mb noter for battle sprites etc....
- finally, produce a zip, put on steam
- fast travel system? it would be fun to appear in front of everyone and theyre mindfucked but preted its ok
- cache ressources
- marketing tips https://medium.com/free-code-camp/from-zero-to-game-designer-how-to-start-building-video-games-even-if-you-dont-have-any-experience-5e2f9f45f4bb

# SEND OUT FOR BETA  ----------------------------------------------------

# POLISHING/PRODUCTIONIZE  ----------------------------------------------------
- replace js prompt() and try https://en.wikipedia.org/wiki/Electron_(software_framework) then https://github.com/greenheartgames/greenworks for steam achievements? http://twinery.org/questions/2934/steam-greenworks-with-twine-how-make-work-for-achievements
- optimize size on disk
- walkthrough
- more event text in zones
- more text for existing objects?
- mb more interactions with real world like books
- reread/flesh out man.md about forking
- reread/flesh out mirror conv (esp more first person actions?? "you" direct)
- https://medium.com/@sam20gh/how-to-add-add-to-home-screen-to-your-website-4b07aee02676
- steam achievements
- trailer/arts