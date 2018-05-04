var main = function () {

    fixedHeader();
    stockSliderInit();
    toggleFaqBox();
    infoSliderInit();
    initProductChangeImg();
    toggleMenu();

    $(document).on('click', '.js-popup-modal', function () {
        var popupElem = $(this).attr('href');

        openModal(popupElem)
    });

    $(document).on('click', '.js-close-modal', function () {
        closeModal();
    });

    $(".tabs").lightTabs();

    AOS.init({
        offset: 150,
        easing: 'ease-in-sine',
        disable: function () {
            var maxWidth = 1024;
            return window.innerWidth < maxWidth;
        }
    });
};

function toggleMenu() {
    var toggleMenuBtn = $('.toggle-menu');
    var menu = $('.header__menu');
    var body = $('body');

    toggleMenuBtn.on('click', function () {
        menu.addClass('menu-open');
        body.addClass('open-menu');
    });

    menu.on('click', function (e) {

        if ($(e.target).is(this)) {
            $(this).removeClass('menu-open');
            body.removeClass('open-menu');
        }
    });
}

window.openModal = openModal;
window.closeModal = closeModal;

function openModal(elem) {
    $.magnificPopup.open({
        items: {
            src: elem
        },
        type: 'inline',
        preloader: false,
        fixedContentPos: true,
        closeMarkup: '<button title="%title%" type="button" class="modal__close mfp-close"></button>'
    });
}

function closeModal() {
    $.magnificPopup.close();
}

function stockSliderInit() {
    var stock = $('.stock-slider');

    if (stock.length) {
        var stockSlider = $('.stock-slider__init');

        var elemSlider = stockSlider.find('.stock-slider__elem');
        var elemCount = elemSlider.length;

        stockSlider.slick({
            dots: false,
            infinite: true,
            speed: 300,
            appendArrows: '.stock-slider-control',
            prevArrow: '<button class="slider-navs__btn slider-navs__prev stock-slider__prev" type="button"></button>',
            nextArrow: '<button class="slider-navs__btn slider-navs__next stock-slider__next" type="button"></button>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        adaptiveHeight: true
                    }
                }
            ]
        });

        $('.slider-navs__finish').text(elemCount);

        stockSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.slider-navs__first').text(nextSlide + 1);
        });
    }
}

function toggleFaqBox() {
    var faq = $('.faq_main');

    if (faq.length) {

        faq.find('.faq__elem-head').on('click', function () {
            $(this).closest('.faq__elem').toggleClass('open')
        })
    }
}

function infoSliderInit() {
    var infoSlider = $('.info-slider');

    if (infoSlider.length) {

        infoSlider.slick({
            dots: false,
            infinite: true,
            speed: 300,
            prevArrow: '<button class="slider-navs__btn slider-navs__prev info-slider__prev" type="button"></button>',
            nextArrow: '<button class="slider-navs__btn slider-navs__next info-slider__next" type="button"></button>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        adaptiveHeight: true
                    }
                }
            ]
        });
    }
}

function fixedHeader() {
    var header = $('header');

    $(window).scroll(function () {
        var headerHeight = header.height();

        if ($(window).scrollTop() >= headerHeight) {
            header.addClass('fixed-header');
        }
        else {
            header.removeClass('fixed-header');
        }
    });
}

function initProductChangeImg() {

    var box = $('.slider_product');

    if (!box.length) {
        return;
    }

    box.find('.slider__nav-box').on('click', function () {
        var itemSrc = $(this).find('img').attr('src');

        box.find('.slider__for img').attr('src', itemSrc);
    })
}

(function ($) {
    jQuery.fn.lightTabs = function (options) {

        var createTabs = function () {
            var tabs = this;
            var i = 0;

            var showPage = function (i) {
                $(tabs).children(".tabs__content").children(".tabs__elem").removeClass("active");
                $(tabs).children(".tabs__content").children(".tabs__elem").eq(i).addClass('active');
                $(tabs).children(".tabs__links").children(".tabs__link").removeClass("active");
                $(tabs).children(".tabs__links").children(".tabs__link").eq(i).addClass("active");
            };

            $(tabs).children(".tabs__links").children(".tabs__link").each(function (index, element) {
                $(element).attr("data-page", i);
                i++;
            });

            $(tabs).children(".tabs__links").children(".tabs__link").click(function () {
                showPage(parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

$(document).ready(function () {
    main();
});