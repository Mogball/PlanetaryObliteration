﻿var model;
var handlers;

$(document).ready(function () {

    function IconAtlasViewModel() {
        var self = this;

        self.strategicIconSource = function (string) { return 'img/strategic_icons/' + 'icon_si_' + string + '.png' }
        self.strategicIcons = ko.observableArray([
            'blip',
            'metal_splat_02',
            'control_point_01',
            'artillery_short',
            'artillery_long',
            'land_barrier',
            'commander',
            'metal_extractor',     
            'metal_extractor_adv',
            'air_factory_adv',
            'air_factory',
            'bot_factory_adv',
            'bot_factory',
            'vehicle_factory_adv',
            'vehicle_factory',
            'naval_factory_adv',
            'naval_factory',
            'energy_plant_adv',
            'energy_plant',
            'radar_adv',
            'radar',
            'energy_storage',
            'metal_storage',
            'laser_defense_adv',
            'laser_defense',
            'laser_defense_single',
            'air_defense',
            'air_defense_adv',
            'fighter',
            'fighter_adv',
            'bomber_adv',
            'bomber',
            'fabrication_aircraft_adv',
            'fabrication_aircraft',
            'air_scout',
            'assault_bot_adv',
            'assault_bot',
            'fabrication_bot_adv',
            'fabrication_bot',
            'battleship',
            'destroyer',
            'frigate',
            'missile_ship',
            'fabrication_ship_adv',
            'fabrication_ship',
            'sea_scout',
            'attack_sub',
            'nuclear_sub',
            'tank_laser_adv',
            'tank_light_laser',
            'tank_heavy_mortar',
            'fabrication_vehicle_adv',
            'fabrication_vehicle',
            'aa_missile_vehicle',
            'land_scout',
            'torpedo_launcher',
            'torpedo_launcher_adv',
            'orbital_laser',
            'radar_satellite',
            'radar_satellite_adv',
            'solar_array',
            'orbital_launcher',
            'orbital_fighter',
            'orbital_lander',
            'ion_defense',
            'delta_v_engine',
            'tactical_missile_launcher',
            'nuke_launcher',
            'anti_nuke_launcher',
            'nuke_launcher_ammo',
            'anti_nuke_launcher_ammo',
            'teleporter',
            'orbital_fabrication_bot',
            'gunship',
            'defense_satellite',
            'tank_armor',
            'tank_heavy_armor',
            'fabrication_bot_combat',
            'fabrication_bot_combat_adv',
            'bot_grenadier',
            'bot_sniper',
            'bot_tactical_missile',
            'bot_bomb',
            'land_mine',
            'orbital_factory',
            'transport',
            'control_module',
            'mining_platform',
            'metal_spot_preview',
            'unit_cannon',
            'bot_tesla',
            'bot_support_commander',
            'l_bot_nanoswarm',
            'tank_hover',
            'tank_nuke',
            'solar_drone',
            'bomber_heavy',
            'support_platform',
            'fabrication_barge',
            'hover_ship',
            'orbital_probe',
            'orbital_battleship',
            'orbital_railgun',
            'tank_flak',
            'carrier',
            'drone',
            'artillery_unit_launcher',
            'titan',
            'bot_aa_adv',
            'bot_arty',
            'bot_mortar',
            'l_bot_orbital',
            'bot_ubercannon',
            'laser_defense_sniper',
            'rocket_defense',
            'tank_attack',
            'tank_heavy_artillery',
            'fabrication_sub',
            'sonar',
            'sonar_adv',
			'l_apocalypse_apparatus',
			'l_orbital_dropper',
			'bot_skirmish',
			'l_sea_tank',
			'l_air_bomb',
			'l_air_carrier',
			'l_air_scout_adv',
			'l_bot_artillery',
			'l_bot_heavy',
			'l_riot_bot',
			'l_bot_support_commander',
			'l_commander',
			'l_fabrication_ship_adv',
			'l_fabrication_sub_combat_adv',
			'l_fabrication_vehicle_combat',
			'l_flying_teleporter',
			'l_hive_nanoswarm',
			'l_hover_laser',
			'l_hover_ship',
			'l_hover_tank_adv',
			'l_necromancer',
			'l_scout_bot',
			'l_scout_bot_radar_mode',
			'l_sea_scout',
			'l_sniper_bot',
			'l_sniper_tank',
			'l_storage',
			'l_swarm_hive',
			'l_tank_goliath',
			'l_tank_shank',
			'l_tank_swarm',
			'l_frigate',
			'l_sea_mine',
			'l_flame_bot',
			'l_boat_torpedo',
			'tank_orbital',
			'bomber_naval',
            'patton'
        ]);

        self.sendIconList = function () {
            var list = model.strategicIcons();
            engine.call('handle_icon_list', list, 52);
        }
    }
    model = new IconAtlasViewModel();
    handlers = {};

    // inject per scene mods
    if (scene_mod_list['icon_atlas'])
        loadMods(scene_mod_list['icon_atlas']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    model.sendIconList();

});
