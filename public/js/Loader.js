const MODELS_PATH = '/assets/models/';
const FONTS_PATH = '/assets/fonts/';

var Loader = (function () {
    const manager = new THREE.LoadingManager();
    const objLoader = new THREE.ObjectLoader(manager);
    const textureLoader = new THREE.TextureLoader(manager);
    const audioLoader = new THREE.AudioLoader(manager);
    const jsonLoader = new THREE.JSONLoader(manager);
    const fontLoader = new THREE.FontLoader(manager);
    // const $progress = document.getElementById('progress');

    var reduceableModels = ['banana', 'raspberry', 'pumpkin'];

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onLoad = function () {
        setTimeout(function(){ //let page render before calling init (push to event queue)
            initData();
            init();
            document.getElementById('loading').style.opacity = 0;
            setTimeout(function(){
                document.getElementById('loading').style.display = "none";
            }, 600);
        }, 0);
    };

    const loadFont = file => {

        let path = FONTS_PATH + file + '.json';

        let font = fontLoader.load(

            path,

            // onLoad callback
            function ( font ) {

               FONT_DATA[file] = font;

            },

        );

    }

    const loadObj = file => {

        objLoader.load(

            MODELS_PATH + file + '.json',

            obj => {

                obj.children.forEach( c => {

                    if (c instanceof THREE.Mesh){

                        c.position.set(0, 0, 0); //reset any position changes, position them later
                        c.rotation.set(0, 0, 0);
                        let n = c.name
                        MODEL_DATA[file][n] = {};

                        MODEL_DATA[file][n].mesh = c;

                    }

                });

            }
        )

    }

    const loadTexture = function(file){
        textureLoader.load(
            TEXTURE_ASSETS_PATH + file + '.png',

            function(texture){
                TEXTURE_DATA[file] = texture;
            }
        )
    };

    const loadAudio = function(file, ext) {
        audioLoader.load(
            AUDIO_ASSETS_PATH + file + ext,

            function(buffer) {
                AUDIO_DATA[file].buffer = buffer;
            }
        );
    }

    return {
        loadFont: loadFont,
        loadTexture: loadTexture,
        loadObj: loadObj,
        loadAudio: loadAudio,
    };
}());

for (let file in MODEL_DATA) {
    Loader.loadObj(file);
}

for (let file in FONT_DATA){
    Loader.loadFont(file);
}
