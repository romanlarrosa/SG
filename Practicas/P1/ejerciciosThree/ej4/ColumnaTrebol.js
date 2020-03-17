class ColumnaTrebol extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        var material = new THREE.MeshBasicMaterial( { color: 0xCF0000 } );
        this.Mat = new THREE.MeshNormalMaterial();
        this.Mat.flatShading = true;
        this.Mat.needsUpdate = true;

        var trebolShape = new THREE.Shape();

        trebolShape.moveTo( 0, 6 );
        trebolShape.quadraticCurveTo(0,0,-6, 0);
        trebolShape.quadraticCurveTo(-12,0,-12,6);
        trebolShape.quadraticCurveTo(-12, 13, -5, 11.8);
        trebolShape.quadraticCurveTo(-6, 12.2, -6, 15);
        trebolShape.quadraticCurveTo(-6, 21, 0, 21);
        trebolShape.quadraticCurveTo(6, 21, 6, 15);
        trebolShape.quadraticCurveTo(6, 12.2, 5, 11.8);
        trebolShape.quadraticCurveTo(12, 13, 12, 6);
        trebolShape.quadraticCurveTo(12, 0, 6, 0);
        trebolShape.quadraticCurveTo(0, 0, 0, 6);

        

        var linea = new THREE.CatmullRomCurve3( [
          new THREE.Vector3( 0, -20, 0 ),
          new THREE.Vector3(-1, -5, 0 ),
          new THREE.Vector3( 1, 5, 0 ),
          new THREE.Vector3( 0, 20, 0 ),
				] );

        var extrudeSettings = {
          steps: 20,
          depth: 2,
          bevelEnabled: false,
          extrudePath: linea
        };

        var geometry = new THREE.ExtrudeGeometry( trebolShape, extrudeSettings );
        
        this.objeto = new THREE.Mesh( geometry, this.Mat ) ;
        this.add( this.objeto );
        this.objeto.position.set(10, 0, 0);
        this.scale.set(0.2, 0.2, 0.2);

    }


    update(resolucion, angulo) {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.rotation.y += 0.01;
      
    }
}