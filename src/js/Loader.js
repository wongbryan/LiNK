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
        // init();
    };


    this.loadSkinnedMesh = function(file) {

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

    this.loadModel = function(file){
        var path = MODELS_PATH + file + '.json';

        objLoader.load( 
            path,

            (obj)=>{

                var mesh;
                var group = new THREE.Group();
                var meshCount = 0;

                var matData = MODEL_DATA[file].materials;
                var mats = [];

                matData.map( name => {

                    mats.push(MAT_DATA[name]);

                })

                obj.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh ){

                        console.log(child);

                        if ( mesh == undefined ){

                            var mat = mats[meshCount].clone();
                            child.material = mat;
                            mesh = child;
                            group.add(mesh.clone());

                        }

                        else if ( mesh instanceof THREE.Mesh && child instanceof THREE.Mesh ){
                            
                            var mat = mats[meshCount].clone();
                            child.material = mat;
                            group.add(child);


                        }

                        meshCount++;

                    }

                } );

                if (mesh == undefined){
                    console.log('No mesh found in scene.');
                    return;
                }
                
                if (meshCount > 1){
                    MODEL_DATA[file].mesh = group;
                }
                else{
                    MODEL_DATA[file].mesh = mesh;
                }   

            },
        );
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

for (var obj in RIG_DATA) {
    Loader.loadSkinnedMesh(obj);
}

for (var obj in MODEL_DATA) {
    Loader.loadModel(obj);
}
