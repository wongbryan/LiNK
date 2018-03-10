//Util function
const toRad = degrees => (Math.PI/180 * degrees)

const getByName = (name) => {
    return (elem) => {
	return elem.name == name
    }
}

const simpleBob = (mesh, offset, duration) => {

    //Move up and down a bit
    let current = {
	yOff:mesh.position.y
    }

    const target = {
	yOff:mesh.position.y + offset
    }


    return new TWEEN.Tween(current)
			.to(target, duration)
			.onUpdate(() => {
			    mesh.position.y = current.yOff
			})
			.easing(TWEEN.Easing.Quadratic.InOut)
			.repeat(Infinity)
			.yoyo(true)
}

const accordionEffect = (mesh, offset, duration)=>{

    let top = mesh.children[0]
    let mid = mesh.children[1]
    let bot = mesh.children[2]

    const prop = {
	ring0:1,
	ring1:0.75,
	ring2:0.5,
	ring3:0.25,
    }
    
    let current = {
	ring0Y:mid.children[0].position.y,
	ring1Y:mid.children[1].position.y,
	ring2Y:mid.children[2].position.y,
	ring3Y:mid.children[3].position.y,
	topY:top.position.y
    }

    const target = {
	ring0Y:mid.children[0].position.y + offset * prop.ring0,
	ring1Y:mid.children[1].position.y + offset * prop.ring1,
	ring2Y:mid.children[2].position.y + offset * prop.ring2,
	ring3Y:mid.children[3].position.y + offset * prop.ring3,
	topY:top.position.y + offset
    }
    return new TWEEN.Tween(current)
		    .to(target, duration)
		    .onUpdate(() => {
			mid.children[0].position.y = current.ring0Y
			mid.children[1].position.y = current.ring1Y
			mid.children[2].position.y = current.ring2Y
			mid.children[3].position.y = current.ring3Y
			top.position.y = current.topY
			
		    })
		    .easing(TWEEN.Easing.Cubic.InOut)

		    .repeat(Infinity)
		    .yoyo(true)
}

const starSplit = (mesh, rotOffset, duration) => {

    const radOffset = toRad(rotOffset)
    
    const upperLeft = mesh.children.find(getByName("upperLeft"))
    const upperRight = mesh.children.find(getByName("upperRight"))
    const lowerLeft = mesh.children.find(getByName("lowerLeft"))
    const lowerRight = mesh.children.find(getByName("lowerRight"))

    let current = {
	lRotZ:upperLeft.rotation.z,
	rRotZ:upperRight.rotation.z,
    }

    const headProp = 0.6
    
    const target = {
	lRotZ:upperLeft.rotation.z - radOffset,
	rRotZ:upperRight.rotation.z + radOffset,
    }
    return new TWEEN.Tween(current)
		    .to(target, duration)
		    .onUpdate(() => {
			upperLeft.rotation.z = current.lRotZ
			upperRight.rotation.z = current.rRotZ
			lowerLeft.rotation.z = current.lRotZ
			lowerRight.rotation.z = current.rRotZ

		    })
		    .easing(TWEEN.Easing.Cubic.InOut)
		    .repeat(Infinity)
		    .yoyo(true)
}

const starSplitHead = (mesh, rotOffset, duration) => {
    const radOffset = toRad(rotOffset)
    
    const upperLeft = mesh.children.find(getByName("upperLeft"))
    const upperRight = mesh.children.find(getByName("upperRight"))
    const lowerLeft = mesh.children.find(getByName("lowerLeft"))
    const lowerRight = mesh.children.find(getByName("lowerRight"))

    //Head look up on star split
    const upper = mesh.children.find(getByName("upper"))
    
    
    
    let current = {
	lRotZ:upperLeft.rotation.z,
	rRotZ:upperRight.rotation.z,
	upRotX:upper.rotation.x
    }

    const headProp = 0.6
    
    const target = {
	lRotZ:upperLeft.rotation.z - radOffset,
	rRotZ:upperRight.rotation.z + radOffset,
	upRotX:upper.rotation.x - radOffset * headProp
    }
    return new TWEEN.Tween(current)
		    .to(target, duration)
		    .onUpdate(() => {
			upperLeft.rotation.z = current.lRotZ
			upperRight.rotation.z = current.rRotZ
			lowerLeft.rotation.z = current.lRotZ
			lowerRight.rotation.z = current.rRotZ
			upper.rotation.x = current.upRotX

		    })
		    .easing(TWEEN.Easing.Cubic.InOut)
		    .repeat(Infinity)
		    .yoyo(true)
}

