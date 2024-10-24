import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let speakers = [];

init();
render();

function init() {
    // Szene erstellen
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Kamera erstellen
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 15, 15);

    // Renderer erstellen
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // OrbitControls für Kamerasteuerung
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Lichteinstellungen
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10).normalize();
    scene.add(light);

    // Event Listener für UI
    document.getElementById('generate').addEventListener('click', generateRoom);
}

function generateRoom() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);

    // Boden hinzufügen
    const floorGeometry = new THREE.PlaneGeometry(length, width);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Wände hinzufügen
    addWall(length, width);

    // Lautsprecher alle 3 Meter an den Wänden
    placeSpeakers(length, width);
}

function addWall(length, width) {
    // Wände entfernen, falls sie schon existieren
    scene.children = scene.children.filter(obj => obj.type !== 'Mesh' || !obj.name.startsWith('wall'));

    const wallHeight = 3;
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xa0a0a0 });

    // Vier Wände hinzufügen
    const wallFront = new THREE.Mesh(new THREE.PlaneGeometry(width, wallHeight), wallMaterial);
    wallFront.position.set(0, wallHeight / 2, -length / 2);
    wallFront.name = 'wallFront';
    scene.add(wallFront);

    const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(width, wallHeight), wallMaterial);
    wallBack.position.set(0, wallHeight / 2, length / 2);
    wallBack.rotation.y = Math.PI;
    wallBack.name = 'wallBack';
    scene.add(wallBack);

    const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(length, wallHeight), wallMaterial);
    wallLeft.position.set(-width / 2, wallHeight / 2, 0);
    wallLeft.rotation.y = Math.PI / 2;
    wallLeft.name = 'wallLeft';
    scene.add(wallLeft);

    const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(length, wallHeight), wallMaterial);
    wallRight.position.set(width / 2, wallHeight / 2, 0);
    wallRight.rotation.y = -Math.PI / 2;
    wallRight.name = 'wallRight';
    scene.add(wallRight);
}

function placeSpeakers(length, width) {
    // Alle bisherigen Lautsprecher entfernen
    speakers.forEach(speaker => scene.remove(speaker));
    speakers = [];

    const speakerGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const speakerMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // Positioniere Lautsprecher alle 3 Meter an den Wänden
    const speakerDistance = 3;
    for (let x = -width / 2; x <= width / 2; x += speakerDistance) {
        const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        speaker.position.set(x, 1.5, -length / 2);
        speakers.push(speaker);
        scene.add(speaker);
    }

    for (let z = -length / 2; z <= length / 2; z += speakerDistance) {
        const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        speaker.position.set(width / 2, 1.5, z);
        speakers.push(speaker);
        scene.add(speaker);
    }
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
