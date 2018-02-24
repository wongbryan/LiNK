const MODELS_PATH = 'assets/models/';

var Loader = (function () {
    const manager = new THREE.LoadingManager();
    const objLoader = new THREE.ObjectLoader(manager);
    const fontLoader = new THREE.FontLoader(manager);
    const textureLoader = new THREE.TextureLoader(manager);
    const audioLoader = new THREE.AudioLoader(manager);
    const jsonLoader = new THREE.JSONLoader(manager);
    // const $progress = document.getElementById('progress');

    var reduceableModels = ['banana', 'raspberry', 'pumpkin'];

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onLoad = function () {
        init();
    };


    this.loadObj = file => {

        objLoader.load(

            MODELS_PATH + file + '.json',

            obj => {

                obj.children.forEach( c => {

                    if (c instanceof THREE.Mesh){

                        c.position.set(0, 0, 0); //reset any position changes, position them later
                        c.rotation.set(0, 0, 0);
                        let n = c.name
                        
                        if ( n in MODEL_DATA[file] ){

                            MODEL_DATA[file][n].mesh = c.clone();

                        }

                    }

                });

            }
        )

    }

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

for (let file in MODEL_DATA) {
    Loader.loadObj(file);
}
