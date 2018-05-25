// top-level namespace being assigned an object literal
var App = App || {};

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
App.extend = function (nsString, ns) {
    ns = ns||App;

    var
        parts = nsString.split('.'),
        parent = ns,
        pl, i;

    if (parts[0] === 'App') {
        parts = parts.slice(1);
    }

    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
};


/* === APP CONFIG === */
//= ../script/config/config.js


/* === EVENTS === */
//= ../script/events/events.js


/* === COMPONENTS === */
//= ../script/components/TestModule.js


/* === INITIALIZATION === */
App.Events.init();
App.TestModule.init();