class Coche extends THREE.Object3D {
    constructor(gui,titleGui, _material) {
      super();
      

      var that = this;
      var materialLoader = new THREE.MTLLoader();
      var objectLoader = new THREE.OBJLoader();

      //Cargamos el material
      materialLoader.load('../models/porsche911/911.mtl', function(materials){
        objectLoader.setMaterials(materials);
        objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', function(object){
          var modelo = object;
          that.add(modelo);
        }, null, null);
      });


    }
    
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      //Para que el objeto esté girando constantemente
      this.rotation.y += 0.01;
    }
  }