
var planetaryObliterationLoaded;

if ( ! planetaryObliterationLoaded )
{

    planetaryObliterationLoaded = true;

    function onYouTubeIframeAPIReady() {
        model.planetaryObliterationYouTubeIframeAPIReady();
    }
        
    function planetaryObliteration()
    {

        console.log( 'planetaryObliteration start.js' );
        
        const planetaryObliteration_VIDEO_ID = 'fYsPl8DFW7I';
  
  // temp until fixes in PTE
    
        model.playingDefaultVideo = ko.observable(false);
        
        var playIntroVideo = model.playIntroVideo;
        
        model.playIntroVideo = function() {
            playIntroVideo();
            model.playingDefaultVideo(true); 
        }
        
        var introVideoComplete = model.introVideoComplete;

        model.introVideoComplete = function() {
            introVideoComplete();
            model.playingDefaultVideo(false); 
        }

        var modalBack = model.modalBack;
        
        model.modalBack = function() {
            if (model.playingDefaultVideo()) {
                modalBack();
                return;
            }
            
            model.planetaryObliterationStopVideo();
        }
//
              
        model.showplanetaryObliterationGuidesMenu = ko.observable(false);

        model.planetaryObliterationToggleGuides = function() {
            if(model.showplanetaryObliterationGuidesMenu()) {
                model.showplanetaryObliterationGuidesMenu(false);
            }
            else {
                model.showplanetaryObliterationGuidesMenu(true);
                model.showSinglePlayerMenu(false);
                model.showMultiplayerMenu(false);
            }
        }
        model.navToplanetaryObliterationGuide1 = function(){
            engine.call('web.launchPage', 'http://exodusesports.com/article/planetary-annihilation-titans/');
            model.showplanetaryObliterationGuidesMenu(false);
        }

        model.navToplanetaryObliterationGuide2 = function(){
            engine.call('web.launchPage', 'http://exodusesports.com/article/planetaryObliteration-expansion-community-faction-mod/');
            model.showplanetaryObliterationGuidesMenu(false);
        }

        //ADD GUIDES MENU
        $("#nav_mods").before('<div class="nav_cascade_group"><div class="btn_std_ix nav_item nav_item_text" data-bind="click: planetaryObliterationToggleGuides, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showplanetaryObliterationGuidesMenu }">planetaryObliteration Guides <div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div><div class="nav_sub_item" data-bind="visible: showplanetaryObliterationGuidesMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToplanetaryObliterationGuide1, click_sound: \'default\', rollover_sound: \'default\'">TITANS</div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToplanetaryObliterationGuide2, click_sound: \'default\', rollover_sound: \'default\'">planetaryObliteration</div></div> </div>')

        var planetaryObliterationOriginalToggleSinglePlayerMenu = model.toggleSinglePlayerMenu;
        var planetaryObliterationOriginalToggleMultiplayerPlayerMenu = model.toggleMultiplayerMenu;
        var planetaryObliterationOriginalHideSubMenus = model.hideSubMenus;

        model.toggleSinglePlayerMenu = function () {
            planetaryObliterationOriginalToggleSinglePlayerMenu();
            model.showplanetaryObliterationGuidesMenu(false);
        };
        
        model.toggleMultiplayerMenu = function () {
          planetaryObliterationOriginalToggleMultiplayerPlayerMenu();
          model.showplanetaryObliterationGuidesMenu(false);
        };


        model.hideSubMenus = function(data, event) {
            planetaryObliterationOriginalHideSubMenus(data, event);
            if (document.getElementById("navigation_panel").contains(event.target))
                return;
            model.showplanetaryObliterationGuidesMenu(false);
        };

// includes some temp CSS until next PTE

        $('div.view_intro').css( 'padding', '8px 0px' ).css( 'text-align', 'center' ).css( 'width', '50px' ).after('<div class="btn_std_ix view_intro" style="padding: 8px 0px; text-align: center; width: 50px" data-bind="enabled: planetaryObliterationShowVideoButton, click: planetaryObliterationPlayVideo, click_sound: \'default\', rollover_sound: \'default\'">planetaryObliteration Intro</div>');

        $('div.div_watermarks').css( 'bottom', '95px' );

//
        
        delete localStorage.planetaryObliteration_intro_one_time;
        
        model.planetaryObliterationVideoPlayed = ko.observable( false ).extend( { local: 'planetaryObliteration_intro_video_played' } );
        
        model.planetaryObliterationYouTubeReady = ko.observable( false );
        
        model.planetaryObliterationYouTubePlayer = ko.observable( undefined );
        
        model.planetaryObliterationYouTubeIframeAPIReady = function() {
            
            model.planetaryObliterationYouTubeReady( true );

            if ( ! model.planetaryObliterationVideoPlayed() ) {
                model.planetaryObliterationPlayVideo();
            }
        }

        model.planetaryObliterationShowVideoButton = ko.computed( function() {
            return model.planetaryObliterationYouTubeReady() && ! model.planetaryObliterationYouTubePlayer();
        });
        
        model.planetaryObliterationVideoPlayerReadyEvent = function(event) {
            
            model.planetaryObliterationVideoPlayed(true);
            engine.call('audio.pauseMusic', true);
            engine.call("audio.setVideoVolumeScale", 1);
            
            $('#planetaryObliterationYouTubePlayer').fadeIn();
        }
        
        model.planetaryObliterationStopVideo = function() {
            
            var player = model.planetaryObliterationYouTubePlayer();
            
            if ( player) {
                $('#planetaryObliterationYouTubePlayer').fadeOut( function() {
                    player.destroy();
                    $('#planetaryObliterationYouTubePlayer').remove();
                    model.planetaryObliterationYouTubePlayer(false)
                });
            }
        }
        
        model.planetaryObliterationYouTubePlayerStateChangeEvemt = function(event) {

            var state = event && event.data;
            
            if ( state == YT.PlayerState.PAUSED || state == YT.PlayerState.ENDED ) {
                model.planetaryObliterationStopVideo();
            }
        }
        
        model.planetaryObliterationYouTubePlayerErrorEvent = function(event) {
console.error('planetaryObliterationYouTubePlayerErrorEvent ' + JSON.stringfy(event));
            model.planetaryObliterationStopVideo();
        }
        
        model.planetaryObliterationPlayVideo = function() {

            if ( model.planetaryObliterationYouTubePlayer() ) {
                return;
            }
            
            $('body').append('<div id="planetaryObliterationYouTubePlayer" style="display: none; position: absolute; z-index: 9999; top: 0; left: 0; width: 100%; height: 100%; "></div>');
        
            var player  = new YT.Player('planetaryObliterationYouTubePlayer', {
                height: '100%',
                width: '100%',
                videoId: planetaryObliteration_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    disablekb : 0,
                    origin: 'https://www.youtube.com'
                },
                events: {
                    onReady: model.planetaryObliterationVideoPlayerReadyEvent,
                    onStateChange: model.planetaryObliterationYouTubePlayerStateChangeEvemt,
                    onError: model.planetaryObliterationYouTubePlayerErrorEvent
                }            
            });
            
            model.planetaryObliterationYouTubePlayer(player);         
        }
  
        var themesetting = api.settings.isSet('ui','planetaryObliterationMenuThemeFunction',true) || 'ON';

        if(themesetting === "ON") {
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_buttons.css");
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/planetaryObliteration_shared.css");
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/background_logo.css");
            loadCSS("coui://ui/mods/com.stuart98.planetaryobliteration/css/start.css");
            $('body').addClass("planetaryObliteration");
        }
    }

    try
    {
        planetaryObliteration();
    }
    catch (e)
    {
        console.error(e);
    }
}

