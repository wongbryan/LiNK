
function buildParts(data){

	const obj = new THREE.Object3D();
	const g = new THREE.Group();
	const z = new THREE.Vector3();

	for(let key in data){

		let sectionData = data[key];
		let section = obj.clone();
		section.name = key;
		let sectionBoundingBox;
		let magnitude;

		for (let i=0; i<sectionData.length; i++){

			let d = sectionData[i];

			if(i === 0){ //offset the section and handle section data

				let o = d.offset;
				let n = d.name;
				section.position.copy(o);
				continue;

			} 

			if (d.dom){

				geom = d.geom || d.mesh.geometry;

				geom.computeBoundingBox();
				sectionBoundingBox = geom.boundingBox;
				let max = sectionBoundingBox.max;
				let min = sectionBoundingBox.min;
				magnitude = max.sub(min);

			}

			let part;

			if(d.hasOwnProperty('mesh')){

				console.log(d);
				d.mesh.material = d.mat;
				part = d.mesh;


			} else {

				let geom = d.geom;
				let mat = d.mat;

				part = new THREE.Mesh(geom, mat);

			}

			let n = d.name;
			let offset = d.offset || z;
			let rot = d.rotation || z;
			let opacity = d.opacity;

			offset = offset.multiply(magnitude);

			part.position.add(offset);
			part.rotation.set(rot.x, rot.y, rot.z);

			if(d.opacity){

				part.material.transparent = true;
				part.material.opacity = opacity;

			}

			part.name = n;
			section.add(part);

		}

		g.add(section);	

	}

	return g;

}

var Avatar = function(materials){

	var g = new THREE.Group();
	var data = CHAR_DATA['poopGuy'];
	g = buildParts(data);
	// console.log(buildParts(g, data));

	this.__proto__ = g;
}

