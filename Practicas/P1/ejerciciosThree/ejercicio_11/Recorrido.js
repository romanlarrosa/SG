 
class Recorrido extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    var mat = new THREE.MeshNormalMaterial({flatShading: true});
    this.createGUI(gui);
    this.spline = new THREE.CatmullRomCurve3( [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, 0 ,3),
      new THREE.Vector3(6, 0, 0),
      new THREE.Vector3(3, 0.5, -3),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(-3, 1, 3),
      new THREE.Vector3(-6, 1, 0),
      new THREE.Vector3(-3, 0.5, -3),
      new THREE.Vector3(0, 0, 0)
    ]);

    var geomNave = new THREE.ConeGeometry(0.25, 1.5, 3);

    var geometry = new THREE.Geometry();
    geomNave.rotateX(Math.PI/2);
    this.nave = new THREE.Mesh(geomNave, mat);
    this.add(this.nave);
  
    geometry.vertices = this.spline.getPoints(100);
    var material = new THREE.LineBasicMaterial({color: 0x000000});
    var visible = new THREE.Line(geometry, material);
    this.add(visible);
    this.animarNave();
    
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    
  }

  animarNave(){
    var origen2 = {p: 0.5};
    var destino2 = {p: 1.0};
    var that = this;

    var animacion2 = new TWEEN.Tween(origen2)
        .to(destino2, 8000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){ 
          var posicion = that.spline.getPointAt(origen2.p);
          that.nave.position.copy(posicion);
          var tangente = that.spline.getTangentAt(origen2.p);
          posicion.add(tangente);
          that.nave.lookAt(posicion);
        })
        .onComplete(function(){
          animacion1.start();
        });

    var origen1 = {p: 0.0};
    var destino1 = {p: 0.5};
    var animacion1 = new TWEEN.Tween(origen1)
        .to(destino1, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){ 
          var posicion = that.spline.getPointAt(origen1.p);
          that.nave.position.copy(posicion);
          var tangente = that.spline.getTangentAt(origen1.p);
          posicion.add(tangente);
          that.nave.lookAt(posicion);
          })
        .onComplete(function(){
          animacion2.start();
        })
        .start();

  }

  
  update () {
    

  }
}