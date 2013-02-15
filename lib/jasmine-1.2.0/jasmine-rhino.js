(function() {
    if (! jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!");
    }

    var RhinoReporter = jasmine.RhinoReporter = function() {
        this.started = false;
        this.finished = false;
    };

    RhinoReporter.prototype = {
        reportRunnerResults: function(runner) {
            var dur = (new Date()).getTime() - this.start_time;
            var failed = this.executed_specs - this.passed_specs;
            var spec_str = this.executed_specs + (this.executed_specs === 1 ? " spec, " : " specs, ");
            var fail_str = failed + (failed === 1 ? " failure in " : " failures in ");

            this.log("Runner Finished.");
            this.log(spec_str + fail_str + (dur/1000) + "s.");

            this.finished = true;

            if (failed) {
                java.lang.System.exit(1);
            }
        },

        reportRunnerStarting: function(runner) {
            this.started = true;
            this.start_time = (new Date()).getTime();
            this.executed_specs = 0;
            this.passed_specs = 0;
            this.log("Runner Started.");
        },

        reportSpecResults: function(spec) {
            if (spec.results().passed()) {
                this.passed_specs++;
            }
            else {
                this.log("Failed." + spec.suite.description + ' : ' + spec.description);
            }
        },

        reportSpecStarting: function(spec) {
            this.executed_specs++;
        },

        reportSuiteResults: function(suite) {
            var results = suite.results();
            if (results.totalCount - results.passedCount) {
                this.log(suite.description + ": " + results.passedCount + " of " + results.totalCount + " passed.");
            }
        },

        log: function(str) {
            print(str);
        }
    };
    
})();