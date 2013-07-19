define([
    './overview', 
    './javascript-event-triggering', 
    './from-a-select', 
    './from-a-simple-element',
    './angular-integration'
], 

function() {
    return {
        title: 'Dropdown Menu',
        examples: Array.prototype.slice.call(arguments)
    };
});