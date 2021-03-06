/* WORLD RELATED DATA */

const COLORS = {
    'black': new THREE.Color(0x00010c),
    'yellow': new THREE.Color(0xffce3d),
    'teal': new THREE.Color(0x0d759b),
}

//Some example curves to test curve movement
//Pulled from THREEJS Docs : https://threejs.org/docs/#api/extras/curves/EllipseCurve
const ellipseCurve = new THREE.EllipseCurve(
  0,  0,            // ax, aY
  20, 20,           // xRadius, yRadius
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0                 // aRotation
);

const cubicBezier = new THREE.CubicBezierCurve(
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 15 ),
  new THREE.Vector2( 20, 15 ),
  new THREE.Vector2( 10, 0 )
);

const quadBezier = new THREE.QuadraticBezierCurve(
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( 20, 15 ),
  new THREE.Vector2( 10, 0 )
);

// Create a sine-like wave
const spline = new THREE.SplineCurve( [
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 5 ),
  new THREE.Vector2( 0, 0 ),
  new THREE.Vector2( 5, -5 ),
  new THREE.Vector2( 10, 0 )
] );

const getLineFromCurve = (curve, numPointsOnCurve=50, colorCurve=0xff0000) => {
  let points = curve.getPoints( numPointsOnCurve );
  let geometry = new THREE.BufferGeometry().setFromPoints( points );
  let material = new THREE.LineBasicMaterial( { color : colorCurve } );
  let curveLine = new THREE.Line( geometry, material );

  return curveLine

}

//Move along curve returns a function to be
//passed to animate with an object that has a position
//Time to move should be passed in as
const genMoveAlongCurve = (curve, timeToMove, startTime) => {

  const endTime = startTime + timeToMove
  var vertices = curve.geometry.vertices;
  return (time) => {
    //If time for animation
    if(time >= startTime && time <= endTime) {

      //Calculate the parametric parameter along curve
      //using current time
      const timeInAnim = time - startTime
      const currentPropOfCurve = (timeInAnim / timeToMove)
      let index = Math.floor( currentPropOfCurve * vertices.length );

      //In case you wanna see it as we go
      //console.log("Current Proportion of curve: " + currentPropOfCurve)

      //Return the point on the curve
      return vertices[index];
    }
    //Otherwise return curve endpoints
    else if (time < startTime){
      return vertices[0];
    } else if (time > endTime){
      return vertices[vertices.length-1];
    }
  }
}

/* SETUP TOOLS */

const initializeRenderer = () => {

  const container = document.getElementById( 'container' )
  let renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCSoftShadowMap
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  // renderer.setClearColor(COLORS.black)
  renderer.setClearColor(COLORS.yellow)

  container.appendChild( renderer.domElement )

  //Return initialized value in case of chaining
  return renderer
}

const initializeCamera = () => {
  //Set camera to requested position
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  // camera.position.set(-GLOBE_RADIUS/3, GLOBE_RADIUS+7.5, 0)
  camera.position.set(0, GLOBE_RADIUS+30, GLOBE_RADIUS)
  //Similar to above
  return camera
}

//Initialize Controls
const initializeControls = ( camera, renderer) => {
  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.rotateSpeed = 2.0
  controls.panSpeed = 0.8
  controls.zoomSpeed = 1.5

  controls.target = new THREE.Vector3(0, GLOBE_RADIUS, 0);

  return controls;
}

//Resize camera on window update
const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}

const getFontGeom = (letter, fontData, size, height=.1) => {

  console.log(fontData);

  var textGeometry = new THREE.TextGeometry(letter, {
      font: fontData,
      size: size,
      height: height,
      curveSegments: 20
  });
  textGeometry.computeBoundingBox();
  let box = textGeometry.boundingBox;
  let mag = box.max.sub(box.min);
  textGeometry.translate(-mag.x/2, -mag.y/2, -mag.z/2);

  return textGeometry;

}

const getEdgesGeom = (geom) => { //use w THREE.LineSegments or THREE.Line and line material

  return new THREE.EdgesGeometry( geom );

}

