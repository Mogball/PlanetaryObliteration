var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_action_bar.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            //LOAD CUSTOM planetaryObliteration ACTIONBAR CSS
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_action_bar.css");
                
            model.isplanetaryobliterationOrMixedOrVanilla = function (data) {   
                    try{          
                        var planetaryobliterationcount = 0;
                        var specslength = 0;
                        var selectedspecs = data.selection().spec_ids;
                        
                        _.forOwn(selectedspecs, function(value, key){
                            if(key.indexOf("/l_") > 2){
                                planetaryobliterationcount++;
                            }
                            specslength++; 
                        });
                        if(planetaryobliterationcount == specslength){
                            return "planetaryobliteration";
                        }
                        else{
                            if(planetaryobliterationcount > 0 && planetaryobliterationcount < specslength){
                                return "planetaryobliteration";
                            }
                            else{
                                return "planetaryobliteration";
                            }
                        }
                }
                catch(e){
                    return "";
                }
            }

            model.isplanetaryobliteration = function (data){
                if(model.isplanetaryobliterationOrMixedOrVanilla(data) === "planetaryobliteration"){
                    return true;
                }
                else{
                    return false;
                }
            };

            model.isMixed = function (data){
                if(model.isplanetaryobliterationOrMixedOrVanilla(data) === "mixed"){
                    return true;
                }
                else{
                    return false;
                }
            };

            //ADD planetaryobliteration class to build_bar_menu
            $('.body_panel').attr("data-bind","css: { planetaryobliteration: model.isplanetaryobliteration($data), mixed: model.isMixed($data)}");
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
