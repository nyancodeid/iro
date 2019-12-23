// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/preact/dist/preact.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = E;
exports.hydrate = H;
exports.h = exports.createElement = h;
exports.Fragment = y;
exports.createRef = p;
exports.Component = d;
exports.cloneElement = I;
exports.createContext = L;
exports.toChildArray = b;
exports._unmount = A;
exports.options = exports.isValidElement = void 0;
var n,
    l,
    u,
    i,
    t,
    o,
    f,
    r = {},
    e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
exports.isValidElement = l;
exports.options = n;

function s(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function a(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var i,
      t = arguments,
      o = {};

  for (i in l) "key" !== i && "ref" !== i && (o[i] = l[i]);

  if (arguments.length > 3) for (u = [u], i = 3; i < arguments.length; i++) u.push(t[i]);
  if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (i in n.defaultProps) void 0 === o[i] && (o[i] = n.defaultProps[i]);
  return v(n, o, l && l.key, l && l.ref);
}

function v(l, u, i, t) {
  var o = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: null,
    __c: null,
    constructor: void 0
  };
  return n.vnode && n.vnode(o), o;
}

function p() {
  return {};
}

function y(n) {
  return n.children;
}

function d(n, l) {
  this.props = n, this.context = l;
}

function m(n, l) {
  if (null == l) return n.__ ? m(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? m(n) : null;
}

function w(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return w(n);
  }
}

function g(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(k);
}

function k() {
  var n, l, i, t, o, f, r;

  for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) n.__d && (i = void 0, t = void 0, f = (o = (l = n).__v).__e, (r = l.__P) && (i = [], t = T(r, o, s({}, o), l.__n, void 0 !== r.ownerSVGElement, null, i, null == f ? m(o) : f), $(i, o), t != f && w(o)));
}

function _(n, l, u, i, t, o, f, c, s) {
  var h,
      v,
      p,
      y,
      d,
      w,
      g,
      k = u && u.__k || e,
      _ = k.length;
  if (c == r && (c = null != o ? o[0] : _ ? m(u, 0) : null), h = 0, l.__k = b(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) k[h] = void 0;else for (v = 0; v < _; v++) {
        if ((p = k[v]) && u.key == p.key && u.type === p.type) {
          k[v] = void 0;
          break;
        }

        p = null;
      }

      if (y = T(n, u, p = p || r, i, t, o, f, c, s), (v = u.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, u), g.push(v, u.__c || y, u)), null != y) {
        if (null == w && (w = y), null != u.__d) y = u.__d, u.__d = null;else if (o == p || y != c || null == y.parentNode) {
          n: if (null == c || c.parentNode !== n) n.appendChild(y);else {
            for (d = c, v = 0; (d = d.nextSibling) && v < _; v += 2) if (d == y) break n;

            n.insertBefore(y, c);
          }

          "option" == l.type && (n.value = "");
        }
        c = y.nextSibling, "function" == typeof l.type && (l.__d = y);
      }
    }

    return h++, u;
  }), l.__e = w, null != o && "function" != typeof l.type) for (h = o.length; h--;) null != o[h] && a(o[h]);

  for (h = _; h--;) null != k[h] && A(k[h], k[h]);

  if (g) for (h = 0; h < g.length; h++) z(g[h], g[++h], g[++h]);
}

function b(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) b(n[i], l, u);else u.push(l ? l("string" == typeof n || "number" == typeof n ? v(null, n, null, null) : null != n.__e || null != n.__c ? v(n.type, n.props, n.key, null) : n) : n);
  return u;
}

function x(n, l, u, i, t) {
  var o;

  for (o in u) o in l || P(n, o, null, u[o], i);

  for (o in l) t && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || P(n, o, l[o], u[o], i);
}

function C(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
}

function P(n, l, u, i, t) {
  var o, f, r, e, c;
  if (t ? "className" === l && (l = "class") : "class" === l && (l = "className"), "key" === l || "children" === l) ;else if ("style" === l) {
    if (o = n.style, "string" == typeof u) o.cssText = u;else {
      if ("string" == typeof i && (o.cssText = "", i = null), i) for (f in i) u && f in u || C(o, f, "");
      if (u) for (r in u) i && u[r] === i[r] || C(o, r, u[r]);
    }
  } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (i || n.addEventListener(l, N, e), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, N, e)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && !t && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
}

function N(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}

