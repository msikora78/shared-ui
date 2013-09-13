define(['tm/core', 'jquery', 'tm/errorDialog'], function(tm, $) {

    describe('tm.errorDialog', function() {

        var $modal = $(".error-dialog");
        var title = "a title";
        var message = "a message";

        describe('Error Modal', function() {

            beforeEach(function() {
                tm.errorDialog(message, title);
            });

            afterEach(function() {
                // close the dialog
                $(".modal-backdrop").click();
            });

            it('should have the specified title and message', function() {
                var $header = $modal.find('.modal-header h3');
                expect($header.text()).toBe(title);
                var $body = $modal.find('.modal-body p');
                expect($body.text()).toBe(message);
            });
        });

    });
});