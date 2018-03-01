var Avatar = function(materials){

    var mat = MAT_DATA['star'];

    var armLength = 2.75,
	legLength = 1.5,
	torsoLength = 2.5,
	torsoWidth = 3,
	torsoHeight = 3,
	headSize = 3.5;

    var geometries = {
	head: new THREE.BoxGeometry(headSize, headSize, headSize),
	torso: new THREE.CylinderGeometry(1.25, torsoWidth, torsoHeight, 4),
	joint:new THREE.SphereGeometry(0.1, 32, 32),
	arm: new THREE.BoxGeometry(1, armLength, 1),
	leg: new THREE.BoxGeometry(1, legLength, 1),
    };

    var head = new THREE.Mesh(geometries['head'], mat.clone());
    var neck = new THREE.Mesh(geometries['neck'], mat.clone());
    var torso = new THREE.Mesh(geometries['torso'], mat.clone());
    var shoulderLeft = new THREE.Mesh(geometries['joint'], mat.clone());
    var shoulderRight = new THREE.Mesh(geometries['joint'], mat.clone());
    var armLeft = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
    var armRight = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
    var thighLeft = new THREE.Mesh(geometries['joint'].clone(), mat.clone());
    var thighRight = new THREE.Mesh(geometries['joint'].clone(), mat.clone());
    var legLeft = new THREE.Mesh(geometries['leg'].clone(), mat.clone());
    var legRight = new THREE.Mesh(geometries['leg'].clone(), mat.clone());

    head.position.set(0, 2.75, 0);
    torso.position.set(0, 0, 0);

    shoulderLeft.position.set(-0.75*(torsoWidth), 0, 0);
    shoulderRight.position.set(0.75*(torsoWidth), 0, 0);

    thighLeft.position.set((-0.25)* torsoWidth, -torsoHeight* 0.5, 0);
    thighRight.position.set((0.25)* torsoWidth, -torsoHeight* 0.5, 0);

    legLeft.position.set(0, -(legLength * 0.5), 0);
    legRight.position.set(0, -(legLength * 0.5), 0);

    armLeft.position.set(0, (-armLength * 0.5), 0)
    armRight.position.set(0, (-armLength * 0.5), 0)

    //Left Arm group
    shoulderLeft.add(armLeft);
    shoulderRight.add(armRight);

    thighLeft.add(legLeft)
    thighRight.add(legRight)

    neck.name = "AvatarNeck"
    
    //Top group
    neck.add(head)

    torso.add(neck)
    
    //Add arm joints
    torso.add(shoulderLeft)
    torso.add(shoulderRight)

    //Add Leg joints
    torso.add(thighLeft)
    torso.add(thighRight)

    torso.scale.multiplyScalar(.75);

    let g = new THREE.Group()
    g.add(torso);

    g.animations = {}

    const bodyPosAnim = function(destinationVec){

	const changeX = destinationVec.x - torso.position.x
	const changeY = destinationVec.y - torso.position.y
	const changeZ = destinationVec.z - torso.position.z

	let start = {
	    posX:0,
	    posY:0,
	    posZ:0
	}

	const end = {
	    posX:changeX,
	    posY:changeY,
	    posZ:changeZ
	}

	let tween =
	    new TWEEN.Tween(start)
		     .to(end, 2000);

	tween.onUpdate( () => {
	    torso.position.set(start.posX,
			       start.posY,
			       start.posZ)
	})

	tween.easing(TWEEN.Easing.Quartic.InOut)
	tween.delay(500);
	return tween
    }

    const bodyRotAnim = function(movementVec){
	//Rotate the body based on how he moved
	//Rotation should be in opposite direction of movement vector
	//Assume movement vec is a vector 3 we can use
	const up = new THREE.Vector3(0,1,0)
	let rotationAxis =
	    new THREE.Vector3()
		     .crossVectors( movementVec.normalize(),
				    up)
	const startAngle = 0
	const endAngle = -Math.PI/4

	let angle = {angle:0}
	let tween =
	    new TWEEN.Tween(angle)
		     .to({angle:endAngle}, 1000);

	const childMod = 1.5

	tween.onUpdate( () => {
	    torso.setRotationFromAxisAngle(rotationAxis,
					   angle.angle)
	    //Add an extra rotation to children (neck, shoulder, shoulder, thigh, thigh)
	    torso.children.forEach( elem => {
		if(elem.name != "AvatarNeck")
		    elem.setRotationFromAxisAngle(rotationAxis,
					      childMod * angle.angle)
	    })

	})

	tween.easing(TWEEN.Easing.Quartic.In)
	tween.delay(500);

	let angle2 = {angle:endAngle}
	let tween2 =
	    new TWEEN.Tween(angle2)
		     .to({angle:startAngle}, 1000);

	tween2.delay(100)

	tween2.onUpdate( () => {
	    torso.setRotationFromAxisAngle(rotationAxis,
					   angle2.angle)
	    torso.children.forEach( (elem, index) => {
		if(elem.name != "AvatarNeck")
		    elem.setRotationFromAxisAngle(rotationAxis,
					      childMod * angle2.angle)
	    })
	    
	})

	tween2.easing(TWEEN.Easing.Elastic.Out)
	//Add second to first
	tween.chain(tween2)

	return tween
    }


    g.animations.bodyPosAnim = bodyPosAnim;
    g.animations.bodyRotAnim = bodyRotAnim;

    return g;

}
