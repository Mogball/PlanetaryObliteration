
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_players.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        
        //LOAD CUSTOM planetaryObliteration CSS
        loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_players.css");
        loadScript("coui://ui/mods/com.stuart98.planetaryobliteration/common.js");

        //see global.js
        var planetaryobliterationcomms = planetaryobliterationglobal.commanders;
        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        
        model.checkCommanders = function(commanders){
            try{
                var planetaryobliterationcount = 0;
                var specslength = 0;
                if (commanders !== undefined){
                    _.forOwn(commanders, function(value, key){
                        if(_.includes(planetaryobliterationcomms, value)){
                        planetaryobliterationcount++;
                        }
                        specslength++; 
                    });
                    if(planetaryobliterationcount == specslength){
                        return "planetaryobliteration";
                    }
                    else{
                        if(planetaryobliterationcount > 0 && planetaryobliterationcount < specslength){
                        return "mixed";
                        }
                        else{
                        return "vanilla";
                        }
                    }
                }
                else{
                    return "vanilla";
                }
            }
            catch(e){
                return "";
            }            
        }
        
        model.isplanetaryobliterationOrMixedOrVanilla = ko.computed(function () {
            try{
                var selectedspecs = model.player().commanders;
                return model.checkCommanders(selectedspecs);
            }
            catch(e){
                return "";
            }
        });

        model.isplanetaryobliteration = ko.computed(function (){
        if(model.isplanetaryobliterationOrMixedOrVanilla() === "planetaryobliteration"){
            return true;
        }
        else{
            return false;
        }
        });

        model.isMixed = ko.computed(function (){
        if(model.isplanetaryobliterationOrMixedOrVanilla() === "mixed"){
            return true;
        }
        else{
            return false;
        }
        });

        model.planetaryobliterationstart = ko.observable(false);

        model.player.subscribe(function(newval){
            if(!model.planetaryobliterationstart()){
                
                
                if(themesetting === "ON"){
                    var ui = model.isplanetaryobliterationOrMixedOrVanilla();
                    api.Panel.message("selection","planetaryobliterationui", ui);
                    api.Panel.message("planets","planetaryobliterationui", ui);
                    api.Panel.message("control_group_bar","planetaryobliterationui", ui);
                    api.Panel.message("econ","planetaryobliterationui", ui);
                    api.Panel.message("options_bar","planetaryobliterationui", ui);
                    api.Panel.message("build_hover","planetaryobliterationui", ui);
                    api.Panel.message("time_bar","planetaryobliterationui", ui);
                    api.Panel.message("menu","planetaryobliterationui", ui);
                    
                    if(ui === "planetaryobliteration"){
                        
                        var toggleImage = function(open) {
                            return open ? 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png' : 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png';
                        };
                        
                        model.playerPanelToggleImage = ko.computed(function() { return toggleImage(model.showPlayerListPanel()); });
                        model.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(model.showSpectatorPanel()); });

                        
                        $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png");
                        $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png");    
                    }
                    if(ui === "vanilla"){
                        
                        var toggleImage = function(open) {
                            return open ? 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png' : 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png';
                        };
                        
                        model.playerPanelToggleImage = ko.computed(function() { return toggleImage(model.showPlayerListPanel()); });
                        model.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(model.showSpectatorPanel()); });

                        
                        $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png");
                        $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png");    
                    }
                    if(ui === "mixed"){
                        var toggleImage = function(open) {
                            return open ? 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png' : 'coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png';
                        };
                        
                        model.playerPanelToggleImage = ko.computed(function() { return toggleImage(model.showPlayerListPanel()); });
                        model.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(model.showSpectatorPanel()); });

                        
                        $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_open.png");
                        $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.stuart98.planetaryobliteration/img/controls/red/pin_closed.png");   
                        
                    }
                }
                model.planetaryobliterationstart(true);
            }
        });
        
        if(themesetting === "ON"){
            $('.body_panel').attr("data-bind","css: { planetaryobliterationui: model.isplanetaryobliteration(), mixedui: model.isMixed()}, visible: show");
        }
        
        //COMMANDER IMAGE
        model.commanderImage = function (d){
            var result="";
            switch(model.checkCommanders(d.commanders))
            {
                case "vanilla":
                    result = "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
                break;
                case "planetaryobliteration":
                    result = "coui://ui/mods/com.stuart98.planetaryobliteration/img/icon_player_outline_l.png";
                break;
                case "mixed":
                    result = "coui://ui/mods/com.stuart98.planetaryobliteration/img/icon_player_outline_m.png";
                break;
                default:
                    result ="coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png"
                break;
            }
             return result;
        }
        
        model.commanderImageMaskLeg = function (d){
             if(model.checkCommanders(d.commanders) === "planetaryobliteration"){
                 return true;
             }
             else{
                 return false;
             }
        }
        
        model.commanderImageMaskMix = function (d){
             if(model.checkCommanders(d.commanders) === "mixed"){
                 return true;
             }
             else{
                 return false;
             }
        }
        
        $('img[src="img/players_list_panel/icon_player_outline.png"]').replaceWith('<img data-bind="attr:{src: model.commanderImage($data)}" />');
        $('.player_masked').attr("data-bind","style: { backgroundColor: color }, css: { legcom: model.commanderImageMaskLeg($data), mixcom: model.commanderImageMaskMix($data)}");
        
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