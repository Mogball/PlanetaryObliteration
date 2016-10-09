
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function planetaryObliteration()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'planetaryObliteration settings.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
       _.extend(api.settings.definitions.ui.settings, {
            planetaryObliterationThemeFunction: {
                title: 'Theme In Game',
                type: 'select',
                default: 'ON',
                options: ['ON','OFF']
            }
        });
        
       _.extend(api.settings.definitions.ui.settings, {
            planetaryObliterationMenuThemeFunction: {
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
                url: 'coui://ui/mods/com.stuart98.planetaryobliteration/settings.html',
                async: false
            }).responseText
        );
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

var themesetting = api.settings.isSet('ui','planetaryObliterationMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    //load planetaryObliteration theme
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_buttons.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_shared.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/background_no_logo.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/settings.css");    
    $('body').addClass("planetaryObliteration");
}