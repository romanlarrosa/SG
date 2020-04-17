class ObjRevol extends THREE.Object3D {
    constructor(gui, titleGui, _puntos, _material) {
        super();
        this.puntos = _puntos;

        this.Geom = new THREE.LatheGeometry(_puntos, 3, 0, 1);
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
      
    }
}