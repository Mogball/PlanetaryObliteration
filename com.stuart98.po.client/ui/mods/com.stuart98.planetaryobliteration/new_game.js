var planetaryObliterationLoaded;

if (!planetaryObliterationLoaded) {

    planetaryObliterationLoaded = true;

    function planetaryObliteration() {

        console.log('planetaryObliteration new_game.js last tested on 94533+');

        var planetaryObliterationEnabled = false;

        model.enableplanetaryObliteration = function() {

            if(planetaryObliterationEnabled) {
                return;
            }
            
            console.log('planetaryObliteration new_game.js enabled');

            planetaryObliterationEnabled = true;

            var newBuild = _.isFunction( model.aiPersonalities );

            var aiPersonalities = newBuild ? model.aiPersonalities() : model.aiPersonalities;

            var defaultAiPersonalities = ['Idle', 'Normal', 'Hard', 'Relentless', 'Absurd'];

            _.forEach( aiPersonalities, function(personality, name) {
                if(defaultAiPersonalities.indexOf(name) != -1) {
                    personality.personality_tags = _.union(personality.personality_tags || [], ['Vanilla']);
                }
            });

            if (newBuild) {
                model.aiPersonalities.valueHasMutated();
            } else {
                model.aiPersonalityNames(_.keys(aiPersonalities));
            }  

            model.planetaryObliterationClientModLoaded = ko.observable(false);

            model.planetaryObliterationDoNotShowWelcome = ko.observable(false).extend({ local: 'planetaryObliteration_welcome_dontshow'});

            model.planetaryObliterationToggleDoNotShowWelcome = function() {
                model.planetaryObliterationDoNotShowWelcome(!model.planetaryObliterationDoNotShowWelcome());
            }

            model.planetaryObliterationUrlClicked = function(data, event) {
                 if (event && event.target && event.target.href) {
                    model.planetaryObliterationOpenUrl(event.target.href);
                }
            }

            model.planetaryObliterationOpenUrl = function(url) {
                 engine.call('web.launchPage', url);
            }

            model.planetaryObliterationCloseWelcome = function() {
                $('#planetaryObliteration-welcome').fadeOut();
                $('body').off('keypress', model.planetaryObliterationCloseWelcome);
            }

            model.planetaryObliterationShowWelcome = function() {
                $("body").on('keypress', model.planetaryObliterationCloseWelcome);
                $('#planetaryObliteration-welcome').delay(1000).fadeIn();
            }


            //planetaryObliteration commander picker colouring
            loadCSS('coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_commander_picker.css');
            
            //planetaryObliteration welcome screen
            loadCSS('coui://ui/mods/com.stuart98.planetaryobliteration/css/welcome.css');  
            $("body").append(loadHtml('coui://ui/mods/com.stuart98.planetaryobliteration/new_game/welcome.html'));

            api.mods.getMountedMods('client', function(mods) {
                var planetaryObliterationClientLoaded =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.stuart98.po.client' ] ).length > 0;

                model.planetaryObliterationClientModLoaded(planetaryObliterationClientLoaded);

                if (!planetaryObliterationClientLoaded) {
                    if (model.registerHoldReady) model.registerHoldReady('com.stuart98.po.client', 'planetaryObliteration Client Mod Missing');
                    if (model.localChatMessage) model.localChatMessage('planetaryObliteration Expansion', 'planetaryObliteration Expansion client mod is not installed!');
                }

                if (!model.planetaryObliterationDoNotShowWelcome() && ! model.returnFromLoad()) {
                    model.planetaryObliterationShowWelcome();
                }
            });

            loadScript("coui://ui/mods/com.stuart98.planetaryobliteration/common.js");

            var planetaryobliterationcommanders = planetaryobliterationglobal.commanders;
            var vanillacommanders = ["/pa/units/commanders/quad_osiris/quad_osiris.json","/pa/units/commanders/imperial_delta/imperial_delta.json","/pa/units/commanders/raptor_beast/raptor_beast.json"];

            model.isNotplanetaryobliteration = function(commander,isEmpty){
                if(!isEmpty){
                    return !_.includes(planetaryobliterationcommanders, commander);
                }
                else{
                    return true;
                }
            }
            
            model.isMLA = function(commander,isEmpty){
                if(!isEmpty){
                    return !_.includes(planetaryobliterationcommanders, commander);
                }
            }
            

            //Style Commander Picker planetaryobliteration
            $('.div-commander-picker-item.btn_std_ix').attr("data-bind","css: {planetaryobliterationcommander: !model.isNotplanetaryobliteration($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");

            //Style Slot planetaryobliteration
            $('.slot-player').attr("data-bind","css: {planetaryobliterationslot: !model.isNotplanetaryobliteration($data.commander(),$data.isEmpty()), mlaslot: model.isMLA($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}");

            model.changeplanetaryobliterationAI = function(playerid){
                //console.log("change to planetaryobliteration");
                model.send_message('set_ai_commander', {
                    id: playerid,
                    ai_commander: planetaryobliterationcommanders[_.random(planetaryobliterationcommanders.length-1)]
                });
            }

            model.changeVanillaAI = function(playerid){
                //console.log("change to vanilla");
                model.send_message('set_ai_commander', {
                    id: playerid,
                    ai_commander: vanillacommanders[_.random(vanillacommanders.length-1)]
                });
            }

            //NEED PATCHED lobby.js
            //To planetaryobliteration Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && model.isNotplanetaryobliteration(slot.commander()),click: function() { model.changeplanetaryobliterationAI(slot.playerId());}">To planetaryobliteration</div>');
            //To Vanilla Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && !model.isNotplanetaryobliteration(slot.commander()),click: function() { model.changeVanillaAI(slot.playerId());}">To MLA</div>');
            //ENDOF NEED PATCHED lobby.js
        }
 
        if (_.intersection(model.gameModIdentifiers(), ['com.stuart98.po.server']).length > 0) {
               model.enableplanetaryobliteration();
        }
    }

    try {
        planetaryObliteration();
    } catch (e) {
        console.error(e);
    }
}