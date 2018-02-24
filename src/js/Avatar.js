var Avatar = function(materials){

	var mat = MAT_DATA['star'];

	var armLength = 1.75, 
	legLength = 1.5, 
	torsoLength = 2.5, 
	torsoWidth = 3,
	torsoHeight = 3,
	headSize = 3.5;

	var geometries = {
		head: new THREE.BoxGeometry(headSize, headSize, headSize),
		torso: new THREE.CylinderGeometry(1.25, torsoWidth, torsoHeight, 4),
		arm: new THREE.BoxGeometry(1, armLength, 1),
		leg: new THREE.BoxGeometry(1, legLength, 1),
	};

	var head = new THREE.Mesh(geometries['head'], mat.clone());
	var torso = new THREE.Mesh(geometries['torso'], mat.clone());
	var armLeft = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
	var armRight = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
	var legLeft = new THREE.Mesh(geometries['leg'].clone(), mat.clone());
	var legRight = new THREE.Mesh(geometries['leg'].clone(), mat.clone());

	head.position.set(0, 2.75, 0);
	torso.position.set(0, 0, 0);
	torso.rotation.y = Math.PI/4;
	armLeft.position.set(-(torsoWidth/2), 0, 0);
	armRight.position.set((torsoWidth/2), 0, 0);
	legLeft.position.set(-.75, -(legLength+.5), 0);
	legRight.position.set(.75, -(legLength+.5), 0);

	torso.scale.multiplyScalar(.75);

	var g = new THREE.Group();
	g.add(head);
	g.add(torso);
	g.add(armLeft);
	g.add(armRight);
	g.add(legLeft);
	g.add(legRight);

	this.__proto__ = g;
}