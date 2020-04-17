 
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

    this.satelites = new THREE.Object3D();

    this.tierra = new THREE.Mesh(geomEsfera, materialTierra);
    this.satelites.add(this.tierra);

    this.sat = [];
    for (let i = 0; i < 3; i++) {
      var geomEsfera = new THREE.SphereGeometry(2, 20, 20);
      this.sat.push(new THREE.Mesh(geomEsfera, materialCara));
      this.sat[i].position.x += (i+1)*6;
      this.satelites.add(this.sat[i]);
    }
   
    this.add(this.satelites);
    this.satelites.position.y +=3;

      //Posicionamos al primer satelite mirando hacia la tierra
    this.sat[0].rotation.y += Math.PI;
      //Posicionamos el segundo satelite mirando en un primer momento a camara
    this.sat[1].rotation.y -= Math.PI/4;
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
    //Todo gira
    this.satelites.rotation.y += 0.01;
    //El segundo satelite va contrarrestando la rotacion en general para mirar siempre a camara
    this.sat[1].rotation.y -= 0.01;
    //Cada vez que todo gira, el tercer satelite realiza una rotación sobre si mismo
    this.sat[2].rotation.y += 0.01;
    
    

  }
}