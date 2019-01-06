jQuery(document).ready(function() {

    lightbox.option({
        'albumLabel': 'Изображение %1 из %2'
    });

    var owl = jQuery('.owl-carousel');
    if (owl.length) {
        owl.owlCarousel({
            loop:false,
            margin:0,
            nav:false,
            dots:false,
            items: 1
        });
        var dots = jQuery('.owl-dots');
        dots.on("click", ".owl-dot", function () {
            var pos = parseInt(jQuery(this).text());
            return owl.trigger('to.owl.carousel', pos - 1);
        });
    }

    var callPopup = jQuery(".call__popup");
    if(callPopup.length) {
        var popup = jQuery(".popup"),
            popupBg = jQuery(".popup__show-bg");
        callPopup.on("click", function (e) {
            e.preventDefault();
            return popup.fadeIn() && popupBg.show();
        });
        popup.on("click", ".close", function () {
            return popup.fadeOut("slow") && popupBg.fadeOut();
        });
    }

    /*
    |-----------------------------------------------------------
    |   NoUiSlider
    |-----------------------------------------------------------
    */
    var keypressSlider = document.getElementById('keypress');
    var input0 = document.getElementById('input__price-from');
    var input1 = document.getElementById('input__price-to');
    var inputs = [input0, input1];

    noUiSlider.create(keypressSlider, {
        connect: true,
        start: [0, 20000],
        format: {
            to: function (value) {
                return parseInt(value);
            },
            from: function (value) {
                return parseInt(value);
            }
        },
        range: {
            'min': [0],
            'max': [20000]
        }
    });

    keypressSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
    });

    inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {
            keypressSlider.noUiSlider.setHandle(handle, this.value);
        });

        input.addEventListener('keydown', function (e) {

            var values = keypressSlider.noUiSlider.get();
            var value = Number(values[handle]);

            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            var steps = keypressSlider.noUiSlider.steps();

            // [down, up]
            var step = steps[handle];

            var position;

            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {

                case 13:
                    keypressSlider.noUiSlider.setHandle(handle, this.value);
                    break;

                case 38:

                    // Get step to go increase slider value (up)
                    position = step[1];

                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }

                    // null = edge of slider
                    if (position !== null) {
                        keypressSlider.noUiSlider.setHandle(handle, value + position);
                    }

                    break;

                case 40:

                    position = step[0];

                    if (position === false) {
                        position = 1;
                    }

                    if (position !== null) {
                        keypressSlider.noUiSlider.setHandle(handle, value - position);
                    }

                    break;
            }
        });
    });

    var filterPanel = jQuery(".filter__panel");
    if(filterPanel.length) {

        filterPanel.find(".filter__block:not(.is__opened) .list").removeClass("hidden").hide();

        filterPanel.on('click', '.filter__block .label', function () {
            var _this = jQuery(this),
                filterBlock = _this.next('div').closest(".filter__block");
            if(filterBlock.hasClass("is__opened")){
                return filterBlock.removeClass("is__opened") && _this.next('div').slideToggle();
            }
            return filterBlock.addClass("is__opened") && _this.next('div').slideToggle();
        });
    }

    /*
    |-----------------------------------------------------------
    |   notification
    |-----------------------------------------------------------
    */
    var Notification = {
        element: false,
        setElement: function (element) {
            return this.element = element;
        },
        notify: function (message) {
            if( ! this.element) {
                this.setElement(jQuery(".notify"));
            }
            return this.element.html('<div>' + message + '</div>') && this.element.fadeIn().delay(7000).fadeOut();
        }
    };

    formHandler("#order__service-form", Notification);
});

function formHandler(selector, Notification, callPopup) {
    return jQuery(document).on("submit", selector, function(e){
        e.preventDefault();
        var _this = jQuery(this),
            url = _this.attr('action'),
            data = _this.serialize(),
            submitBlock = _this.find(".submit__block"),
            agree = _this.find(".agree__block input[type=checkbox]");
        if (agree.length && ! agree.prop("checked")) {
            agree.parent(".agree__block").find(".error").fadeIn().delay(3000).fadeOut();
            return false;
        }
        return jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: data,
            beforeSend: function(jqXHR, settings) {
                return submitBlock.addClass("is__sent");
            },
            success: function (data) {
                if(typeof callPopup !== "undefined" && callPopup.length) {
                    jQuery(".popup").fadeOut("slow") && jQuery(".popup__show-bg").fadeOut();
                }
                Notification.notify(data.message);
                return submitBlock.removeClass("is__sent") && _this.trigger("reset");
            }
        });
    });
}

jQuery(document).ajaxError(function () {
    return jQuery("form .submit__block").removeClass("is__sent") && jQuery('.notify').html('<div>Произошла ошибка =(</div>').fadeIn().delay(3000).fadeOut();
});

// Number.prototype.format = function(n, x) {
//     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
//     return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$& ');
// };