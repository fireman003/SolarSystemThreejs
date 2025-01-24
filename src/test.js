import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//make renderer
const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//make scene
const scene = new three.Scene()

//construct perpestive camera
const camera = new three.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    0.1, 1000)

renderer.render(scene, camera)