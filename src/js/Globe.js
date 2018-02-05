const GLOBE_RADIUS = 500;

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

  var geometry = new THREE.Geometry();
  for (var i = 0; i < smoothness; i++) {
    geometry.vertices.push(pointStart.clone().applyAxisAngle(normal, angleDelta * i))  // this is the key operation
  }

  var arc = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: color
  }));
  return arc;
}