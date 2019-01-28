"use strict";

module.exports = {
    times: function( n, block ) {
        var accum = '',
            i = -1;
        while( ++i < n ) {
            accum += block.fn( i );
        }
        return accum;
    },
    create_label: function(str) {
        return str.replace('_', ' ');
    },
    create_id: function(str) {
        var id = str.replace(' ', '_');
        return id.toLowerCase();;
    },
    uppercase: function(str) {
        return str.toUpperCase();
    },
    lowercase: function(str) {
        return str.toLowerCase();
    },
    increment: function(value) {
        return parseInt(value) + 1;
    },
    ifCond: function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    }
}
