App.extend('Events');

App.Events = (function (window, document) {
    'use strict';

    /**
     * Обработчик события прокрутки страницы с распознанием напраывления
     * @event eventScrollDown
     * @event eventScrollUp
     */
    var scroll = function () {
        var
            eventScrollDown = new Event('eventScrollDown'),
            eventScrollUp = new Event('eventScrollUp'),
            scrollPos = 0,
            scrollTop;

        window.addEventListener('scroll', function() {

            scrollTop = window.pageYOffset;

            if (scrollTop > scrollPos){
                // down

                document.dispatchEvent(eventScrollDown);
            } else {
                // up

                document.dispatchEvent(eventScrollUp);
            }

            scrollPos = scrollTop;
        });
    };

    /**
     * Обрабочик события изменения окна браузера с интервалом 100мс
     * @event eventResize
     */
    var resize = function () {
        var
            eventResize = new Event('eventResize'),
            windowResizing;

        window.addEventListener('resize', function () {
            clearTimeout(windowResizing);

            windowResizing = setTimeout(function () {
                document.dispatchEvent(eventResize);
            }, 100);
        });
    };


    return  {
        init: function () {
            scroll();
            resize();
        }
    };

})(window, document);