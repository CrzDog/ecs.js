export default class Component {
  constructor() {
    this._enabled = true;
    this._destroyed = false;

    // engine internal data
    this._entity = null;
    this._engine = null;
  }

  get enabled() {
    return this._entity.enabledInHierarchy && this._enabled;
  }
  set enabled(val) {
    if (this._enabled !== val) {
      this._enabled = val;

      if (val) {
        if (this.onEnable && this._entity.enabledInHierarchy) {
          this.onEnable();
        }
      } else {
        if (this.onDisable && this._entity.enabledInHierarchy) {
          this.onDisable();
        }
      }
    }
  }

  get destroyed() {
    return this._entity.destroyed || this._destroyed;
  }

  get entity() {
    return this._entity;
  }

  destroy() {
    if (this._destroyed) {
      return;
    }

    // mark as destroyed
    this._destroyed = true;

    // submit destroy request
    this._engine._destroyComp(this);
  }
}

/**
 * callbacks:
 *
 *  - onEnable()
 *  - onDisable()
 *  - onDestroy()
 *  - onClone(src)
 */
