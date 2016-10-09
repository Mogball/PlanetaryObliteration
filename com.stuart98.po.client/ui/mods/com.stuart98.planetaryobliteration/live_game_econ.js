
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_econ.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_econ.css");
        }
        handlers.planetaryobliterationui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "planetaryobliteration"){
                $('.body_panel').addClass("planetaryobliterationui");
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
            }
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