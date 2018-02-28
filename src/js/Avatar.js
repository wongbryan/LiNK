
/* Constructs a mesh given a root Object3D and model data w/ nested parts*/

function buildParts(parent, nodeData, parentNodeData){

	let geom = nodeData.geom;
	let mat = MAT_DATA['halo'];
	let mesh = new THREE.Mesh(geom, mat);

	parent.add(mesh);

	console.log(parent);

	if(parentNodeData){

		let parentGeom;
		let max;
		let min;
		let magnitude;
		if(parentNodeData.hasOwnProperty('part')){

			parentGeom = parentNodeData['geom'];

		}
		else{ //if parent is not a part, its 'parent' is just the model data entry. use torso geom as magnitude ref

			parentGeom = parentNodeData['torso'].geom;

		}

		parentGeom.computeBoundingBox();
		max = parentGeom.boundingBox.max;
		min = parentGeom.boundingBox.min;
		magnitude = max.sub(min);
		let offset = nodeData.offset;
		offset = offset.multiply(magnitude);

		mesh.position.add(offset);
	}

	for(let key in nodeData){
		let child = nodeData[key];
		if(typeof child === 'object' && child.hasOwnProperty('part')){
			parent.add(buildParts(mesh, child, nodeData));
		}
	}

	return parent;

}

var Avatar = function(materials){

	var g = new THREE.Group();
	var data = ROBOT_DATA['lbp'];
	g = buildParts(g, data);
	// console.log(buildParts(g, data));
	var mat = MAT_DATA['halo'];

	// var torsoGeom = data.torso.geom;
	// torsoGeom.computeBoundingBox();
	// var max = torsoGeom.boundingBox.max;
	// var min = torsoGeom.boundingBox.min;
	// var magnitude = max.sub(min);

	// for(var key in data){	
	// 	var offset = data[key].offset;
	// 	offset = offset.multiply(magnitude);
	// 	var geom = data[key].geom;

	// 	var mesh = new THREE.Mesh(geom, mat);
	// 	mesh.position.add(offset);

	// 	g.add(mesh);
	// }

	this.__proto__ = g;
}