var POLoaded;

if ( ! POLoaded )
{
    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO live_game.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        if (model.ammoBuildHover)
        {
            model.ammoBuildHover["/pa/units/legion/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json"] = {
                name: 'Iron Dome Interceptor',
                description: 'Anti-nuke - Intercepts incoming nuclear missiles.',
                cost: 9000,
                sicon_override: 'anti_nuke_launcher_ammo',
                damage: 1
            };
            model.ammoBuildHover["/pa/units/legion/land/l_nuke_launcher/l_nuke_launcher_ammo.json"] = {
                name: 'Supernova Strategic Warhead',
                description: 'Long range, high damage ballistic missile.',
                cost: 20000,
                sicon_override: 'nuke_launcher_ammo',
                damage: 100000
            };
            model.ammoBuildHover["/pa/units/vanilla/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json"] = {
                name: 'SR-24 -Shield- Missile Defense',
                description: 'Anti-nuke - Intercepts incoming nuclear missiles.',
                cost: 9000,
                sicon_override: 'anti_nuke_launcher_ammo',
                damage: 1
            };
            model.ammoBuildHover["/pa/units/vanilla/land/nuke_launcher/nuke_launcher_ammo.json"] = {
                name: 'LR-96 -Pacifier- Missile',
                description: 'Long range, high damage ballistic missile.',
                cost: 20000,
                sicon_override: 'nuke_launcher_ammo',
                damage: 100000
            };
        }
    }

    try
    {
        PO();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
