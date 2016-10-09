
var POLoaded;

if ( ! POLoaded )
{

    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO live_game_econ.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        var themesetting = api.settings.isSet('ui','POThemeFunction',true) || 'ON';
        
        //load po theme
        if(themesetting === "ON"){  
            loadCSS("coui://ui/mods/com.stuart98.po/css/PO_econ.css");
            $('.body_panel').addClass("POui");
        }
        
        /*mixed ui not needed
        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
            }
        }*/
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