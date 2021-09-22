
const RESOURCES = {
  _LOADED: {},

  is_loaded: function(item) {
    RESOURCES._LOADED[item.id] = true;
  },


  get_img: function(name) {
      var resource = document.getElementById("R_" + name);
      if (resource) {
          return resource;
      }
      var resource = document.createElement("img");
      resource.id = "R_" + name;
      resource.src = name;
      resource.style = "display:none;";
      resource.onload = function(){RESOURCES.is_loaded(resource);};

      document.body.appendChild(resource);
      return resource;
  },

  onload: function(resource, f) {
    if(! RESOURCES._LOADED[resource.id]){
      resource.addEventListener('load', f);
    } else {
      f(); // In case it's already loaded
    }
  },

  preload: function(){
    RESOURCES.get_img('assets/battles/civilians/child_m.png');
    RESOURCES.get_img('assets/battles/civilians/priest.png');
    RESOURCES.get_img('assets/battles/civilians/villager0.png');
    RESOURCES.get_img('assets/battles/civilians/villager2.png');
    RESOURCES.get_img('assets/battles/forests/blob.png');
    RESOURCES.get_img('assets/battles/forests/boar.png');
    RESOURCES.get_img('assets/battles/forests/flower.png');
    RESOURCES.get_img('assets/battles/forests/fox.png');
    RESOURCES.get_img('assets/battles/forests/mandragora.png');
    RESOURCES.get_img('assets/battles/forests/mushroom_1.png');
    RESOURCES.get_img('assets/battles/forests/mushroom_2.png');
    RESOURCES.get_img('assets/battles/forests/mushroom_boss.png');
    RESOURCES.get_img('assets/battles/forests/nymph.png');
    RESOURCES.get_img('assets/battles/forests/squirrel.png');
    RESOURCES.get_img('assets/battles/forests/tree.png');
    RESOURCES.get_img('assets/battles/forests/trunk.png');
    RESOURCES.get_img('assets/battles/mountains/chimera.png');
    RESOURCES.get_img('assets/battles/mountains/dragon.png');
    RESOURCES.get_img('assets/battles/mountains/emu.png');
    RESOURCES.get_img('assets/battles/mountains/harpy.png');
    RESOURCES.get_img('assets/battles/mountains/hawk.png');
    RESOURCES.get_img('assets/battles/mountains/manticore.png');
    RESOURCES.get_img('assets/battles/mountains/phoenix.png');
    RESOURCES.get_img('assets/battles/mountains/pterosaur.png');
    RESOURCES.get_img('assets/battles/mountains/quetzalcoatl.png');
    RESOURCES.get_img('assets/battles/trial/arachnid.png');
    RESOURCES.get_img('assets/battles/trial/basilisk.png');
    RESOURCES.get_img('assets/battles/trial/cockroach.png');
    RESOURCES.get_img('assets/battles/trial/rodent.png');
    RESOURCES.get_img('assets/battles/trial/statue.png');
    RESOURCES.get_img('assets/battles/trial/viper.png');
    RESOURCES.get_img('assets/battles/waters/anemone.png');
    RESOURCES.get_img('assets/battles/waters/anglerjelly.png');
    RESOURCES.get_img('assets/battles/waters/crab.png');
    RESOURCES.get_img('assets/battles/waters/jellyfish.png');
    RESOURCES.get_img('assets/battles/waters/Nxp2_devil-mermaid_b.png');
    RESOURCES.get_img('assets/battles/waters/Nxp2_grell-mage_c.png');
    RESOURCES.get_img('assets/battles/waters/Nxp2_lamia.png');
    RESOURCES.get_img('assets/battles/waters/Nxp2_serpent.png');
    RESOURCES.get_img('assets/battles/waters/octopus.png');
    RESOURCES.get_img('assets/battles/waters/squid.png');
    RESOURCES.get_img('assets/battles/waters/whale.png');
    RESOURCES.get_img('assets/battles/world_easy/ghost.png');
    RESOURCES.get_img('assets/battles/world_easy/goblin.png');
    RESOURCES.get_img('assets/battles/world_easy/mummy.png');
    RESOURCES.get_img('assets/battles/world_easy/skeleton.png');
    RESOURCES.get_img('assets/battles/world_easy/wraith.png');
    RESOURCES.get_img('assets/characters/child_f.png');
    RESOURCES.get_img('assets/characters/child_m.png');
    RESOURCES.get_img('assets/characters/priest.png');
    RESOURCES.get_img('assets/characters/ren.png');
    RESOURCES.get_img('assets/characters/villager0.png');
    RESOURCES.get_img('assets/characters/villager1.png');
    RESOURCES.get_img('assets/characters/villager2.png');
    RESOURCES.get_img('assets/characters/villager3.png');
    RESOURCES.get_img('assets/characters/villager4.png');
    RESOURCES.get_img('assets/interface/circle.png');
    RESOURCES.get_img('assets/interface/cross.png');
    RESOURCES.get_img('assets/interface/dodger.png');
    RESOURCES.get_img('assets/interface/windrose.png');
    RESOURCES.get_img('assets/objects/event.png');
    RESOURCES.get_img('assets/objects/buildings/building.png');
    RESOURCES.get_img('assets/objects/buildings/castle.png');
    RESOURCES.get_img('assets/objects/buildings/castle2.png');
    RESOURCES.get_img('assets/objects/buildings/church.png');
    RESOURCES.get_img('assets/objects/buildings/church2.png');
    RESOURCES.get_img('assets/objects/buildings/house.png');
    RESOURCES.get_img('assets/objects/buildings/store.png');
    RESOURCES.get_img('assets/objects/exterior/pebbles.png');
    RESOURCES.get_img('assets/objects/exterior/plant.png');
    RESOURCES.get_img('assets/objects/water/seashell.png');
    RESOURCES.get_img('assets/objects/exterior/skeleton.png');
    RESOURCES.get_img('assets/objects/forest/shroomgiant.png');
    RESOURCES.get_img('assets/objects/forest/shroomsmall.png');
    RESOURCES.get_img('assets/objects/forest/shroomtall.png');
    RESOURCES.get_img('assets/objects/forest/tree.png');
    RESOURCES.get_img('assets/objects/interior/bed.png');
    RESOURCES.get_img('assets/objects/interior/bucket.png');
    RESOURCES.get_img('assets/objects/interior/cabinet.png');
    RESOURCES.get_img('assets/objects/interior/chair.png');
    RESOURCES.get_img('assets/objects/interior/chest.png');
    RESOURCES.get_img('assets/objects/interior/column.png');
    RESOURCES.get_img('assets/objects/interior/hay.png');
    RESOURCES.get_img('assets/objects/interior/housefire.png');
    RESOURCES.get_img('assets/objects/interior/jar.png');
    RESOURCES.get_img('assets/objects/interior/savepoint.png');
    RESOURCES.get_img('assets/objects/interior/shelf.png');
    RESOURCES.get_img('assets/objects/interior/statue.png');
    RESOURCES.get_img('assets/objects/interior/stool.png');
    RESOURCES.get_img('assets/objects/interior/table.png');
    RESOURCES.get_img('assets/objects/map/cave.png');
    RESOURCES.get_img('assets/objects/map/crevasse.png');
    RESOURCES.get_img('assets/objects/map/forest.png');
    RESOURCES.get_img('assets/objects/map/hills0.png');
    RESOURCES.get_img('assets/objects/map/hills1.png');
    RESOURCES.get_img('assets/objects/map/lake0.png');
    RESOURCES.get_img('assets/objects/map/lake1.png');
    RESOURCES.get_img('assets/objects/map/mountain0.png');
    RESOURCES.get_img('assets/objects/map/mountain1.png');
    RESOURCES.get_img('assets/objects/map/town.png');
    RESOURCES.get_img('assets/objects/map/trees0.png');
    RESOURCES.get_img('assets/objects/map/trees1.png');
    RESOURCES.get_img('assets/objects/map/vulcano.png');
    RESOURCES.get_img('assets/objects/mountain/rocks1.png');
    RESOURCES.get_img('assets/objects/mountain/rocks2.png');
    RESOURCES.get_img('assets/objects/mountain/rocks3.png');
    RESOURCES.get_img('assets/objects/mountain/rocks4.png');
    RESOURCES.get_img('assets/objects/mountain/rockshuge.png');
    RESOURCES.get_img('assets/objects/ruins/bocals.png');
    RESOURCES.get_img('assets/objects/ruins/web.png');
    RESOURCES.get_img('assets/objects/ruins/weblarge.png');
    RESOURCES.get_img('assets/objects/water/algaewall.png');
    RESOURCES.get_img('assets/objects/water/anemone.png');
    RESOURCES.get_img('assets/objects/water/coral.png');
    RESOURCES.get_img('assets/objects/water/planks.png');
    RESOURCES.get_img('assets/objects/water/seashellpointy.png');
    RESOURCES.get_img('assets/objects/water/waterplants.png');
    RESOURCES.get_img('assets/portraits_large/BestFriend_a.png');
    RESOURCES.get_img('assets/portraits_large/BestFriend_b.png');
    RESOURCES.get_img('assets/portraits_large/BestFriend_c.png');
    RESOURCES.get_img('assets/portraits_large/DisguisedPrincess_a.png');
    RESOURCES.get_img('assets/portraits_large/DisguisedPrincess_b.png');
    RESOURCES.get_img('assets/portraits_large/DisguisedPrincess_c.png');
    RESOURCES.get_img('assets/portraits_large/DumbMuscles_a.png');
    RESOURCES.get_img('assets/portraits_large/DumbMuscles_b.png');
    RESOURCES.get_img('assets/portraits_large/DumbMuscles_c.png');
    RESOURCES.get_img('assets/portraits_large/FemmeFatale_a.png');
    RESOURCES.get_img('assets/portraits_large/FemmeFatale_b.png');
    RESOURCES.get_img('assets/portraits_large/FemmeFatale_c.png');
    RESOURCES.get_img('assets/portraits_large/GeniusProdigy_a.png');
    RESOURCES.get_img('assets/portraits_large/GeniusProdigy_b.png');
    RESOURCES.get_img('assets/portraits_large/GeniusProdigy_c.png');
    RESOURCES.get_img('assets/portraits_large/PreciousChild_a.png');
    RESOURCES.get_img('assets/portraits_large/PreciousChild_b.png');
    RESOURCES.get_img('assets/portraits_large/PreciousChild_c.png');
    RESOURCES.get_img('assets/portraits_large/Ren_a.png');
    RESOURCES.get_img('assets/portraits_large/Ren_b.png');
    RESOURCES.get_img('assets/portraits_large/Ren_c.png');
    RESOURCES.get_img('assets/portraits_large/RetiredProtector_a.png');
    RESOURCES.get_img('assets/portraits_large/RetiredProtector_b.png');
    RESOURCES.get_img('assets/portraits_large/RetiredProtector_c.png');
    RESOURCES.get_img('assets/portraits_large/SavageChild_a.png');
    RESOURCES.get_img('assets/portraits_large/SavageChild_b.png');
    RESOURCES.get_img('assets/portraits_large/SavageChild_c.png');
    RESOURCES.get_img('assets/portraits_large/SnobRich_a.png');
    RESOURCES.get_img('assets/portraits_large/SnobRich_b.png');
    RESOURCES.get_img('assets/portraits_large/SnobRich_c.png');
    RESOURCES.get_img('assets/portraits_large/StreetSmart_a.png');
    RESOURCES.get_img('assets/portraits_large/StreetSmart_b.png');
    RESOURCES.get_img('assets/portraits_large/StreetSmart_c.png');
    RESOURCES.get_img('assets/portraits_large/TorturedSoul_a.png');
    RESOURCES.get_img('assets/portraits_large/TorturedSoul_b.png');
    RESOURCES.get_img('assets/portraits_large/TorturedSoul_c.png');
    RESOURCES.get_img('assets/portraits_large/TraitorFisher_a.png');
    RESOURCES.get_img('assets/portraits_large/TraitorFisher_b.png');
    RESOURCES.get_img('assets/portraits_large/TraitorFisher_c.png');
    RESOURCES.get_img('assets/portraits_large/UpbeatDojikko_a.png');
    RESOURCES.get_img('assets/portraits_large/UpbeatDojikko_b.png');
    RESOURCES.get_img('assets/portraits_large/UpbeatDojikko_c.png');
    RESOURCES.get_img('assets/portraits_large/WiseOld_a.png');
    RESOURCES.get_img('assets/portraits_large/WiseOld_b.png');
    RESOURCES.get_img('assets/portraits_large/WiseOld_c.png');
    RESOURCES.get_img('assets/screens/gameover_layer0.png');
    RESOURCES.get_img('assets/screens/gameover_layer1.png');
    RESOURCES.get_img('assets/screens/gameover_layer2.png');
    RESOURCES.get_img('assets/screens/map_base.png');
    RESOURCES.get_img('assets/screens/map_seed.png');
    RESOURCES.get_img('assets/screens/title_layer0.png');
    RESOURCES.get_img('assets/screens/title_layer1.png');
    RESOURCES.get_img('assets/screens/title_layer2.png');
  },

};

RESOURCES.preload();
