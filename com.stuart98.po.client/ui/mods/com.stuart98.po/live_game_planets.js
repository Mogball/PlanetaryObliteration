
var POLoaded;

if ( ! POLoaded )
{

    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO live_game_planets.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        //load PO theme
        var themesetting = api.settings.isSet('ui','POThemeFunction',true) || 'ON';
        if(themesetting === "ON"){
            loadCSS("coui://ui/mods/com.stuart98.po/css/PO_planets.css");
            
             $('.body_panel').addClass("POui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.stuart98.po/img/controls/green/pin_open.png' : 'coui://ui/mods/com.stuart98.po/img/controls/green/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.po/img/controls/green/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.po/img/controls/green/pin_closed.png");
        }
        
        /*no mixed ui
        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png' : 'coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png");           
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png' : 'coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png");                  
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