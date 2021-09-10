import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import useWindowDimensions from '../hooks/useWindowDimensions';
import {
  NAV_BAR_HEIGHT,
  BRANCH_BAR_WIDTH,
  DIFF_BAR_WIDTH,
} from '../constants/size';

export default function Graph3d({ repoData }) {
  const gitGraph3D = useRef(null);
  const { width, height } = useWindowDimensions();
  const { logList } = repoData;

  useEffect(() => {
    if (!gitGraph3D) return;

    const { PI } = Math;
    const canvasWidth = width - (BRANCH_BAR_WIDTH + DIFF_BAR_WIDTH);
    const canvasHeight = height - NAV_BAR_HEIGHT;

    const canvas = gitGraph3D.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    });

    const sphereList = [];
    const lineListData = [];
    const lineList = [];

    const circlePosition = [[0, 0]];
    const posLength = logList.reduce((previous, current) =>
      previous > current.position ? previous : current.position,
    );

    const MODE_2D = true;

    if (!MODE_2D) {
      for (let i = 0; i < posLength; i += 1) {
        const radian = (2 * PI * i) / posLength;
        circlePosition.push([Math.cos(radian), Math.sin(radian)]);
      }
    }

    function draw() {
      const geometry = new THREE.SphereGeometry(0.3, 32, 16);

      for (let i = 0; i < logList.length; i += 1) {
        const material = new THREE.MeshBasicMaterial({
          color: logList[i].color,
        });
        const sphere = new THREE.Mesh(geometry, material);
        const zPosition = logList[i].position;

        sphere.position.y = i;

        if (MODE_2D) {
          sphere.position.z = zPosition;
        } else {
          sphere.position.x = circlePosition[zPosition][0] * 10;
          sphere.position.z = circlePosition[zPosition][1] * 10;
        }

        sphereList.push(sphere);
      }

      logList.forEach((log, index) => {
        log.parents.forEach((parent) => {
          const parentIndex = logList.findIndex(
            (targetLog) => targetLog.hash === parent,
          );
          const color =
            log.position > logList[parentIndex].position
              ? log.color
              : logList[parentIndex].color;
          lineListData.push({ start: index, to: parentIndex, color });
        });
      });

      lineListData.forEach((lineData) => {
        const points = [];
        const startPoint = sphereList[lineData.start].position;
        const endPoint = sphereList[lineData.to].position;

        if (MODE_2D) {
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
        } else {
          points.push(startPoint);
          if (startPoint.z !== endPoint.z) {
            points.push(
              new THREE.Vector3(startPoint.x, endPoint.y + 0.5, startPoint.z),
            );
          }
          points.push(endPoint);
        }

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: lineData.color,
        });

        const line = new THREE.Line(lineGeometry, lineMaterial);
        lineList.push(line);
      });

      for (let i = 0; i < sphereList.length; i += 1) {
        scene.add(sphereList[i]);
      }

      for (let i = 0; i < lineList.length; i += 1) {
        scene.add(lineList[i]);
      }

      const polarGridHelper = new THREE.PolarGridHelper(
        200,
        16,
        8,
        64,
        0x0000ff,
        0x808080,
      );
      scene.add(polarGridHelper);
    }
    draw();

    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      2000,
    );
    camera.position.x = 40;
    camera.position.y = 0;
    camera.position.z = 0;

    window.addEventListener('resize', () => {
      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasWidth, canvasHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    const animation = () => {
      controls.enableZoom = true;
      controls.maxDistance = 400;
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };
    animation();
  }, [gitGraph3D]);

  return <GitGraph3D ref={gitGraph3D} />;
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
