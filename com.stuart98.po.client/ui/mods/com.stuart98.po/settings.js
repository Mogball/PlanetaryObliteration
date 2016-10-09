
var POLoaded;

if ( ! POLoaded )
{

    POLoaded = true;

    function PO()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'PO settings.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
       _.extend(api.settings.definitions.ui.settings, {
            POThemeFunction: {
                title: 'Theme In Game',
                type: 'select',
                default: 'ON',
                options: ['ON','OFF']
            }
        });
        
       _.extend(api.settings.definitions.ui.settings, {
            POMenuThemeFunction: {
                title: 'Theme Menu',
                type: 'select',
                default: 'ON',
                options: ['ON','OFF']
            }
        });        
      
      
       model.settingDefinitions(api.settings.definitions);
       
        $(".option-list.ui .form-group").append(
            $.ajax({
                type: "GET",
                url: 'coui://ui/mods/com.stuart98.po/settings.html',
                async: false
            }).responseText
        );
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

var themesetting = api.settings.isSet('ui','POMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    loadCSS("coui://ui/mods/com.stuart98.po/css/PO_buttons.css");
    loadCSS("coui://ui/mods/com.stuart98.po/css/PO_shared.css");
    loadCSS("coui://ui/mods/com.stuart98.po/css/PO_background_no_logo.css");
    loadCSS("coui://ui/mods/com.stuart98.po/css/PO_settings.css");    
    $('body').addClass("PO");
}