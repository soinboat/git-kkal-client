import React, { useRef, useEffect } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import useWindowDimensions from '../hooks/useWindowDimensions';
import theme from '../context/theme';
import { notifyErr } from '../utils/notify';
import {
  getSphereList,
  getLineInfoList,
  getLineList,
  SpotLight,
} from '../utils/graph3dDraw';

export default function Graph3d({ repoData }) {
  const gitGraph3dRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const logList = [...repoData.logList].reverse();

  useEffect(() => {
    if (!gitGraph3dRef) return;

    const canvasWidth = parseInt((width * 55) / 100, 10); // FIXME: 55는 ContentBox의 퍼센트 width를 의미. theme에 추가할 것.
    const canvasHeight = height - theme.size.navBarHeight;

    const canvas = gitGraph3dRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    });

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      2000,
    );
    camera.position.set(40, 0, 0);

    const draw = (texture) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 16);

      const sphereList = getSphereList(logList, texture, geometry, THREE);
      const lineInfoList = getLineInfoList(logList);
      const lineList = getLineList(lineInfoList, sphereList, THREE);

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

      scene.add(new SpotLight(0xffffff, [100, 100, 100], THREE).light);
      scene.add(new SpotLight(0xffffff, [100, -100, 100], THREE).light);
    };

    const setCameraAndControls = () => {
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
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      'https://thumbs.dreamstime.com/z/terrazzo-flooring-texture-seamless-pattern-background-abstract-vector-design-print-floor-wall-tile-textile-143461087.jpg',
      (texture) => {
        draw(texture);
        setCameraAndControls();
      },
      undefined,
      (err) => {
        notifyErr(err);
      },
    );
  }, [gitGraph3dRef]);

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