function T(l, u, i, t, o, f, r, e, c) {
  var a,
      h,
      v,
      p,
      m,
      w,
      g,
      k,
      x,
      C,
      P = u.type;
  if (void 0 !== u.constructor) return null;
  (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (k = u.props, x = (a = P.contextType) && t[a.__c], C = a ? x ? x.props.value : a.__ : t, i.__c ? g = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(k, C) : (u.__c = h = new d(k, C), h.constructor = P, h.render = D), x && x.sub(h), h.props = k, h.state || (h.state = {}), h.context = C, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), s(h.__s, P.getDerivedStateFromProps(k, h.__s))), p = h.props, m = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && k !== p && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, C), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, C)) {
          for (h.props = k, h.state = h.__s, h.__d = !1, h.__v = u, u.__e = i.__e, u.__k = i.__k, h.__h.length && r.push(h), a = 0; a < u.__k.length; a++) u.__k[a] && (u.__k[a].__ = u);

          break n;
        }

        null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, C), null != h.componentDidUpdate && h.__h.push(function () {
          h.componentDidUpdate(p, m, w);
        });
      }
      h.context = C, h.props = k, h.state = h.__s, (a = n.__r) && a(u), h.__d = !1, h.__v = u, h.__P = l, a = h.render(h.props, h.state, h.context), u.__k = b(null != a && a.type == y && null == a.key ? a.props.children : a), null != h.getChildContext && (t = s(s({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (w = h.getSnapshotBeforeUpdate(p, m)), _(l, u, i, t, o, f, r, e, c), h.base = u.__e, h.__h.length && r.push(h), g && (h.__E = h.__ = null), h.__e = null;
    } else u.__e = j(i.__e, u, i, t, o, f, r, c);

    (a = n.diffed) && a(u);
  } catch (l) {
    n.__e(l, u, i);
  }

  return u.__e;
}

function $(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, i, t, o, f, c) {
  var s,
      a,
      h,
      v,
      p,
      y = u.props,
      d = l.props;
  if (t = "svg" === l.type || t, null == n && null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
    n = a, o[s] = null;
    break;
  }

  if (null == n) {
    if (null === l.type) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), o = null;
  }

  if (null === l.type) null != o && (o[o.indexOf(n)] = null), y !== d && (n.data = d);else if (l !== u) {
    if (null != o && (o = e.slice.call(n.childNodes)), h = (y = u.props || r).dangerouslySetInnerHTML, v = d.dangerouslySetInnerHTML, !c) {
      if (y === r) for (y = {}, p = 0; p < n.attributes.length; p++) y[n.attributes[p].name] = n.attributes[p].value;
      (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || ""));
    }

    x(n, d, y, t, c), l.__k = l.props.children, v || _(n, l, u, i, "foreignObject" !== l.type && t, o, f, r, c), c || ("value" in d && void 0 !== d.value && d.value !== n.value && (n.value = null == d.value ? "" : d.value), "checked" in d && void 0 !== d.checked && d.checked !== n.checked && (n.checked = d.checked));
  }
  return n;
}

