class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui, _material) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var cylinderGeom = new THREE.CylinderGeometry(1,1, 1,3);
      
      
      // Ya podemos construir el Mesh
      this.cilindro = new THREE.Mesh (cylinderGeom, _material);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.cilindro);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //box.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
       // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
        this.radioSup = 1.0;
        this.radioInf = 1.0;
        this.altura = 1.0;
        this.numSegmentos = 3.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radioSup = 1.0;
            this.radioInf = 1.0;
            this.altura = 1.0;
            this.numSegmentos = 3.0;
            that.cilindro.geometry = new THREE.CylinderGeometry(this.radioSup, this.radioInf, this.altura, this.numSegmentos);
          
        }
      } 
      
      // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radioSup', 0.1, 5.0, 0.1).name ('Radio Superior : ').listen().onChange(function (value) {
         that.cilindro.geometry = new THREE.CylinderGeometry(value, that.guiControls.radioInf, that.guiControls.altura, that.guiControls.numSegmentos); });
    folder.add (this.guiControls, 'radioInf', 0.1, 5.0, 0.1).name ('Radio Inferior : ').listen().onChange(function (value) {
         that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radioSup, value, that.guiControls.altura, that.guiControls.numSegmentos); });
    folder.add (this.guiControls, 'altura', 0.1, 5.0, 0.1).name ('Altura : ').listen().onChange(function (value) {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radioSup, that.guiControls.radioInf, value, that.guiControls.numSegmentos); });
    folder.add (this.guiControls, 'numSegmentos', 3.0, 15.0, 1.0).name ('N Segmentos : ').listen().onChange(function (value) {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radioSup, that.guiControls.radioInf, that.guiControls.altura, value); });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      //Para que el objeto esté girando constantemente
      this.rotation.x += 0.01;
      this.rotation.y += 0.01;
      this.rotation.z += 0.01;
    }
  }