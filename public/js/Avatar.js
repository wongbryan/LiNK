
function buildParts(data){

	const obj = new THREE.Object3D();
	const g = new THREE.Group();
	const z = new THREE.Vector3();

	for(let key in data){

		let sectionData = data[key];

		if(Object.keys(sectionData).length === 0)
			continue;

		let section = obj.clone();
		section.name = key;
		let sectionBoundingBox;
		let magnitude;

		let o = sectionData['offset'];
		section.position.copy(o);

		let dom = sectionData['dom']; //dominant part
		let geom = dom.geom || dom.mesh.geometry;

		geom.computeBoundingBox();
		sectionBoundingBox = geom.boundingBox;
		let max = sectionBoundingBox.max;
		let min = sectionBoundingBox.min;
		magnitude = max.sub(min);

		for (let k in sectionData){

			if (k === 'offset'){
				continue;
			}

			let d = sectionData[k];

			let part;

			if(d.hasOwnProperty('mesh')){

				let mat = getMat(d.mat);
				d.mesh.material = mat;
				part = d.mesh;

			} else {

				let geom = d.round ? round(d.geom, d.round):d.geom;
				let mat = getMat(d.mat);

				part = new THREE.Mesh(geom, mat);

			}

			let n = d.name;
			let offset = d.offset.clone() || z;
			let rot = d.rotation || z;
			let opacity = d.opacity || 1;

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

var Avatar = function(data){
	
	let char = data['name'];
	let charData = Object.assign({}, CHAR_DATA[char]);

	for(let str in data){

		let mKey = data[str];
		let keys = str.split('_');

		if(keys.length < 2)
			continue;

		let m = mKey;
		let obj = charData;

		keys.forEach( k => {

			obj = obj[k];

		} );

		obj.mat = m;

	}

	let g = new THREE.Group();
	g = buildParts(charData);

	this.__proto__ = g;

}
