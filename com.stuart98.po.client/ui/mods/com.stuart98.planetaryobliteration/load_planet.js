var themesetting = api.settings.isSet('ui','planetaryObliterationMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    //load planetaryObliteration theme
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_buttons.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_shared.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/background_no_logo.css");
    loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/load_planet.css");    
    $('body').addClass("planetaryObliteration");
}