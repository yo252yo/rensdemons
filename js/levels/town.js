wood_floor = new Tile("floors1.jpg", 0, 0);
pavement_floor = new Tile("floors1.jpg", 1, 2);



for (var i = 0; i < 100; i++){   
for (var j = 0; j < 60; j++){        
    MAP.set_tile(i, j, wood_floor);
}    
}

MAP.delete_tile(2,2);

for (var j = 0; j < 60; j++){        
    MAP.set_tile(5, j, pavement_floor);
}

for (var j = 0; j < 20; j++){        
    MAP.set_tile(15, j, pavement_floor);
}


for (var j = 0; j < 20; j++){        
    MAP.delete_tile(j,5);
}

for (var j = 0; j < 20; j++){        
    MAP.set_tile(j, 15,  pavement_floor);
}



CHARACTER.place_at_tile(5,10);