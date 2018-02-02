var Avatar = function(rig, parts){
	var mesh = rig;
	var bones = rig.skeleton.bones;

	/* TODO: ADD PARTS TO EACH BONE */
	let ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({color: 0xff0000}));
	bones.forEach((bone) => {
		let b = ball.clone();
		bone.add(b);
	});

	var anims = rig.geometry.animations;
	var actions = {};
	var mixer = new THREE.AnimationMixer( mesh );
	mixer.timeScale = 1;

	anims.forEach((anim) => {
		var name = anim.name;
		actions[name] = mixer.clipAction(name);
	});

	function setWeight( action, weight ) {
		action.enabled = true;
		action.setEffectiveTimeScale( 1 );
		action.setEffectiveWeight( weight );
	}

	function enableAction(name){
		var action = actions[name];
		setWeight(action, 1);
		action.play();
	}

	function update(d){
		mixer.update(d);
	}

	this.update = update;
	this.enableAction = enableAction;
	this.__proto__ = mesh;
}

/* ES6 Implementation */
class Avatar2 {
	constructor(rig, parts){
		let mesh = rig;
		let bones = rig.skeleton.bones;

		for (var i=0; i<bones.length; i++){
			var ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({color: 0xff0000}));
			bones[i].add(ball);
		}

		let anims = rig.geometry.animations,
		actions = {};

		let mixer = new THREE.AnimationMixer( mesh );
		mixer.timeScale = 1;

		anims.forEach( ( anim ) => {
			let name = anim.name;
			actions[name] = mixer.clipAction(name);
		})

		this.mixer = mixer;
		this._animations = anims;
		this._actions = actions;
		this.__proto__ = mesh;
	}

	enableAction(name){
		let action = this.actions[name];

		action.enabled = true;
		action.setEffectiveTimeScale( 1 );
		action.setEffectiveWeight( weight );

		action.play();
	}
}