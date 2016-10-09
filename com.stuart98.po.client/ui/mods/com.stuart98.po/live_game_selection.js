
var POLoaded;

if ( ! POLoaded )
{

    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO live_game_selection.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        //load po theme
        var themesetting = api.settings.isSet('ui','POThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            loadCSS("coui://ui/mods/com.stuart98.po/css/PO_selection.css");         
            $('.body_panel').addClass("POui");
            
            var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.stuart98.po/img/control_group_bar/green/icon_category_' + type.toLowerCase() + '.png'
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

            model.isLegion = function (type){
                if(themesetting === "ON"){
                    haslegionunit = false;
                    try{
                        if(type.indexOf("/l_") > 2){
                            haslegionunit = true;
                            return haslegionunit;
                        }
                    }
                    catch(e){
                    }

                    return haslegionunit;
                }
                else{
                    return false;
                }
            };

            //ADD legion class to build_bar_menu
            $('.div_unit_selection').attr("data-bind","css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }");
        }

        /*dno what this does
        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.stuart98.po/img/control_group_bar/green/icon_category_' + type.toLowerCase() + '.png'
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
            /*mixed not needed
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.stuart98.po/img/control_group_bar/purple/icon_category_' + type.toLowerCase() + '.png'
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