const lookAtMouse = (mesh, mouse, camera) => {
    let curr = {}
    const end = {}
    let upper = mesh.children.find(getByName("upper"))

    const magnitude = 10
    
    return new TWEEN.Tween(curr)
		    .to(end)
		    .onUpdate(() => {

			const width = window.innerWidth
			const height = window.innerHeight

			let vecToMouse = new THREE.Vector3().subVectors(camera.position, upper.getWorldPosition() )

			//Get camera basis ==> Trying to make it work if camera rotates... but struggling
			let camX = new THREE.Vector3()
			let camY = new THREE.Vector3()
			let camZ = new THREE.Vector3()

			const xMag = width * (1/2.0) * 0.8
			const yMag = height * (1/2.0) * 0.8

			camera.lookAt(upper.getWorldPosition())
			camera.matrixWorldInverse.extractBasis(camX, camY, camZ)
			
			vecToMouse.add(camX.multiplyScalar(mouse.x * xMag))
			vecToMouse.sub(camY.multiplyScalar(mouse.y * yMag))

			upper.lookAt(vecToMouse)
		    }).repeat(Infinity)
    
}


const diceFlip = (mesh, duration) => {
    const upLeft = mesh.children.find(getByName("upperLeft"))

    
    const upRight = mesh.children.find(getByName("upperRight"))
    
    let curr = {
	baseRotZ:0,//This should be the axis that points at camera --> shouldnt be a hard vec to get?
	baseRotY:mesh.rotation.y, // Also could be from an offset?
	rotFaceX:0,
	rotFaceZ:0
    }

    const end = {
	baseRotZ: 2 * Math.PI,
	baseRotY:mesh.rotation.y + 3 *Math.PI,
	rotFaceX:5 * Math.PI,
	rotFaceZ:Math.PI
    }

    return new TWEEN.Tween(curr)
		    .to(end, duration)
		    .onUpdate(()=> {


			
			mesh.rotation.z = curr.baseRotZ
			mesh.rotation.y = curr.baseRotY
			upLeft.rotation.z = curr.rotFaceZ
			upRight.rotation.z = curr.rotFaceZ
			upLeft.rotation.x = curr.rotFaceX
			upRight.rotation.x = curr.rotFaceX
		    })
		    .easing(TWEEN.Easing.Cubic.InOut)
		    .delay(2500)
		    .repeat(Infinity)
		    .yoyo(true)
}


//Doesnt work correctly... yet...
const diceFlipColor = (mesh, duration) => {
    const upLeftHeadMat = mesh.children.find(getByName("upperLeft")).children.find(getByName("head")).material
    const upRightHeadMat = mesh.children.find(getByName("upperRight")).children.find(getByName("head")).material

    const getRandom = () => {

	const rand = (Math.random() - 0.5) * 2
	console.log(rand)
	return rand
    }
    
    let curr = {
	colLeftR:upLeftHeadMat.color.r,
	colLeftG:upLeftHeadMat.color.g,
	colLeftB:upLeftHeadMat.color.b,
	colRightR:upRightHeadMat.color.r,
	colRightG:upRightHeadMat.color.g,
	colRightB:upRightHeadMat.color.b,
    }

    
    const end = {
	colLeftR:upLeftHeadMat.color.r + getRandom(),
	colLeftG:upLeftHeadMat.color.g + getRandom(),
	colLeftB:upLeftHeadMat.color.b + getRandom(),
	colRightR:upRightHeadMat.color.r + getRandom(),
	colRightG:upRightHeadMat.color.g + getRandom(),
	colRightB:upRightHeadMat.color.b + getRandom(),
    }
	
    
    return new TWEEN.Tween(curr)
		    .to(end, duration)
		    .onUpdate(()=> {
			upLeftHeadMat.color = new THREE.Color(curr.colLeftR, curr.ColLeftG, curr.colLeftB, 1.0)
			upRightHeadMat.color = new THREE.Color(curr.colRightR, curr.ColRightG, curr.colRightB,1.0)
		    })
		    .easing(TWEEN.Easing.Cubic.InOut)
		    .delay(10000)
		    .repeat(Infinity)
}


//Returns an array of functions that should be used as an idle anim for
//the mesh
const getIdleAnim = (mesh) => {
    switch(mesh.name){
	case "astronaut":
	case "robot":
	    return [simpleBob(mesh, 1.4, 800), starSplitHead(mesh, 45, 800)]
	case "poopGuy":
	    return [simpleBob(mesh, 1.4, 800), accordionEffect(mesh, 1, 800)]
	case "dice":
	    return [simpleBob(mesh, 1.4, 800), diceFlip(mesh,1600),]// diceFlipColor(mesh, 1600)]
	default:
	    return [simpleBob(mesh, 1.4, 800)]
    }
}
