// This doesn't exist in the global namespace
const Generator = Object.getPrototypeOf(function* () {});

const iterablePrototypes = {
    'Array': Array.prototype,
    'String': String.prototype,
    'NodeList': NodeList.prototype,
    'Map': Map.prototype,
    'Set': Set.prototype,
    'Generator': Generator.prototype
};

const extensions = {};

function extend(protoName, proto, funcName, func) {
    if(proto[funcName]) {
        throw new Error(`Cannot add extension method '${funcName}' to iterable ${protoName} as it already has this property defined`);
    }
    Object.defineProperty(proto, funcName, {
        writable: false,
        value: function(...args) { 
            // The commented code below would be preferred, but there is currently
            // a bug in babel, so it transpiles to code that causes infinite recursion.
            // return func(this, ...args);
            return func.bind(null, this)(...args);
        }
    });
}

export function registerIterable(protoName, proto) {
    if(iterablePrototypes[protoName]) throw new Error (`An iterable with the name '${protoName}' has already been registered`);
    for(const [funcName, func] of Object.entries(extensions)) {
        extend(protoName, proto, funcName, func);
    }
    iterablePrototypes[protoName] = proto;
}

export function registerIterableExtension(funcName, func) {
    if(extensions[funcName]) throw new Error (`An extension method with the name '${funcName}' has already been registered`);
    for(const [protoName, proto] of Object.entries(iterablePrototypes)) {
        extend(protoName, proto, funcName, func);
    }
    extensions[funcName] = func;
}
