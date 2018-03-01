
/* Constructs a mesh given a root Object3D and model data w/ nested parts*/

function buildParts(parent, nodeData, parentNodeData){

	let geom = nodeData.geom;
	let mat = nodeData.mat;
	let mesh = new THREE.Mesh(geom, mat);

	if(nodeData.rotation){
		let r = nodeData.rotation;
		mesh.rotation.set(r.x, r.y, r.z);
	}

	parent.add(mesh);

	if(parentNodeData){

		let parentGeom;
		let max;
		let min;
		let magnitude;
		if(parentNodeData.hasOwnProperty('part')){

			parentGeom = parentNodeData['geom'];

		}
		else{ //if parent is not a part, its 'parent' is just the root model data entry. 
			  //use torso geom as magnitude reference

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

	this.__proto__ = g;
}


