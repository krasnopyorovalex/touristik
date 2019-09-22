jQuery(document).ready(function() {

    var burgerMob = jQuery(".burger-mob");
    if(burgerMob.length) {
        var mobileMenu = jQuery(".mobile__menu"),
            closeMenuBtn = jQuery(".close-menu-btn");
        burgerMob.on("click", function () {
            return mobileMenu.addClass("is__opened") && mobileMenu.fadeIn("fast");
        });
        closeMenuBtn.on("click", function () {
            return mobileMenu.removeClass("is__opened") && mobileMenu.fadeOut();
        });
        mobileMenu.on("click", ".has__child > span", function (e) {
            e.preventDefault();
            var _this = jQuery(this);
            if( _this.next('ul').is(':hidden') ) {
                _this.next('ul').slideDown();
            } else {
                _this.next('ul').slideUp();
            }
            return false;
        });
    }

    var maskPhone = jQuery("form input.phone_field");
    if (maskPhone.length) {
        maskPhone.mask('+0 (000) 000-00-00', {placeholder: "+_ (___) ___-__-__"});
    }

    var slider = jQuery('.slider');
    if (slider.length) {
        slider.owlCarousel({
            loop:false,
            margin:0,
            nav:false,
            dots:false,
            items: 1
        });
        var dots = slider.find('.owl-dots');
        dots.on("click", ".owl-dot", function () {
            var pos = parseInt(jQuery(this).text());
            return slider.trigger('to.owl.carousel', pos - 1);
        });
    }

    var anotherProducts = jQuery(".another__products");
    if (anotherProducts.length) {
        anotherProducts.find(".catalog__items").owlCarousel({
            loop:false,
            margin:10,
            nav:true,
            dots:false,
            items: 4,
            responsive : {
                0 : {
                    items: 1
                },
                480 : {
                    items: 2
                },
                768 : {
                    items: 4
                }
            }
        });
    }

    var productGal = jQuery(".product__carousel");
    if (productGal.length) {
        productGal.owlCarousel({
            loop:false,
            margin:1,
            nav:true,
            dots:false,
            items: 1
        });

        productGal.on('changed.owl.carousel', function(event) {
            var index = event.item.index,
                items = productThumbs.find(".owl-item");
            items.removeClass("current");
            return productThumbs.trigger('to.owl.carousel', index) && items.eq(index).addClass("current");
        });

        var productThumbs = jQuery(".product__carousel-thumbs");
        productThumbs.owlCarousel({
            items: 6,
            margin:5,
            nav:true,
            dots:false,
            responsive : {
                0 : {
                    items: 3
                },
                480 : {
                    items: 3
                },
                768 : {
                    items: 5
                }
            }
        });
        productThumbs.on('click', 'img', function() {
            var _this = jQuery(this),
                index = _this.attr("data-index");
            productThumbs.find(".owl-item").removeClass("current");
            return _this.closest(".owl-item").addClass("current") && productGal.trigger('to.owl.carousel', index);
        });
        productThumbs.find(".owl-item").eq(0).addClass("current");
    }

    var callPopup = jQuery(".call__popup");
    if(callPopup.length) {
        var popupBg = jQuery(".popup__show-bg");
        callPopup.on("click", function (e) {
            e.preventDefault();
            var _this = jQuery(this),
                popup = jQuery("#" + _this.attr("data-target")),
                service = _this.attr("data-service");
            if(typeof service !== 'undefined' && service.length){
                popup.find('input[name=service]').val(service);
            }

            return popup.fadeIn() && popupBg.show();
        });
        jQuery(".popup").on("click", ".close", function () {
            return jQuery(this).closest(".popup").fadeOut("slow") && popupBg.fadeOut();
        });
    }

    /*
    |-----------------------------------------------------------
    |   NoUiSlider
    |-----------------------------------------------------------
    */
    var keypressSlider = document.getElementById('keypress');
    if(keypressSlider) {
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
    }

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

    var tabs = jQuery(".tabs");
    if(tabs.length){
        tabs.lightTabs();
    }

    jQuery(".loader, .loader__bg").delay(300).fadeOut('300', function() {
        return jQuery(this).fadeOut();
    });

    jQuery("#sticker").sticky({topSpacing:0, zIndex: 20});

    lightbox.option({
        'albumLabel': 'Изображение %1 из %2'
    });

    var boxCatalog = jQuery('.box_catalog');
    if (boxCatalog.length) {
        var btnToggle = jQuery('.btn_toggle');
        boxCatalog.on('click', '.btn_catalog,.btn_toggle', function () {
            return btnToggle.toggleClass('is_open') && boxCatalog.find('.box_catalog-list').slideToggle();
        });

        boxCatalog.on('click', 'ul li span', function () {
            return jQuery(this).next('ul').slideToggle();
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

    formHandler("#check__order-recall", Notification, true);
    formHandler("#check__order-popup", Notification, true);
    formHandler("#check__order", Notification);
    formHandler("#check__guestbook", Notification);
});

function formHandler(selector, Notification, hide) {
    return jQuery(document).on("submit", selector, function(e){
        e.preventDefault();
        var _this = jQuery(this),
            url = _this.attr('action'),
            data = _this.serialize(),
            submitBlock = _this.find(".submit"),
            agree = _this.find(".i__agree input[type=checkbox]");
        if (agree.length && ! agree.prop("checked")) {
            agree.closest(".i__agree").find(".error").fadeIn().delay(3000).fadeOut();
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
                if(typeof hide !== "undefined" && hide) {
                    jQuery(".popup").fadeOut("slow") && jQuery(".popup__show-bg").fadeOut();
                }
                Notification.notify(data.message);
                return submitBlock.removeClass("is__sent") && _this.trigger("reset");
            }
        });
    });
}

jQuery(document).ajaxError(function () {
    return jQuery("form .submit").removeClass("is__sent") && jQuery('.notify').html('<div>Произошла ошибка =(</div>').fadeIn().delay(3000).fadeOut();
});
