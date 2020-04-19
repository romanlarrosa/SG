class Tuerca extends THREE.Object3D {
    constructor(gui,titleGui, _material) {
      super();

      //Geometrias
      var cilindroGeom = new THREE.CylinderGeometry(4, 4, 3, 6);
      var esferaGeom = new THREE.SphereGeometry(4.15, 16, 16);

      //Nodos
      var cilindrobsp = new ThreeBSP(cilindroGeom);
      var esferabsp = new ThreeBSP(esferaGeom);

      ///Operaciones
      var piezaPrincipal = cilindrobsp.intersect(esferabsp);

      //Eliminamos la tuerca interior
      //Creamos un cilindro y lo restamos
      var cilindroCentroG = new THREE.CylinderGeometry(2, 2, 4, 32);
      var cilindroCentroBSP = new ThreeBSP(cilindroCentroG);
      piezaPrincipal = piezaPrincipal.subtract(cilindroCentroBSP);
      //Restamos los toros para crear las muescas
      for (let i = 0; i < 10; i++) {
        var toroG = new THREE.TorusGeometry(2, 0.15, 16, 16);
        toroG.rotateX(Math.PI/2);

        toroG.translate(0, 1.35-(0.3*i), 0);
        var toroBSP = new ThreeBSP(toroG);
        piezaPrincipal = piezaPrincipal.subtract(toroBSP);
      }

      var pieza = piezaPrincipal.toMesh(_material);

      this.add(pieza);
      
      
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