import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import chrome from './chrome.jpeg'

class DoubleRing extends Component {
  componentDidMount() {
    const width = 150;
    const height = 130;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#16A7A2");
    this.renderer.setSize(150, 130);
    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, width / height);
    this.camera.position.z = 25;

    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    this.addModels();

    this.renderScene();
    this.start();
  }

  addModels() {
    const geometry1 = new THREE.TorusGeometry(12, 2, 30, 100, 6.3);
    const geometry2 = new THREE.TorusGeometry(6, 2, 30, 100, 6.3);
    const material1 = new THREE.MeshBasicMaterial({
    });
    const material2 = new THREE.MeshBasicMaterial({
    });
    this.torus = new THREE.Mesh(geometry1, material1);
    this.torus2 = new THREE.Mesh(geometry2, material2);
    this.scene.add(this.torus, this.torus2);

    new THREE.TextureLoader().load(
      chrome,
      texture => {
        this.torus.material.map = texture;
        this.torus.material.needsUpdate = true;
        this.torus2.material.map = texture;
        this.torus2.material.needsUpdate = true;
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        console.log("An error happened" + error);
      }
    );

    var mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/");
    mtlLoader.load("freedom.mtl", materials => {
      materials.preload();
      console.log("Material loaded");
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "./assets/freedom.obj",
        object => {
          this.freedomMesh = object;
          this.freedomMesh.position.setY(3);
          this.freedomMesh.scale.set(0.02, 0.02, 0.02);
          this.scene.add(this.freedomMesh);
        },
        xhr => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        error => {
          console.log("An error happened" + error);
        }
      );
    });
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    if (this.torus) this.torus.rotation.z += -0.005;
    // if (this.TorusKnot) this.TorusKnot.rotation.x += -0.005;
    // if (this.TorusKnot) this.TorusKnot.rotation.z += -0.005;
    if (this.torus2) this.torus2.rotation.y += 0.005;
    // if (this.TorusKnot2) this.TorusKnot2.rotation.z += 0.005;
    // if (this.freedomMesh) this.freedomMesh.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }

}
export default DoubleRing;
