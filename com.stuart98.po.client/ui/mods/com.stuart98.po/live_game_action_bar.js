var POLoaded;

if ( ! POLoaded )
{

    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO live_game_action_bar.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        //load po theme
        var themesetting = api.settings.isSet('ui','POThemeFunction',true) || 'ON';
        if(themesetting === "ON"){
            loadCSS("coui://ui/mods/com.stuart98.po/css/PO_action_bar.css");
            $('.body_panel').addClass("POui");
            
            /*mixed ui not needed    
            model.isLegionOrMixedOrVanilla = function (data) {   
                    try{          
                        var legioncount = 0;
                        var specslength = 0;
                        var selectedspecs = data.selection().spec_ids;
                        
                        _.forOwn(selectedspecs, function(value, key){
                            if(key.indexOf("/l_") > 2){
                                legioncount++;
                            }
                            specslength++; 
                        });
                        if(legioncount == specslength){
                            return "legion";
                        }
                        else{
                            if(legioncount > 0 && legioncount < specslength){
                                return "mixed";
                            }
                            else{
                                return "vanilla";
                            }
                        }
                }
                catch(e){
                    return "";
                }
            }

            model.isLegion = function (data){
                if(model.isLegionOrMixedOrVanilla(data) === "legion"){
                    return true;
                }
                else{
                    return false;
                }
            };

            model.isMixed = function (data){
                if(model.isLegionOrMixedOrVanilla(data) === "mixed"){
                    return true;
                }
                else{
                    return false;
                }
            };

            //ADD legion class to build_bar_menu
            $('.body_panel').attr("data-bind","css: { legion: model.isLegion($data), mixed: model.isMixed($data)}");*/
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
