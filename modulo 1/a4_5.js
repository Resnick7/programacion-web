// composición A a = New A()
const esNum = (n) => typeof n === "number" && Number.isFinite(n)

class Rueda {
  #marca; #rodaje;
  constructor({ marca, rodaje }) {
    this.#marca = String(marca);
    this.#rodaje = String(rodaje);
  }
  get marca()  { return this.#marca; }
  get rodaje() { return this.#rodaje; }
  toJSON() { return { marca: this.#marca, rodaje: this.#rodaje }; }
}

class Motor {
  #tipo; #caballos; #descripcion;
  constructor({ tipo, caballos, descripcion = "" }) {
    this.#tipo = String(tipo);
    if (!esNum(caballos) || caballos <= 0) throw new Error("caballos inválidos");
    this.#caballos = caballos;
    this.#descripcion = String(descripcion);
  }
  get caballos() { return this.#caballos; }
  get tipo()     { return this.#tipo; }
  get descripcion(){ return this.#descripcion; }
  toJSON() { return { tipo: this.#tipo, caballos: this.#caballos, descripcion: this.#descripcion }; }
}

class Vehiculo {
  #marca; #modelo; #anio; #velocidad = 0;
  #ruedas = [];
  #titulos = new Set();

  constructor({ marca, modelo, anio, ruedas = [] } = {}) {
    if (new.target === Vehiculo) {
      throw new Error("Vehiculo es abstracta y no puede instanciarse directamente");
    }
    this.#marca = String(marca);
    this.#modelo = String(modelo);
    this.#anio = Number(anio);
    ruedas.forEach(r => this.agregarRueda(r));
  }

  acelerar(delta) {
    if (!esNum(delta) || delta < 0) throw new Error("delta inválido");
    this.#velocidad += delta;
    return this.#velocidad;
  }
  frenar(delta) {
    if (!esNum(delta) || delta < 0) throw new Error("delta inválido");
    this.#velocidad = Math.max(0, this.#velocidad - delta);
    return this.#velocidad;
  }
  compararVelocidad(otro) {
    if (!(otro instanceof Vehiculo)) throw new Error("comparar con Vehiculo");
    return Math.sign(this.#velocidad - otro.#velocidad);
  }

  agregarRueda(rueda) {
    if (!(rueda instanceof Rueda)) throw new Error("Se esperaba una Rueda");
    this.#ruedas.push(rueda);
  }
  get ruedas() { return [...this.#ruedas]; }

  registrarTituloDesdeTabla(titulo) {
    if (!(titulo instanceof Titulo)) throw new Error("Se esperaba un Titulo");
    this.#titulos.add(titulo);
  }
  get titulos() { return [...this.#titulos]; }

   get marca()      { return this.#marca; }
  get modelo()     { return this.#modelo; }
  get anio()       { return this.#anio; }
  get velocidad()  { return this.#velocidad; }

  info() {
    return `${this.constructor.name} ${this.#marca} ${this.#modelo} (${this.#anio}) - ${this.#velocidad} km/h - ${this.#ruedas.length} ruedas`;
  }
}

class Auto extends Vehiculo {
  #cantPuertas; #motor;
  constructor({ marca, modelo, anio, cantPuertas, motor, ruedas } = {}) {
    super({ marca, modelo, anio, ruedas });
    if (!esNum(cantPuertas) || cantPuertas <= 0) throw new Error("cantPuertas inválida");
    if (!(motor instanceof Motor)) throw new Error("Auto requiere un Motor");
    motor.marcarAsignado();
    this.#motor = motor;
    this.#cantPuertas = cantPuertas;
  }
  get motor() { return this.#motor; }
  get cantPuertas() { return this.#cantPuertas; }
  info() {
    return `${super.info()} - ${this.#cantPuertas} puertas - ${this.#motor.caballos} HP`;
  }
}

class Camion extends Vehiculo {
  #capacidadCargaKg; #cargaActualKg = 0; #motor;
  constructor({ marca, modelo, anio, capacidadCargaKg, motor, ruedas } = {}) {
    super({ marca, modelo, anio, ruedas });
    if (!esNum(capacidadCargaKg) || capacidadCargaKg <= 0) throw new Error("capacidadCargaKg inválida");
    if (!(motor instanceof Motor)) throw new Error("Camion requiere un Motor");
    motor.marcarAsignado(); // composición
    this.#motor = motor;
    this.#capacidadCargaKg = capacidadCargaKg;
  }
  cargar(pesoKg) {
    if (!esNum(pesoKg) || pesoKg < 0) throw new Error("peso inválido");
    if (this.#cargaActualKg + pesoKg > this.#capacidadCargaKg) {
      throw new Error("Capacidad de carga excedida");
    }
    this.#cargaActualKg += pesoKg;
    return this.#cargaActualKg;
  }
  descargar(pesoKg) {
    if (!esNum(pesoKg) || pesoKg < 0) throw new Error("peso inválido");
    this.#cargaActualKg = Math.max(0, this.#cargaActualKg - pesoKg);
    return this.#cargaActualKg;
  }
  get motor() { return this.#motor; }
  get capacidadCargaKg() { return this.#capacidadCargaKg; }
  get cargaActualKg()    { return this.#cargaActualKg; }
  info() {
    return `${super.info()} - carga ${this.#cargaActualKg}/${this.#capacidadCargaKg} kg - ${this.#motor.caballos} HP`;
  }
}

class Remolque extends Camion {
  #longitudM;
  constructor({ longitudM, ...camionArgs } = {}) {
    super(camionArgs);
    if (!esNum(longitudM) || longitudM <= 0) throw new Error("longitud inválida");
    this.#longitudM = longitudM;
  }
  get longitudM() { return this.#longitudM; }
  info() { return `${super.info()} - ${this.#longitudM} m de longitud`; }
}

class Frigorifico extends Camion {
  #temperaturaC;
  constructor({ temperaturaC, ...camionArgs } = {}) {
    super(camionArgs);
    if (!esNum(temperaturaC)) throw new Error("temperatura inválida");
    this.#temperaturaC = temperaturaC;
  }
  set temperaturaC(t) { if (!esNum(t)) throw new Error("temperatura inválida"); this.#temperaturaC = t; }
  get temperaturaC()  { return this.#temperaturaC; }
  info() { return `${super.info()} - cámara a ${this.#temperaturaC} °C`; }
}

class Concesionario {
  #nombre; #vehiculos = new Set();
  constructor({ nombre }) { this.#nombre = String(nombre); }
  agregarVehiculo(v) {
    if (!(v instanceof Vehiculo)) throw new Error("Solo se admiten Vehiculos");
    this.#vehiculos.add(v);
  }
  quitarVehiculo(v) { this.#vehiculos.delete(v); }
  get nombre() { return this.#nombre; }
  get vehiculos() { return [...this.#vehiculos]; }
}


class Fabrica {
  #nombre;
  constructor({ nombre }) { this.#nombre = String(nombre); }
  get nombre() { return this.#nombre; }

  construirAuto(args)      { return new Auto(args); }
  construirCamion(args)    { return new Camion(args); }
  construirRemolque(args)  { return new Remolque(args); }
  construirFrigorifico(args){ return new Frigorifico(args); }
}

class RNA {
  #provincia; #info; #titulos = new Set();
  constructor({ provincia, info = "" }) {
    this.#provincia = String(provincia);
    this.#info = String(info);
  }
  registrarTituloDesdeTabla(titulo) {
    if (!(titulo instanceof Titulo)) throw new Error("Se esperaba un Titulo");
    this.#titulos.add(titulo);
  }
  get provincia() { return this.#provincia; }
  get info()      { return this.#info; }
  get titulos()   { return [...this.#titulos]; }
}

class Titulo {
  #vehiculo; #rna; #prop;
  constructor({ vehiculo, rna, prop }) {
    if (!(vehiculo instanceof Vehiculo)) throw new Error("vehiculo inválido");
    if (!(rna instanceof RNA))           throw new Error("rna inválido");
    this.#vehiculo = vehiculo;
    this.#rna = rna;
    this.#prop = prop;
    vehiculo.registrarTituloDesdeTabla(this);
    rna.registrarTituloDesdeTabla(this);
  }
  get vehiculo() { return this.#vehiculo; }
  get rna()      { return this.#rna; }
  get prop()     { return this.#prop; }
}