



//(new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48)).place_at(100,100);
/*
 var a = (new MovingSprite("testing/vx_chara01_a.png", color_player.code(), 32, 48));
 a.place_at(100,100);
 a.move(1,0);
*/

LEVEL.initialize_character(80, 60);

new S_SavePoint(20,200);
new S_Tree(150,130);
new S_Tree(290,160);
new S_Tree(240,380);

new S_House(160,350);
new S_Floor(10,2050,2000,2000);


for (var i = 50; i< 5000; i+= 250){
for (var j = 150; j< 4000; j+= 250){
  new S_Tree(i,j);
}}

IO.control.character();
/*
var t = new TextBanner(`Shrek is a 2001 American computer-animated comedy film loosely based on the 1990 fairytale picture book of the same name by William Steig. Directed by Andrew Adamson and Vicky Jenson in their directorial debuts, it stars Mike Myers, Eddie Murphy, Cameron Diaz, and John Lithgow as the voices of the lead characters. In the story, an ogre called Shrek (Myers) finds his swamp overrun by fairy tale creatures who have been banished by the corrupt Lord Farquaad (Lithgow) aspiring to be king. Shrek makes a deal with Farquaad to regain control of his swamp in return for rescuing Princess Fiona (Diaz), whom Farquaad intends to marry. With the help of Donkey (Murphy), Shrek embarks on his quest but soon falls in love with the princess, who is hiding a secret that will change his life forever.

The rights to Steig's book were purchased by Steven Spielberg in 1991. He originally planned to produce a traditionally-animated film based on the book, but John H. Williams convinced him to bring the film to the newly-founded DreamWorks in 1994. Jeffrey Katzenberg began active development of the film in 1995 immediately following the studio's purchase of the rights from Spielberg. Chris Farley was originally cast as the voice for the title character, recording nearly all of the required dialogue. After Farley died in 1997 before the work was finished, Mike Myers stepped in to voice the character, which was changed to a Scottish accent in the process. The film was intended to be motion-captured, but after poor results, the studio decided to hire Pacific Data Images to complete the final computer animation.`);
*/
/*
var t = new TextBox(50,100,50,50);
t.change_text("Th");

var t = new TextBox(200,200,50,50);
t.change_text("Th");
t.set_opacity(0.7);
*/

/*
var style = document.createElement('style');
style.innerHTML = "div{ border: 3px dotted; margin:-3px; }";
document.body.appendChild(style);
*/
