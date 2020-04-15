 
class Elipse extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);
    //Material
    var matCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true, flatShading:false});
    var matEsfera = new THREE.MeshNormalMaterial({flatShading:false});

    //Hacemos la elipse
    //Curva
    var curva = new THREE.EllipseCurve(0, 0, 10, 10);
    var puntos = curva.getPoints( 50 );

    this.camino = new THREE.SplineCurve(puntos);
    var points = this.camino.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
this.splineObject = new THREE.Line( geometry, material );

this.add(this.splineObject);

    this.shape = new THREE.Shape(puntos);
    this.extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: false,
    };

    var geometry = new THREE.ExtrudeBufferGeometry(this.shape, this.extrudeSettings);

    this.elipse = new THREE.Mesh(geometry, matCilindro);
    this.elipse.rotation.x -= Math.PI/2;
    this.add(this.elipse);
    
    this.geomEsfera = new THREE.SphereGeometry(1, 20, 20);
    this.esfera = new THREE.Mesh(this.geomEsfera, matEsfera);
    this.esfera.position.x += 10;
    this.esfera.position.y += 1;

    this.add(this.esfera);

    this.tiempoAnterior = Date.now();
    this.velocidad = Math.PI/2; //Rad/s

    var time = Date.now;
    var looptime = 20000;
    this.t = (time % looptime) / looptime;

    //this.animarEsfera();
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.extension = 0;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.extension = 0;     
        }
    } 
    
    // Se crea una sección para los controles de la caja
    var that = this;
    gui.add(this.guiControls, 'extension', 0, 20.0, 0.1).name('Extension: ').listen().onChange(function(value){
      var curva = new THREE.EllipseCurve(0, 0, 10, 10 + (10*value));
      var puntos = curva.getPoints( 50 );

      that.camino = new THREE.SplineCurve(puntos);

      that.shape = new THREE.Shape(puntos);
      that.splineObject.geometry = new THREE.BufferGeometry().setFromPoints( puntos );
      //that.elipse.geometry = new THREE.ExtrudeBufferGeometry(that.shape, that.extrudeSettings);
      //that.animarEsfera();
    })
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    

    gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  animarEsfera(){
      var origen = {y: 0};
      var destino = {y: 1};
      var that = this;

      var animacion = new TWEEN.Tween(origen)
      .to(destino, 20000)
      .yoyo(false)
      .easing(TWEEN.Easing.Linear.None)
      .repeat(Infinity)
      .onUpdate(function(){ 
        var position = that.camino.getPointAt(this.t);
        that.esfera.position.copy(position);
      })
      .start();
  }

  
  update () {
    
  }
}