//Util function
const toRad = degrees => (Math.PI/180 * degrees)

let simpleBob = (mesh, offset, duration) => {

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

let accordionEffect = (mesh, offset, duration)=>{

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



let starSplit = (mesh, rotOffset, duration) => {

    const radOffset = toRad(rotOffset)
    
    let leftUpper = mesh.children[2]
    let rightUpper = mesh.children[3]
    
    let current = {
	lRotX:leftUpper.rotation.x,
	rRotX:rightUpper.rotation.x
    }

    const target = {
	lRotX:leftUpper.rotation.x + radOffset,
	rRotX:rightUpper.rotation.x + radOffset
    }
    return new TWEEN.Tween(current)
		    .to(target, duration)
		    .onUpdate(() => {
			leftUpper.rotation.x = current.lRotX
			rightUpper.rotation.x = current.rRotX
		    })
		    .easing(TWEEN.Easing.Cubic.InOut)
		    .repeat(Infinity)
		    .yoyo(true)
}
