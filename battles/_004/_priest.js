// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/civilians/priest.png", 'background');

PLAYER_ACTIONS.escape("Stop talking");

PLAYER_ACTIONS.add({
  name: `"What happened?"`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"What just happened?\"",
                "Priest: \"My Child, what happened is the miracle we've all been waiting for! The Goddess has blessed us, for you are the Promised Child. You'll be the savior of $$world_name$! The fate of the world is in your hands, now!\""],
});

PLAYER_ACTIONS.add({
  name: "Doubt",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"I'm not sure I can do it... It seems like a very hard task, and I'm just a child...\"",
                "Priest: \"No need for this kind of doubt. The Goddess, in Her Almighty wisdom, has chosen you. She knows all, meaning she knows that you'll succeed. Failure is not an option. It is simply impossible.\""],
});

PLAYER_ACTIONS.add({
  name: `"What next?"`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"So... what happens next?\"",
                "Priest: \"You must prepare for the battle to come. Our little town of $$town_1$ doesn't have much to offer. You need to travel north, to $$town_2$. There, the priests at the cathedral will help you acquire what you'll need to save the world.\""],
  extra_function: function() {
    ABILITIES.unlock("_004_priest_asked");
  },
});

PLAYER_ACTIONS.add({
  name: "Refuse",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: ["$$Ren$: \"This is all... too much... I don't think I can do it...\"",
                "Priest: \"The Goddess has chosen you. There is no other way.\""],
});

PLAYER_ACTIONS.add({
  name: "Magic",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"What am I getting out of this? Do I have... powers and such, now?\"",
                "Priest: \"You are the first and only Promised Child. No one knows how the Goddess' blessing will transform you!\"",
                "$$Ren$: \"Ok, but can I do magic?\"",
                "Priest: \"You are welcome to learn. No instructor will refuse to serve the Promised Child. Maybe the Goddess will bless your studies with speedy success.\"",
              ],
});

PLAYER_ACTIONS.add({
  name: "Reward",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"Will you give me money and equipment to help in my quest?\"",
                "Priest: \"Alas, it is something we cannot do.\"",
                "$$Ren$: \"Is the situation in the kingdom so dire?\"",
                "Priest: \"No, we do have a few resources. But helping you would be an insult to the Goddess. She has chosen you, and you alone, as Her messenger. You are all you need to succeed.\"",
              ],
});

PLAYER_ACTIONS.add({
  name: "Help",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"If I'm the only Promised Child, my life must be precious. Shouldn't you give me an escort at least, instead of sending a child in the wild on their own?\"",
                "Priest: \"I'm afraid we cannot do that. We need to trust in your fate. Your success is guaranteed.\"",
                "$$Ren$: \"But the world is full of dangers, there are many horrible monsters out there.\"",
                "Priest: \"Sure, and the Goddess will guide your hand to victory. Assisting you would be to doubt her power. Do you doubt her power? This would be blasphemy!\"",
              ],
});

PLAYER_ACTIONS.add({
  name: "Companion",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"Can I at least travel with $$BestFriend$?\"",
                "Priest: \"If that is what your heart desires, it must be the will of the Goddess. Not only can you, but you must follow your instinct and travel with this friend of yours, for it is the voice of the Goddess who whispered you that idea, and She is never wrong.\"",
              ],
});

PLAYER_ACTIONS.add({
  name: "Repudiate",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: ["$$Ren$: \"Please say no more and leave me alone. You don't need to chaperon me. I know what I'm doing.\"",
                "Priest: \"But... how?\"",
                "$$Ren$: \"I am the Promised Child, am I not? I have the blessing of the Goddess, and I need noone else. To even suggest the contrary is blasphemy.\"",
                "Priest: \"You... you're right. Please forgive me. I need to repent.\"",
              ],
});


// ===================
// =================== START
// ===================
BATTLE.operations.start("You approach the head priest. A lot of thoughts are racing through your head. You don't really know where to start.");
