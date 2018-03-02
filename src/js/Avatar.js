
function buildParts(data){

	const obj = new THREE.Object3D();
	const g = new THREE.Group();

	//create pivots 
	let upper = obj.clone();
	middle = obj.clone();
	leftUpper = obj.clone();
	rightUpper = obj.clone();
	leftLower = obj.clone();
	rightLower = obj.clone();

	for (let key in data){

		let 

	}

}

var Avatar = function(materials){

	var g = new THREE.Group();
	var data = ROBOT_DATA['lbp'];
	g = buildParts(g, data);
	// console.log(buildParts(g, data));

	this.__proto__ = g;
}

