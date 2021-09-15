import React, { useRef, useEffect } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import useWindowDimensions from '../hooks/useWindowDimensions';
import theme from '../context/theme';

import {
  getSphereList,
  getLineInfoList,
  getLineList,
  SpotLight,
  getCommitList,
} from '../utils/graph3dDraw';

export default function Graph3d({ repoData }) {
  const gitGraph3dRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const logList = [...repoData.logList].reverse();

  useEffect(() => {
    if (!gitGraph3dRef) return;

    const canvasWidth =
      width - (theme.size.branchBarWidth + theme.size.diffBarWidth);
    const canvasHeight = height - theme.size.navBarHeight;

    const canvas = gitGraph3dRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    });

    const geometry = new THREE.SphereGeometry(1, 32, 16);

    const sphereList = getSphereList(logList, geometry);
    const lineInfoList = getLineInfoList(logList);
    const lineList = getLineList(lineInfoList, sphereList);
    const commitList = getCommitList(logList);

    scene.add(...commitList);
    scene.add(...sphereList);
    scene.add(...lineList);

    const polarGridHelper = new THREE.PolarGridHelper(
      200,
      16,
      8,
      64,
      0x0000ff,
      0x808080,
    );
    scene.add(polarGridHelper);

    scene.add(new SpotLight(0xffffff, [1000, 1000, 100], THREE).light);
    scene.add(new SpotLight(0xffffff, [1000, -100, 100], THREE).light);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      2000,
    );

    const cameraTargetLog = logList[1];
    const posY = cameraTargetLog.index;
    const posZ = cameraTargetLog.position;
    camera.position.set(100, posY, posZ);

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, posY, posZ);

    const animation = () => {
      controls.enableZoom = true;
      controls.maxDistance = 400;

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };
    animation();
  }, []);

  return <GitGraph3D ref={gitGraph3dRef} />;
}

const GitGraph3D = styled.canvas`
  width: 100%;
  height: 100%;
`;

Graph3d.defaultProps = {
  repoData: {
    repoName: '',
    logList: [
      {
        message: 'Message',
      },
    ],
  },
};

Graph3d.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    logList: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ).isRequired,
  }),
};
