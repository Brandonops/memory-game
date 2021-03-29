import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import chrome from './chrome.jpeg'

class Ring extends Component {
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
    // -----Step 1--------
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
    });
    this.torus = new THREE.Mesh(geometry, material);
    this.scene.add(this.torus);

    // -----Step 2--------
    //LOAD TEXTURE and on completion apply it on SPHERE
    new THREE.TextureLoader().load(
    
      chrome,
      texture => {
        //Update Texture
        this.torus.material.map = texture;
        this.torus.material.needsUpdate = true;
      },
      xhr => {
        //Download Progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        //Error CallBack
        console.log("An error happened" + error);
      }
    );

    // -----Step 4--------
    //Loading 3d Models
    //Loading Material First
    var mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/");
    mtlLoader.load("freedom.mtl", materials => {
      materials.preload();
      console.log("Material loaded");
      //Load Object Now and Set Material
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "./assets/freedom.obj",
        object => {
          this.freedomMesh = object;
          this.freedomMesh.position.setY(3); //or  this
          this.freedomMesh.scale.set(0.02, 0.02, 0.02);
          this.scene.add(this.freedomMesh);
        },
        xhr => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
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
    // -----Step 3--------
    //Rotate Models
    if (this.torus) this.torus.rotation.y += -0.005;
    if (this.torus) this.torus.rotation.x += -0.005;
    if (this.toruss) this.torus.rotation.z += -0.005;
    if (this.freedomMesh) this.freedomMesh.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "800px", height: "800px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default Ring;
