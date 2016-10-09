(function() {
	var processGameBeacon = model.processGameBeacon;
	model.processGameBeacon = function(beacon, region, lobby_id, host, port) {
		var result = processGameBeacon.apply(model, arguments);
		if (result.hasOwnProperty("mod_names")) {
			for (var i = 0; i < result["mod_names"].length; i++) {
				if (result["mod_names"][i].startsWith("Planetary Obliteration")) {
					result["PO"] = true;
					break;
				} else {
					result["PO"] = false;
				}
			}
		}
		return result;
	}

	$("#game-list .col-md-3").append('<span class="lbl_titans lbl_PO" data-bind="visible: $data.PO"><noloc>PO<noloc></span>');
	$("#detail-pane div").first().append('<div class="lbl_titans lbl_PO details" data-bind="visible: $data.PO, css: { lbl_titans_missing: $data.is_missing_content }"><loc>Planetary Obliteration</loc></div>');
})();


	//load PO theme
var themesetting = api.settings.isSet('ui','POMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    //todo css
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_buttons.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_shared.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_background_no_logo.css");
	loadCSS("coui://ui/mods/com.stuart98.po/css/po_server_browser.css");	
    $('body').addClass("PO");
}