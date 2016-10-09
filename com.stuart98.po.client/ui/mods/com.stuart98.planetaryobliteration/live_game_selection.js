
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration live_game_selection.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        var themesetting = api.settings.isSet('ui','planetaryObliterationThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            // LOAD CUSTOM PLANETARY OBLITERATION CSS
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_selection.css");            

            model.isplanetaryobliteration = function (type){
                if(themesetting === "ON"){
                    hasplanetaryobliterationunit = false;
                    try{
                        if(type.indexOf("/l_") > 2){
                            hasplanetaryobliterationunit = true;
                            return hasplanetaryobliterationunit;
                        }
                    }
                    catch(e){
                    }

                    return hasplanetaryobliterationunit;
                }
                else{
                    return false;
                }
            };

            //ADD planetaryObliteration class to build_bar_menu
            $('.div_unit_selection').attr("data-bind","css: { planetaryobliteration: model.isplanetaryobliteration($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }");
        }

        handlers.planetaryobliterationui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "planetaryobliteration"){
                $('.body_panel').addClass("planetaryobliterationui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.stuart98.planetaryobliteration/img/control_group_bar/red/icon_category_' + type.toLowerCase() + '.png'
                };
                
                model.typeArray = ko.computed(function () {

                    var group = model.selectionTypeCounts();

                    var result = _.compact(_.map(model.types(), function (element) {
                        if (!group[element])
                            return null;

                        return {
                            type: element,
                            count: group[element],
                            source: imageSourceForType(element)
                        }
                    }));

                    return result;
                });                
                
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.stuart98.planetaryobliteration/img/control_group_bar/purple/icon_category_' + type.toLowerCase() + '.png'
                };
                
                model.typeArray = ko.computed(function () {

                    var group = model.selectionTypeCounts();

                    var result = _.compact(_.map(model.types(), function (element) {
                        if (!group[element])
                            return null;

                        return {
                            type: element,
                            count: group[element],
                            source: imageSourceForType(element)
                        }
                    }));

                    return result;
                });                      
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
