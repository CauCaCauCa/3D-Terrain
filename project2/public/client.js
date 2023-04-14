import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
// import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

// Texture loader
const loader = new THREE.TextureLoader()
const height = loader.load('height.png')
const texture = loader.load('map.jpg')
const alpha = loader.load('alpha.png')


// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects 
var planeGeo = new THREE.PlaneGeometry(3, 3, 64, 64);

// Materials 
const material = new THREE.MeshStandardMaterial({
    color: 0x2284a5,
    map: texture,
    displacementMap: height,
    displacementScale: .5,
    alphaMap: alpha,
    transparent: true
});

// Mesh
var plane = new THREE.Mesh(planeGeo, material)
scene.add(plane)

plane.rotation.x = -1.22

gui.add(plane.rotation, 'x').min(-10).max(10)

// Lights
let Light = new THREE.AmbientLight("white", 0.7);
scene.add(Light)

let pointLight = new THREE.PointLight(0x2284a5, 3)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(-50).max(50)
gui.add(pointLight.position, 'y').min(-50).max(50)
gui.add(pointLight.position, 'z').min(-50).max(50)

const col = { color: '#00ff00' }
gui.addColor(col, 'color').onChange(() => {
    pointLight.color.set(col.color)
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain)
let mouseY = 0
function animateTerrain(event) { mouseY = event.clientY }


const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    plane.rotation.z = .5 * elapsedTime

    plane.material.displacementScale = mouseY * 0.002

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()