function z(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function A(l, u, i) {
  var t, o, f;

  if (n.unmount && n.unmount(l), (t = l.ref) && z(t, null, u), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = null, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (f = 0; f < t.length; f++) t[f] && A(t[f], u, i);
  null != o && a(o);
}

function D(n, l, u) {
  return this.constructor(n, u);
}

function E(l, u, i) {
  var t, f, c;
  n.__ && n.__(l, u), f = (t = i === o) ? null : i && i.__k || u.__k, l = h(y, null, [l]), c = [], T(u, (t ? u : i || u).__k = l, f || r, r, void 0 !== u.ownerSVGElement, i && !t ? [i] : f ? null : e.slice.call(u.childNodes), c, i || r, t), $(c, l);
}

function H(n, l) {
  E(n, l, o);
}

function I(n, l) {
  return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), v(n.type, l, l.key || n.key, l.ref || n.ref);
}

function L(n) {
  var l = {},
      u = {
    __c: "__cC" + f++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var i,
          t = this;
      return this.getChildContext || (i = [], this.getChildContext = function () {
        return l[u.__c] = t, l;
      }, this.shouldComponentUpdate = function (l) {
        n.value !== l.value && i.some(function (n) {
          n.context = l.value, g(n);
        });
      }, this.sub = function (n) {
        i.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          i.splice(i.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Consumer.contextType = u, u;
}

exports.options = n = {
  __e: function (n, l) {
    for (var u; l = l.__;) if ((u = l.__c) && !u.__) try {
      if (u.constructor && null != u.constructor.getDerivedStateFromError) u.setState(u.constructor.getDerivedStateFromError(n));else {
        if (null == u.componentDidCatch) continue;
        u.componentDidCatch(n);
      }
      return g(u.__E = u);
    } catch (l) {
      n = l;
    }

    throw n;
  }
}, exports.isValidElement = l = function (n) {
  return null != n && void 0 === n.constructor;
}, d.prototype.setState = function (n, l) {
  var u;
  u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (this.__e = !1, l && this.__h.push(l), g(this));
}, d.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
}, d.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = r, f = 0;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/icon-white.svg":[function(require,module,exports) {
module.exports = "/icon-white.99a6ec44.svg";
},{}],"assets/icon-black.svg":[function(require,module,exports) {
module.exports = "/icon-black.51c4a5d4.svg";
},{}],"components/Colors/Convert.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColorConvert =
/*#__PURE__*/
function (_Component) {
  _inherits(ColorConvert, _Component);

  function ColorConvert() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ColorConvert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ColorConvert)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  _createClass(ColorConvert, [{
    key: "colorChanged",
    value: function colorChanged(id) {
      this.props.onChange(id);
    }
  }, {
    key: "render",
    value: function render(_ref) {
      var _this2 = this;

      var types = _ref.types;
      var activeConvert = types.filter(function (type) {
        return !type.selected;
      }).map(function (type) {
        return (0, _preact.h)("li", {
          className: "button",
          onClick: _this2.colorChanged.bind(_this2, type.id)
        }, type.title);
      });
      return (0, _preact.h)("div", {
        className: "section convert-wrapper"
      }, (0, _preact.h)("div", {
        className: "label"
      }, (0, _preact.h)("span", {
        className: "heading"
      }, "Convert"), " to:"), (0, _preact.h)("div", {
        className: "content"
      }, (0, _preact.h)("ul", {
        className: "convert-wrapper"
      }, activeConvert)));
    }
  }]);

  return ColorConvert;
}(_preact.Component);

exports.default = ColorConvert;
},{"preact":"../node_modules/preact/dist/preact.module.js"}],"../node_modules/color-convert/node_modules/color-name/index.js":[function(require,module,exports) {
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],"../node_modules/color-convert/conversions.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* MIT license */

/* eslint-disable no-mixed-operators */
var cssKeywords = require('color-name'); // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


var reverseKeywords = {};

for (var _i = 0, _Object$keys = Object.keys(cssKeywords); _i < _Object$keys.length; _i++) {
  var key = _Object$keys[_i];
  reverseKeywords[cssKeywords[key]] = key;
}

var convert = {
  rgb: {
    channels: 3,
    labels: 'rgb'
  },
  hsl: {
    channels: 3,
    labels: 'hsl'
  },
  hsv: {
    channels: 3,
    labels: 'hsv'
  },
  hwb: {
    channels: 3,
    labels: 'hwb'
  },
  cmyk: {
    channels: 4,
    labels: 'cmyk'
  },
  xyz: {
    channels: 3,
    labels: 'xyz'
  },
  lab: {
    channels: 3,
    labels: 'lab'
  },
  lch: {
    channels: 3,
    labels: 'lch'
  },
  hex: {
    channels: 1,
    labels: ['hex']
  },
  keyword: {
    channels: 1,
    labels: ['keyword']
  },
  ansi16: {
    channels: 1,
    labels: ['ansi16']
  },
  ansi256: {
    channels: 1,
    labels: ['ansi256']
  },
  hcg: {
    channels: 3,
    labels: ['h', 'c', 'g']
  },
  apple: {
    channels: 3,
    labels: ['r16', 'g16', 'b16']
  },
  gray: {
    channels: 1,
    labels: ['gray']
  }
};
module.exports = convert; // Hide .channels and .labels properties

for (var _i2 = 0, _Object$keys2 = Object.keys(convert); _i2 < _Object$keys2.length; _i2++) {
  var model = _Object$keys2[_i2];

  if (!('channels' in convert[model])) {
    throw new Error('missing channels property: ' + model);
  }

  if (!('labels' in convert[model])) {
    throw new Error('missing channel labels property: ' + model);
  }

  if (convert[model].labels.length !== convert[model].channels) {
    throw new Error('channel and label counts mismatch: ' + model);
  }

  var _convert$model = convert[model],
      channels = _convert$model.channels,
      labels = _convert$model.labels;
  delete convert[model].channels;
  delete convert[model].labels;
  Object.defineProperty(convert[model], 'channels', {
    value: channels
  });
  Object.defineProperty(convert[model], 'labels', {
    value: labels
  });
}

convert.rgb.hsl = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h;
  var s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  var l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
  var rdif;
  var gdif;
  var bdif;
  var h;
  var s;
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var v = Math.max(r, g, b);
  var diff = v - Math.min(r, g, b);

  var diffc = function diffc(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [h * 360, s * 100, v * 100];
};

convert.rgb.hwb = function (rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var h = convert.rgb.hsl(rgb)[0];
  var w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var k = Math.min(1 - r, 1 - g, 1 - b);
  var c = (1 - r - k) / (1 - k) || 0;
  var m = (1 - g - k) / (1 - k) || 0;
  var y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
  /*
  	See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
  */
  return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}

convert.rgb.keyword = function (rgb) {
  var reversed = reverseKeywords[rgb];

  if (reversed) {
    return reversed;
  }

  var currentClosestDistance = Infinity;
  var currentClosestKeyword;

  for (var _i3 = 0, _Object$keys3 = Object.keys(cssKeywords); _i3 < _Object$keys3.length; _i3++) {
    var keyword = _Object$keys3[_i3];
    var value = cssKeywords[keyword]; // Compute comparative distance

    var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
  return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255; // Assume sRGB

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
  var xyz = convert.rgb.xyz(rgb);
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  var l = 116 * y - 16;
  var a = 500 * (x - y);
  var b = 200 * (y - z);
  return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
  var h = hsl[0] / 360;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var t2;
  var t3;
  var val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  var t1 = 2 * l - t2;
  var rgb = [0, 0, 0];

  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);

    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

convert.hsl.hsv = function (hsl) {
  var h = hsl[0];
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var smin = s;
  var lmin = Math.max(l, 0.01);
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  var v = (l + s) / 2;
  var sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;
  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  switch (hi) {
    case 0:
      return [v, t, p];

    case 1:
      return [q, v, p];

    case 2:
      return [p, v, t];

    case 3:
      return [p, q, v];

    case 4:
      return [t, p, v];

    case 5:
      return [v, p, q];
  }
};

convert.hsv.hsl = function (hsv) {
  var h = hsv[0];
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var vmin = Math.max(v, 0.01);
  var sl;
  var l;
  l = (2 - s) * v;
  var lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


convert.hwb.rgb = function (hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1] / 100;
  var bl = hwb[2] / 100;
  var ratio = wh + bl;
  var f; // Wh + bl cant be > 1

  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  var i = Math.floor(6 * h);
  var v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  var n = wh + f * (v - wh); // Linear interpolation

  var r;
  var g;
  var b;
  /* eslint-disable max-statements-per-line,no-multi-spaces */

  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;

    case 1:
      r = n;
      g = v;
      b = wh;
      break;

    case 2:
      r = wh;
      g = v;
      b = n;
      break;

    case 3:
      r = wh;
      g = n;
      b = v;
      break;

    case 4:
      r = n;
      g = wh;
      b = v;
      break;

    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  /* eslint-enable max-statements-per-line,no-multi-spaces */


  return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
  var c = cmyk[0] / 100;
  var m = cmyk[1] / 100;
  var y = cmyk[2] / 100;
  var k = cmyk[3] / 100;
  var r = 1 - Math.min(1, c * (1 - k) + k);
  var g = 1 - Math.min(1, m * (1 - k) + k);
  var b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
  var x = xyz[0] / 100;
  var y = xyz[1] / 100;
  var z = xyz[2] / 100;
  var r;
  var g;
  var b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.2040 + z * 1.0570; // Assume sRGB

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  var l = 116 * y - 16;
  var a = 500 * (x - y);
  var b = 200 * (y - z);
  return [l, a, b];
};

convert.lab.xyz = function (lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var x;
  var y;
  var z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  var y2 = Math.pow(y, 3);
  var x2 = Math.pow(x, 3);
  var z2 = Math.pow(z, 3);
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};

convert.lab.lch = function (lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var h;
  var hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  var c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};

convert.lch.lab = function (lch) {
  var l = lch[0];
  var c = lch[1];
  var h = lch[2];
  var hr = h / 360 * 2 * Math.PI;
  var a = c * Math.cos(hr);
  var b = c * Math.sin(hr);
  return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
  var saturation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var _args = _slicedToArray(args, 3),
      r = _args[0],
      g = _args[1],
      b = _args[2];

  var value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

  value = Math.round(value / 50);

  if (value === 0) {
    return 30;
  }

  var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return ansi;
};

convert.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
  var r = args[0];
  var g = args[1];
  var b = args[2]; // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.

  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round((r - 8) / 247 * 24) + 232;
  }

  var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};

