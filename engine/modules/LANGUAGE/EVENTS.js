LANGUAGE_EVENTS = {
  _without_bf: [
    [
      `...`,
      `...`
    ],
  ],

  _party: function(member){
    switch (member){
    /*

    # AERITH EVENTS  ----------------------------------------------------
    >> should these be a part of a pool of metaevents that can happen anywhere? should they include conversations with other characters???
    >> put events in their own language file?
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
    */

      case PARTYMEMBERS.BestFriend:
        return [
          [
            `...`,
            `...`
          ],
        ];

      case PARTYMEMBERS.PreciousChild:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.UpbeatDojikko:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.StreetSmart:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.WiseOld:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.TraitorFisher:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.SavageChild:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.GeniusProdigy:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.FemmeFatale:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.DisguisedPrincess:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.DumbMuscles:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.TorturedSoul:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.RetiredProtector:
        return [
          [
            `...`,
            `...`
          ]
        ];

      case PARTYMEMBERS.SnobRich:
        return [
          [
            `...`,
            `...`
          ]
        ];


      default:
        return [];
    }
  },

  get_shared: function(after_bestfriend_death){
    var r = LANGUAGE_EVENTS._without_bf;
    if(!after_bestfriend_death){
      r.concat(LANGUAGE_EVENTS._party(PARTYMEMBERS.BestFriend))
    }
    for(var member in PARTYMEMBERS) {
      if(PARTY.has_member(PARTYMEMBERS[member])){
        r.concat(LANGUAGE_EVENTS._party(PARTYMEMBERS[member]));
      }
    }
    return r;
  },
}
