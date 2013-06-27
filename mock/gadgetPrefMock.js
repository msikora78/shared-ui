define([], function() {
	return function(messages) {
		return {
			getMsg: function(key) {
				return messages[key];
			}
		}
	}
})