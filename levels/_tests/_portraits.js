
CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `$$Ren$: "You're right, this is a weird place..."`,
    `$$BestFriend$: "I don't really like it..."`,
    `$$StreetSmart$: "I don't really like it..."`,
    `$$WiseOld$: "I don't really like it..."`,
    `$$UpbeatDojikko$: "I don't really like it..."`,
    `$$PreciousChild$: "I don't really like it..."`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(750, 1550);
