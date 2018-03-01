const GLOBE_POS = new THREE.Vector3(0,-GLOBE_RADIUS, 0)

const toRad = degrees => ((Math.PI / 180) * degrees)
var debugLine, debugRot, debugUp, debugUpp;
const sphericalToCartesian = (r, theta, phi) =>
    ({
	x: r * Math.sin(toRad(phi)) * Math.cos(toRad(theta)),
	y:r * Math.cos(toRad(theta)),
	z:r * Math.sin(toRad(phi)) * Math.sin(toRad(theta)),

    })

const moveAlongCurve = (object, curve, options ) => {
    //Tween pairs
    let state = {
	t:0,
	angle:0
    }
    const finalState = {
	t:1,
	angle:toRad(-45)
    }
    
    //Need to calculate up vector...
    //But, if always positioned on the surface of the globe,
    //and the globe is centered on the origin then we gucci
    let anim = new TWEEN.Tween(state).to(finalState, options.duration)
    anim.onUpdate( () => {

	let curvePos = curve.getPoint(state.t)

	//object.position.copy(curve.getPoint(state.t))
	
	
	let outVec = new THREE.Vector3().subVectors(curvePos, GLOBE_POS).normalize()

	
	let curveTan = curve.getTangent(state.t) // Returns a normalized

	let rotationAxis = new THREE.Vector3()
				    .crossVectors(curveTan,
						  outVec)

	let upVec = new THREE.Vector3().crossVectors( rotationAxis, curveTan)

	object.position.copy(new THREE.Vector3()
				      .addVectors(curvePos,
							    new THREE.Vector3().copy(upVec).multiplyScalar(5)))


	if(debugLine != null){
	    scene.remove(debugRot)
	    scene.remove(debugUp)
	    scene.remove(debugLine)
	    scene.remove(debugUpp)
	    debugLine = null
	}

	debugLine = getDebugLine(
	    new THREE.Vector3().copy(curvePos),
	    new THREE.Vector3().copy(curveTan).multiplyScalar(10).add(curvePos)
	)

	debugUp = getDebugLine(
	    new THREE.Vector3().copy(curvePos),
	    new THREE.Vector3().copy(outVec).multiplyScalar(10).add(curvePos)
	)

	debugRot = getDebugLine(
	    new THREE.Vector3().copy(curvePos),
	    new THREE.Vector3().copy(rotationAxis).multiplyScalar(10).add(curvePos)
	)

	debugUpp = getDebugLine(
	    new THREE.Vector3().copy(curvePos),
	    new THREE.Vector3().copy(upVec).multiplyScalar(10).add(curvePos),
	    0xff0000
	)
	
	scene.add(debugLine)
	scene.add(debugUp)
	scene.add(debugRot)
	scene.add(debugUpp)

	object.setRotationFromAxisAngle(curveTan,
					toRad(0))

	object.setRotationFromAxisAngle(upVec,
					toRad(0))
	object.setRotationFromAxisAngle(rotationAxis,
	toRad(0))


	
	object.velocity = curve.getTangent(state.t)


	
	//Then correct for up vector...
	//position on globe corresponds to some up rotation already...
	//Based on position, compute spherical coordinates of sphere, then, the model should be rotated by the theta coordinate in order to look like it is standing straight up.
	
    })

    anim.easing(options.easing)
    anim.delay(options.delay)

    return anim
}


const getDebugLine = (pt1, pt2, color=0x0000ff) => {
    var material = new THREE.LineBasicMaterial({
	color
});

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
	pt1,
	pt2,
    );

    return new THREE.Line( geometry, material );
}

