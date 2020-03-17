class ColumnaCorazon extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        var material = new THREE.MeshBasicMaterial( { color: 0xCF0000 } );
        this.Mat = new THREE.MeshNormalMaterial();
        this.Mat.flatShading = true;
        this.Mat.needsUpdate = true;
        var x = 0, y = 0;

        var heartShape = new THREE.Shape();

        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

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

        var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        
        this.objeto = new THREE.Mesh( geometry, this.Mat ) ;
        this.add( this.objeto );
        this.objeto.position.set(10, 0, 5);
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