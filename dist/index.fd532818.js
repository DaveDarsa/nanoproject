// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"A7H4y":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "62d5dab885897b04655082d4fd532818";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
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
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4ee1I":[function(require,module,exports) {
var _nanoscopicJs = require("nanoscopic-js");
var {Build, createState, BindListener, Route} = _nanoscopicJs.Nano();
function Header() {
  return `<div component='Header' class='header'>
   <h1>Nano webApp demo.</h1> 
   <a href='javascript:void(0)' linkto='/about'>About this site</a>
  </div>`;
}
function MainContent() {
  const [movieList, changeMovieList] = createState("", render, MainContent.name);
  function clicker(e) {
    e.preventDefault();
    let input = document.getElementById("changelistener");
    if (!input) return;
    // changeMovieName(input.value);
    let searchTerm = input.value;
    let baseurl = "http://www.omdbapi.com/";
    let key = "dff1d0c6";
    fetch(`${baseurl}?apikey=${key}&s=${searchTerm}`).then(response => response.json()).then(json => {
      console.log(json);
      changeMovs(json.Search[0].Title);
      listUpdate(json.Search);
    });
  }
  function render(state) {
    return `<div component='MainContent' class='maincontent'>
 <h2>A simple SPA created using the <a target='blank' href='https://www.npmjs.com/package/nanoscopic-js'>nanoscopic</a> framework</h2>
      <div class='maincontainer'>
      <p>Find movie info</p>
      <form>
        <input type='text' id='changelistener' placeholder='type a movie name'/>
        <button type='submit' onTouch=${BindListener(clicker)} name='submit'>Search</button>
      </form>
      </div>
      </div>`;
  }
  return render(movieList());
}
function MovieList() {
  return renderfuncList.render(movieList());
}
function selectMovie(id) {
  console.log(id);
  let baseurl = "http://www.omdbapi.com/";
  let key = "dff1d0c6";
  fetch(`${baseurl}?apikey=${key}&i=${id}`).then(response => response.json()).then(json => {
    console.log(json);
    changeMovs(json);
  }).then(() => {
    var el = document.querySelector(".movie");
    el.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  });
  console.log("movie selected");
}
MovieList.prototype.render = function render(state) {
  return `<div component='MovieList' class='movielist'> ${typeof state === "string" ? `<h4>movies will appear here</h4> ` : state.map(movie => {
    return `<div class='listitem' onTouch=${BindListener(() => {
      selectMovie(movie.imdbID);
    })}>
            <img src=${movie.Poster} alt='coverimg'/>
      <h3>${movie.Title}</h3>
      <span>${movie.Year}</span>
      </div>`;
  }).join("")}</div>`;
};
// movie list
var renderfuncList = Object.assign(MovieList.prototype, {});
var [movieList, listUpdate] = createState("", renderfuncList.render, MovieList.name);
// each movie
function Movie() {
  return renderfunc.render(movs());
}
Movie.prototype.render = function render(state) {
  return `<div component='Movie' class='movie'> ${typeof state === "object" ? `<div class='singlemovie' id='singlemovie'>
      <img src=${state.Poster}/>
      <div class='movieinfo'>
      <h2>${state.Title} <span>${state.imdbRating}</span></h2>
      <div class='plot'>
      <p>${state.Plot}</p>
      </div>
      <div class='row'>
      <h4>Box Office:</h4>
      <p>${state.BoxOffice}
      </div>
      <div class='row'>
      <h4>Director:</h4>
      <p>${state.Director}</p>
      </div>
      <div class='row'>
      <h4>Actors:  </h4>
      <p class='actors'>${state.Actors}</p>
      </div>
      </div>
      </div>` : ""}</div>`;
};
var renderfunc = Object.assign(Movie.prototype, {});
var [movs, changeMovs] = createState("movs", renderfunc.render, Movie.name);
function Footer() {
  return `<div class='footer'>Made by Davedarsa @ <a href='https://github.com/davedarsa'><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"/></a></div>`;
}
function About() {
  return `<div component='About' class='about'>
  
  <h1>You just witnessed the Nano router in action</h1>
  <h2>What's the point of Nano?</h2>
  <p>I just wanted to showcase the framework features with a simple webapp that uses the OMDB API.</p>
  <p>To check out the source code of this site, on <a href='https://github.com/DaveDarsa/nanoproject' target='blank'>Github</a></p>
  <p class='desc'>To learn more about Nanoscopic-js, check it out on <a href='https://www.npmjs.com/package/nanoscopic-js' target='blank'>Npm</a> or <a href='https://github.com/DaveDarsa/nanoscopic' target='blank'>Github</a></p>
  <h4>Note: since props aren't as well mainteined as states in the framework, I had to get a little creative and expose 
  movies state to all other components</h4>
  <a href="#" linkto='/' class='btn'>Get back to main</a>
  </div> `;
}
// without router
// Build("root", Header, MainContent, About);
// //with router
Build("root", Route("/", [Header, MainContent, MovieList, Movie, Footer]), Route("/about", [About]));

},{"nanoscopic-js":"2cCgC"}],"2cCgC":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Nano", function () {
  return Nano;
});
var _internalsToDOMJs = require("./internals/ToDOM.js");
function Nano() {
  var pathAndComponents = [];
  var ChildComponents = [];
  var dom;
  var docToRender;
  var routes = [];
  var listeners = [];
  var routerInUse = false;
  var updatedElements = [];
  var toRender;
  // emitter
  // event emitter that triggers during state change and forces "virtual dom" creation and comparison
  function emitter(eventType, componentRender, componentName) {
    if (!eventType) {
      console.error("NO EVENT TYPE PROVIDED");
      return;
    }
    // if state changed time to re-render a virtual dom and compare to it's previous self
    if (eventType === "change") {
      console.log("change detected");
      // console.log(`name is ${componentName}`);
      dom.updateDOM(componentRender, componentName);
    }
    if (eventType === "route") {
      Router();
    }
  }
  // dom creator and updater
  function virtualDOM() {
    var currentDOM;
    function createDOM(element) {
      var el = document.createElement("div");
      el.appendChild(element);
      // runs during first render
      currentDOM = currentDOM === undefined && el;
    }
    function saveNode(componentFragment, componentName) {
      // saves all rendered component's children that are themselves components
      let childName;
      let childrenArr = Array.from(componentFragment.children);
      let componentChildren = childrenArr.filter(child => {
        if (child.hasAttribute("component")) {
          childName = child.getAttribute("component");
        }
        return child.hasAttribute("component");
      });
      ChildComponents.push({
        name: componentName,
        children: {
          name: childName,
          component: componentChildren
        }
      });
    }
    function updateDOM(componentRender, componentName) {
      console.log("updating");
      // //new render
      console.log(componentRender.childNodes, componentName);
      console.warn(componentRender);
      // and its name
      let updatedComponent = componentRender.childNodes[0];
      // find children in the array with same name as componentName
      let foundChild = ChildComponents.find(children => {
        return children.name === componentName;
      });
      // runs and modifies the updated content IF it had children on first render
      if (foundChild) {
        // find the empty child
        let emptyChild = Array.from(updatedComponent.children).find(child => {
          return child.innerHTML === "";
        });
        if (emptyChild) {
          // re-insert children to the updated dom
          foundChild.children.component.forEach(child => {
            updatedComponent.insertBefore(child, emptyChild);
          });
          updatedComponent.removeChild(emptyChild);
        }
      }
      // document.querySelector(`[component=${componentName}]`).innerHTML =
      // ALSO RUNS ON ELEMENTS THAT ARENT IN THE INNERHTML ANYMORE;
      if (!routerInUse) {
        document.querySelector(`[component=${componentName}]`).innerHTML = updatedComponent.innerHTML;
        return;
      }
      // save this value inside the array for memoing
      // console.log(ToDOM(updatedComponent.innerHTML));
      // push the update
      let foundUpdated = updatedElements.find(element => {
        return element.name === componentName;
      });
      let updated = {
        updatedElement: updatedComponent,
        name: componentName
      };
      if (!foundUpdated) {
        updatedElements.push(updated);
      } else {
        // replace
        updatedElements[updatedElements.indexOf(foundUpdated)] = updated;
      }
      console.log(updatedElements);
      // append the nodes this returns to "toRender.savedComponents"
      function toNode(node) {
        if (!node) return;
        console.warn(node);
        var fragment = document.createDocumentFragment();
        fragment.appendChild(node);
        return fragment;
      }
      Array.from(toRender.savedComponents.children).forEach(node => {
        let attr = node.getAttribute("component");
        if (attr) {
          let found = updatedElements.find(upelem => {
            return attr === upelem.name;
          });
          if (found) {
            toRender.savedComponents.replaceChild(found.updatedElement, node);
          }
        }
        let componentTorender = toRender.savedComponents;
        document.getElementById(docToRender).innerHTML = "";
        document.getElementById(docToRender).appendChild(componentTorender.cloneNode(true));
        BindLinksAndClicks();
      });
    }
    return {
      createDOM,
      updateDOM,
      saveNode
    };
  }
  // state
  function createState(val = undefined, renderFunc, componentName) {
    // this is the state
    var stateStorage = {
      state: val
    };
    Object.defineProperty(stateStorage, "getState", {
      get() {
        return stateStorage.state;
      },
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(stateStorage, "setState", {
      set(newVal) {
        this.state = newVal;
      },
      enumerable: false,
      configurable: false
    });
    function changer(newVal) {
      let prevValue = getter();
      Promise.resolve().then(() => {
        stateStorage.setState = newVal;
      }).then(() => {
        if (newVal !== prevValue) {
          let updated = _internalsToDOMJs.ToDOM(renderFunc(newVal));
          emitter("change", updated, componentName);
          // making sure stored child is updated and stored again;
          let matched = ChildComponents.find(child => {
            return child.children.name === componentName;
          });
          if (matched) {
            matched.children.component[0] = updated.childNodes[0];
          }
        }
      });
    }
    function getter() {
      return stateStorage.getState;
    }
    // must return the closured state and the updater
    return [getter, changer];
  }
  function LinkTo(path) {
    Promise.resolve().then(() => {
      history.pushState({}, "", `${path}`);
      var event = new Event("popstate");
      window.dispatchEvent(event);
    });
    return;
  }
  function Route(path, ...componenets) {
    if (!routerInUse) routerInUse = true;
    if (!dom) dom = virtualDOM();
    // componenets.forEach((component) => {
    // component.parent = false;
    // //parent prop changes after first render async
    // setTimeout(() => {
    // component.parent = true;
    // }, 0);
    // });
    var comps = componenets[0];
    // create DOMified components and add it to the routes[] corresponding path components array;
    routes.push({
      path,
      components: comps
    });
    // console.warn(routes[0].components);
    Assemble(docToRender, comps, path);
    return comps;
  }
  function Router() {
    // runs on every route change
    // render conditionally
    var loc = location.pathname;
    if (routerInUse) {
      // find path fragment;
      toRender = pathAndComponents.find(pnc => {
        return pnc.path === loc;
      });
      // get the always updated component children to render
      let componentTorender = toRender.savedComponents;
      document.getElementById(docToRender).innerHTML = "";
      document.getElementById(docToRender).appendChild(componentTorender.cloneNode(true));
      BindLinksAndClicks();
    }
  }
  function Assemble(rootID, args, path) {
    var fragment = new DocumentFragment();
    // takes in the array of elements from top to bottom
    // compiles everything to a DOM tree by calling the helper for each of the fragments
    args.forEach((component, idx) => {
      fragment.appendChild(_internalsToDOMJs.ToDOM(component));
      // save its children nodes
      dom.saveNode(fragment.childNodes[idx], component.name);
    });
    // dom.createDOM(fragment.cloneNode(true));
    // save the path-component fragment if routers being used;
    if (routerInUse) {
      pathAndComponents.push({
        path,
        savedComponents: fragment
      });
    } else {
      document.getElementById(rootID).innerHTML = "";
      document.getElementById(rootID).appendChild(fragment);
      BindLinksAndClicks();
    }
  }
  function Build(rootID, ...args) {
    // flat components if theyre passed from inside Route function
    args = [].concat.apply([], args);
    docToRender = rootID;
    if (!dom) dom = virtualDOM();
    // for routing
    window.addEventListener("popstate", function (event) {
      emitter("route");
    });
    args.forEach(component => {
      component.parent = false;
      // parent prop changes after first render async
      setTimeout(() => {
        component.parent = true;
      }, 0);
    });
    // runs on first run
    // 2 different types of first render if router is being used or not
    if (routerInUse) {
      Router();
      return;
    }
    // if router isnt being used;
    Assemble(rootID, args);
  }
  function BindLinksAndClicks() {
    // find and add linkto listeners to elements
    var linkElems = document.querySelectorAll("[linkto]");
    if (linkElems) {
      // find their linkto listeners;
      linkElems.forEach(linkItem => {
        let where = linkItem.getAttribute("linkto");
        if (where) linkItem.addEventListener("click", e => {
          // e.preventDefault();
          LinkTo(where);
        });
      });
    }
    // bind the clicks
    // get the elements that will have a click listeer
    var clickElements = document.querySelectorAll("[onTouch]");
    // create and add a function as a listener/remove as attribute
    if (clickElements) {
      clickElements.forEach(clickItem => {
        // index in the listeners array;
        var fnIdx = clickItem.getAttribute("onTouch");
        clickItem.removeAttribute("onTouch");
        clickItem.addEventListener("click", listeners[fnIdx].fn);
      });
    }
  }
  // helper function for stringifying listener functions
  function BindListener(func) {
    // get the indexes of var/let/const/function declarations
    // properly space function declarations in the string;
    // function SpaceFnString(str, ...searchStrs) {
    // var indices = [];
    // var copyStr = str;
    // var len = str.length;
    // if (len == 0) return [];
    // //find each given declaration index
    // searchStrs.forEach((searchTerm) => {
    // let startIndex = 0,
    // index;
    // let len = searchTerm.length;
    // while ((index = str.indexOf(searchTerm, startIndex)) > -1) {
    // indices.push({ index, length: len });
    // startIndex = index + len;
    // }
    // });
    // //sort indices ascending;
    // indices.sort(function (a, b) {
    // return a.index - b.index;
    // });
    // if (indices.length) {
    // let incr = 0;
    // //add spaces
    // indices.forEach((char) => {
    // copyStr =
    // copyStr.slice(0, char.index + char.length + incr) +
    // " " +
    // copyStr.slice(char.index + char.length + incr);
    // incr = incr + 1;
    // });
    // }
    // return copyStr;
    // }
    // var funcstring = func.toString();
    // //remove all sorts of whitespaces in the stringified function
    // var fn = funcstring
    // .slice(funcstring.indexOf("{") + 1, funcstring.lastIndexOf("}"))
    // .replace(/\s+/g, "")
    // .replace(/^\s/, "")
    // .replace(/\s$/, "");
    // //add space after function declarations;
    // fn = SpaceFnString(fn, "var", "let", "const", "function");
    // woops instead of creating new function from a string
    // its better to just return internal listeners array position for the specific element
    var number = listeners.length;
    listeners.push({
      id: number,
      fn: func
    });
    return number;
  }
  return {
    Build,
    createState,
    BindListener,
    Route
  };
}
exports.default = Nano;

},{"./internals/ToDOM.js":"58uIJ","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"58uIJ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "ToDOM", function () {
  return ToDOM;
});
function ToDOM(component) {
  var fragmentToRender = typeof component === "function" ? component() : component;
  // this is where the parsing shoud happen to a valid HTMLelement, gets appeneded to Build fragment and turned into root's child
  var range = document.createRange();
  var fragmentFromComponent = range.createContextualFragment(fragmentToRender);
  return fragmentFromComponent;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["A7H4y","4ee1I"], "4ee1I", "parcelRequire5cfc")

//# sourceMappingURL=index.fd532818.js.map
