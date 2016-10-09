var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{
    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        if (model.ammoBuildHover)
        {
            model.ammoBuildHover["/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json"] = {
                name: 'Iron Dome Interceptor',
                description: 'Anti-nuke - Intercepts incoming nuclear missiles.',
                cost: 2000,
                sicon_override: 'l_anti_nuke_launcher_ammo',
                damage: 1
            };
            model.ammoBuildHover["/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json"] = {
                name: 'Supernova Strategic Warhead',
                description: 'Long range, high damage ballistic missile.',
                cost: 20000,
                sicon_override: 'l_nuke_launcher_ammo',
                damage: 100000
            };
        }
    }

    try
    {
        planetaryObliteration();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
