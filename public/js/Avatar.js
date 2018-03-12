
function buildParts(data){

	const createGeom = (type, args) => {

		const obj = THREE[type]; //constructor 

		function F(args) {

			return obj.apply(this, args);

		}

		F.prototype = obj.prototype;

		return new F(args);

	}

	const obj = new THREE.Object3D();
	const g = new THREE.Group();
	const z = new THREE.Vector3();

	for(let key in data){

		let sectionData = data[key];

		if(Object.keys(sectionData).length === 0 || !sectionData.hasOwnProperty('dom') )
			continue;

		let section = obj.clone();
		section.name = key;
		let sectionBoundingBox;
		let magnitude;

		let o = sectionData['offset'] || z;
		section.position.copy(o);

		let dom = sectionData['dom']; //dominant part

		let geom;

		if(dom.hasOwnProperty('mesh')){

			geom = dom.mesh.geometry;

		} else if(dom.geom.type === "TextGeometry"){

			const gArgs = dom.geom.args;
			geom = getFontGeom.apply(null, gArgs);

		} else{

			const gType = dom.geom.type;
			const gArgs = dom.geom.args;
			geom = createGeom(gType, gArgs);

		}

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

			} else if(d.geom.type === "TextGeometry"){

				const gArgs = d.geom.args;
				geom = getFontGeom.apply(null, gArgs);
				const mat = getMat(d.mat);

				part = new THREE.Mesh(geom, mat);

			} else{

				const gType = d.geom.type;
				const gArgs = d.geom.args;

				func = THREE[gType];
				let geom = createGeom(gType, gArgs);

				if(d.round){

					if(ROUNDED_GEOMS.hasOwnProperty(gType)){

						geom = ROUNDED_GEOMS[gType];

					} else{

						const roundedGeom = round(geom, d.round);
						geom = roundedGeom;
						ROUNDED_GEOMS[gType] = roundedGeom;

					}

				}

				const mat = getMat(d.mat);

				part = new THREE.Mesh(geom, mat);

			}

			let n = d.name || k;
			let offset = d.offset || z;
			let rot = d.rotation || z;
			let opacity = d.opacity || 1;
			let scale = d.scale || 1;

			offset = offset.multiply(magnitude);

			part.position.add(offset);
			part.rotation.set(rot.x, rot.y, rot.z);
			part.scale.multiplyScalar(scale);

			if(d.opacity){

				part.material.transparent = true;
				part.material.opacity = opacity;

			}

			part.name = n;
			section.add(part);

		}

		g.add(section);	

	}

	let scale = data['scale'] || 1.;
	let offset = data['offset'] || z;
	g.scale.multiplyScalar(scale);
	g.offset = offset;

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

    //Named for animations
    this.name = data['name'];
    
	this.__proto__ = g;

}