convert.ansi16.rgb = function (args) {
  var color = args % 10; // Handle greyscale

  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }

    color = color / 10.5 * 255;
    return [color, color, color];
  }

  var mult = (~~(args > 50) + 1) * 0.5;
  var r = (color & 1) * mult * 255;
  var g = (color >> 1 & 1) * mult * 255;
  var b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};

convert.ansi256.rgb = function (args) {
  // Handle greyscale
  if (args >= 232) {
    var c = (args - 232) * 10 + 8;
    return [c, c, c];
  }

  args -= 16;
  var rem;
  var r = Math.floor(args / 36) / 5 * 255;
  var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  var b = rem % 6 / 5 * 255;
  return [r, g, b];
};

convert.rgb.hex = function (args) {
  var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
  var string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

  if (!match) {
    return [0, 0, 0];
  }

  var colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  var integer = parseInt(colorString, 16);
  var r = integer >> 16 & 0xFF;
  var g = integer >> 8 & 0xFF;
  var b = integer & 0xFF;
  return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var max = Math.max(Math.max(r, g), b);
  var min = Math.min(Math.min(r, g), b);
  var chroma = max - min;
  var grayscale;
  var hue;

  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma;
  }

  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
  var f = 0;

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var c = s * v;
  var f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
  var h = hcg[0] / 360;
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255];
  }

  var pure = [0, 0, 0];
  var hi = h % 1 * 6;
  var v = hi % 1;
  var w = 1 - v;
  var mg = 0;
  /* eslint-disable max-statements-per-line */

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;

    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;

    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;

    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;

    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;

    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  /* eslint-enable max-statements-per-line */


  mg = (1.0 - c) * g;
  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
};

convert.hcg.hsv = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1.0 - c);
  var f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var l = g * (1.0 - c) + 0.5 * c;
  var s = 0;

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l));
  }

  return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
  var w = hwb[1] / 100;
  var b = hwb[2] / 100;
  var v = 1 - b;
  var c = v - w;
  var g = 0;

  if (c < 1) {
    g = (v - c) / (1 - c);
  }

  return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert.rgb.apple = function (rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
  return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
  var val = Math.round(gray[0] / 100 * 255) & 0xFF;
  var integer = (val << 16) + (val << 8) + val;
  var string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
  var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
},{"color-name":"../node_modules/color-convert/node_modules/color-name/index.js"}],"../node_modules/color-convert/route.js":[function(require,module,exports) {
var conversions = require('./conversions');
/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/


function buildGraph() {
  var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

  var models = Object.keys(conversions);

  for (var len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }

  return graph;
} // https://en.wikipedia.org/wiki/Breadth-first_search


function deriveBFS(fromModel) {
  var graph = buildGraph();
  var queue = [fromModel]; // Unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    var current = queue.pop();
    var adjacents = Object.keys(conversions[current]);

    for (var len = adjacents.length, i = 0; i < len; i++) {
      var adjacent = adjacents[i];
      var node = graph[adjacent];

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }

  return graph;
}

function link(from, to) {
  return function (args) {
    return to(from(args));
  };
}

function wrapConversion(toModel, graph) {
  var path = [graph[toModel].parent, toModel];
  var fn = conversions[graph[toModel].parent][toModel];
  var cur = graph[toModel].parent;

  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
}

module.exports = function (fromModel) {
  var graph = deriveBFS(fromModel);
  var conversion = {};
  var models = Object.keys(graph);

  for (var len = models.length, i = 0; i < len; i++) {
    var toModel = models[i];
    var node = graph[toModel];

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion(toModel, graph);
  }

  return conversion;
};
},{"./conversions":"../node_modules/color-convert/conversions.js"}],"../node_modules/color-convert/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var conversions = require('./conversions');

var route = require('./route');

var convert = {};
var models = Object.keys(conversions);

