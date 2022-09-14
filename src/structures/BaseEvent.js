'use strict';

const YoError = require('../utils/error');

/**
 * Crea comandos fácilmente
 * @module BaseEvent
 */
class BaseEvent {
  #mode;
  #status;
  #func;

  /**
   * @param {object} [options] Las opciones de la clase
   * @param {boolean} [options.alwaysListen] Haz que el evento se escuche siempre o una sola vez
   * @param {boolean} [options.disabled] Habilita o desactiva el evento
   * @param {function} [options.execute] Añade una función para cuando el evento ocurra
   */
  constructor({ alwaysListen = true, disabled = false, execute = () => {} } = {}) {
    if (typeof alwaysListen !== "boolean") throw new YoError(`El modo del evento debe de ser un boleano`);
    if (typeof disabled !== "boolean") throw new YoError(`El estado del evento debe de ser un boleano`);
    if (typeof execute !== "function") throw new YoError(`El parámetro "execute" debe ser una función`);

    this.#status = disabled;
    this.#mode = alwaysListen;
    this.#func = execute;
  }

  /**
   * Habilita o deshabilita el evento
   * @param {boolean} status
   */
  setStatus(status) {
    if (typeof status !== "boolean") throw new YoError(`El estado del evento debe de ser un boleano`);
    this.#status = status;
  }

  /**
   * Selecciona el modo de escucha único o activo
   * @param {boolean} mode
   */
  setListeningMode(mode) {
    if (typeof mode !== "boolean") throw new YoError(`El modo del evento debe de ser un boleano`);
    this.#mode = mode;
  }

  /**
   * Añade una función a ejecutar cuando el evento ocurra
   * @param {function} func
   */
  setFunction(func) {
    if (typeof func !== "function") throw new YoError(`El parámetro "execute" debe ser una función`);
    this.#func = func;
  }

  /**
   * Habilita o desactiva el evento
   * @type {boolean}
   */
  get disabled() {return this.#status;}

  /**
   * Haz que el evento se escuche siempre o una sola vez
   * @type {boolean}
   */
  get alwaysListen() {return this.#mode;}

  /**
   * La función del evento
   * @type {function}
   */
  get execute() {return this.#func;}
}

module.exports = BaseEvent;