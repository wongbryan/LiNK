const initializeRenderer = () => {

  const container = document.getElementById( 'container' )
  let renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCSoftShadowMap
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xbfe7ff)

  container.appendChild( renderer.domElement )

  //Return initialized value in case of chaining
  return renderer
}

const initializeCamera = () => {
  //Set camera to requested position
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.set(0, 0, 10)
  //Similar to above
  return camera
}

//Initialize Controls
const initializeControls = ( camera, renderer) => {
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.rotateSpeed = 2.0
  controls.panSpeed = 0.8
  controls.zoomSpeed = 1.5
}

//Resize camera on window update
const resize = (camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}

const PLANE_WIDTH = 250;
const PLANE_HEIGHT = 750;