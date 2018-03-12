var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(-1,0,1);
scene.add(light);

THREE.ImageUtils.crossOrigin = '';

var text_texture = new THREE.TextureLoader().load(
	'https://aperesso.github.io/linsa_/logo_l_insane_white.png'
);
var text_material = new THREE.MeshLambertMaterial({color: 0xffffff, opacity: 1, map: text_texture, transparent: true, blending: THREE.AdditiveBlending});
var text_geometry = new THREE.PlaneGeometry(350,20);
var text = new THREE.Mesh(text_geometry, text_material);
text.position.z = 750;
scene.add(text);

var smoke_texture = new THREE.TextureLoader().load(
	'https://aperesso.github.io/linsa_/smoke_texture.png'
);
var smoke_geometry = new THREE.PlaneGeometry(300,300);
var smoke_particles = [];

for (var i = 0; i < 180; i++)
{
	var smoke_material = new THREE.MeshLambertMaterial({opacity: 0.6, map: smoke_texture, transparent: true});
	var r = Math.random();
	if (r < 0.5)
		smoke_material.color = new THREE.Color(0xd3d3d3);
	else {
		smoke_material.color = new THREE.Color(0x111111);
	}
	var smoke_particle = new THREE.Mesh(smoke_geometry, smoke_material);
	smoke_particle.position.set(
		Math.random()*500-250,
		Math.random()*500-250,
		Math.random()*1000-100);
	smoke_particle.rotation.z = Math.random() * 360;
	scene.add(smoke_particle);
	smoke_particles.push(smoke_particle);
}

camera.position.z = 1000;

var animate = function () {
	delta = clock.getDelta();
	requestAnimationFrame( animate );
	var p = smoke_particles.length;
	while(p--) {
		smoke_particles[p].rotation.z += (delta * 0.2);
	}
	renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
