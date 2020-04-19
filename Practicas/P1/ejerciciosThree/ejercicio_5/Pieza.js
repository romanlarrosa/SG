class Pieza extends THREE.Object3D {
    constructor(gui,titleGui, _material) {
      super();
      
      
      // Un Mesh se compone de geometría y material
      var boxGeom = new THREE.BoxGeometry(5, 5, 2);
      var boxGeom2 = new THREE.BoxGeometry(0.5, 0.5, 2);
      boxGeom2.translate(-2.25, 2.25, 0);
      var piezaGeom = new THREE.BoxGeometry(5, 5, 2);
      piezaGeom.translate(-0.5, 0.5, 0);

      var cilindroGeom = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
      cilindroGeom.rotateX(Math.PI/2);
      cilindroGeom.translate(-2, 2, 0);

        //Cilindro agujero 1
        var cilA1G = new  THREE.CylinderGeometry(0.25, 0.25, 0.25, 32);
        cilA1G.translate(1, 0.25/2 + 2.75, 0);
        var cilA2G = new  THREE.CylinderGeometry(0.25, 0.5, 0.25, 32);
        cilA2G.translate(1, -0.25/2 + 2.75, 0);

        //Cilindro agujero 2
        var cilA3G = new  THREE.CylinderGeometry(0.25, 0.25, 0.25, 32);
        cilA3G.rotateZ(Math.PI/2);
        cilA3G.translate(-0.25/2 - 2.75,0,0);
        
        var cilA4G = new  THREE.CylinderGeometry(0.25, 0.5, 0.25, 32);
        cilA4G.rotateZ(Math.PI/2);
        cilA4G.translate(0.25/2 - 2.75, 0, 0);

      var caja = new THREE.Mesh(boxGeom, _material);
      var cilindro = new THREE.Mesh(cilindroGeom, _material);
      var aux = new THREE.Mesh(piezaGeom, _material);

      //Nodos bsp
      var cajaauxbsp = new ThreeBSP(boxGeom);
      var cajaaux2bsp = new ThreeBSP(boxGeom2);
      var cilindrobsp = new ThreeBSP(cilindroGeom);
      var cajaprincipalbsp = new ThreeBSP(piezaGeom);
        //Nodos bsp cilindro agujero 1
        var cilA1Gbsp = new ThreeBSP(cilA1G);
        var cilA2Gbsp = new ThreeBSP(cilA2G);
        var cilArriba = cilA1Gbsp.union(cilA2Gbsp);

        //Nodos bsp cilindro agujero 1
        var cilA3Gbsp = new ThreeBSP(cilA3G);
        var cilA4Gbsp = new ThreeBSP(cilA4G);
        var cilAbajo = cilA3Gbsp.union(cilA4Gbsp);

      //Operaciones
      var restaCajas1 = cajaauxbsp.subtract(cajaaux2bsp);
      var cajaAux = restaCajas1.union(cilindrobsp);
      var piezaPrincipal = cajaprincipalbsp.subtract(cajaAux);
      piezaPrincipal = piezaPrincipal.subtract(cilArriba);
      piezaPrincipal = piezaPrincipal.subtract(cilAbajo);

      //Construir el mesh
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