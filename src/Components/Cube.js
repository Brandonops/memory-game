import React, { Component } from 'react'
import * as THREE from 'three';

class Cube extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 65, 150 / 130);
        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(150, 130);
        this.mount.appendChild( renderer.domElement );
      
        var geometry = new THREE.BoxGeometry( 1.2, 1.2, 1.2 );
        var material = new THREE.MeshStandardMaterial( { color: 0x03fc94 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );
        camera.position.z = 2;
        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;
            cube.rotation.z += 0.005;
            renderer.render( scene, camera );
        };
        animate();
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}


export default Cube;