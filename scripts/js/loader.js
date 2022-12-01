import * as THREE from "./three/build/three.module.js";
import {GLTFLoader} from "./three/examples/jsm/loaders/GLTFLoader.js";


let loader = new GLTFLoader();
const texture = new THREE.TextureLoader().load( "../exteriorViz1/models/Textures/environment.jpg" );
texture.mapping = THREE.EquirectangularReflectionMapping;
loader.load(
    "../exteriorViz1/models/model.glb",
    (gltf)=>{
        var scene = document.querySelector('a-scene').object3D;
        var model = gltf.scene;
        model.position.set(0, 0.033, -16.5);
        scene.add( gltf.scene );
        scene.environment = texture;
    },
    (model)=>{
        let fraction = model.loaded/model.total*100;
        let percentage = Math.trunc(fraction);
        document.getElementById("status").innerHTML = "Assets are loading!<br>"+percentage+"% loaded &#128571;";
        document.getElementById("progress").style.width = percentage+"%";
        if(percentage===100||percentage>100){
            document.getElementById("status").innerHTML = "Assets are loaded!&#129409; Your browser is rendering<br>Please wait a FEW SECONDS!";
            setTimeout(()=>{
                document.getElementById("preloader").style.display="none";
            },5000)
        }
    }
)
loader.load("../exteriorViz1/models/tree.glb",(gltf)=>{
    var scene = document.querySelector('a-scene').object3D;
        var model = gltf.scene;
        model.position.set(0, 0, -15.26);
        model.rotation.set(0, 90, 90)
        scene.add( gltf.scene );
        loader.load("../exteriorViz1/models/tree.glb",(gltf)=>{
            var scene = document.querySelector('a-scene').object3D;
                var model = gltf.scene;
                model.position.set(-42.37438, 0, -15.26);
                model.rotation.set(0, 90, 90)
                scene.add( gltf.scene );
        })
})