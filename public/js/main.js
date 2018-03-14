//Main Script

var renderer, camera, scene, controls, spotLight;
var clock;
var globe, testMesh;

const init = () => {
    scene = new THREE.Scene();
    renderer = initializeRenderer();
    camera = initializeCamera();
    controls = initializeControls(camera, renderer);

    spotLight = new THREE.SpotLight();
    spotLight.intensity = 0;
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

    // let charData = getRandomCharacterData();
    // let charData = getCharData('houseGuy');
    // user_data.character = charData;
    // testMesh = new Avatar(charData);

    // let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(0), GLOBE_RADIUS * Math.sin(0));
    // testMesh.position.copy(pos);
    // testMesh.position.add(testMesh.offset);
    // scene.add(testMesh);

    let sGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 10, 10);
    let sMat = new THREE.MeshPhongMaterial({
        emissive: COLORS.teal, 
        specular: 0xffffff,
        shininess: 0
    });
    innerGlobe = new THREE.Mesh(sGeom, sMat);
    scene.add(innerGlobe);

    // userEntries = APIController.getRecentEntries(3);
    // console.log(userEntries);

    const charName = getRandomCharName(Object.keys(CHAR_DATA));
    // console.log(charName);
    const data = getCharData(charName);
    const a = new Avatar(data);
    const angle = 2*Math.PI / 4 * 0;
    let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
    
    a.position.copy(pos);
    a.position.add(a.offset);
    a.rotation.x = angle;

    user_data.character = data;
    testMesh = a;
    testMesh.castShadow = true;
    
    const testMeshBox = new THREE.Box3().setFromObject(testMesh);
    const testMeshHeight = Math.abs(testMeshBox.max.y - testMeshBox.min.y);
    testMesh.position.y += testMeshHeight / 2 + testMesh.offset.y;

    scene.add(testMesh);

    spotLight.target = testMesh;
    let container = new THREE.Object3D();
    container.add(spotLight);
    container.scale.divide(testMesh.scale);
    testMesh.add(container);
    testMesh.light = spotLight;

    let c = {};
    c.name = testMesh.name;
    c.text = testMesh.text;
    c.character = testMesh;
    checkpoints.push(c);

    const maxNumChars = isMobile ? 2 : 4;
    let numChars = 1;
    APIController.getUniqueEntries(4)
    .then( res => {

        entries = res;

        entries.forEach( (e, i) => {

            let charData = e.character;

            if(charData.name === testMesh.name || numChars === maxNumChars){ //do not exceed 3 other chars
                return;
            }

            const a = new Avatar(charData);
            const angle = 2*Math.PI / (maxNumChars) * (numChars);
            let pos = new THREE.Vector3(0, GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle));
            let box = new THREE.Box3().setFromObject(a);
            let height = Math.abs(box.max.y - box.min.y);
            let factor = (height/2 + a.offset.y) / (pos.length());

            pos.multiplyScalar(1 + factor);

            a.position.copy(pos);
            a.position.add(a.offset);

            a.rotation.x = angle;
            a.rotation.y += Math.PI;

            e.character = a;
            checkpoints.push(e);

            innerGlobe.add(a);
            numChars++;

        });

        /* start animations */

        checkpoints.forEach( c => {

            const idleAnims = getIdleAnim(c.character)
            
            console.log(idleAnims);
            //Start animations
            idleAnims.forEach( elem => {
               elem.start()
            });

        });


    });

    if(!isMobile){
        globe = new Globe(GLOBE_RADIUS+2.5, new THREE.Color(0xffe877), testMesh.position);
        // globe.position.y = -GLOBE_RADIUS;
        // globe.receiveShadow = true;
        scene.add(globe);
    }

    // testMesh.position.add(testMesh.offset);
    // testMesh.position.y += GLOBE_RADIUS;
    // let s = 1;
    // testMesh.scale.multiplyScalar(s);

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);

    //Monitor the mouse position
    window.addEventListener('mousemove', mouse_monitor);
    
    let x = 0, y = 1, z = 0;

    var pointStart = new THREE.Vector3(x, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var pointEnd = new THREE.Vector3(x-.0001, y, z).normalize().multiplyScalar(GLOBE_RADIUS);
    var curve = setArc3D(pointStart, pointEnd, 3000, "lime", true);
    // scene.add(curve);
    
    testMesh.movementFunc = genMoveAlongCurve(curve, 50, clock.elapsedTime);

    WORLD_CONTROLLER = createController(renderer, scene, camera, testMesh, globe);
    if(globe){
        WORLD_CONTROLLER.setWorldLights(1);
        WORLD_CONTROLLER.expandStarField(100);
    }

    WORLD_CONTROLLER.setMainLightIntensity(.3);
    // WORLD_CONTROLLER.moveCamera('behind');

    UIController = createUIController();

    UIController.setUserCharacter(testMesh.name);
    // UIController.showQuoteMainInfo();

    document.body.addEventListener('keydown', UIController.handleKeyDown);
    document.body.addEventListener('keyup', UIController.handleKeyUp);

    AudioController = CreateAudioController();
    // AudioController.playNight();

    clock.start();
    WORLD_CONTROLLER.animate();

}
