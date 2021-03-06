(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var Iron;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/iron_core/packages/iron_core.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
(function () {                                                                                         // 1
                                                                                                       // 2
//////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                              //     // 4
// packages/iron:core/lib/version_conflict_error.js                                             //     // 5
//                                                                                              //     // 6
//////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                //     // 8
if (Package['cmather:iron-core']) {                                                             // 1   // 9
  throw new Error("\n\n\
    Sorry! The cmather:iron-{x} packages were migrated to the new package system with the wrong name, and you have duplicate copies.\n\
    You can see which cmather:iron-{x} packages have been installed by using this command:\n\n\
    > meteor list\n\n\
    Can you remove any installed cmather:iron-{x} packages like this:\
    \n\n\
    > meteor remove cmather:iron-core\n\
    > meteor remove cmather:iron-router\n\
    > meteor remove cmather:iron-dynamic-template\n\
    > meteor remove cmather:iron-dynamic-layout\n\
    \n\
    The new packages are named iron:{x}. For example:\n\n\
    > meteor add iron:router\n\n\
    Sorry for the hassle, but thank you!\
    \n\n\
  ");                                                                                           // 17  // 25
}                                                                                               // 18  // 26
                                                                                                // 19  // 27
//////////////////////////////////////////////////////////////////////////////////////////////////     // 28
                                                                                                       // 29
}).call(this);                                                                                         // 30
                                                                                                       // 31
                                                                                                       // 32
                                                                                                       // 33
                                                                                                       // 34
                                                                                                       // 35
                                                                                                       // 36
(function () {                                                                                         // 37
                                                                                                       // 38
//////////////////////////////////////////////////////////////////////////////////////////////////     // 39
//                                                                                              //     // 40
// packages/iron:core/lib/iron_core.js                                                          //     // 41
//                                                                                              //     // 42
//////////////////////////////////////////////////////////////////////////////////////////////////     // 43
                                                                                                //     // 44
Iron = {};                                                                                      // 1   // 45
Iron.utils = {};                                                                                // 2   // 46
                                                                                                // 3   // 47
/**                                                                                             // 4   // 48
 * Assert that the given condition is truthy and throw an error if not.                         // 5   // 49
 */                                                                                             // 6   // 50
                                                                                                // 7   // 51
Iron.utils.assert = function (condition, msg) {                                                 // 8   // 52
  if (!condition)                                                                               // 9   // 53
    throw new Error(msg);                                                                       // 10  // 54
};                                                                                              // 11  // 55
                                                                                                // 12  // 56
/**                                                                                             // 13  // 57
 * Print a warning message to the console if the console is defined.                            // 14  // 58
 */                                                                                             // 15  // 59
Iron.utils.warn = function (condition, msg) {                                                   // 16  // 60
  if (!condition)                                                                               // 17  // 61
    console && console.warn && console.warn(msg);                                               // 18  // 62
};                                                                                              // 19  // 63
                                                                                                // 20  // 64
/**                                                                                             // 21  // 65
 * Given a target object and a property name, if the value of that property is                  // 22  // 66
 * undefined, set a default value and return it. If the value is already                        // 23  // 67
 * defined, return the existing value.                                                          // 24  // 68
 */                                                                                             // 25  // 69
Iron.utils.defaultValue = function (target, prop, value) {                                      // 26  // 70
  if (typeof target[prop] === 'undefined') {                                                    // 27  // 71
    target[prop] = value;                                                                       // 28  // 72
    return value;                                                                               // 29  // 73
  } else {                                                                                      // 30  // 74
    return target[prop]                                                                         // 31  // 75
  }                                                                                             // 32  // 76
};                                                                                              // 33  // 77
                                                                                                // 34  // 78
/**                                                                                             // 35  // 79
 * Make one constructor function inherit from another. Optionally provide                       // 36  // 80
 * prototype properties for the child.                                                          // 37  // 81
 *                                                                                              // 38  // 82
 * @param {Function} Child The child constructor function.                                      // 39  // 83
 * @param {Function} Parent The parent constructor function.                                    // 40  // 84
 * @param {Object} [props] Prototype properties to add to the child                             // 41  // 85
 */                                                                                             // 42  // 86
Iron.utils.inherits = function (Child, Parent, props) {                                         // 43  // 87
  Iron.utils.assert(typeof Child !== "undefined", "Child is undefined in inherits function");   // 44  // 88
  Iron.utils.assert(typeof Parent !== "undefined", "Parent is undefined in inherits function"); // 45  // 89
                                                                                                // 46  // 90
  // copy static fields                                                                         // 47  // 91
  for (var key in Parent) {                                                                     // 48  // 92
    if (_.has(Parent, key))                                                                     // 49  // 93
      Child[key] = Parent[key];                                                                 // 50  // 94
  }                                                                                             // 51  // 95
                                                                                                // 52  // 96
  var Middle = function () {                                                                    // 53  // 97
    this.constructor = Child;                                                                   // 54  // 98
  };                                                                                            // 55  // 99
                                                                                                // 56  // 100
  // hook up the proto chain                                                                    // 57  // 101
  Middle.prototype = Parent.prototype;                                                          // 58  // 102
  Child.prototype = new Middle;                                                                 // 59  // 103
  Child.__super__ = Parent.prototype;                                                           // 60  // 104
                                                                                                // 61  // 105
  // copy over the prototype props                                                              // 62  // 106
  if (_.isObject(props))                                                                        // 63  // 107
    _.extend(Child.prototype, props);                                                           // 64  // 108
                                                                                                // 65  // 109
  return Child;                                                                                 // 66  // 110
};                                                                                              // 67  // 111
                                                                                                // 68  // 112
/**                                                                                             // 69  // 113
 * Create a new constructor function that inherits from Parent and copy in the                  // 70  // 114
 * provided prototype properties.                                                               // 71  // 115
 *                                                                                              // 72  // 116
 * @param {Function} Parent The parent constructor function.                                    // 73  // 117
 * @param {Object} [props] Prototype properties to add to the child                             // 74  // 118
 */                                                                                             // 75  // 119
Iron.utils.extend = function (Parent, props) {                                                  // 76  // 120
  props = props || {};                                                                          // 77  // 121
                                                                                                // 78  // 122
  var ctor = function () {                                                                      // 79  // 123
    // automatically call the parent constructor if a new one                                   // 80  // 124
    // isn't provided.                                                                          // 81  // 125
    var constructor;                                                                            // 82  // 126
    if (_.has(props, 'constructor'))                                                            // 83  // 127
      constructor = props.constructor                                                           // 84  // 128
    else                                                                                        // 85  // 129
      constructor = ctor.__super__.constructor;                                                 // 86  // 130
                                                                                                // 87  // 131
    constructor.apply(this, arguments);                                                         // 88  // 132
  };                                                                                            // 89  // 133
                                                                                                // 90  // 134
  return Iron.utils.inherits(ctor, Parent, props);                                              // 91  // 135
};                                                                                              // 92  // 136
                                                                                                // 93  // 137
/**                                                                                             // 94  // 138
 * Either window in the browser or global in NodeJS.                                            // 95  // 139
 */                                                                                             // 96  // 140
Iron.utils.global = (function () {                                                              // 97  // 141
  return Meteor.isClient ? window : global;                                                     // 98  // 142
})();                                                                                           // 99  // 143
                                                                                                // 100
/**                                                                                             // 101
 * Ensure a given namespace exists and assign it to the given value or                          // 102
 * return the existing value.                                                                   // 103
 */                                                                                             // 104
Iron.utils.namespace = function (namespace, value) {                                            // 105
  var global = Iron.utils.global;                                                               // 106
  var parts;                                                                                    // 107
  var part;                                                                                     // 108
  var name;                                                                                     // 109
  var ptr;                                                                                      // 110
                                                                                                // 111
  Iron.utils.assert(typeof namespace === 'string', "namespace must be a string");               // 112
                                                                                                // 113
  parts = namespace.split('.');                                                                 // 114
  name = parts.pop();                                                                           // 115
  ptr = global;                                                                                 // 116
                                                                                                // 117
  for (var i = 0; i < parts.length; i++) {                                                      // 118
    part = parts[i];                                                                            // 119
    ptr = ptr[part] = ptr[part] || {};                                                          // 120
  }                                                                                             // 121
                                                                                                // 122
  if (arguments.length === 2) {                                                                 // 123
    ptr[name] = value;                                                                          // 124
    return value;                                                                               // 125
  } else {                                                                                      // 126
    return ptr[name];                                                                           // 127
  }                                                                                             // 128
};                                                                                              // 129
                                                                                                // 130
/**                                                                                             // 131
 * Returns the resolved value at the given namespace or the value itself if it's                // 132
 * not a string.                                                                                // 133
 *                                                                                              // 134
 * Example:                                                                                     // 135
 *                                                                                              // 136
 * var Iron = {};                                                                               // 137
 * Iron.foo = {};                                                                               // 138
 *                                                                                              // 139
 * var baz = Iron.foo.baz = {};                                                                 // 140
 * Iron.utils.resolve("Iron.foo.baz") === baz                                                   // 141
 */                                                                                             // 142
Iron.utils.resolve = function (nameOrValue) {                                                   // 143
  var global = Iron.utils.global;                                                               // 144
  var parts;                                                                                    // 145
  var ptr;                                                                                      // 146
                                                                                                // 147
  if (typeof nameOrValue === 'string') {                                                        // 148
    parts = nameOrValue.split('.');                                                             // 149
    ptr = global;                                                                               // 150
    for (var i = 0; i < parts.length; i++) {                                                    // 151
      ptr = ptr[parts[i]];                                                                      // 152
      if (!ptr)                                                                                 // 153
        return undefined;                                                                       // 154
    }                                                                                           // 155
  } else {                                                                                      // 156
    ptr = nameOrValue;                                                                          // 157
  }                                                                                             // 158
                                                                                                // 159
  // final position of ptr should be the resolved value                                         // 160
  return ptr;                                                                                   // 161
};                                                                                              // 162
                                                                                                // 163
/**                                                                                             // 164
 * Capitalize a string.                                                                         // 165
 */                                                                                             // 166
Iron.utils.capitalize = function (str) {                                                        // 167
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);                                // 168
};                                                                                              // 169
                                                                                                // 170
/**                                                                                             // 171
 * Convert a string to class case.                                                              // 172
 */                                                                                             // 173
Iron.utils.classCase = function (str) {                                                         // 174
  var re = /_|-|\.|\//;                                                                         // 175
                                                                                                // 176
  if (!str)                                                                                     // 177
    return '';                                                                                  // 178
                                                                                                // 179
  return _.map(str.split(re), function (word) {                                                 // 180
    return Iron.utils.capitalize(word);                                                         // 181
  }).join('');                                                                                  // 182
};                                                                                              // 183
                                                                                                // 184
/**                                                                                             // 185
 * Convert a string to camel case.                                                              // 186
 */                                                                                             // 187
Iron.utils.camelCase = function (str) {                                                         // 188
  var output = Iron.utils.classCase(str);                                                       // 189
  output = output.charAt(0).toLowerCase() + output.slice(1, output.length);                     // 190
  return output;                                                                                // 191
};                                                                                              // 192
                                                                                                // 193
/**                                                                                             // 194
 * deprecatation notice to the user which can be a string or object                             // 195
 * of the form:                                                                                 // 196
 *                                                                                              // 197
 * {                                                                                            // 198
 *  name: 'somePropertyOrMethod',                                                               // 199
 *  where: 'RouteController',                                                                   // 200
 *  instead: 'someOtherPropertyOrMethod',                                                       // 201
 *  message: ':name is deprecated. Please use :instead instead'                                 // 202
 * }                                                                                            // 203
 */                                                                                             // 204
Iron.utils.notifyDeprecated = function (info) {                                                 // 205
  var name;                                                                                     // 206
  var instead;                                                                                  // 207
  var message;                                                                                  // 208
  var where;                                                                                    // 209
  var defaultMessage = "[:where] ':name' is deprecated. Please use ':instead' instead.";        // 210
                                                                                                // 211
  if (_.isObject(info)) {                                                                       // 212
    name = info.name;                                                                           // 213
    instead = info.instead;                                                                     // 214
    message = info.message || defaultMessage;                                                   // 215
    where = info.where || 'IronRouter';                                                         // 216
  } else {                                                                                      // 217
    message = info;                                                                             // 218
    name = '';                                                                                  // 219
    instead = '';                                                                               // 220
    where = '';                                                                                 // 221
  }                                                                                             // 222
                                                                                                // 223
  if (typeof console !== 'undefined' && console.warn) {                                         // 224
    console.warn(                                                                               // 225
      '<deprecated> ' +                                                                         // 226
      message                                                                                   // 227
      .replace(':name', name)                                                                   // 228
      .replace(':instead', instead)                                                             // 229
      .replace(':where', where) +                                                               // 230
      ' ' +                                                                                     // 231
      (new Error).stack                                                                         // 232
    );                                                                                          // 233
  }                                                                                             // 234
};                                                                                              // 235
                                                                                                // 236
Iron.utils.withDeprecatedNotice = function (info, fn, thisArg) {                                // 237
  return function () {                                                                          // 238
    Utils.notifyDeprecated(info);                                                               // 239
    return fn && fn.apply(thisArg || this, arguments);                                          // 240
  };                                                                                            // 241
};                                                                                              // 242
                                                                                                // 243
// so we can do this:                                                                           // 244
//   getController: function () {                                                               // 245
//    ...                                                                                       // 246
//   }.deprecate({...})                                                                         // 247
Function.prototype.deprecate = function (info) {                                                // 248
  var fn = this;                                                                                // 249
  return Iron.utils.withDeprecatedNotice(info, fn);                                             // 250
};                                                                                              // 251
                                                                                                // 252
/**                                                                                             // 253
 * Returns a function that can be used to log debug messages for a given                        // 254
 * package.                                                                                     // 255
 */                                                                                             // 256
Iron.utils.debug = function (package) {                                                         // 257
  Iron.utils.assert(typeof package === 'string', "debug requires a package name");              // 258
                                                                                                // 259
  return function debug (/* args */) {                                                          // 260
    if (console && console.log && Iron.debug === true) {                                        // 261
      var msg = _.toArray(arguments).join(' ');                                                 // 262
      console.log("%c<" + package + "> %c" + msg, "color: #999;", "color: #000;");              // 263
    }                                                                                           // 264
  };                                                                                            // 265
};                                                                                              // 266
                                                                                                // 267
// make sure Iron ends up in the global namespace                                               // 268
Iron.utils.global.Iron = Iron;                                                                  // 269
                                                                                                // 270
//////////////////////////////////////////////////////////////////////////////////////////////////     // 315
                                                                                                       // 316
}).call(this);                                                                                         // 317
                                                                                                       // 318
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:core'] = {
  Iron: Iron
};

})();

//# sourceMappingURL=iron_core.js.map
