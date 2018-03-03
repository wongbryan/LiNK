
function buildParts(data){

	const obj = new THREE.Object3D();
	const g = new THREE.Group();
	const z = new THREE.Vector3();

	for(let key in data){

		console.log(g);

		let sectionData = data[key];
		let section = obj.clone();
		let sectionBoundingBox;

		for (let i=0; i<sectionData.length; i++){

			if(i === 0){ //offset the section

				let o = sectionData[i].offset;
				section.position.copy(o);

			} else {

				let d = sectionData[i];
				console.log(d.offset);
				let geom = d.geom;
				let mat = d.mat;
				let offset = d.offset || z;
				let rot = d.rotation || z;

				if (d.dom){
					
					geom.computeBoundingBox();
					sectionBoundingBox = geom.boundingBox;

				}

				let part = new THREE.Mesh(geom, mat);
				section.add(part);

				let max = sectionBoundingBox.max;
				let min = sectionBoundingBox.min;
				let magnitude = max.sub(min);

				offset = offset.mul(magnitude);
				

				part.position.copy(offset);
				part.rotation.copy(rot);

			}

		}

		g.add(section);	

	}

	return g;

}

var Avatar = function(materials){

	var g = new THREE.Group();
	var data = CHAR_DATA['robot'];
	g = buildParts(data);
	// console.log(buildParts(g, data));

	this.__proto__ = g;
}

