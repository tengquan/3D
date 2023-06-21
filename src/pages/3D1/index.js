import React, { useEffect, useRef } from 'react'
import * as THREE from "three";
import texture from '../../images/sun_temple_stripe.jpeg'
import icon from '../../images/contract-fail.png'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const Index = (props) => {
  var hotPoints=[
    {
        position:{
            x:0,
            y:0,
            z:-0.2
        },
        detail:{
            "title":"信息点1"
        }
    },
    {
        position:{
            x:-0.2,
            y:-0.05,
            z:0.2
        },
        detail:{
            "title":"信息点2"
        }
    }
]
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 10000);
    camera.position.set(0, 0, 0.01);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('my-card').appendChild( renderer.domElement );
    var control = new OrbitControls(camera, renderer.domElement);
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );//立方体
    const textures = getTexturesFromAtlasFile( texture, 6 );
    var material = [
      new THREE.MeshBasicMaterial({ map: textures[0] }), // front
      new THREE.MeshBasicMaterial({ map: textures[1] }), // right
      new THREE.MeshBasicMaterial({ map: textures[2] }), // back
      new THREE.MeshBasicMaterial({ map: textures[3] }), // left
      new THREE.MeshBasicMaterial({ map: textures[4] }), // top
      new THREE.MeshBasicMaterial({ map: textures[5] }) // bottom
    ]
    var cube = new THREE.Mesh( geometry, material );


    var pointTexture = new THREE.TextureLoader().load(icon);
    var materialIcon = new THREE.SpriteMaterial( { map: pointTexture} );
    var poiObjects = []
    for(var i=0;i<hotPoints.length;i++){
      var sprite = new THREE.Sprite( materialIcon );
      sprite.scale.set( 0.02, 0.02, 0.02 );
      sprite.position.set( hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z );
      scene.add( sprite );
      sprite.detail = hotPoints[i].detail;
      poiObjects.push(sprite);
    }
    document.querySelector("#my-card").addEventListener("click",function(event){
      event.preventDefault();
  
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
  
      mouse.x = ( event.clientX / document.body.clientWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / document.body.clientHeight ) * 2 + 1;
  
      raycaster.setFromCamera( mouse, camera );
  
      var intersects = raycaster.intersectObjects( poiObjects );
      if(intersects.length>0){
        camera.position.z = -0.02 + camera.position.z
        // camera.position.set(0, 0, -0.02);
          // alert("点击了热点"+intersects[0].object.detail.title);
      }
    });
    
    cube.geometry.scale( 1, 1, -1 );
    scene.add( cube );
    function render () {
      requestAnimationFrame( render );
	    renderer.render( scene, camera );
    }
    render()
    
    function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
      const textures = [];
      for ( let i = 0; i < tilesNum; i ++ ) {
        textures[ i ] = new THREE.Texture();
      }
      new THREE.ImageLoader()
        .load( atlasImgUrl, ( image ) => {
          let canvas, context;
          const tileWidth = image.height;
          for ( let i = 0; i < textures.length; i ++ ) {
            canvas = document.createElement( 'canvas' );
            context = canvas.getContext( '2d' );
            canvas.height = tileWidth;
            canvas.width = tileWidth;
            context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
            textures[ i ].colorSpace = THREE.SRGBColorSpace;
            textures[ i ].image = canvas;
            textures[ i ].needsUpdate = true;
          }
        } );
      return textures;
    }
  })
  return (
    <div id="my-card">
    </div>
  )
}

export default Index
