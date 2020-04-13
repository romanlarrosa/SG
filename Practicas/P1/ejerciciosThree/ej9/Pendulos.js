 
class Pendulos extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    //Materiales a usar
    //Rojo
    this.MRojo = new THREE.MeshPhongMaterial({color: 0xD76464 });
    //Verde
    this.MVerde = new THREE.MeshPhongMaterial({color: 0x87E840 });
    //Azul
    this.MAzul = new THREE.MeshPhongMaterial({color: 0x40C0E8 });
    //Amarillo
    this.MAmarillo = new THREE.MeshPhongMaterial({color: 0xE8D84D});

    //Declarar el primer pendulo
    var geomPP = new THREE.BoxGeometry (4,1,1);
    var geomPS = new THREE.BoxGeometry (2,1,1);

    geomPP.translate(0, -0.5, 0);
    geomPS.translate(0, -0.5, 0);

    //Construir el Pendulo Principal
    this.PPparteArriba = new THREE.Mesh (geomPP, this.MVerde);
    this.PPparteArriba.scale.y = 4;

    this.PPparteCentro = new THREE.Mesh (geomPP, this.MRojo);
    this.PPparteCentro.scale.y = 1*this.guiControls.PPlongitud;
    this.PPparteCentro.position.y = -4;

    this.PPparteAbajo = new THREE.Mesh (geomPP, this.MVerde);
    this.PPparteAbajo.scale.y = 4;
    this.PPparteAbajo.position.y = -4 - 1*this.guiControls.PPlongitud;

    var geomEjePP = new THREE.CylinderGeometry(1.0, 1.0, 1.5, 20);
    geomEjePP.rotateX(Math.PI/2);
    geomEjePP.translate(0, -2, 0);

    var ejePP = new THREE.Mesh (geomEjePP, this.MAmarillo);


    this.PPnodo = new THREE.Object3D();
    this.PPnodo.add(this.PPparteArriba);
    this.PPnodo.add(this.PPparteAbajo);
    this.PPnodo.add(this.PPparteCentro);
    this.PPnodo.add(ejePP);

    //Construir el pendulo secundario
    this.PSpendulo = new THREE.Mesh (geomPS, this.MAzul);
    this.PSpendulo.scale.y = 1*this.guiControls.PSlongitud;
    this.PSpendulo.position.z = 1;

    var geomEjePS = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20);
    geomEjePS.rotateX(Math.PI/2);
    geomEjePS.translate(0, -1, 1);

    var ejePS = new THREE.Mesh (geomEjePS, this.MAmarillo);

    this.PSnodo = new THREE.Object3D();
    this.PSnodo.add(this.PSpendulo);
    this.PSnodo.add(ejePS);

    this.PSnodo.position.y = 1;
    
    this.PSaux = new THREE.Object3D();
    this.PSaux.add(this.PSnodo);
    this.PSaux.position.y = - 5 - ((this.guiControls.PSposicion/100)*this.guiControls.PPlongitud);
  

    this.PPnodo.add(this.PSaux);
    this.PPnodo.position.y += 2;

    this.add(this.PPnodo);  

    this.tiempoAnterior = Date.now();
    
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.PPlongitud = 5;
      this.PPgiro = 0;

      this.PSlongitud = 10;
      this.PSposicion = 10;
      this.PSgiro = 0;

      this.velocidadPP = 0;
      this.velocidadPS = 0;

      this.activarPP = false;
      this.activarPS = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.PPlongitud = 5;
        this.ppgiro = 0;

        this.PSlongitud = 10;
        this.PSposicion = 10;
        this.PSgiro = 0;

        this.velocidadPP = 0;
        this.velocidadPS = 0;

        this.activarPP = false;
        this.activarPS = false;
        }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Primer Péndulo");
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'PPlongitud', 5.0, 10.0, 0.1).name ('Longitud : ').listen();
    folder.add (this.guiControls, 'PPgiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotacion superior : ').listen();

    var folder2 = gui.addFolder ("Segundo Péndulo");
    
    folder2.add (this.guiControls, 'PSlongitud', 10.0, 20.0, 0.1).name ('Longitud : ').listen();
    folder2.add (this.guiControls, 'PSposicion', 10, 90, 0.1).name ('Posicion (%): ').listen();
    folder2.add (this.guiControls, 'PSgiro', -Math.PI/4, Math.PI/4, 0.1).name ('Rotacion infeiror : ').listen();

    var folder3 = gui.addFolder ("Animación");

    folder3.add (this.guiControls, 'activarPP').name ('Péndulo 1').listen().onChange(function(value){
      that.animarPP();
      if(value){
        that.movimiento1PP.start();
      }
      else{
        that.movimiento1PP.stop();
        console.log("Apago la animacion");
      }
      
    });
    folder3.add (this.guiControls, 'velocidadPP', 0.0, 2.0, 0.1).name('Velocidad (rad/s)').listen();
    folder3.add (this.guiControls, 'activarPS').name ('Péndulo 2').listen();
    folder3.add (this.guiControls, 'velocidadPS', 0.0, 2.0, 0.1).name('Velocidad (rad/s)').listen();

    gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  animarPP() {
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
    //Declarar la animacion del pendulo principal:
    var that = this;
    var origen2PP = {giro: Math.PI/4};
    var movimiento2PP = new TWEEN.Tween(origen2PP)
    .to({giro: -Math.PI/4}, 1000*(Math.PI/2)/that.guiControls.velocidadPP)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .repeat(Infinity)
    .yoyo (true)
    .onUpdate(function() {that.guiControls.PPgiro = origen2PP.giro});

    var origen1PP = {giro: this.guiControls.PPgiro};
    this.movimiento1PP = new TWEEN.Tween(origen1PP)
    .to({giro: Math.PI/4}, 1000*(Math.PI/4 - origen1PP.giro)/that.guiControls.velocidadPP)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function() {that.guiControls.PPgiro = origen1PP.giro})
    .chain(movimiento2PP);

    this.tiempoAnterior = tiempoActual;
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.PPparteCentro.scale.y = 1*this.guiControls.PPlongitud;
    this.PPparteAbajo.position.y = -4 - 1*this.guiControls.PPlongitud;

    this.PSpendulo.scale.y = 1*this.guiControls.PSlongitud;
    this.PSaux.position.y = 1 - 5 - ((this.guiControls.PSposicion/100)*this.guiControls.PPlongitud);

    this.PSaux.rotation.z = this.guiControls.PSgiro;
    this.rotation.z = this.guiControls.PPgiro;

  }
}