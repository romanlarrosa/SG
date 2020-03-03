class ObjRevol extends THREE.Object3D {
    constructor(gui, titleGui, _puntos, _material) {
        super();
        this.createGUI(gui, titleGui);
        this.puntos = _puntos;

        var Geom = new THREE.LatheGeometry(_puntos, 3, 0, 1);
        this.Obj = new THREE.Mesh(Geom, _material);
        this.Obj.position.set(0,2,0);

        this.add(this.Obj);

    }

    createGUI (gui,titleGui) {
        /*// Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
          this.resolucion = 3.0;
          this.angulo = 1.0;
          
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          this.reset = function () {
            this.resolucion = 3.0;
            this.angulo = 1.0;
            that.Obj.geometry = new THREE.LatheGeometry(this.puntos, that.guiControls.resolucion, 0, that.guiControls.angulo);
            
          }
        } 
        
        // Se crea una sección para los controles de la caja
        //var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        //that = this;
        //folder.add (this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name ('Resolucion : ').listen().onChange(function (value) {
        //    that.Obj.geometry = new THREE.LatheGeometry(this.puntos, that.guiControls.resolucion, 0, that.guiControls.angulo); });
        //folder.add (this.guiControls, 'angulo', 0.1, 2*Math.PI, 0.1).name ('Ángulo : ').listen().onChange(function (value) {
        //    that.Obj.geometry = new THREE.LatheGeometry(this.puntos, that.guiControls.resolucion, 0, that.guiControls.angulo); });
        
        //folder.add (this.guiControls, 'reset').name ('[ Reset ]');
        */
      }

    update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
    }
}