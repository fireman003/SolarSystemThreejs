import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import starsTexture from './assets/SolarSystem/stars.jpg'
import sunTexture from './assets/SolarSystem/sun.jpg'
import mercuryTexture from './assets/SolarSystem/mercury.jpg'
import saturnTexture from './assets/SolarSystem/saturn.jpg'
import saturnRingTexture from './assets/SolarSystem/saturn ring.png'
import venusTexture from './assets/SolarSystem/venus.jpg'
import earthTexture from './assets/SolarSystem/earth.jpg'
import marsTexture from './assets/SolarSystem/mars.jpg'
import jupiterTexture from './assets/SolarSystem/jupiter.jpg'
import uranusTexture from './assets/SolarSystem/uranus.jpg'
import neptuneTexture from './assets/SolarSystem/neptune.jpg'

const renderer = new three.WebGLRenderer()
renderer.shadowMap = true

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

//make scene
const scene = new three.Scene()

//construct perpestive camera
const camera = new three.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 
    0.1, 1000)

camera.position.set(-90,140,140);

//setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
controls.enablePan = false

//make ambient light
const ambientLight = new three.AmbientLight(0x333333, 2.5)
scene.add(ambientLight)

//make point light
const pointLight = new three.PointLight(0xffffff, 2500, 300)
pointLight.position.set(0, 0, 0)
scene.add(pointLight)

//make stars for background
const starsTextureLoader = new three.CubeTextureLoader()
scene.background = starsTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
])

//make texture loader
const textureLoader = new three.TextureLoader()

//make sun
const sunGeometry = new three.SphereGeometry(16, 30, 30)
const sunMaterial = new three.MeshBasicMaterial({ map: textureLoader.load(sunTexture) })
const sun = new three.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

//make mercury
const mercuryGeometry = new three.SphereGeometry(3.2, 30, 30)
const mercuryMaterial = new three.MeshStandardMaterial({ map: textureLoader.load(mercuryTexture) })
const mercury = new three.Mesh(mercuryGeometry, mercuryMaterial)

const mercuryOrbit = new three.Object3D()
mercuryOrbit.add(mercury)
scene.add(mercuryOrbit)
mercury.position.x = 28

//make saturn
const saturnGeometry = new three.SphereGeometry(9.5, 30, 30)
const saturnMaterial = new three.MeshStandardMaterial({ map: textureLoader.load(saturnTexture) })
const saturn = new three.Mesh(saturnGeometry, saturnMaterial)
const saturnOrbit = new three.Object3D()
saturnOrbit.add(saturn)
scene.add(saturnOrbit)
saturn.position.x = 138
//make saturn ring
const saturnRingGeometry = new three.RingGeometry(10, 20, 30)
const saturnRingMaterial = new three.MeshStandardMaterial({ map: textureLoader.load(saturnRingTexture), side: three.DoubleSide })
const saturnRing = new three.Mesh(saturnRingGeometry, saturnRingMaterial)
saturnRing.rotation.x = Math.PI / 2
saturn.add(saturnRing)

function makePlanet(radius, texture, x){
    const geometry = new three.SphereGeometry(radius, 30, 30)
    const material = new three.MeshStandardMaterial({ map: textureLoader.load(texture) })
    const planet = new three.Mesh(geometry, material)
    planet.position.x = x
    
    const orbit = new three.Object3D()
    orbit.add(planet)
    scene.add(orbit)

    return {geometry, orbit}
}

const venus = makePlanet(4.8, venusTexture, 50)
const earth = makePlanet(5, earthTexture, 70)
const mars = makePlanet(4.2, marsTexture, 100)
const jupiter = makePlanet(11, jupiterTexture, 120)
const uranus = makePlanet(8, uranusTexture, 160)
const neptune = makePlanet(7.8, neptuneTexture, 180)



//update the canvas size when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

function animate(){
    requestAnimationFrame(animate)
    
    sun.rotateY(0.004)
    mercury.rotation.y += 0.004
    mercuryOrbit.rotation.y += 0.01
    saturn.rotation.y += 0.004
    saturnRing.rotation.z += 0.004
    saturnOrbit.rotation.y += 0.002
    venus.geometry.rotateY(0.04)
    venus.orbit.rotateY(0.008)
    earth.geometry.rotateY(0.04)
    earth.orbit.rotateY(0.007)
    mars.geometry.rotateY(0.04)
    mars.orbit.rotateY(0.006)
    jupiter.geometry.rotateY(0.04)
    jupiter.orbit.rotateY(0.005)
    uranus.geometry.rotateY(0.04)
    uranus.orbit.rotateY(0.004)
    neptune.geometry.rotateY(0.04)
    neptune.orbit.rotateY(0.003)


    renderer.render(scene, camera)
}

animate()

renderer.render(scene, camera)