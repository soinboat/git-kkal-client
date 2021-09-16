/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import { Canvas, unmountComponentAtNode } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

const Sphere = ({ log, setClickedNode }) => (
  <mesh
    visible
    dispose={null}
    userData={{ test: 'hello' }}
    position={[log.position * 5, -log.index * 5, 0]}
    rotation={[0, 0, 0]}
    onClick={() => setClickedNode(log.hash)}
  >
    <sphereGeometry attach="geometry" args={[1, 32, 16]} />
    <meshStandardMaterial
      attach="material"
      color={log.color}
      transparent
      metalness={0.1}
    />
  </mesh>
);

const SphereList = ({ logList, setClickedNode }) =>
  logList.map((log) => (
    <Sphere key={`log${log.hash}`} log={log} setClickedNode={setClickedNode} />
  ));

const Line = ({ line }) => {
  const points = line.points.map(
    (point) => new THREE.Vector3(point[0] / 10 + 5, -point[1] / 10, 0),
  );

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        attach="material"
        color={line.color}
        linewidth={1}
        linecap="round"
        linejoin="round"
      />
    </line>
  );
};
const LineList = ({ lineList }) =>
  lineList
    .flat()
    .map((line, index) => (
      <Line
        key={`line${index}${line.points[0]}${line.points[1]}`}
        line={line}
      />
    ));

const CommitList = ({ logList, maxPipeCount }) =>
  logList.map((log, index) => (
    <Commit
      key={`commit${index}${log.hash}`}
      log={log}
      maxPipeCount={maxPipeCount}
    />
  ));

const Commit = ({ log, maxPipeCount }) => (
  <Text
    position={[(maxPipeCount + 1) * 5, -log.index * 5, 0]}
    scale={[10, 10, 10]}
    color={log.color}
    anchorX="left"
  >
    {`${log.hash.slice(0, 7)}    ${log.message}`}
  </Text>
);

export default function Graph3d({ repoData, handleNodeClick }) {
  const { logList, lineList, maxPipeCount } = repoData;
  const [clickedNode, setClickedNode] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    if (!clickedNode) return;

    handleNodeClick(clickedNode);
  }, [clickedNode]);

  // useEffect(
  //   () => () => {
  //     if (canvasRef.current) {
  //       document.removeChild(canvasRef.current);
  //     }
  //   },
  //   [],
  // );

  return (
    <Canvas
      ref={canvasRef}
      camera={{ fov: 75, position: [0, 0, 50], far: 3000 }}
    >
      <color attach="background" args={['#000']} />
      <SphereList logList={logList} setClickedNode={setClickedNode} />
      <LineList lineList={lineList} />
      <CommitList logList={logList} maxPipeCount={maxPipeCount} />
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}

Graph3d.propTypes = {
  repoData: PropTypes.shape({
    logList: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string,
        author: PropTypes.string,
        authoredTime: PropTypes.string,
        committer: PropTypes.string,
        committedTime: PropTypes.string,
        parents: PropTypes.arrayOf(PropTypes.string),
        hash: PropTypes.string,
        branchNames: PropTypes.arrayOf(PropTypes.string),
        branchName2: PropTypes.string,
        head: PropTypes.bool,
        index: PropTypes.number,
        position: PropTypes.number,
        color: PropTypes.string,
      }),
    ).isRequired,
    maxPipeCount: PropTypes.number.isRequired,
    lineList: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string,
          points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        }),
      ),
    ).isRequired,
  }).isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};