const tweenScalar = (source, propName, target, time = 500, easing=TWEEN.Easing.Quadratic.InOut, callback) => { //tween for scalar target

  let o = {};
  o[propName] = source[propName]; //value
  let t = {};
  t[propName] = target;

  let tw = new TWEEN.Tween(o).to(t, time);
  tw.onUpdate(function(){
    source[propName] = o[propName];
  });
  tw.easing(easing);
  if(callback)
    tw.onComplete(function(){
      console.log('callback');
      callback();
    });

  tw.start();

  return tw;

}

const stylizeQuote = function(string){

  const punc = ['?', '.', ';', '!'];
  let newStr = '"' + string.slice();
  newStr = newStr.toLowerCase();

  if(punc.indexOf(newStr[newStr.length-1]) === -1){
    newStr += '."';
  }

  return newStr;

}

const getRandomCharName = function(keys){
  
  return keys[Math.floor(Math.random() * keys.length)];

}
const getCharData = function(charName){

  let overrides = CHAR_DATA_OVERRIDES[charName];

  let data = {};

  data['name'] = charName;

  for(let key in overrides){

    if(key === 'name')
      continue;
    
    let mats = overrides[key];
    let matName = mats[Math.floor(Math.random() * mats.length)];

    data[key] = matName;

  }

  return data;

}

const getMat = function(name){

  let data = MAT_DATA[name];
  let mat;

  if(name.substr(name.length-4) === 'line'){

    mat = new THREE.LineBasicMaterial(data);

  } else{

    mat = new THREE.MeshStandardMaterial(data);

  }

  mat.side = THREE.DoubleSide;

  return mat;

}

function round(geom, n){

    var modifier = new THREE.SubdivisionModifier(n);
    modifier.modify(geom);
    
    return geom;

  }

var MOUSE_POS = {x:0.5, y:0.5};

const mouse_monitor = (e) => {
    MOUSE_POS.x = (e.clientX / window.innerWidth) * 2 -1
    MOUSE_POS.y = (e.clientY / window.innerHeight) * 2  - 1
}

const capitalizeWords = (string) => {
  let str = "";
  let words = string.split(" ");
  words.forEach( (n, i) => { //first and last
    let cap = n.charAt(0).toUpperCase() + n.slice(1);
    str += cap;

    if(i !== words.length -1){
      str += " ";
    }
  });
  return str;
}

/* Single view mode */

const activeQuoteBox = document.getElementById('activeQuoteBox');
const activeQuote = document.getElementById('activeQuote');
const activeUser = document.getElementById('activeUser');


const setActiveBox = (quote, user) => {
  activeQuoteBox.style.opacity = 0;

  setTimeout(function(){
    activeQuoteBox.style.opacity = 1;
    activeQuote.innerHTML = quote;
    activeUser.innerHTML = user;
  }, 600);

}

const moveLeft = () => {
  const target = innerGlobe.rotation.z - Math.PI/2;
  WORLD_CONTROLLER.rotateGlobeZ(target);
}

const moveRight = () => {
  const target = innerGlobe.rotation.z + Math.PI/2;
  WORLD_CONTROLLER.rotateGlobeZ(target);
}

const initOtherUsers = () => {

    const maxNumChars = 4;
    entry.sentiment_users.forEach( id => {
        
        APIController.getEntry(id)
        .then( e => {

            const numChars = characters.length;
            
            if(numChars >= maxNumChars){
                return;
            }

            const a = new Avatar(e.character);
            const angle = 2*Math.PI / maxNumChars * (numChars + 1); //start at second one
            const pos = new THREE.Vector3(GLOBE_RADIUS * Math.cos(angle), GLOBE_RADIUS * Math.sin(angle), 0);
            a.position.copy(pos);
            a.position.add(a.offset);
            a.rotation.z = angle - Math.PI/2;
            innerGlobe.add(a);

            e.avatar = a;
            characters.push(e);

            const idleAnims = getIdleAnim(e.avatar)

            idleAnims.forEach( elem => {
               elem.start()
            });

        })
        .catch( err => {
            console.log(err);
        })

    });

}