(function ($) {
    "use strict";
    // last element that will mouseover/mouseout
    var $lastElement,
    // last parent container for $lastElement
        $lastInstance;

    // add handle to keys to cut elements
    $(document).on('keydown', function(e){
        var symbolicKey = e.which,
        // "delete" key
            deleteKeyCode = 46,
        // "control" key
            ctrlKey = e.ctrlKey,
        // "x" key
            xKeyCode = 88;
        if ($lastElement !== undefined && $lastElement.length == 1) {
            if (symbolicKey === deleteKeyCode || (symbolicKey == xKeyCode && ctrlKey == true)) {
                // push deleted item in array to subsequent access
                $lastInstance.deleted.push($lastElement);
//					$lastElement.fadeOut('fast');
                methods._onCut($lastElement);
                methods._afterCut($lastElement);
            }
        }
    });

    var methods = {
        init: function(options) {
            var opts = $.extend({
                    // function that will handle after cutting
                    afterCut: undefined,
                    // function that will handle when mouse moves over the element
                    mouseOver: undefined,
                    // function that will handle when mouse moves out ot element
                    mouseOut: undefined,
                    onCut: undefined,
                    onRestore: undefined
                }, options),
                $instance = {
                    // elements that can be cut
                    container: this,
                    options: opts,
                    // deleted child inside container
                    deleted: []
                };
            this.data('instance', $instance);
            this.cutter('start');

            return this;
        },
        start: function() {
            var $instance = this.data('instance');
            if ($instance) {
                $instance.active = 1;
                $instance.container.on('mouseover', function(e){
                    if ($instance.active == 1) {
                        var $target = $(e.target);
                        $lastElement = $target;
                        $lastInstance = $instance;
                        methods._mouseOver($target);
                    }
                }).on('mouseout', function(e){
                    if ($instance.active == 1) {
                        var $target = $(e.target);
                        $lastElement = undefined;
                        $lastInstance = $instance;
                        methods._mouseOut($target);
                    }
                });
            }
            this.data('instance', $instance);

            return this;
        },
        stop: function() {
            var $instance = this.data('instance');
            $instance.active = 0;
            this.data('instance', $instance);

            return this;
        },
        deleted: function() {
            var $instance = this.data('instance');
            return $instance.deleted;
        },
        // restore one or all elements
        restore: function($el) {
            var $instance = this.data('instance'),
                deletedItems = $instance.deleted;

            for (var i = 0; i < deletedItems.length; i++) {
                // one element
                if ($el != undefined) {
                    // if equals element in deleted array
                    if ($el == deletedItems[i]) {
                        methods._onRestore(deletedItems[i]);
                        break;
                    }
                }
                else {
                    methods._onRestore(deletedItems[i]);
                }
            }

            return this;
        },
        _afterCut: function(justDeleted) {
            if ($lastInstance.options.afterCut !== undefined) {
                $lastInstance.options.afterCut(justDeleted);
            }
        },
        _mouseOver: function($target) {
            if ($lastInstance.options.mouseOver != undefined) {
                $lastInstance.options.mouseOver($target);
            }
            else {
                $target
                    .data('border', $target.css('border'))
                    .css({
                        border: 'solid #e74c3c 1px',
                        cursor: 'crosshair'
                    });
            }
        },
        _mouseOut: function($target) {
            if ($lastInstance.options.mouseOut != undefined) {
                $lastInstance.options.mouseOut($target);
            }
            else {
                $target.css({
                    border: $target.data('border'),
                    cursor: 'default'
                });
            }
        },
        _onCut: function($target) {
            if ($lastInstance.options.onCut != undefined) {
                $lastInstance.options.onCut($target);
            }
            else {
                $target.fadeOut('fast');
            }
        },
        _onRestore: function($target) {
            if ($lastInstance.options.onRestore != undefined) {
                $lastInstance.options.onRestore($target);
            }
            else {
                $target.fadeIn('fast');
            }
        }
    };

    $.fn.cutter = function(method) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
        else {
            $.error('Method ' +  method + ' not used in $.cutter' );

            return false;
        }
    };
})(jQuery);