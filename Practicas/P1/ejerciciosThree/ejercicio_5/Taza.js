class Taza extends THREE.Object3D {
    constructor(gui,titleGui, _material) {
      super();
      
      
      // Un Mesh se compone de geometría y material
      var cylinderGeom = new THREE.CylinderGeometry(3,3, 5,20);

      var cilindroInterior = new THREE.CylinderGeometry(2.8,2.8,5,20);
      cilindroInterior.translate(0, 0.2, 0);

      var asa = new THREE.TorusGeometry(2, 0.2, 20, 20, 2*Math.PI);
      asa.rotateZ(Math.PI/2);
      asa.translate(-2.9, 0, 0);

      //Creamos los nodos bsp
      var cilindro1bsp = new ThreeBSP(cylinderGeom);
      var cilindro2bsp = new ThreeBSP(cilindroInterior);
      var asabsp = new ThreeBSP(asa);

      //Se realizan las operaciones
      var resutadoAsa = asabsp.subtract(cilindro1bsp);
      var resultadoparcial = cilindro1bsp.subtract (cilindro2bsp);
      var resultadofinal = resultadoparcial.union (resutadoAsa);

           
      // Ya podemos construir el Mesh
      var resultado = resultadofinal.toMesh(_material); 
      
      resultado.geometry.computeFaceNormals();
      resultado.geometry.computeVertexNormals();

      // Y añadirlo como hijo del Object3D (el this)
      this.add (resultado);
      
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      //box.position.y = 0.5;
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