class corazon extends THREE.Object3D {
    constructor(gui, titleGui, _material) {
        super();
        
        var heartShape = new THREE.Shape();

        heartShape.moveTo( 25, 25 );
        heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
        heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
        heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

        var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        this.Geom = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );


        
        this.Obj = new THREE.Mesh(this.Geom, _material);
        this.Obj.position.set(0,2,0);

        this.add(this.Obj);

    }


    update(resolucion, angulo) {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.Geom = new THREE.LatheGeometry(this.puntos, resolucion, 0, angulo);
    }
}