import React, { Component } from 'react'
import * as THREE from 'three';

class Cone extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild( renderer.domElement );


        const geometry = new THREE.SphereGeometry( 5, 10, 10 );
        const material = new THREE.MeshBasicMaterial( {color: 0x03fc94} );
        const sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );


        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );
        camera.position.z = 2;


        var animate = function () {
            requestAnimationFrame( animate );
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;
            sphere.rotation.z += 0.005;
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


export default Cone;