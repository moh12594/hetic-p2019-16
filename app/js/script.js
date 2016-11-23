$(document).ready(function(){
  $('a[href^=\\#]').click(function(){
    ancre=$(this).attr('href');
   if ($(ancre).length>=1) {
    height=$(ancre).offset().top;
   }
   else {
    height=$("a[name="+ancre.substr(1,cible.length-1)+"]").offset().top;
    }
    $('html,body').animate({scrollTop:height},1000);
    return false;
});
});
/****
VR
***/
var vrView;
var scenes = {
	salle14: {
		image: 'https://mohsadat.com/devprojet/img/vrhetic-converted.jpg',
		preview : 'https://mohsadat.com/devprojet/img/vrhetic-converted.jpg',
		hotspots: {
			couloir: {
	        pitch: 0,
	        yaw: -93,
	        radius: 0.05,
	        distance: 1
	      },
		}
	},
	couloir: {
		image: 'https://mohsadat.com/devprojet/img/couloir.jpg',
		preview : 'https://mohsadat.com/devprojet/img/couloir.jpg',
		hotspots: {
			salle14: {
					pitch: 0,
					yaw: -100,
					radius: 0.05,
					distance: 1
				},
		}
	},
	cafet: {
		image: 'https://mohsadat.com/devprojet/img/cafet.jpg',
		preview : 'https://mohsadat.com/devprojet/img/cafet.jpg',
		hotspots: {
			salle14: {
					pitch: 0,
					yaw: -100,
					radius: 0.05,
					distance: 1
				},
		}
	}
};
function onVrViewLoad() {
	vrView = new VRView.Player('#vrview', {
    width: '100%',
    height: 300,
    image: 'https://mohsadat.com/devprojet/img/vrhetic-converted.jpg',
    is_stereo: true,
    is_autopan_off: false,
  });

	vrView.on('ready', onVRViewReady);
	vrView.on('click', onHotspotClick);
}
function onVRViewReady(e) {
  loadScene('salle14');
}
function onHotspotClick(e) {
  if (e.id) {
    loadScene(e.id);
  }
}
function loadScene(id) {
  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: true,
    is_autopan_off: false,
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}
window.addEventListener('load', onVrViewLoad);
/*****
VR End
******/
/* Script changement de visite*/

function getVisit(currentVisit) {
	var vvvv = document.getElementById(currentVisit);
	var link = vvvv.dataset.visiteLink;
 	document.getElementById("vPrincipale").src = link;
 }
