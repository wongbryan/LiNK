//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

let activeCharacter = 0; //index of current char

const init = () => {
    scene = new THREE.Scene();
    renderer = initializeRenderer();
    camera = initializeCamera();
    controls = initializeControls(camera, renderer);

    spotLight = new THREE.SpotLight();
    spotLight.intensity = .3;
    spotLight.distance = 85;
    spotLight.penumbra = 1;
    spotLight.angle = .8;
    spotLight.decay = 1.5;

    spotLight.shadow.camera.left = -5;
    spotLight.shadow.camera.right = 55;
    spotLight.shadow.camera.top = 5;
    spotLight.shadow.camera.bottom = -5;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 100;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.castShadow = true;
    spotLight.position.set(-10, 30, 0);
    scene.add(spotLight);

    let sGeom = new THREE.SphereGeometry(GLOBE_RADIUS-25, 32, 32);
    let sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal, 
        specular: 0xffffff,
        shininess: 0
    });
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    let str = capitalizeWords(entry.name);
    str = (entry.location) ? str + ", " + entry.location : str;
    setActiveBox(entry.text, "-" + str);

    const data = entry.character;
    const a = new Avatar(data);
    const angle = 2*Math.PI / 4 * 0;
    let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
    
    a.position.copy(pos);
    a.position.add(a.offset);
    a.rotation.x = angle;

    testMesh = a;
    testMesh.castShadow = true;
    
    const testMeshBox = new THREE.Box3().setFromObject(testMesh);
    const testMeshHeight = Math.abs(testMeshBox.max.y - testMeshBox.min.y);
    testMesh.position.y += testMeshHeight / 2 + testMesh.offset.y;

    innerGlobe.add(testMesh);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divide(testMesh.scale);
    testMesh.add(container);
    testMesh.light = spotLight;

    innerGlobe.add(testMesh);

    if(!reduced){
        globe = new Globe(GLOBE_RADIUS+2.5, new THREE.Color(0xffe877), testMesh.position);
        scene.add(globe);
    }

    characters = [];
    entry.avatar = testMesh;
    characters.push(entry);

    const idleAnims = getIdleAnim(testMesh)

    idleAnims.forEach( elem => {
       elem.start()
    });

    /* Get similar quotes */

    const maxNumChars = (entry.sentiment_users.length < 3) ? entry.sentiment_users.length : 4;
    entry.sentiment_users.forEach( id => {

        APIController.getEntry(id)
        .then( e => {

            const numChars = characters.length;
            
            if(numChars >= maxNumChars){
                console.log(numChars);
                document.getElementById('loading').style.opacity = 0;
                setTimeout(function(){
                    document.getElementById('loading').style.display = "none";
                }, 600);
                return;
            }

            const a = new Avatar(e.character);
            const angle = 2*Math.PI / maxNumChars * (numChars + 1); //start at second one
            const pos = new THREE.Vector3(GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle), 0);
            a.position.copy(pos);
            a.position.add(a.offset);
            a.rotation.z = angle - Math.PI/2;
            innerGlobe.add(a);

            e.avatar = a;
            characters.push(e);

            if(!reduced){
                const idleAnims = getIdleAnim(e.avatar)

                idleAnims.forEach( elem => {
                   elem.start()
                });
            }

        })
        .catch( err => {
            console.log(err);
        })

    });

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    clock.start();
    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    WORLD_CONTROLLER.setWorldLights(1);
    WORLD_CONTROLLER.setMainLightIntensity(.5);
    WORLD_CONTROLLER.expandStarField(100);
    WORLD_CONTROLLER.moveCamera('frontClose');

    WORLD_CONTROLLER.animate();

    document.getElementById('moveLeft').addEventListener('mousedown', function(){
        moveLeft();
        activeCharacter = (activeCharacter === 0) ? characters.length-1 : activeCharacter - 1;
        const d = characters[activeCharacter];
        let str = "-" + capitalizeWords(d.name);
        str = (d.location) ? str + ", " + d.location : str;
        setActiveBox(d.text, str);
    });

    document.getElementById('moveRight').addEventListener('mousedown', function(){
        moveRight();
        activeCharacter = (activeCharacter === characters.length-1) ? 0 : activeCharacter + 1;
        const d = characters[activeCharacter];
        let str = "-" + capitalizeWords(d.name);
        str = (d.location) ? str + ", " + d.location : str;
        setActiveBox(d.text, str);
    });

}
