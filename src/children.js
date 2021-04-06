import Events from './events.js';
import _ from './utils/underscore.js';
import Collection from './collection.js';

/**
 * @class
 * @name Two.Group.Children
 * @extends Two.Collection
 * @description A children collection which is accesible both by index and by object `id`.
 */
function Children() {

  Collection.apply(this, arguments);

  Object.defineProperty(this, '_events', {
    value : {},
    enumerable: false
  });

  /**
   * @name Two.Group.Children#ids
   * @property {Object} - Map of all elements in the list keyed by `id`s.
   */
  this.ids = {};

  this.on(Events.Types.insert, this.attach);
  this.on(Events.Types.remove, this.detach);

  if (arguments[0] && Array.isArray(arguments[0]) && arguments[0].length > 0) {
    Children.prototype.attach.apply(this, arguments[0]);
  } else if (arguments.length > 0) {
    Children.prototype.attach.apply(this, arguments);
  }

}

Children.prototype = new Collection();

_.extend(Children.prototype, {

  constructor: Children,

  /**
   * @function
   * @name Two.Group.Children#attach
   * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be added.
   * @description Adds elements to the `ids` map.
   */
  attach: function(children) {
    for (var i = 0; i < children.length; i++) {
      this.ids[children[i].id] = children[i];
    }
    return this;
  },

  /**
   * @function
   * @name Two.Group.Children#detach
   * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be removed.
   * @description Removes elements to the `ids` map.
   */
  detach: function(children) {
    for (var i = 0; i < children.length; i++) {
      delete this.ids[children[i].id];
    }
    return this;
  }

});

export default Children;