function wrapRaw(fn) {
  var wrappedFn = function wrappedFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    return fn(args);
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

function wrapRounded(fn) {
  var wrappedFn = function wrappedFn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    var result = fn(args); // We're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.

    if (_typeof(result) === 'object') {
      for (var len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

models.forEach(function (fromModel) {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], 'channels', {
    value: conversions[fromModel].channels
  });
  Object.defineProperty(convert[fromModel], 'labels', {
    value: conversions[fromModel].labels
  });
  var routes = route(fromModel);
  var routeModels = Object.keys(routes);
  routeModels.forEach(function (toModel) {
    var fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
module.exports = convert;
},{"./conversions":"../node_modules/color-convert/conversions.js","./route":"../node_modules/color-convert/route.js"}],"../node_modules/gradstop/dist/utils.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var handleErrors = exports.handleErrors = function handleErrors(options) {
  var inputFormat = options.inputFormat,
      stops = options.stops,
      colorArray = options.colorArray;

  if (typeof inputFormat !== 'string') {
    throw 'inputFormat should be a string';
  }

  var supportedFormats = ['hex', 'rgb', 'hsl'];
  var isValidFormat = supportedFormats.indexOf(inputFormat.toLowerCase()) !== -1;

  if (!isValidFormat) {
    throw 'Invalid inputFormat value, supported: hex, rgb and hsl';
  }

  if (!Number.isInteger(stops)) {
    throw 'stops should be an integer';
  }

  if (!Array.isArray(colorArray) || !colorArray.every(function (item) {
    return typeof item === 'string';
  })) {
    throw 'colorArray should be an array of color strings';
  }

  if (stops < colorArray.length) {
    throw 'Number of stops cannot be less than colorArray.length';
  }
};

var hexToRgb = exports.hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var _result$map = result.map(function (val) {
    return parseInt(val, 16);
  }),
      _result$map2 = _slicedToArray(_result$map, 4),
      r = _result$map2[1],
      g = _result$map2[2],
      b = _result$map2[3];

  return result ? {
    r: r,
    g: g,
    b: b
  } : null;
}; // if hex and defined as #fff then convert it to standard 7 letter format #ffffff


var standardizeHexValues = exports.standardizeHexValues = function standardizeHexValues(arrayOfHexStrings) {
  return arrayOfHexStrings.map(function (str) {
    if (str.length === 4) {
      return '#' + (str[1] + str[1] + str[2] + str[2] + str[3] + str[3]);
    } else if (str.length === 7) {
      return str;
    }
  });
};

var extractHEX = exports.extractHEX = function extractHEX(arrayOfHexStrings) {
  return standardizeHexValues(arrayOfHexStrings).map(function (str) {
    return hexToRgb(str);
  });
};

var extractRGB = exports.extractRGB = function extractRGB(arrayOfRGBStrings) {
  return arrayOfRGBStrings.map(function (str) {
    var _str$match = str.match(/\d+/g),
        _str$match2 = _slicedToArray(_str$match, 3),
        r = _str$match2[0],
        g = _str$match2[1],
        b = _str$match2[2];

    return {
      r: Number(r),
      g: Number(g),
      b: Number(b)
    };
  });
};

var extractHSL = exports.extractHSL = function extractHSL(arrayOfHSLStrings) {
  return arrayOfHSLStrings.map(function (str) {
    var _str$match3 = str.match(/\d+/g),
        _str$match4 = _slicedToArray(_str$match3, 3),
        h = _str$match4[0],
        s = _str$match4[1],
        l = _str$match4[2];

    return {
      h: Number(h),
      s: Number(s),
      l: Number(l)
    };
  });
};

var getRGBString = exports.getRGBString = function getRGBString(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

var getHSLString = exports.getHSLString = function getHSLString(_ref2) {
  var h = _ref2.h,
      s = _ref2.s,
      l = _ref2.l;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}; // get r,g,b,h,s and l with Bezier interpolation
// https://www.cl.cam.ac.uk/teaching/2000/AGraphHCI/SMEG/node3.html
// Check issue #3 for more info


var bezierInterpolation = function bezierInterpolation(colorTypeChars) {
  return function (colArr, x) {
    var y = 1 - x;
    var v = void 0;
    return colorTypeChars.reduce(function (colorObject, char) {
      if (colArr.length === 2) {
        v = y * colArr[0][char] + x * colArr[1][char];
      } else if (colArr.length === 3) {
        v = Math.pow(y, 2) * colArr[0][char] + 2 * y * x * colArr[1][char] + Math.pow(x, 2) * colArr[2][char];
      } else if (colArr.length === 4) {
        v = Math.pow(y, 3) * colArr[0][char] + 3 * Math.pow(y, 2) * x * colArr[1][char] + 3 * y * Math.pow(x, 2) * colArr[2][char] + Math.pow(x, 3) * colArr[3][char];
      }

      colorObject[char] = Math.trunc(v);
      return colorObject;
    }, {});
  };
};

var rgbBezierInterpolation = bezierInterpolation(['r', 'g', 'b']);
var hslBezierInterpolation = bezierInterpolation(['h', 's', 'l']);

var transformColorStringsToObjects = function transformColorStringsToObjects(options) {
  switch (options.inputFormat) {
    case 'hex':
      return extractHEX(options.colorArray);

    case 'rgb':
      return extractRGB(options.colorArray);

    case 'hsl':
      return extractHSL(options.colorArray);
  }
};

var stopsGenerator = function stopsGenerator(options) {
  var outputArray = [];
  var increment = 1.0 / (options.stops - 1);

  for (var i = 0; i < options.stops; i++) {
    if (options.inputFormat === 'hex' || options.inputFormat === 'rgb') {
      var rgbObject = rgbBezierInterpolation(options.colorArray, increment * i);
      outputArray.push(getRGBString(rgbObject));
    } else if (options.inputFormat === 'hsl') {
      var hslObject = hslBezierInterpolation(options.colorArray, increment * i);
      outputArray.push(getHSLString(hslObject));
    }
  }

  return outputArray;
};

var getStops = exports.getStops = function getStops(options) {
  var colorArray = transformColorStringsToObjects(options);

  var optionsWithFormattedColorsValues = _extends({}, options, {
    colorArray: colorArray
  });

  return stopsGenerator(optionsWithFormattedColorsValues);
};
},{}],"../node_modules/gradstop/dist/index.js":[function(require,module,exports) {
'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _utils = require('./utils');

var defaultOptions = {
  // input color options: hex, rgb or hsl
  inputFormat: 'hex',
  // number of color stops (cannot be less than colorArray.length)
  stops: 5,
  // input color array
  colorArray: ['#fff', '#000']
};

function gradstop(options) {
  options = _extends({}, defaultOptions, options);
  (0, _utils.handleErrors)(options);
  var stops = (0, _utils.getStops)(options);
  return stops;
}

module.exports = gradstop;
},{"./utils":"../node_modules/gradstop/dist/utils.js"}],"../node_modules/gradstop/index.js":[function(require,module,exports) {
module.exports = require('./dist');
},{"./dist":"../node_modules/gradstop/dist/index.js"}],"components/calculate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomRGB = exports.generateGrandStop = exports.yiqContrastRatio = exports.colorConvert = exports.colorValidate = void 0;

var _colorConvert = _interopRequireDefault(require("color-convert"));

var _gradstop = _interopRequireDefault(require("gradstop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var colorValidate = function colorValidate(from, value) {
  switch (from) {
    case 'hex':
      return typeof value === 'string' && value.length === 6 && !isNaN(Number('0x' + value));

    case 'rgb':
      if (_typeof(value) === 'object' && value.length === 3) {
        var mapValue = value.filter(function (item) {
          return typeof item === "number" && item <= 255;
        });
        return mapValue.length === 3 ? true : false;
      } else {
        return false;
      }

    case 'cmyk':
      if (_typeof(value) === 'object' && value.length === 4) {
        var _mapValue = value.filter(function (item) {
          return typeof item === "number" && item <= 255;
        });

        return _mapValue.length === 4 ? true : false;
      } else {
        return false;
      }

    default:
      break;
  }
};

exports.colorValidate = colorValidate;

var colorConvert = function colorConvert(from, value) {
  switch (from) {
    case 'hex':
      return {
        hex: value,
        rgb: _colorConvert.default.hex.rgb(value),
        cmyk: _colorConvert.default.hex.cmyk(value)
      };

    case 'rgb':
      return {
        hex: _colorConvert.default.rgb.hex(value),
        rgb: value,
        cmyk: _colorConvert.default.rgb.cmyk(value)
      };

    case 'cmyk':
      return {
        hex: _colorConvert.default.cmyk.hex(value),
        rgb: _colorConvert.default.cmyk.rgb(value),
        cmyk: value
      };

    default:
      break;
  }
};

exports.colorConvert = colorConvert;

var yiqContrastRatio = function yiqContrastRatio(values) {
  var _values = _slicedToArray(values, 3),
      r = _values[0],
      g = _values[1],
      b = _values[2];

  var yiq = (r * 299 + g * 587 + b * 114) / 1000; // Check contrast

  return {
    yiq: yiq,
    result: yiq >= 128 ? 'black' : 'white'
  };
};

exports.yiqContrastRatio = yiqContrastRatio;

var generateGrandStop = function generateGrandStop(hex) {
  var hexToRgb = _colorConvert.default.hex.rgb(hex);

  var generation1 = (0, _gradstop.default)({
    stops: 8,
    inputFormat: 'hex',
    colorArray: ['#212121', "#".concat(hex), '#FFFFFF']
  });
  var generation2 = (0, _gradstop.default)({
    stops: 8,
    inputFormat: 'rgb',
    colorArray: [generation1[1], "rgb(".concat(hexToRgb.join(','), ")"), generation1[6]]
  });
  return generation2;
};

exports.generateGrandStop = generateGrandStop;

var randomRGB = function randomRGB() {
  return [getRandom(1, 255), getRandom(1, 255), getRandom(1, 255)];
};

exports.randomRGB = randomRGB;
},{"color-convert":"../node_modules/color-convert/index.js","gradstop":"../node_modules/gradstop/index.js"}],"assets/copy.svg":[function(require,module,exports) {
module.exports = "/copy.ad9debb8.svg";
},{}],"components/Colors/Input.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _calculate = require("../calculate");

