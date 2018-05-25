App.extend('TestModule');

App.TestModule = (function ($, window, document) {
    'use strict';

    var public_method = function () {
        console.log(typeof $);

        $(document).on('eventScrollDown', function (e) {
            console.log(e)
        })
    };

    function private_method () {
        console.log('is private');
    }


    return  {
        init: function () {
            public_method();
        }
    };

})(jQuery, window, document);
