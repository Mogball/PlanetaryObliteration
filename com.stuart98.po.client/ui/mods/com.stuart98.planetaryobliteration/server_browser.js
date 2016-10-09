(function() {
	var processGameBeacon = model.processGameBeacon;
	model.processGameBeacon = function(beacon, region, lobby_id, host, port) {
		var result = processGameBeacon.apply(model, arguments);
		if (result.hasOwnProperty("mod_names")) {
			for (var i = 0; i < result["mod_names"].length; i++) {
				if (result["mod_names"][i].startsWith("Planetary Obliteration")) {
					result["planetaryObliteration"] = true;
					break;
				} else {
					result["planetaryObliteration"] = false;
				}
			}
		}
		return result;
	}

	$("#game-list .col-md-3").append('<span class="lbl_titans lbl_planetaryObliteration" data-bind="visible: $data.planetaryObliteration"><noloc>Planetary Obliteration<noloc></span>');
	$("#detail-pane div").first().append('<div class="lbl_titans lbl_planetaryObliteration details" data-bind="visible: $data.planetaryObliteration, css: { lbl_titans_missing: $data.is_missing_content }"><loc>Planetary Obliteration</loc></div>');
})();


var themesetting = api.settings.isSet('ui','planetaryObliterationMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
	//load planetaryObliteration theme
	loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_buttons.css");
	loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_shared.css");
	loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/background_no_logo.css");
	loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/server_browser.css");	
    $('body').addClass("planetaryObliteration");
}