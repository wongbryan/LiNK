/* WORLD RELATED DATA */

const COLORS = {
    'black': new THREE.Color(0x0f0f0f)
}

const PLANE_WIDTH = 250;
const PLANE_HEIGHT = 750;

/* SETUP TOOLS */

const initializeRenderer = () => {

  const container = document.getElementById( 'container' )
  let renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCSoftShadowMap
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  renderer.setClearColor(COLORS.black)

  container.appendChild( renderer.domElement )

  //Return initialized value in case of chaining
  return renderer
}

const initializeCamera = () => {
  //Set camera to requested position
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.set(0, 5, 10)
  //Similar to above
  return camera
}

//Initialize Controls
const initializeControls = ( camera, renderer) => {
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.rotateSpeed = 2.0
  controls.panSpeed = 0.8
  controls.zoomSpeed = 1.5

  return controls;
}

//Resize camera on window update
const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}
