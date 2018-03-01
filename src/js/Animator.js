const toRad = degrees => ((Math.PI / 180) * degrees)

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
	
	object.position.copy(curve.getPoint(state.t))
	let upVec = new THREE.Vector3().copy(object.position).normalize()

	
	let movementVec = curve.getTangent(state.t)

	let rotationAxis = new THREE.Vector3()
				    .crossVectors(movementVec,
						  upVec)
	
	object.rotateOnAxis(rotationAxis,
			    toRad(-3))

	object.velocity = curve.getTangent(state.t)

	//console.log("Rotation Axis", rotationAxis)

	//Then correct for up vector...
	//position on globe corresponds to some up rotation already...
	//Based on position, compute spherical coordinates of sphere, then, the model should be rotated by the theta coordinate in order to look like it is standing straight up.
	
    })

    anim.easing(options.easing)
    anim.delay(options.delay)

    return anim
}
