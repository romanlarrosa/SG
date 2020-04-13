class Reloj extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      //Materiales a usar
      //Rojo
      var MRojo = new THREE.MeshPhongMaterial({color: 0xD76464 });
      //Verde
      var MVerde = new THREE.MeshPhongMaterial({color: 0x87E840 });

      //Creamos la geometria de la esfera que va a usar le reloj
      var geomEsf = new THREE.SphereGeometry(1, 20, 20);
      
      this.aguja = new THREE.Mesh(geomEsf, MRojo);
      this.aguja.position.x += 10;
      this._aguja = new THREE.Object3D();
      this._aguja.add(this.aguja);
      this.add(this._aguja);

      //Posicionamos las marcas
      for(var i = 0; i < 12; i++){
          var marca = new THREE.Mesh(geomEsf, MVerde);
          marca.position.x += 13;
          var _marca = new THREE.Object3D();
          _marca.add(marca);
          _marca.rotation.y += 0 + i * (Math.PI*2 / 12);

          this.add(_marca);
      }

      this.tiempoAnterior = Date.now();
      this.velocidadAguja = this.guiControls.velocidad * ((Math.PI*2)/12) ; 


       
    }
    
    createGUI (gui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.velocidad = 1;
      } 
      
      gui.add(this.guiControls, 'velocidad',-10.0, 10.0, 1.0).name('Velocidad (marcas/s)').listen();
      
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación

      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
      this._aguja.rotation.y -= this.guiControls.velocidad * (this.velocidadAguja * segundosTranscurridos);
      this.tiempoAnterior = tiempoActual;
      
    }
  }