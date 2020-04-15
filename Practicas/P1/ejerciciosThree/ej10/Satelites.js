 
class Satelites extends THREE.Object3D {
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

    var texturaTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var materialTierra = new THREE.MeshPhongMaterial ({map: texturaTierra});

    var geomEsfera = new THREE.SphereGeometry(3.0, 20, 20);

    var texturaCara = new THREE.TextureLoader().load('../imgs/cara.jpg');
    var materialCara = new THREE.MeshPhongMaterial ({map: texturaCara});

    this.tierra = new THREE.Mesh(geomEsfera, materialTierra);
    this.add(this.tierra);
   
    
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        
        }
    } 
    
    // Se crea una sección para los controles de la caja
    //var folder = gui.addFolder ("Primer Péndulo");
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    

    gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    

  }
}