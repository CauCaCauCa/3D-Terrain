import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'


// Texture loader
const loader = new THREE.TextureLoader()
const height = loader.load('image/plane1.png')
const texture = loader.load('image/plane.jpg')
// const alpha = loader.load('image/alpha.png')

// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: "#298575",
    map: texture,
    displacementMap: height,
    displacementScale: 0.5,
    // alphaMap: alpha
})

const plane = new THREE.Mesh(geometry, material)
plane.rotation.x = -1.08
plane.position.z = -1.5

scene.add(plane)

// setup GUI
gui.add(plane.rotation, 'x').min(-10).max(10)
gui.add(plane.rotation, 'y').min(-10).max(10)
gui.add(plane.position, 'z').min(-10).max(10)


// Lights

// let Light = new THREE.AmbientLight("white", 0.3);
// scene.add(Light)

const pointLight = new THREE.PointLight(0xffffff, 0.7)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'z')
const col = { color: '#298575' }
gui.addColor(col, 'color').onChange(() => {
    pointLight.color.set(col.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
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
camera.position.z = 2
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
function animateTerrain(event) {
    mouseY = event.clientY
}

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    plane.rotation.z = .5 * elapsedTime

    plane.material.displacementScale = mouseY * 0.002

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
