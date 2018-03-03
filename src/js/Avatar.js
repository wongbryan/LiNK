
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

			} else {

				let n = d.name;
				let geom = d.geom;
				let mat = d.mat;
				let offset = d.offset || z;
				let rot = d.rotation || z;

				if (d.dom){

					geom.computeBoundingBox();
					sectionBoundingBox = geom.boundingBox;
					let max = sectionBoundingBox.max;
					let min = sectionBoundingBox.min;
					magnitude = max.sub(min);

				}

				let part = new THREE.Mesh(geom, mat);
				section.add(part);

				offset = offset.multiply(magnitude);

				part.position.add(offset);
				part.rotation.set(rot.x, rot.y, rot.z);

				part.name = n;

			}

		}

		g.add(section);	

	}

	return g;

}

var Avatar = function(materials){

	var g = new THREE.Group();
	var data = CHAR_DATA['dice'];
	g = buildParts(data);
	// console.log(buildParts(g, data));

	this.__proto__ = g;
}

