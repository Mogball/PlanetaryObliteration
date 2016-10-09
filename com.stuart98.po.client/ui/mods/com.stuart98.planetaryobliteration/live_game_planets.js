
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_planets.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_planets.css");
        }
        
        handlers.planetaryobliterationui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "planetaryobliteration"){
                $('.body_panel').addClass("planetaryobliterationui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png' : 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png");           
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/purple/pin_open.png' : 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/purple/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/purple/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/purple/pin_closed.png");                  
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