var _copy = _interopRequireDefault(require("../../assets/copy.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColorInput =
/*#__PURE__*/
function (_Component) {
  _inherits(ColorInput, _Component);

  function ColorInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ColorInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ColorInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onCopy", function () {
      var type = _this.props.type;

      switch (type.id) {
        case "hex":
          _this.copyText("#".concat(type.value));

          break;

        case "rgb":
          _this.copyText("rgb(".concat(type.value.join(', '), ")"));

          break;

        case "cmyk":
          _this.copyText("cmyk(".concat(type.value.join(', '), ")"));

          break;

        default:
          break;
      }
    });

    return _this;
  }

  _createClass(ColorInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        value: this.props.type.value
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var type = _ref.type;
      this.setState({
        value: type.value
      });
    }
  }, {
    key: "onChange",
    value: function onChange(id, index, event) {
      var value = event.target.value;
      var stateValue = this.state.value;
      console.log(value, stateValue, index);

      switch (id) {
        case "hex":
          if ((0, _calculate.colorValidate)(id, value)) {
            this.props.onChange(id, value);
          }

          break;

        case "rgb":
          stateValue[index] = Number(value) > 255 ? 255 : Number(value);
          stateValue[index] = Number.isNaN(stateValue[index]) ? 0 : stateValue[index];
          this.setState({
            value: stateValue
          });

          if ((0, _calculate.colorValidate)(id, stateValue)) {
            this.props.onChange(id, stateValue);
          }

          break;

        case "cmyk":
          stateValue[index] = Number.isNaN(Number(value)) ? 0 : Number(value);
          this.setState({
            value: stateValue
          });

          if ((0, _calculate.colorValidate)(id, stateValue)) {
            this.props.onChange(id, stateValue);
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "copyText",
    value: function copyText(value) {
      var textArea = document.createElement('textarea');
      textArea.value = value;
      console.log(value);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  }, {
    key: "render",
    value: function render(_ref2, _ref3) {
      var _this2 = this;

      var type = _ref2.type,
          hex = _ref2.hex,
          color = _ref2.color;
      var value = _ref3.value;
      var inputElement = (0, _preact.h)("span", null, "Error");

      switch (type.id) {
        case "hex":
          inputElement = (0, _preact.h)("input", {
            type: "text",
            value: value,
            onInput: this.onChange.bind(this, type.id, 0),
            maxLength: 6
          });
          break;

        case "rgb":
          inputElement = (0, _preact.h)("div", null, value.map(function (val, index) {
            return (0, _preact.h)("input", {
              type: "text",
              value: val,
              onInput: _this2.onChange.bind(_this2, type.id, index),
              maxLength: 3
            });
          }));
          break;

        case "cmyk":
          inputElement = (0, _preact.h)("div", null, value.map(function (val, index) {
            return (0, _preact.h)("input", {
              type: "text",
              value: val,
              onInput: _this2.onChange.bind(_this2, type.id, index),
              maxLength: 3
            });
          }));
          break;

        default:
          break;
      }

      return (0, _preact.h)("div", {
        class: "section input-wrapper"
      }, (0, _preact.h)("div", {
        className: "label"
      }, (0, _preact.h)("span", {
        className: "heading"
      }, type.title, ":"), (0, _preact.h)("svg", {
        onClick: this.onCopy,
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, (0, _preact.h)("path", {
        d: "M10 9C10 7.89543 10.8954 7 12 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H12C10.8954 21 10 20.1046 10 19V9Z",
        fill: color
      }), (0, _preact.h)("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M7 2C5.89539 2 5 2.89542 5 4V14C5 15.1046 5.89539 16 7 16H8V9C8 6.79086 9.79089 5 12 5H15V4C15 2.89542 14.1046 2 13 2H7ZM15 7H12C10.8954 7 10 7.89542 10 9V16H13C14.1046 16 15 15.1046 15 14V7Z",
        fill: color
      }))), (0, _preact.h)("div", {
        className: "content color-input ".concat(type.id),
        style: {
          color: hex
        }
      }, inputElement));
    }
  }]);

  return ColorInput;
}(_preact.Component);

exports.default = ColorInput;
},{"preact":"../node_modules/preact/dist/preact.module.js","../calculate":"components/calculate.js","../../assets/copy.svg":"assets/copy.svg"}],"components/Colors/GrandStop.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GrandStop =
/*#__PURE__*/
function (_Component) {
  _inherits(GrandStop, _Component);

  function GrandStop() {
    _classCallCheck(this, GrandStop);

    return _possibleConstructorReturn(this, _getPrototypeOf(GrandStop).apply(this, arguments));
  }

  _createClass(GrandStop, [{
    key: "changeColor",
    value: function changeColor(rgbColor) {
      var extract = rgbColor.replace("rgb(", "").replace(")", "").split(', ');
      this.props.onChange("rgb", extract);
    }
  }, {
    key: "render",
    value: function render(_ref) {
      var _this = this;

      var gradients = _ref.gradients;
      var gradientItems = gradients.map(function (grandient) {
        return (0, _preact.h)("li", {
          title: "Click to set color",
          onClick: _this.changeColor.bind(_this, grandient),
          style: "background-color: ".concat(grandient, ";")
        });
      });
      return (0, _preact.h)("div", {
        className: "section gradstop-wrapper"
      }, (0, _preact.h)("div", {
        className: "label"
      }, (0, _preact.h)("span", {
        className: "heading"
      }, "Gradient"), " color stops:"), (0, _preact.h)("div", {
        className: "content"
      }, (0, _preact.h)("ul", {
        className: "gradient-wrapper"
      }, gradientItems)));
    }
  }]);

  return GrandStop;
}(_preact.Component);

