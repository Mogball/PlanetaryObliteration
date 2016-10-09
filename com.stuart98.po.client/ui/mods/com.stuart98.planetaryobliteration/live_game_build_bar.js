var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_build_bar.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        if (model.BuildSet && model.BuildSet.tabsTemplate) {
            model.BuildSet.tabsTemplate = model.BuildSet.tabsTemplate.concat([
                ['L_factory', '!LOC:factory', true],
                ['L_combat', '!LOC:combat', true],
                ['L_utility', '!LOC:utility', true],
                ['L_vehicle', '!LOC:vehicle'],
                ['L_bot', '!LOC:bot'],
                ['L_air', '!LOC:air'],
                ['L_sea', '!LOC:sea'],
                ['L_orbital', '!LOC:orbital', true],
                ['L_orbital_structure', 'orbital structure', true],
                ['L_ammo', '!LOC:ammo', true],
            ]);
        }
                    
        ko.computed(function() {
            var buildSet = model.buildSet();
            if (!buildSet)
                return;
            var hotkeys = model.hotkeys();
            var groups = buildSet.tabsByGroup()

            setTimeout(function() {
                // Get tab hotkeys
                _.forEach(buildSet.tabs(), function(tab) {
                    var baseTab = tab.group().replace('L_', '')
                    if (!tab.label()) {
                        tab.label(groups[baseTab].label())
                    }
                    tab.hotkey(hotkeys['tab_' + baseTab] || '');

                    tab.buildGroup = tab.buildGroup || ko.observable(baseTab)
                    tab.buildGroup(baseTab)
                });
            }, 0)
        })
        
        handlers.start_build_sequence = model.startBuildSequence = function(params) {
            var group = params.group;
            var locked = params.locked;

            var tabs = model.buildSet().tabs().filter(function(tab) {
                return tab.visible() && tab.buildGroup() == group
            })
            if (tabs.length < 1) return
            group = tabs[0].group()

            model.activeBuildGroup(group);
            if (locked)
                model.activeBuildGroupLocked(locked);
        };
        
        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        if(themesetting === "ON"){ 
            //LOAD CUSTOM planetaryObliteration BUILDBAR CSS
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_build_bar.css");
            loadScript("coui://ui/mods/com.stuart98.planetaryobliteration/common.js");

            //see global.js
            var planetaryObliterationspecids = planetaryObliterationglobal.builders;

            model.isplanetaryobliterationOrMixedOrVanilla = function (data) {
                    try{                         
                        var planetaryobliterationcount = 0;
                        var specslength = 0;
                        var selectedspecs = data.buildSet().selectedSpecs();
                        
                        _.forOwn(selectedspecs, function(value, key){
                            if(_.includes(planetaryobliterationspecids, key)){
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

            //ADD planetaryobliteration / mixed ui
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
