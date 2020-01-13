var app = app || {};

(function () {
    'use strict';

    function animate($sel, name) {
        $sel.addClass('animated ' + name);
        setTimeout(function(){
            $sel.removeClass(name);
        }, 1000);
    }

    animate($('.side'), 'fadeInLeft');

    $(function(){

        var Workspace = Backbone.Router.extend({
            routes: {
                '': 'splash',
                ':path': 'pageNav'
            },
            splash: function() {

                var that = this;
                setTimeout(function() {
                    $('.splash').hide();
                    animate($('.side'), 'fadeInRight');
                    that.pageNav('about');
                }, 300);

            },
            pageNav: function (path) {

                // do only if nav is showing
                $('.splash').hide();

                // setup nav and add active
                $('.nav').removeClass('active');
                var sel = $('.nav[href="#' + path + '"]');
                sel.addClass('active');

                // make sure only one page is shown
                $('.page').hide();

                var temp = _.template($('#' + path + '_tmp').html());
                $.get('/data/' + path + '.json', function(data) {
                    var fill = $('#' + path + ' .fill');
                    fill.empty();

                    if (data instanceof Array) {
                        for(var i in data) {
                            var res = temp(data[i]);
                            fill.append(res);
                        }
                    } else {
                        var html = temp(data);
                        fill.append(html);
                    }

                    $('.page#' + path).show();
                    animate($('.page'), 'fadeInRight');
                });
            }
        });

        app.Router = new Workspace();
        Backbone.history.start();

        $('.me').on('mouseenter', function() {
            animate($(this), 'bounce');
        });
    });

})();
