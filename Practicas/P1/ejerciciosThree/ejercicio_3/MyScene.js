 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (10);
    this.add (this.axis);

    
    //Creamos el material
    this.Mat = new THREE.MeshNormalMaterial();
    this.Mat.flatShading = this.guiControls.sombreado;
    this.Mat.needsUpdate = true;
    this.Mat.side = THREE.DoubleSide;
    
    
    // Por último creamos el modelo.
    //Generamos el vector de puntos para el perfil del peon.
    this.puntos = [];
    this.generarPuntos();
    

    //Creamos la linea para visualizar el perfil
    this.lineGeometry = new THREE.Geometry();
    this.lineGeometry.vertices = this.puntos;
    this.lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
    //Creamos la linea con sus ejes
    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
    this.line.position.set(0, 2, 0);
    this.ejesLinea = new THREE.AxisHelper(4);
    this.ejesLinea.add(this.line);

    //Ubicamos la linea en el modelo y la movemos
    this.add(this.ejesLinea);
    this.ejesLinea.position.set(-5, 0, 0);

    //Añadimos el objeto 1
    this.peon1 = new ObjRevol(this.gui, "Controles Peon", this.puntos, this.Mat);


    //Ubicamos la linea en el modelo y la movemos
    this.add(this.peon1);

    //Añadimos el peon2 (Solo cambia la resolucion)
    this.peon2 = new ObjRevol(this.gui, "Controles Peon2", this.puntos, this.Mat);


    //Ubicamos la linea en el modelo y la movemos
    this.add(this.peon2);
    this.peon2.position.set(5, 0, 0);
    this.peon2.Obj.geometry = new THREE.LatheGeometry(this.puntos, 3, 0, 2*Math.PI);

  }

  generarPuntos(){
    this.puntos.push(new THREE.Vector3(0.0, -1.4, 0.0));
    this.puntos.push(new THREE.Vector3(1.0, -1.4, 0.0));
    this.puntos.push(new THREE.Vector3(1.0, -1.1, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, -0.7, 0.0));
    this.puntos.push(new THREE.Vector3(0.4, -0.4, 0.0));
    this.puntos.push(new THREE.Vector3(0.4, 0.5, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 0.6, 0.0));
    this.puntos.push(new THREE.Vector3(0.3, 0.6, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 0.8, 0.0));
    this.puntos.push(new THREE.Vector3(0.55, 1.0, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 1.2, 0.0));
    this.puntos.push(new THREE.Vector3(0.3, 1.4, 0.0));
    this.puntos.push(new THREE.Vector3(0.0, 1.4, 0.0));
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (20, 10, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    var that = this;
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.sombreado = true;
      this.resolucion = 3;
      this.angulo = 1.0;
      
      this.reset = function () {
        this.resolucion = 3;
        this.angulo = 15.0;
        that.peon1.Obj.geometry = new THREE.LatheGeometry(that.puntos, this.resolucion, 0, this.angulo);
        that.peon2.Obj.geometry = new THREE.LatheGeometry(that.puntos, this.resolucion, 0, 2*Math.PI);
      }
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');

    gui.add(this.guiControls, 'sombreado').name('Sombreado : ').listen();
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

    var folder1 = gui.addFolder('Parametros Revolución');
    folder1.add (this.guiControls, 'resolucion', 3, 15, 1.0).name(' Resolucion : ').listen().onChange(function(value) {
      //Cambian las dos resoluciones
        that.peon1.Obj.geometry = new THREE.LatheGeometry(that.puntos, value, 0, that.guiControls.angulo);
        that.peon2.Obj.geometry = new THREE.LatheGeometry(that.puntos, value, 0, 2*Math.PI);
      
    });
    folder1.add (this.guiControls, 'angulo', 1, 2*Math.PI, 0.1).name(' Ángulo : ').listen().onChange(function(value) {
        that.peon1.Obj.geometry = new THREE.LatheGeometry(that.puntos, that.guiControls.resolucion, 0, value);
    });
    folder1.add (this.guiControls, 'reset').name(' RESET ').listen();
    
    return gui;
  }

  
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
    this.Mat.flatShading = this.guiControls.sombreado; 
    this.Mat.needsUpdate = true; 

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
  }

}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
