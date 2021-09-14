export function getSphereList(logList, texture, geometry, THREE) {
  return logList.map((log, index) => {
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(log.color),
      envMapIntensity: 0.4,
      map: texture,
      clearcoat: 0.8,
      clearcoatRoughness: 0,
    });

    const sphere = new THREE.Mesh(geometry, material);
    const zPosition = log.position;

    sphere.position.y = index;
    sphere.position.z = zPosition;

    return sphere;
  });
}

export function getLineInfoList(logList) {
  return logList
    .map((log, index) =>
      log.parents.map((parent) => {
        const parentIndex = logList.findIndex(
          (targetLog) => targetLog.hash === parent,
        );

        const color =
          log.position > logList[parentIndex].position
            ? log.color
            : logList[parentIndex].color;

        return { start: parentIndex, to: index, color };
      }),
    )
    .flat();
}

function getVectors(startPoint, endPoint, THREE) {
  const points = [];

  points.push(startPoint);
  if (startPoint.z > endPoint.z) {
    points.push(
      new THREE.Vector3(startPoint.x, endPoint.y - 0.5, startPoint.z),
    );
  } else if (startPoint.z < endPoint.z) {
    points.push(
      new THREE.Vector3(startPoint.x, startPoint.y + 0.5, endPoint.z),
    );
  }
  points.push(endPoint);

  return points;
}

export function getLineList(lineInfoList, sphereList, THREE) {
  return lineInfoList.map((lineInfo) => {
    const startPoint = sphereList[lineInfo.start].position;
    const endPoint = sphereList[lineInfo.to].position;

    const points = getVectors(startPoint, endPoint, THREE);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineInfo.color,
    });

    return new THREE.Line(lineGeometry, lineMaterial);
  });
}

export function SpotLight(color, xyz, THREE) {
  this.light = new THREE.SpotLight(color);
  this.light.position.set(...xyz);
  this.light.castShadow = true;

  this.light.shadow.mapSize.width = 1024;
  this.light.shadow.mapSize.height = 1024;

  this.light.shadow.camera.near = 500;
  this.light.shadow.camera.far = 4000;
  this.light.shadow.camera.fov = 30;
}

export default {
  getSphereList,
  getLineInfoList,
  getLineList,
  SpotLight,
};
