
DICTIONARY.factory.make_new();
PALETTE.factory.make_new();

ABILITIES._abilities.delete(["_demo_died"]);
ABILITIES._abilities.delete(["_demo_killed"]);
LEVELSTATES._states.delete(["demo/town"]);
LEVELSTATES._states.delete(["demo/world"]);
LEVELSTATES._states.delete(["demo/church"]);

var newren = MARKOV_MODELS.human_names.mutate("Ren", 20);
DICTIONARY.set("Ren", newren);
DICTIONARY.set("ORIGINAL_Ren", newren);

var evolve = function() {
  CURRENTLEVEL.setup("demo/town");
}

setTimeout(evolve, 1000);
