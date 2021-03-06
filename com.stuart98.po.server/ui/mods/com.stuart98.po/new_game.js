var POLoaded;

if (!POLoaded) {

    POLoaded = true;

    function PO() {

        console.log('PO new_game.js last tested on 94533+');

        var POEnabled = false;

        model.enablePO = function () {

            if (POEnabled) {
                return;
            }

            console.log('PO new_game.js enabled');

            POEnabled = true;

            var newBuild = _.isFunction(model.aiPersonalities);

            var aiPersonalities = newBuild ? model.aiPersonalities() : model.aiPersonalities;

            var defaultAiPersonalities = ['Idle', 'Normal', 'Hard', 'Relentless', 'Absurd'];

            _.forEach(aiPersonalities, function (personality, name) {
                if (defaultAiPersonalities.indexOf(name) != -1) {
                    personality.personality_tags = _.union(personality.personality_tags || [], ['Vanilla']);
                }
            });

            if (newBuild) {
                model.aiPersonalities.valueHasMutated();
            } else {
                model.aiPersonalityNames(_.keys(aiPersonalities));
            }

            model.POClientModLoaded = ko.observable(false);

            //load po theme
            var themesetting = api.settings.isSet('ui', 'POMenuThemeFunction', true) || 'ON';
            if (themesetting === "ON") {
                //css to do
                loadCSS('coui://ui/mods/com.stuart98.po/css/PO_shared.css');
                loadCSS('coui://ui/mods/com.stuart98.po/css/PO_buttons.css');
                loadCSS("coui://ui/mods/com.stuart98.po/css/PO_background_no_logo.css");
                loadCSS('coui://ui/mods/com.stuart98.po/css/PO_new_game.css');
                $('body').addClass("PO");
            }

            //legion commander picker colouring
            loadCSS('coui://ui/mods/com.stuart98.po/css/legion_commander_picker.css');

            loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

            var legioncommanders = ["/pa/units/commanders/l_rockteeth/l_rockteeth.json","/pa/units/commanders/l_overwatch/l_overwatch.json", "/pa/units/commanders/l_cyclops/l_cyclops.json", "/pa/units/commanders/l_wasushi/l_wasushi.json", "/pa/units/commanders/raptor_xov/raptor_XOV.json", "/pa/units/commanders/raptor_enderstryke71/raptor_enderstryke71.json", "/pa/units/commanders/tank_reaver/tank_reaver.json", "/pa/units/commanders/raptor_raizell/raptor_raizell.json", "/pa/units/commanders/quad_locust/quad_locust.json", "/pa/units/commanders/quad_potbelly79/quad_potbelly79.json", "/pa/units/commanders/quad_theflax/quad_theflax.json", "/pa/units/commanders/quad_gambitdfa/quad_gambitdfa.json", "/pa/units/commanders/quad_xinthar/quad_xinthar.json", "/pa/units/commanders/quad_armalisk/quad_armalisk.json"];
            var vanillacommanders = ["/pa/units/commanders/imperial_able/imperial_able.json", "/pa/units/commanders/imperial_aceal/imperial_aceal.json", "/pa/units/commanders/imperial_alpha/imperial_alpha.json", "/pa/units/commanders/imperial_aryst0krat/imperial_aryst0krat.json", "/pa/units/commanders/imperial_chronoblip/imperial_chronoblip.json", "/pa/units/commanders/imperial_delta/imperial_delta.json", "/pa/units/commanders/imperial_enzomatrix/imperial_enzomatrix.json", "/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json", "/pa/units/commanders/imperial_gamma/imperial_gamma.json", "/pa/units/commanders/imperial_gnugfur/imperial_gnugfur.json", "/pa/units/commanders/imperial_invictus/imperial_invictus.json", "/pa/units/commanders/imperial_kapowaz/imperial_kapowaz.json", "/pa/units/commanders/imperial_mjon/imperial_mjon.json", "/pa/units/commanders/imperial_progenitor/imperial_progenitor.json", "/pa/units/commanders/imperial_sangudo/imperial_sangudo.json", "/pa/units/commanders/imperial_seniorhelix/imperial_seniorhelix.json", "/pa/units/commanders/imperial_stelarch/imperial_stelarch.json", "/pa/units/commanders/imperial_thechessknight/imperial_thechessknight.json", "/pa/units/commanders/imperial_theta/imperial_theta.json", "/pa/units/commanders/imperial_toddfather/imperial_toddfather.json", "/pa/units/commanders/quad_ajax/quad_ajax.json", "/pa/units/commanders/quad_calyx/quad_calyx.json", "/pa/units/commanders/quad_mobiousblack/quad_mobiousblack.json", "/pa/units/commanders/quad_osiris/quad_osiris.json", "/pa/units/commanders/quad_raventhornn/quad_raventhornn.json", "/pa/units/commanders/quad_sacrificiallamb/quad_sacrificiallamb.json", "/pa/units/commanders/quad_shadowdaemon/quad_shadowdaemon.json", "/pa/units/commanders/quad_spartandano/quad_spartandano.json", "/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json", "/pa/units/commanders/quad_tokamaktech/quad_tokamaktech.json", "/pa/units/commanders/quad_twoboots/quad_twoboots.json", "/pa/units/commanders/quad_xenosentryprime/quad_xenosentryprime.json", "/pa/units/commanders/raptor_beast/raptor_beast.json", "/pa/units/commanders/raptor_best/raptor_best", "/pa/units/commanders/raptor_beniesk/raptor_beniesk.json", "/pa/units/commanders/raptor_betadyne/raptor_betadyne.json", "/pa/units/commanders/raptor_centurion/raptor_centurion.json", "/pa/units/commanders/raptor_diremachine/raptor_diremachine.json", "/pa/units/commanders/raptor_iwmiked/raptor_iwmiked.json", "/pa/units/commanders/raptor_majuju/raptor_majuju.json", "/pa/units/commanders/raptor_nefelpitou/raptor_nefelpitou.json", "/pa/units/commanders/raptor_nemicus/raptor_nemicus.json", "/pa/units/commanders/raptor_rallus/raptor_rallus.json", "/pa/units/commanders/raptor_stickman9000/raptor_stickman9000.json", "/pa/units/commanders/raptor_zaazzaa/raptor_zaazzaa.json", "/pa/units/commanders/tank_aeson/tank_aeson.json", "/pa/units/commanders/tank_banditks/tank_banditks.json", "/pa/units/commanders/imperial_jt100010117/imperial_jt100010117.json", "/pa/units/commanders/imperial_kevin4001/imperial_kevin4001.json", "/pa/units/commanders/imperial_mostlikely/imperial_mostlikely.json", "/pa/units/commanders/imperial_nagasher/imperial_nagasher.json", "/pa/units/commanders/imperial_tykus24/imperial_tykus24.json", "/pa/units/commanders/imperial_vidicarus/imperial_vidicarus.json", "/pa/units/commanders/imperial_visionik/imperial_visionik.json", "/pa/units/commanders/quad_commandonut/quad_commandonut.json", "/pa/units/commanders/quad_zancrowe/quad_zancrowe.json", "/pa/units/commanders/raptor_damubbster/raptor_damubbster.json", "/pa/units/commanders/raptor_spz58624/raptor_spz58624.json", "/pa/units/commanders/tank_sadiga/tank_sadiga.json"];


            model.isNotLegion = function (commander, isEmpty) {
                if (!isEmpty) {
                    return !_.includes(legioncommanders, commander);
                }
                else {
                    return true;
                }
            };

            model.isMLA = function (commander, isEmpty) {
                if (!isEmpty) {
                    return !_.includes(legioncommanders, commander);
                }
            };


            //Style Commander Picker Legion
            $('.div-commander-picker-item.btn_std_ix').attr("data-bind", "css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");

            //Style Slot Legion
            $('.slot-player').attr("data-bind", "css: {legionslot: !model.isNotLegion($data.commander(),$data.isEmpty()), mlaslot: model.isMLA($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}");

            model.changeLegionAI = function (playerid) {
                //console.log("change to legion");
                model.send_message('set_ai_commander', {
                    id: playerid,
                    ai_commander: legioncommanders[_.random(legioncommanders.length - 1)]
                });
            };

            model.changeVanillaAI = function (playerid) {
                //console.log("change to vanilla");
                model.send_message('set_ai_commander', {
                    id: playerid,
                    ai_commander: vanillacommanders[_.random(vanillacommanders.length - 1)]
                });
            };

            //NEED PATCHED lobby.js
            //To Legion Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai(),click: function() { model.changeLegionAI(slot.playerId());}">To Legion</div>');
            //To Vanilla Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai(),click: function() { model.changeVanillaAI(slot.playerId());}">To MLA</div>');
            //ENDOF NEED PATCHED lobby.js
        };

        if (_.intersection(model.gameModIdentifiers(), ['com.stuart98.po.server', 'com.stuart98.po.server.dev.redux']).length > 0) {
            model.enablePO();
        }
    }

    try {
        PO();
    } catch (e) {
        console.error(e);
    }
}