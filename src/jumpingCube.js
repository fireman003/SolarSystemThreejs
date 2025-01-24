import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const renderer = new three.WebGLRenderer() // alocate space for the renderer on webpage
renderer.shadowMap = true // enable shadows

renderer.setSize(window.innerWidth, window.innerHeight) // set the size of the renderer to the size of the window

document.body.appendChild(renderer.domElement) // add the renderer to the webpage

//make scene
const scene = new three.Scene() // create a new scene

//construct perpestive camera
const camera = new three.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 
    0.1, 1000) 
    // create a new camera with a 75 degree field of view, aspect ratio of the window, near plane of 0.1, and far plane of 1000

camera.position.set(0,15,0); // set the position of the camera

//setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement) // create new orbit controls with the camera and renderer
controls.enableDamping = true // enable damping
controls.dampingFactor = 0.25 // set the damping factor to 0.25
controls.enableZoom = false // disable zooming
controls.enablePan = false // disable panning

// //render a axes helper
// const axesHelper = new three.AxesHelper(3) // create a new axes helper with a size of 5
// scene.add(axesHelper) // add the axes helper to the scene

//create a cube
const geometry = new three.BoxGeometry() // create a new box geometry
const material = new three.MeshBasicMaterial({ color: 0x00ff00 }) // create a new material with a green color
const cube = new three.Mesh(geometry, material) // create a new cube with the geometry and material
scene.add(cube) // add the cube to the scene

//setup gui
const gui = new dat.GUI() // create a new gui

const options = {
    color: 0x00ff00, // set the color to green
    wireframe: false, // set the wireframe option to false
    stepSize: 0.01 // set the step size to 0.01
}

gui.addColor(options, 'color').onChange(() => { // add a color option to the gui
    cube.material.color.set(options.color) // set the color of the cube to the color option
})

gui.add(options, 'wireframe').onChange(() => { // add a wireframe option to the gui
    cube.material.wireframe = options.wireframe // set the wireframe of the cube to the wireframe option
})

gui.add(options, "stepSize", 0.01, 0.1).onChange(() => { // add a step size option to the gui
    stepSize = options.stepSize // set the step size to the step size option
})

let step = 0 // create a step variable
let stepSize = 0.01 // create a step size variable

//make cube rotate
function animate(time) {
    requestAnimationFrame(animate) // request the next frame

    cube.rotation.x  = time/1000 // rotate the cube on the x axis
    cube.rotation.y = time/1000 // rotate the cube on the y axis

    step += stepSize // increment the step by the step size
    cube.position.z = -10* Math.abs(Math.sin(step)) // move the cube up and down

    renderer.render(scene, camera) // render the scene with the camera
}

animate() // start the animations


renderer.render(scene, camera) // render the scene with the camera

