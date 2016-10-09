var themesetting = api.settings.isSet('ui','POMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
	//load PO theme
    //todo css
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_buttons.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_shared.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_background_no_logo.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_load_planet.css");	
    $('body').addClass("PO");
}