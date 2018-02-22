var Avatar = function(materials){

	var mat = MAT_DATA['star'];

	var geometries = {
		head: new THREE.BoxGeometry(1, 1, 1),
		torso: new THREE.BoxGeometry(3.5, 3.5, 3.5),
		arm: new THREE.BoxGeometry(1, 5, 1),
		leg: new THREE.BoxGeometry(1, 7, 1),
	};

	geometries['arm'].translate(0, 2.5, 0);

	var head = new THREE.Mesh(geometries['head'], mat.clone());
	var torso = new THREE.Mesh(geometries['torso'], mat.clone());
	var armLeft = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
	var armRight = new THREE.Mesh(geometries['arm'].clone(), mat.clone());
	var legLeft = new THREE.Mesh(geometries['leg'].clone(), mat.clone());
	var legRight = new THREE.Mesh(geometries['leg'].clone(), mat.clone());

	head.position.set(0, 2.75, 0);
	torso.position.set(0, 0, 0);
	armLeft.position.set(-2.5, 0, 0);
	armRight.position.set(2.5, 0, 0);
	legLeft.position.set(-1, -6, 0);
	legRight.position.set(1, -6, 0);

	var g = new THREE.Group();
	g.add(head);
	g.add(torso);
	g.add(armLeft);
	g.add(armRight);
	g.add(legLeft);
	g.add(legRight);

	this.__proto__ = g;
}