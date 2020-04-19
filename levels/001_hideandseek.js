
LEVEL.initialize_character(150, 300);

new S_Floor(50,550,1000,500);

new S_Tree(110,270);
new S_Tree(135,470);
var t1 = new S_Tree(150,130);
t1.hide_in(new M_ChildF());


new S_Tree(240,380);
new S_Tree(265,500);
new S_Tree(290,160);
new S_Tree(370,420);
new S_Tree(400,250);
new S_Tree(470,300);
new S_Tree(480,495);
new S_Tree(550,100);
new S_Tree(560,460);
new S_Tree(620,280);
new S_Tree(645,190);
new S_Tree(730,400);
new S_Tree(735,150);
new S_Tree(790,490);
new S_Tree(800,250);
new S_Tree(895,260);
new S_Tree(930,460);
new S_Tree(950,185);


TextBannerSequence.make([
  "Although for now, the Promised Child, unaware of the fate that awaited, was simply playing hide and seek in the outskirts of town.",
  "Ren: \"... 97\"",
  "Ren: \"... 98\"",
  "Ren: \"... 99\"",
  "Ren: \"... 100! Ready or not, here I come!\"",
], function(){ IO.control.character(); });
