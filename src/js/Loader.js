const MODELS_PATH = 'assets/models/';

var Loader = (function () {
    const manager = new THREE.LoadingManager();
    const objLoader = new THREE.ObjectLoader(manager);
    const fontLoader = new THREE.FontLoader(manager);
    const textureLoader = new THREE.TextureLoader(manager);
    const audioLoader = new THREE.AudioLoader(manager);
    // const $progress = document.getElementById('progress');

    var reduceableModels = ['banana', 'raspberry', 'pumpkin'];

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onLoad = function () {
        // init();
    };

    this.loadRig = function(file) {

        var path = MODELS_PATH + file + '.json';

        objLoader.load( 
            path,

            (loadedObject)=>{

                let mesh;

                loadedObject.traverse( function ( child ) {

                if ( child instanceof THREE.SkinnedMesh ) {

                    mesh = child;
                    child.material.transparent = true;
                    child.material.opacity = 0;
                    RIG_DATA[file] = mesh;

                    console.log('load rig');
                    init();

                }

                } );

                if ( mesh === undefined ) {

                    alert( 'Unable to find a SkinnedMesh in this place:\n\n' + url + '\n\n' );
                    return;

                }

            },
        );

    };

    this.loadTexture = function(file){
        textureLoader.load(
            TEXTURE_ASSETS_PATH + file + '.png',

            function(texture){
                TEXTURE_DATA[file] = texture;
            }
        )
    };

    this.loadFont = function(file) {
        fontLoader.load(
            FONT_ASSETS_PATH + file + '.typeface.json',

            function(font) {
                FONTS_DATA[file].font = font;
            }
        );
    };

    this.loadAudio = function(file, ext) {
        audioLoader.load(
            AUDIO_ASSETS_PATH + file + ext,

            function(buffer) {
                AUDIO_DATA[file].buffer = buffer;
            }
        );
    }

    return this;
}());

for (var obj in RIG_DATA) {
    Loader.loadRig(obj);
}
