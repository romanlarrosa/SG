 
class Saltarina extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);
    //Material
    var matCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true, flatShading:false});
    var matEsfera = new THREE.MeshNormalMaterial({flatShading:false});
    
    this.geomCilindro = new THREE.CylinderGeometry(10, 10, 20, 100 ,1);
    this.cilindro = new THREE.Mesh(this.geomCilindro, matCilindro);
    this.cilindro.position.y += 10;

    this.geomEsfera = new THREE.SphereGeometry(1, 20, 20);
    this.esfera = new THREE.Mesh(this.geomEsfera, matEsfera);
    this.esfera.position.x += 10;
    this.esfera.position.y += 1;


    this.add(this.cilindro);
    this.add(this.esfera);

    this.tiempoAnterior = Date.now();
    this.velocidad = Math.PI/2; //Rad/s

    this.animarEsfera();
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radio = 10;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radio = 10;
        that.cilindro.geometry = new THREE.CylinderGeometry(10, 10, 20, 100, 1);
        that.esfera.position.x = 10;        
        }
    } 
    
    // Se crea una sección para los controles de la caja
    //var folder = gui.addFolder ("Primer Péndulo");
    var that = this;
    gui.add(this.guiControls, 'radio', 5.0, 30.0, 0.1).name('Radio del cilindro').listen().onChange(function(value){
      that.cilindro.geometry = new THREE.CylinderGeometry(value, value, 20, 100, 1);
      that.esfera.position.x = value;
    })
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    

    gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  animarEsfera(){
      var origen = {y: 1};
      var destino = {y: 19};
      var that = this;

      var animacion = new TWEEN.Tween(origen)
      .to(destino, 500)
      .yoyo(true)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(Infinity)
      .onUpdate(function(){ that.esfera.position.y = origen.y})
      .start();
  }

  
  update () {
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
    this.rotation.y -= this.velocidad * segundosTranscurridos;
    this.tiempoAnterior = tiempoActual;
  }
}