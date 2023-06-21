import React, { useEffect, useRef } from 'react'
import * as THREE from "three";
import texture from '../../images/WechatIMG209.jpeg'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {GUI} from 'dat.gui'
const Index = (props) => {
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(-30, 40, 30);
    // camera.position.set(0, 0, 30);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000)
    renderer.setSize( window.innerWidth, window.innerHeight );
    var axes = new THREE.AxesHelper(4000)
    scene.add(axes)
    new OrbitControls(camera, renderer.domElement);
    renderer.shadowMap.enabled = true;
    // var effect = new THREE.AsciiEffect(renderer)
    const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 10, 4 );
    pointLight.castShadow = true; // default false
    scene.add( pointLight );

    var planeGeometry = new THREE.PlaneGeometry(60,60,1,1)
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc})
    var plane = new THREE.Mesh(planeGeometry,planeMaterial)
    plane.rotation.position = -0.5 * Math.PI
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    var cubeGeometry = new THREE.BoxGeometry(8,8,8)
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true})
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
    cube.position.set(-4, 3, 4)
    cube.castShadow = true
    scene.add(cube)

    var sphereGeometry = new THREE.SphereGeometry(4,20,20)
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: true})
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
    sphere.position.set(30, 4, 4)
    sphere.castShadow = true
    scene.add(sphere)
    var step = 0
    var controls = new function () {
      this.rotationSpeed = 0.02
      this.bouncingSpeed = 0.03
    }()
    var gui = new GUI()
    gui.add(controls, 'rotationSpeed', 0, 0.5)
    gui.add(controls, 'bouncingSpeed', 0, 0.5)
    // console.log(gui)
    function render () {
      // cube.rotation.x += 0.02
      cube.rotation.y += controls.rotationSpeed
      // cube.position.z += 0.02
      // step+=0.05
      step += controls.bouncingSpeed
      sphere.rotation.y -= controls.rotationSpeed
      // sphere.position.x = 20 + (24 * Math.cos(step))
      sphere.position.z = 2 + (20 * Math.abs(Math.sin(step)))
      requestAnimationFrame( render );
	    renderer.render( scene, camera );
    }
    render()
    document.getElementById('my-card').appendChild( renderer.domElement );
  })
  return (
    <div id="my-card">
    </div>
  )
}

export default Index
