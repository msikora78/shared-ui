//define(['./overview', './all-javascript', './all-markup', './button-list', './custom-renderer', './angular-integration'], function() {
define(['./all-markup', './angular-integration'], function() {
	return {
		title: 'Modal dialog',
		examples: Array.prototype.slice.call(arguments)
	};
});