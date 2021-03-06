// This doesn't exist in the global namespace
const Generator = Object.getPrototypeOf(function* () {});

const iterablePrototypes = [
    { protoName: 'Array', proto: Array.prototype },
    { protoName: 'String', proto: String.prototype },
    { protoName: 'NodeList', proto: NodeList.prototype },
    { protoName: 'Map', proto: Map.prototype },
    { protoName: 'Set', proto: Set.prototype },
    { protoName: 'Generator', proto: Generator.prototype }
];

const extensions = [];

function extend(protoName, proto, funcName, func) {
    if(proto[funcName]) {
        throw new Error(`Cannot add extension method '${funcName}' to prototype ${protoName} as it already has this property defined`);
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
    for(const { funcName, func } of extensions) {
        extend(protoName, proto, funcName, func);
    }
    iterablePrototypes.push({ protoName, proto });
}

export function registerIterableExtension(funcName, func) {
    for(const { protoName, proto } of iterablePrototypes) {
        extend(protoName, proto, funcName, func);
    }
    extensions.push({ funcName, func });
}