exports.default = GrandStop;
},{"preact":"../node_modules/preact/dist/preact.module.js"}],"components/Colors/Contrast.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Contrast =
/*#__PURE__*/
function (_Component) {
  _inherits(Contrast, _Component);

  function Contrast() {
    _classCallCheck(this, Contrast);

    return _possibleConstructorReturn(this, _getPrototypeOf(Contrast).apply(this, arguments));
  }

  _createClass(Contrast, [{
    key: "render",
    value: function render(_ref) {
      var contrast = _ref.contrast;
      var contrastResult = contrast >= 128 ? 'black' : 'white';
      return (0, _preact.h)("div", {
        className: "section contrast-wrapper"
      }, (0, _preact.h)("div", {
        className: "label"
      }, (0, _preact.h)("span", {
        className: "heading"
      }, "YIQ"), " Contrast Ratio:"), (0, _preact.h)("div", {
        className: "content"
      }, contrast.toFixed(2), " (", contrastResult, ")"));
    }
  }]);

  return Contrast;
}(_preact.Component);

exports.default = Contrast;
},{"preact":"../node_modules/preact/dist/preact.module.js"}],"components/Colors/RandomColor.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _calculate = require("../calculate");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RandomColor =
/*#__PURE__*/
function (_Component) {
  _inherits(RandomColor, _Component);

  function RandomColor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RandomColor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RandomColor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onRandomColor", function () {
      var rgbColor = (0, _calculate.randomRGB)();

      _this.props.onChange("rgb", rgbColor);
    });

    return _this;
  }

  _createClass(RandomColor, [{
    key: "render",
    value: function render(_) {
      return (0, _preact.h)("div", {
        className: "section random-wrapper"
      }, (0, _preact.h)("div", {
        className: "label"
      }, (0, _preact.h)("span", {
        className: "heading"
      }, "Generate"), " random color:"), (0, _preact.h)("div", {
        className: "content"
      }, (0, _preact.h)("button", {
        className: "button",
        onClick: this.onRandomColor
      }, "RANDOM COLOR")));
    }
  }]);

  return RandomColor;
}(_preact.Component);

