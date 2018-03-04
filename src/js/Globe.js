const GLOBE_RADIUS = 500;

var Globe = function(radius, color, avatarPos){

  /* Calculate offset (positions) of each instance */

  const MAX_VERTICES = 4000;

  let sGeom = new THREE.SphereGeometry(radius, 32, 32);
  let g = new THREE.SphereBufferGeometry(1, 16, 16);
  let geom = new THREE.InstancedBufferGeometry();
  geom.copy(g);
  let positions = THREE.GeometryUtils.randomPointsInGeometry(sGeom, MAX_VERTICES);

  let vOffsetArr = new Float32Array(MAX_VERTICES*3);

  positions.forEach( ( p, i ) => {

    let index = i*3;
    vOffsetArr[index] = p.x;
    vOffsetArr[index+1] = p.y;
    vOffsetArr[index+2] = p.z;

  } );

  let vOffset = new THREE.InstancedBufferAttribute(vOffsetArr, 3, 1);
  geom.addAttribute('vOffset', vOffset);

  let mat = new THREE.ShaderMaterial({
        uniforms: {
            'avatarPos': { value: avatarPos },
            'appearAmt': { value: .5},
            'maxDist': { value: 200. }
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        vertexShader: document.getElementById('globeVertex').textContent,
        fragmentShader: document.getElementById('globeFragment').textContent,
        side: THREE.DoubleSide,
  });

  let p = new THREE.Mesh(geom, mat);

  this.__proto__ = p;
}

function setArc3D(pointStart, pointEnd, smoothness, color, clockWise) {
  // calculate a normal ( taken from Geometry().computeFaceNormals() )
  var cb = new THREE.Vector3(), ab = new THREE.Vector3(), normal = new THREE.Vector3();
  cb.subVectors(new THREE.Vector3(), pointEnd);
  ab.subVectors(pointStart, pointEnd);
  cb.cross(ab);
  normal.copy(cb).normalize();



  var angle = pointStart.angleTo(pointEnd); // get the angle between vectors
  if (clockWise) angle = angle - Math.PI * 2;  // if clockWise is true, then we'll go the longest path
  var angleDelta = angle / (smoothness - 1); // increment

  var myRand = getRndInteger(3, 6);
  var myRand2 = getRndInteger(3, 6);


  var geometry = new THREE.Geometry();
  for (var i = 0; i < smoothness; i++) {
    var mynorm = new THREE.Vector3();
    mynorm.set(Math.sin((myRand * Math.PI) * i / 2999) / (Math.PI / myRand2), normal.y, normal.z);
    mynorm.normalize();
    geometry.vertices.push(pointStart.clone().applyAxisAngle(mynorm, angleDelta * i))  // this is the key operation
  }

  var arc = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: color
  }));
  return arc;
}

function getRndInteger(min, max) {
  var n = Math.floor(Math.random() * (max - min + 1) ) + min;
  if (Math.random() >= 0.5) {
    n = n * -1;
  }
  return n
}
