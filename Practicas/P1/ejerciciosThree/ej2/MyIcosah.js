class MyIcosah extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var Geom = new THREE.IcosahedronGeometry(1,0);
      // Como material se crea uno a partir de un color
      var Mat = new THREE.MeshNormalMaterial();
      Mat.flatShading = true;
      Mat.needsUpdate = true;
      
      // Ya podemos construir el Mesh
      this.icosah = new THREE.Mesh (Geom, Mat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.icosah);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //box.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
       // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
        this.radio = 1.0;
        this.detalle = 0.0;
        
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.detalle = 0.0;
          
        }
      } 
      
      // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').listen().onChange(function (value) {
         that.icosah.geometry = new THREE.IcosahedronGeometry(value, that.guiControls.detalle); });
    folder.add (this.guiControls, 'detalle', 0.0, 5.0, 1.0).name ('Detalle : ').listen().onChange(function (value) {
        that.icosah.geometry = new THREE.IcosahedronGeometry(that.guiControls.radio, value); });
    
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