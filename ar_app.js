
//declarar las variables de nuestra app. 
var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

init(); // llamado de la funcion principal que se encarga de hacer casi  todo en la app
animate();

function init() {
    ////////////////////////////////////////////////////////
    //THREE Setup
    ///////////////////////////////////////////////////////
    // crear nuestra escena -  OBJETO.
    scene = new THREE.Scene(); //  crea un objeto escena.

    //////////////////////////////////////////////////////
    //LUCES
    //////////////////////////////////////////////////////

    let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
    light.position.set(0, 4, 4); //indico la posicion de la luz 
    light.castShadow = true; //activo la capacidad de generar sombras.
    scene.add(light); //agrego la luz a mi escena 

    let lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );

    lightSphere.position.copy(light);
    scene.add(lightSphere);

    //creamos luces 
    let ambientLight = new THREE.AmbientLight(0xcccccc); //creo las luz
    scene.add(ambientLight); //agrego la luz a mi escena. 

    camera = new THREE.Camera(); //creo objeto camara 
    scene.add(camera); // agrego camara a la escena

    //permite mostrar las cosas en 3d en la pantalla
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement); // agregarlo a nuestra pagina web


    //tiempo
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    ////////////////////////////////////////////////////////
    //AR Setup
    ///////////////////////////////////////////////////////

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResize()
        arToolkitSource.copySizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
        }
    }


    arToolkitSource.init(function onReady() {
        onResize();
    });

    //agregamos un event listener
    window.addEventListener('resize', function () { onResize() });

    //Setup ArKitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    /////////////////////////////////////////////////
    //Marker setup
    /////////////////////////////////////////////////

    markerPag0 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerPag0); // agregamos el grupo a la escena. 

    //Creamos nuestro marcador 
    let markerControl0 = new THREEx.ArMarkerControls(arToolkitContext, markerPag0, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag0.patt',
    });

    markerPag1 = new THREE.Group();
    scene.add(markerPag1);

    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, markerPag1, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag1.patt',
    });

    markerPag2 = new THREE.Group();
    scene.add(markerPag2); 

    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, markerPag2, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag2.patt',
    });

    markerPag3 = new THREE.Group();
    scene.add(markerPag3);

    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, markerPag3, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag3.patt',
    });

    markerPag4 = new THREE.Group();
    scene.add(markerPag4);

    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, markerPag4, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag4.patt',
    });

    markerPag5 = new THREE.Group();
    scene.add(markerPag5);

    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, markerPag5, {
        type: 'pattern', patternUrl: 'data/pattern-patronpag5.patt',
    });

    markerTxt1 = new THREE.Group();
    scene.add(markerTxt1);

    let markerControl6 = new THREEx.ArMarkerControls(arToolkitContext, markerTxt1, {
        type: 'pattern', patternUrl: 'data/pattern-patrontxt1.patt',
    });

    markerTxt2 = new THREE.Group();
    scene.add(markerTxt2);

    let markerControl7 = new THREEx.ArMarkerControls(arToolkitContext, markerTxt2, {
        type: 'pattern', patternUrl: 'data/pattern-patrontxt2.patt',
    });

    markerTxt3 = new THREE.Group();
    scene.add(markerTxt3);

    let markerControl8 = new THREEx.ArMarkerControls(arToolkitContext, markerTxt3, {
        type: 'pattern', patternUrl: 'data/pattern-patrontxt3.patt',
    });

    markerTxt4 = new THREE.Group();
    scene.add(markerTxt4);

    let markerControl9 = new THREEx.ArMarkerControls(arToolkitContext, markerTxt4, {
        type: 'pattern', patternUrl: 'data/pattern-patrontxt4.patt',
    });

    markerLogo = new THREE.Group();
    scene.add(markerLogo);

    let markerControl10 = new THREEx.ArMarkerControls(arToolkitContext, markerLogo, {
        type: 'pattern', patternUrl: 'data/pattern-patronlogo.patt',
    });

    markerVideo = new THREE.Group();
    scene.add(markerVideo);

    let markerControl11 = new THREEx.ArMarkerControls(arToolkitContext, markerVideo, {
        type: 'pattern', patternUrl: 'data/pattern-v1.patt',
    });


    ////////////////////////////////////////////////
    //Creacion de geometrias - Imagenes
    ///////////////////////////////////////////////

    let geo0 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader0 = new THREE.TextureLoader();
        let textura0 = loader0.load('images/pag0.png');
        let material0 = new THREE.MeshBasicMaterial({map:textura0});

        let meshImagen0 = new THREE.Mesh(geo0,material0);
        meshImagen0.rotation.x = -Math.PI/2;
        markerPag0.add(meshImagen0);

    let geo1 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader1 = new THREE.TextureLoader();
        let textura1 = loader1.load('images/pag1.png');
        let material1 = new THREE.MeshBasicMaterial({map:textura1});

        let meshImagen = new THREE.Mesh(geo1,material1);
        meshImagen.rotation.x = -Math.PI/2;
        markerPag1.add(meshImagen);

    let geo2 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader2 = new THREE.TextureLoader();
        let textura2 = loader2.load('images/pag2.png');
        let material2 = new THREE.MeshBasicMaterial({map:textura2});

        let meshImagen2 = new THREE.Mesh(geo2,material2);
        meshImagen2.rotation.x = -Math.PI/2;
        markerPag2.add(meshImagen2);

    let geo3 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader3 = new THREE.TextureLoader();
        let textura3 = loader3.load('images/pag3.png');
        let material3 = new THREE.MeshBasicMaterial({map:textura3});

        let meshImagen3 = new THREE.Mesh(geo3,material3);
        meshImagen3.rotation.x = -Math.PI/2;
        markerPag3.add(meshImagen3);
    
    let geo4 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader4 = new THREE.TextureLoader();
        let textura4 = loader4.load('images/pag4.png');
        let material4 = new THREE.MeshBasicMaterial({map:textura4});

        let meshImagen4 = new THREE.Mesh(geo4,material4);
        meshImagen4.rotation.x = -Math.PI/2;
        markerPag4.add(meshImagen4);

    let geo5 = new THREE.PlaneBufferGeometry(1.5,2,4,4);
        let loader5 = new THREE.TextureLoader();
        let textura5 = loader5.load('images/pag5.png');
        let material5 = new THREE.MeshBasicMaterial({map:textura5});

        let meshImagen5 = new THREE.Mesh(geo5,material5);
        meshImagen5.rotation.x = -Math.PI/2;
        markerPag5.add(meshImagen5);

    let geo6 = new THREE.PlaneBufferGeometry(5,3,4,4);
        let loader6 = new THREE.TextureLoader();
        let textura6 = loader6.load('images/texto1.png');
        let material6 = new THREE.MeshBasicMaterial({map:textura6});

        let meshTxt1 = new THREE.Mesh(geo6,material6);
        meshTxt1.rotation.x = -Math.PI/2;
        markerTxt1.add(meshTxt1);

    let geo7 = new THREE.PlaneBufferGeometry(5,3,4,4);
        let loader7 = new THREE.TextureLoader();
        let textura7 = loader7.load('images/texto2.png');
        let material7 = new THREE.MeshBasicMaterial({map:textura7});

        let meshTxt2 = new THREE.Mesh(geo7,material7);
        meshTxt2.rotation.x = -Math.PI/2;
        markerTxt2.add(meshTxt2);

    let geo8 = new THREE.PlaneBufferGeometry(5,3,4,4);
        let loader8 = new THREE.TextureLoader();
        let textura8 = loader8.load('images/texto3.png');
        let material8 = new THREE.MeshBasicMaterial({map:textura8});

        let meshTxt3 = new THREE.Mesh(geo8,material8);
        meshTxt3.rotation.x = -Math.PI/2;
        markerTxt3.add(meshTxt3);

    let geo9 = new THREE.PlaneBufferGeometry(5,3,4,4);
        let loader9 = new THREE.TextureLoader();
        let textura9 = loader9.load('images/texto4.png');
        let material9 = new THREE.MeshBasicMaterial({map:textura9});

        let meshTxt4 = new THREE.Mesh(geo9,material9);
        meshTxt4.rotation.x = -Math.PI/2;
        markerTxt4.add(meshTxt4);

    let geo10 = new THREE.PlaneBufferGeometry(4,4.5,4,4);
        let loader10 = new THREE.TextureLoader();
        let textura10 = loader10.load('images/logo.jpg');
        let material10 = new THREE.MeshBasicMaterial({map:textura10});

        let meshLogo = new THREE.Mesh(geo10,material10);
        meshLogo.rotation.x = -Math.PI/2;
        markerLogo.add(meshLogo);

    let geoVideo = new THREE.PlaneBufferGeometry(2,2,4,4); //molde geometria

        let video =  document.getElementById('video');
    
        let texture =  new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter= THREE.LinearFilter;
        texture.format =  THREE.RGBFormat;

        let material11 = new THREE.MeshBasicMaterial(
            {

                map:texture
        }
        );

        meshVideo = new THREE.Mesh(geoVideo, material11);
        meshVideo.rotation.x = -Math.PI/2;
        meshVideo.rotation.z = -Math.PI;

        markerVideo.add(meshVideo);


}

function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
    
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
    video.play();
}

function playVideo(){
	let video = document.getElementById('video');
	video.play();
}
