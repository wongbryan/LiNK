
//Get z for plane
const getZ = (planeNormal,distance, x, y) => {
	    
    const zX = planeNormal.x * x
    const zY = planeNormal.y * y
    
    if(planeNormal.z == 0 && planeNormal.x == 0){
	//Return 1 cuz why not
	return 1; 
    } else {
	return  (zY + zX + distance) / (planeNormal.z + 0.0)
    }
}

const getBasisVectorOfTangentPlane = (x, y, planeVec) => {
    return new THREE.Vector3(x, y, getZ(planeVec, GLOBE_RADIUS, x, y))
}


//Camera Controller Class for LiNK
class CameraController {
    constructor(camHeight, camRadius, globePos,  camRotateSpeed, camPosSpeed){
	this.camHeight = camHeight
	this.camRadius = camRadius
	this.globePos = globePos
	this.camRotateSpeed = camRotateSpeed
	this.camPosSpeed = camPosSpeed
    }

    //Setup the initial position of
    //the camera
    init(target, camera){
	//Copy the initial position of the target
	this.updateCameraPos(target, camera, Math.PI)

    }
    
    updateCameraPos(target, camera, angle){
	const upVec = new THREE.Vector3().subVectors(target.position, this.globePos).normalize()
	const offset = this.computeCameraOffset(upVec, angle)
	camera.position.copy(new THREE.Vector3().addVectors(target.position, offset))
	    //Look at the target
	camera.lookAt(target.position)	
    }
    
    computeCameraOffset(tangentPlane, angle){
	let radVec = getBasisVectorOfTangentPlane(1,0, tangentPlane).normalize()
	let radVec2 = new THREE.Vector3().crossVectors(radVec, tangentPlane).normalize()
	let offset = new THREE.Vector3().copy(tangentPlane).multiplyScalar(this.camHeight)

	const offX = radVec.multiplyScalar(this.camRadius * Math.cos(angle))
	const offZ = radVec2.multiplyScalar(this.camRadius * Math.sin(angle))

	return offset.add(offX).add(offZ)
    }
    
    //Update the camera's position based on the time of the frame
    //and the targets velocity vector
    update(deltaTime, target, targetVelocity, camera){
	//Assume Target Velocity is tangent to the
	//sphere, if it isn't we will need a vector tangent
	//to the sphere as another arg

	//tough part is angle
	this.updateCameraPos(target, camera, 0)

	
	
    }

}