exports.default = RandomColor;
},{"preact":"../node_modules/preact/dist/preact.module.js","../calculate":"components/calculate.js"}],"main.jsx":[function(require,module,exports) {
"use strict";

var _preact = require("preact");

require("./style.scss");

var _iconWhite = _interopRequireDefault(require("./assets/icon-white.svg"));

var _iconBlack = _interopRequireDefault(require("./assets/icon-black.svg"));

var _Convert = _interopRequireDefault(require("./components/Colors/Convert"));

var _Input = _interopRequireDefault(require("./components/Colors/Input"));

var _GrandStop = _interopRequireDefault(require("./components/Colors/GrandStop"));

var _Contrast = _interopRequireDefault(require("./components/Colors/Contrast"));

var _RandomColor = _interopRequireDefault(require("./components/Colors/RandomColor"));

var _calculate = require("./components/calculate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      contrast: 0,
      grandStop: [],
      hex: '212121',
      types: [{
        title: 'HEX',
        id: 'hex',
        selected: true,
        value: '212121'
      }, {
        title: 'RGB',
        id: 'rgb',
        selected: false,
        value: [33, 33, 33]
      }, {
        title: 'CMYK',
        id: 'cmyk',
        selected: false,
        value: [0, 0, 0, 87]
      }]
    });

    _defineProperty(_assertThisInitialized(_this), "onTypeChanged", function (id) {
      var colorTypes = _this.state.types.map(function (type) {
        return _objectSpread({}, type, {
          selected: type.id === id ? true : false
        });
      });

      _this.setState({
        types: colorTypes
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onColorChanged", function (id, value) {
      var _this$colorChangeCalc = _this.colorChangeCalculation(id, value),
          colors = _this$colorChangeCalc.colors,
          contrast = _this$colorChangeCalc.contrast,
          grandStop = _this$colorChangeCalc.grandStop;

      var changed = _this.state.types.map(function (type) {
        var colorValues = type.id === "rgb" ? colors[type.id].map(function (i) {
          return Number(Number(i).toFixed(0));
        }) : colors[type.id];
        return _objectSpread({}, type, {
          value: colorValues
        });
      });

      _this.setState({
        types: changed,
        contrast: contrast.yiq,
        grandStop: grandStop,
        hex: colors.hex
      });
    });

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var active = this.state.types.find(function (type) {
        return type.selected;
      });

      var _this$colorChangeCalc2 = this.colorChangeCalculation(active.id, active.value),
          colors = _this$colorChangeCalc2.colors,
          contrast = _this$colorChangeCalc2.contrast,
          grandStop = _this$colorChangeCalc2.grandStop;

      this.setState({
        contrast: contrast.yiq,
        grandStop: grandStop,
        hex: colors.hex
      });
    }
  }, {
    key: "colorChangeCalculation",
    value: function colorChangeCalculation(id, value) {
      var colors = (0, _calculate.colorConvert)(id, value);
      var contrast = (0, _calculate.yiqContrastRatio)(colors.rgb);
      var grandStop = (0, _calculate.generateGrandStop)(colors.hex);
      var textColor = contrast.result === "black" ? grandStop[7] : "#".concat(colors.hex);
      var secondaryColor = contrast.result === "black" ? grandStop[1] : grandStop[7];
      document.body.style.cssText = "--primary-color: #".concat(colors.hex, ";--secondary-color: ").concat(secondaryColor, ";--text-color: ").concat(textColor, ";");
      if (contrast.result === "black") document.body.classList.add("dark");else document.body.classList.remove("dark");
      return {
        colors: colors,
        contrast: contrast,
        grandStop: grandStop
      };
    }
  }, {
    key: "render",
    value: function render(_, _ref) {
      var types = _ref.types,
          contrast = _ref.contrast,
          grandStop = _ref.grandStop,
          hex = _ref.hex;
      var active = types.find(function (type) {
        return type.selected;
      });
      var contrastResult = contrast >= 128 ? 'black' : 'white';
      return (0, _preact.h)("div", {
        id: "content"
      }, (0, _preact.h)("header", null, (0, _preact.h)("div", null, (0, _preact.h)("h1", null, "IRO"), (0, _preact.h)("span", null, "Amazing color tools")), (0, _preact.h)("img", {
        src: contrastResult === "white" ? _iconWhite.default : _iconBlack.default,
        alt: ""
      })), (0, _preact.h)("div", {
        className: "main"
      }, (0, _preact.h)("div", {
        className: "main-wrapper"
      }, (0, _preact.h)(_Input.default, {
        type: active,
        onChange: this.onColorChanged,
        hex: hex,
        color: contrastResult
      }), (0, _preact.h)(_Contrast.default, {
        contrast: contrast
      }))), (0, _preact.h)("div", {
        className: "navbar"
      }, (0, _preact.h)(_GrandStop.default, {
        gradients: grandStop,
        onChange: this.onColorChanged
      }), (0, _preact.h)(_Convert.default, {
        types: types,
        onChange: this.onTypeChanged,
        onRandom: this.onColorChanged
      }), (0, _preact.h)(_RandomColor.default, {
        onChange: this.onColorChanged
      })));
    }
  }]);

  return App;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(App, null), document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
    console.log('ServiceWorker registration successful!');
  }).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}
},{"preact":"../node_modules/preact/dist/preact.module.js","./style.scss":"style.scss","./assets/icon-white.svg":"assets/icon-white.svg","./assets/icon-black.svg":"assets/icon-black.svg","./components/Colors/Convert":"components/Colors/Convert.jsx","./components/Colors/Input":"components/Colors/Input.jsx","./components/Colors/GrandStop":"components/Colors/GrandStop.jsx","./components/Colors/Contrast":"components/Colors/Contrast.jsx","./components/Colors/RandomColor":"components/Colors/RandomColor.jsx","./components/calculate":"components/calculate.js","/media/ryanaunur/Project/playground/color-inspect/src/service-worker.js":[["service-worker.js","service-worker.js"],"service-worker.js.map","service-worker.js"]}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40373" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.jsx"], null)
//# sourceMappingURL=/main.65f60760.js.map