extend(App, 'TestModule');

App.TestModule = (function ($) {

    var public_method = function () {
        console.log(typeof $);
    };

    function private_method () {
        console.log('is private');
    }

    return  {
        init: function () {
            public_method();
        }
    };
})(jQuery);
