<template>
    <div class="services">
        <canvas id="canvas"></canvas>
        <section class="slider-section">
            <div id="slider-wrap">
                <b-container>
                    <h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>
                </b-container>

                <div class="slider-content-wrap">
                    <b-container class="services-slider">

                        <div :id="'slide-' + (index + 1)"
                             v-for="(service, index) in services"
                             :key="index"
                             class="slide-content d-flex justify-content-end"
                        >
                            <div class="d-flex align-items-center">
                                <div class="slide-content-wrap text-block">
                                    <div class="slide-content-counter">0{{index + 1}}</div>
                                    <span class="letter d-none">{{service.letter}}</span>
                                    <div class="bg-number">{{index + 1}}</div>
                                    <div class="slide-content-title">
                                        <h2>{{service.title}}</h2>
                                    </div>

                                    <div class="slide-content-text-wrap">
                                        <div class="slide-content-text">
                                            <p class="description" v-html="service.description"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-container>
                    <div class="slider-content-slick-nav">
                        <button id="prev-slides" class="slick-prev">
                            <svg viewBox="0 0 12.94 7.97">
                                <path d="M 4.0442997,7.7900509 0.36799365,3.9869809 4.0442997,0.18389088 M 12.949169,3.9870109 H 0.36764965"></path>
                            </svg>
                        </button>
                        <button id="next-slides" class="slick-next">
                            <svg viewBox="0 0 12.94 7.97">
                                <path d="M 8.9048695,7.7900508 12.581176,3.9869829 8.9048695,0.18388863 M 0,3.9870068 h 12.581519"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="slider-container">
                    <div class="progress-slider-wrap">
                        <div class="progress-line" id="progress-line"></div>
                    </div>
                </div>

                <b-container>
                    <Footer link="partners"/>
                </b-container>
            </div>
        </section>
    </div>
</template>

<script>
    import Footer from './Footer';
    import ScrollMagic from 'scrollmagic';
    import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
    import {TimelineMax} from "gsap/TweenMax";

    export default {
        name: 'Services',

        props: ['services'],

        mounted() {
            // this.animateServices('canvas');
            // const text = $('.services-slider .swiper-slide-active .letter');

            // if (text) {
                // bus.$emit('animateServices', text.text());
            // }

            var outW = $(window).outerWidth();

            function sliderInit() {

                //Define variable
                var controller = new ScrollMagic.Controller(),
                    sliderCount = $('.slide-content').length + 1,
                    progressWrap = $('.progress-slider-wrap'),
                    sliderContainer = $('#slider-container'),
                    sliderXOffset = 100 - (100 / sliderCount),
                    wipeAnimation,
                    pinPosition,
                    scene,
                    yOffset,
                    html;

                //Create Slide, Progress Pin and Nav dots
                html = '<ul class="slider-dots">';
                for (var i = 1; i <= sliderCount; i++) {
                    sliderContainer.append('<div id="slide-nav-' + i + '" class="slide"></div>');
                    progressWrap.append('<div class="progress-pin" data-dots="dots-nav-' + i + '" data-slide="slide-' + i + '">' + i + '</div>');

                    //Add slide navigation dot
                    if (i != sliderCount)
                        html += '<li id="dots-nav-' + i + '" data-index="' + i + '">0' + i + '<svg viewBox="0 0 17 8"><use xlink:href="#slider-arrow"></use></li>';
                }
                html += '</ul>';

                //Apend nav dots
                $('#slider-wrap .services-slider').prepend(html);

                //Progress Slider Wrap
                var slideWidth = $('.slide').width(),
                    offsetLeft = slideWidth / 2,
                    progressWrapWidth = (slideWidth * (sliderCount - 1)) / 5,
                    TimeLineAnim = progressWrapWidth * 4;

                //Define movement of panels
                wipeAnimation = new TimelineMax()
                    .to(sliderContainer, 1, {x: '-' + sliderXOffset + '%'}, 0)
                    .to(".progress-line", 1, {width: progressWrapWidth + 'px'}, 0)
                    .to(progressWrap, 1, {x: TimeLineAnim + 'px'}, 0)

                //Create scene to pin and link animation
                scene = new ScrollMagic.Scene({
                    triggerElement: "#slider-wrap",
                    triggerHook: "onLeave",
                    duration: sliderCount * 100 + "%"
                })
                    .setPin("#slider-wrap")
                    .setTween(wipeAnimation)
                    .addTo(controller);

                //CSS for timiline container
                sliderContainer.css("width", sliderCount * 100 + "%");

                //$('.slide').css("width",100/sliderCount+"%");
                $('.slide').css("width", 100 / sliderCount + "%");

                progressWrap.css({
                    "left": offsetLeft,
                    "width": progressWrapWidth
                });

                //Progress Pin position
                yOffset = parseFloat(Math.trunc(progressWrapWidth / (sliderCount - 1)));
                $('.progress-pin').each(function (index) {
                    pinPosition = index * yOffset;
                    $(this).css("left", pinPosition).attr("data-position", pinPosition);
                });

            }


            if ($('.slider-section').length > 0 && outW > 667) {

                sliderInit(); //Init Scroll Magic

                var lineWidth;
                var lastScrollTop = 0;
                var pointWidth = $('.progress-pin[data-slide="slide-2"]').data('position');

                $(window).scroll(function () {
                    var st = $(this).scrollTop();

                    if (st > lastScrollTop)
                        $('.slider-dots li.dots-point').removeClass('dots-up').addClass('dots-down');
                    else
                        $('.slider-dots li.dots-point').removeClass('dots-down').addClass('dots-up');

                    sliderDownAnim();

                    lastScrollTop = st;
                });

                function sliderDownAnim() {
                    var lineWidth = parseFloat(document.getElementById("progress-line").offsetWidth);

                    $('.progress-pin').each(function () {

                        var pointPosition = $(this).data('position');

                        if (lineWidth > pointPosition) {

                            var pointOffset = pointPosition + pointWidth;

                            if (lineWidth < pointOffset) {

                                let slide = $('#' + $(this).data('slide'));
                                slide.siblings().removeClass('slide-point');
                                slide.addClass('slide-point');

                                let nav = $('#' + $(this).data('dots'));
                                nav.siblings().removeClass('dots-point');
                                nav.addClass('dots-point');

                            }
                        }
                    });
                }

            } else {  //Slider section for Mobile

                $('.slider-content-wrap .container').on('init', function (event, slick) {
                    slick.$slides[0].classList.remove("slick-active");
                });

                $('.slider-content-wrap .container').slick({
                    infinite: true,
                    arrows: false,
                    dots: true,
                    autoplay: false,
                    speed: 100,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    prevArrow: $('#prev-slides'),
                    nextArrow: $('#next-slides'),
                    arrows: true,
                    customPaging: function (slider, i) {
                        let thumb = $(slider.$slides[i]).data();
                        return '<span>0' + (i + 1) + '</span>';
                    },
                });

                $('.slider-content-slick-nav button').click(function () {
                    mobileNavClick($(this));
                });

                function mobileNavClick(el) {
                    el.addClass('nav-clicked');
                    setTimeout(function () {
                        el.removeClass('nav-clicked');
                    }, 500);
                }
            }
        },

        components: {
            Footer
        }
    }
</script>

<style lang="scss">

    .services {
        /*height: calc(100vh - 150px);*/

        .swiper-slide {
            justify-content: flex-end !important;
        }

        .heading {
            padding-left: 100px;
            position: relative;
            z-index: 1;
        }

        .services-slider {
            /*height: calc(100% - 100px);*/
            /*width: 100%;*/

            .text-block {
                color: $white;
                max-width: 500px;
                position: relative;
                margin-left: 25px;

                .slide-content-title h2 {
                    font-weight: bold;
                    line-height: 34px;
                    font-size: 24px;
                    position: relative;
                    margin-bottom: 20px;
                }

                .description {
                    line-height: 20px;
                    font-size: 14px;
                    color: #BCBFC1;
                }

                .bg-number {
                    font-weight: bold;
                    line-height: 127px;
                    font-size: 90px;
                    color: #1E1E1E;
                    position: absolute;
                    left: -25px;
                    top: -45px;
                }
            }
        }
    }

    .slider-section {
        min-height: 100vh;
    }

    .scrollmagic-pin-spacer {
        margin-bottom: 0 !important
    }

    #slider-wrap {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        left: 0 !important;
        padding-top: 150px;
    }

    #slider-container {
        width: 500%;
        height:500px;
    }

    .slide {
        height: 500px;
        width: 20%;
        float: left;
        position: relative;
        color: #fff
    }

    .progress-slider-wrap {
        top: 20px;
        left: 0;
        width: 100%;
        pointer-events: none
    }

    .progress-line {
        height: 3px;
        top: 0;
        width: 0;
        background-color: red
    }

    .progress-pin {
        left: 0;
        top: -100%;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        background-color: #5b5b5b
    }

    .slider-content-wrap > .container {
        position: relative;
        height: 100%
    }

    .slider-dots {
        margin: 0;
        font-size: 0;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        right: -74px
    }

    .slider-dots li {
        line-height: normal;
        font-size: 13px;
        letter-spacing: .3em;
        color: #dadada;
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        margin-bottom: 14px
    }

    .slider-dots li.dots-point {
        color: #999
    }

    .slider-dots svg {
        fill: #c4c4c4;
        width: 17px;
        display: block;
        margin-top: 8px;
        opacity: 0
    }

    .dots-point.dots-up svg {
        opacity: 1;
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .dots-point.dots-down svg {
        opacity: 1;
        -webkit-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0)
    }

    .slide-content {
        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 100%;
        z-index: 3
    }

    .slide-content-counter {
        font-weight: 900;
        line-height: normal;
        font-size: 50px;
        letter-spacing: .1em;
        color: #F8F8F8;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: none;
        width: 100%
    }

    .slide-content-counter:before {
        display: inline-block;
        width: 50px;
        height: 4px;
        background-color: #F8F8F8;
        margin-right: 12px
    }

    .slide-content-title .reveal {
        -webkit-transition: -webkit-transform .3s ease;
        transition: -webkit-transform .3s ease;
        -o-transition: transform .3s ease;
        transition: transform .3s ease;
        transition: transform .3s ease, -webkit-transform .3s ease
    }

    .slide-point .slide-content-title .reveal {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: -webkit-transform .6s ease .4s;
        transition: -webkit-transform .6s ease .4s;
        -o-transition: transform .6s ease .4s;
        transition: transform .6s ease .4s;
        transition: transform .6s ease .4s, -webkit-transform .6s ease .4s
    }

    .slide-point .slide-content-title .reveal-wrap:nth-child(2) .reveal {
        -webkit-transition-delay: .6s;
        -o-transition-delay: .6s;
        transition-delay: .6s
    }

    .slide-content-text-wrap {
        position: relative;
        overflow: hidden
    }

    .slide-content-text {
        width: 470px;
        opacity: 0;
        -webkit-transform: translate3d(0, 140px, 0);
        transform: translate3d(0, 140px, 0);
        -webkit-transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point .slide-content-text {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1)
    }

    .services-slider .bg-number {
        opacity: 0;
        -webkit-transform: translate3d(0, 140px, 0);
        transform: translate3d(0, 140px, 0);
        -webkit-transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point .bg-number {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point {
        z-index: 4
    }

    @-webkit-keyframes slideReveal {
        0% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(0);
            transform: translateZ(0) scaleY(1) scaleX(0)
        }
        50% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(1);
            transform: translateZ(0) scaleY(1) scaleX(1)
        }
        to {
            -webkit-transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1);
            transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1)
        }
    }

    @keyframes slideReveal {
        0% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(0);
            transform: translateZ(0) scaleY(1) scaleX(0)
        }
        50% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(1);
            transform: translateZ(0) scaleY(1) scaleX(1)
        }
        to {
            -webkit-transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1);
            transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1)
        }
    }

    /* Animations */

    .reveal-title {
        opacity: 0
    }

    .reveal-title.printed {
        opacity: 1
    }

    .reveal-wrap {
        overflow: hidden;
        display: inline-block;
        width: 100%;
    }

    .reveal {
        transform: translate3d(0, 135%, 0);
        display: inline-block;
        white-space: nowrap
    }

    .reveal-wrap:nth-child(2) .reveal {
        transition-delay: .2s
    }

    .reveal-wrap:nth-child(3) .reveal {
        transition-delay: .4s
    }

    .printed .reveal {
        transform: translate3d(0, 0, 0);
        transition: transform .6s ease
    }

    @keyframes revealBottom {
        0% {
            transform: translate3d(0, 100%, 0)
        }
        50% {
            transform: translate3d(0, 0, 0)
        }
        to {
            transform: translate3d(0, -100%, 0)
        }
    }

    @keyframes revealLeft {
        0% {
            transform: translate3d(-100%, 0, 0)
        }
        50% {
            transform: translate3d(0, 0, 0)
        }
        to {
            transform: translate3d(100%, 0, 0)
        }
    }

    .slick-dots button, .slide-content-title h2 {
        white-space: nowrap
    }

    .slider-dots li {
        text-transform: uppercase
    }

    .reveal-title {
        overflow: hidden;
        position: relative
    }

    .reveal-wrap {
        display: block
    }

    .slide-content-counter:before {
        content: ""
    }

    .progress-line, .progress-pin, .progress-slider-wrap {
        z-index: 4;
        position: absolute
    }

    .slide {
        text-align: center
    }

    .scrollmagic-pin-spacer {
        margin-bottom: 0 !important
    }

    .progress-slider-wrap {
        top: 20px;
        left: 0;
        width: 100%;
        pointer-events: none
    }

    .progress-line {
        height: 3px;
        top: 0;
        width: 0;
        background-color: red
    }

    .progress-pin {
        left: 0;
        top: -100%;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        background-color: #5b5b5b
    }

    .slider-content-wrap {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 500px;
    }

    .slider-content-wrap > .container {
        position: relative;
        height: 100%
    }

    .slider-dots {
        margin: 0;
        font-size: 0;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        right: -74px
    }

    .slider-dots li {
        line-height: normal;
        font-size: 13px;
        letter-spacing: .3em;
        color: #dadada;
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        margin-bottom: 14px
    }

    .slider-dots li.dots-point {
        color: #999
    }

    .slider-dots svg {
        fill: #c4c4c4;
        width: 17px;
        display: block;
        margin-top: 8px;
        opacity: 0
    }

    .dots-point.dots-up svg {
        opacity: 1;
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .dots-point.dots-down svg {
        opacity: 1;
        -webkit-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0)
    }

    .slide-content {
        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 100%;
        z-index: 3
    }

    .slide-content-counter {
        font-weight: 900;
        line-height: normal;
        font-size: 50px;
        letter-spacing: .1em;
        color: #F8F8F8;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: none;
        width: 100%
    }

    .slide-content-counter:before {
        display: inline-block;
        width: 50px;
        height: 4px;
        background-color: #F8F8F8;
        margin-right: 12px
    }

    .slide-content-title .reveal {
        -webkit-transition: -webkit-transform .3s ease;
        transition: -webkit-transform .3s ease;
        -o-transition: transform .3s ease;
        transition: transform .3s ease;
        transition: transform .3s ease, -webkit-transform .3s ease
    }

    .slide-point .slide-content-title .reveal {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: -webkit-transform .6s ease .4s;
        transition: -webkit-transform .6s ease .4s;
        -o-transition: transform .6s ease .4s;
        transition: transform .6s ease .4s;
        transition: transform .6s ease .4s, -webkit-transform .6s ease .4s
    }

    .slide-point .slide-content-title .reveal-wrap:nth-child(2) .reveal {
        -webkit-transition-delay: .6s;
        -o-transition-delay: .6s;
        transition-delay: .6s
    }

    .slide-content-text {
        width: 470px;
        opacity: 0;
        -webkit-transform: translate3d(0, 140px, 0);
        transform: translate3d(0, 140px, 0);
        -webkit-transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point .slide-content-text {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point {
        z-index: 4
    }

    @-webkit-keyframes slideReveal {
        0% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(0);
            transform: translateZ(0) scaleY(1) scaleX(0)
        }
        50% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(1);
            transform: translateZ(0) scaleY(1) scaleX(1)
        }
        to {
            -webkit-transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1);
            transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1)
        }
    }

    @keyframes slideReveal {
        0% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(0);
            transform: translateZ(0) scaleY(1) scaleX(0)
        }
        50% {
            -webkit-transform: translateZ(0) scaleY(1) scaleX(1);
            transform: translateZ(0) scaleY(1) scaleX(1)
        }
        to {
            -webkit-transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1);
            transform: translate3d(100%, 0, 0) scaleY(1) scaleX(1)
        }
    }

    .review-slider {
        -webkit-box-shadow: 0 5px 15px rgba(68, 74, 102, .1);
        box-shadow: 0 5px 15px rgba(68, 74, 102, .1)
    }

    .progress-slider-wrap {
        opacity: 0
    }

    .slider-content-slick-nav {
        display: none;
    }

    .slider-content-slick-nav svg {
        stroke: #999;
        stroke-width: .52916664;
        fill: none;
        transition: stroke .4s ease;
        width: 100%;
    }

    #prev-slides, #next-slides {
        display: block;
        line-height: 0;
        width: 52px;
        position: absolute;
        bottom: 0;
        padding: 10px;
    }

    #prev-slides {
        left: 5px;
    }

    #next-slides {
        right: 5px;
    }

    .slider-content-slick-nav .nav-clicked svg {
        stroke: #06F;
    }

    /* Responsive */
    @media only screen and (min-width: 1280px) {
        .homepage .slider-section {
            margin-bottom: 0
        }
    }

    @media only screen and (max-width: 1201px) {

        .slide-content-title h2 {
            width: 355px;
            margin-bottom: 14px;
            font-size: 40px
        }

        .reveal-wrap {
            padding-bottom: 8px
        }
    }

    @media only screen and (max-width: 991px) {
        .slide-content {
            max-height: 75%;
            height: 75%;
            margin-top: -2.5%;
        }

        .slide-content-wrap {
            margin-top: 0;
        }

        .slide-content-text {
            max-width: 100%;
            width: 100%;
        }

        .slide-content-title h2 {
            width: 100%;
        }

        .slide-content-text-wrap {
            margin-bottom: 30px;
            max-width: 80%;
        }

        .slide-content {
            display: flex;
            flex-direction: column;
        }

        .slide-content .col-xs-12 {
            display: flex;
        }

        .slide-content .col-xs-12:nth-child(2) {
            flex-grow: 1;
        }

        .slide-content {
            top: auto;
            transform: none;
        }

        .slider-content-wrap .container {
            display: flex;
            align-items: center;
        }

        .slider-dots {
            bottom: 24px;
            right: auto;
            top: auto;
            left: 50%;
            transform: translateX(-50%);
        }

        .slider-dots li {
            transform: none;
            margin-bottom: 0;
            margin-right: 14px;
            display: inline-block;
        }

        .slider-dots li:last-child {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 667px) {

        .slide-content-title h2 {
            line-height: 35px;
            font-size: 30px;
            width: 300px;
        }

        .slide-content-text p {
            line-height: 28px;
            font-size: 18px
        }

        .slide-content-text {
            max-width: 100%
        }

        .slide-point .slide-content-text {
            margin-bottom: 44px
        }

        .slider-section {
            margin-bottom: 31px
        }

        .slide-content-text-wrap {
            width: 100%;
            max-width: 100%;
            margin-bottom: 14px;
        }

        .slide-point .slide-content-text {
            margin-bottom: 0;
        }

        .slide-content {
            margin-top: 0;
            max-height: 100%;
            height: auto;
            position: relative;
            transform: none;
        }

        .slide-content-title h2 {
            margin-bottom: 10px;
        }

        .portret .slide-content .col-xs-12:nth-child(2) {
            display: none;
        }

        .portret .slide-content {
            margin-top: 0;
            max-height: 65%;
            height: 65%;
        }

        .slide-content-counter {
            position: relative;
            top: 0;
            margin-left: 15px;
            display: block;
            opacity: 0;
            transition: opacity .5s ease;
            display: flex;
        }

        .slide-point .slide-content-counter {
            opacity: 1;
            transition: opacity 1s ease;
        }

        .slide-content-counter:before {
            margin-top: 2px;
        }

        .slider-content-wrap .container {
            display: block;
        }

        .slide-image-wrap {
            display: block;
            height: 200px;
        }

        #slider-wrap {
            height: auto;
            overflow: unset;
        }

        .slider-section {
            min-height: auto;
            margin-bottom: 64px;
        }

        .slider-content-wrap {
            position: relative;
        }

        .slider-content-wrap .container {
            padding-left: 0;
            padding-right: 0;
        }

        #slider-container {
            display: none;
        }

        .slider-section .slick-dots {
            text-align: center;
            margin-top: 20px;
        }

        .slider-section .slick-dots li {
            margin-right: 0;
            height: auto;
            width: auto;
            cursor: pointer;
        }

        .slider-section .slick-dots li:last-child {
            margin-right: 0;
        }

        .slider-section .slick-dots li span {
            line-height: normal;
            font-size: 13px;
            letter-spacing: .3em;
            color: #dadada;
            display: block;
            padding: 10px;
            text-indent: 2px;
            transition: .5s;
        }

        .slider-section .slick-dots li span:after {
            content: "";
            display: block;
            height: 1px;
            background: #dadada;
            margin-top: 4px;
            transition: .5s;
            left: -1px;
            position: relative;
        }

        .slider-section .slick-dots li.slick-active span {
            color: #999;
        }

        .slider-section .slick-dots li.slick-active span:after {
            background: #999;
        }

        .slider-content-slick-nav {
            display: block;
        }

        .reveal-wrap {
            padding-bottom: 5px
        }
    }

    @media only screen and (min-width: 1202px) and (max-width: 1280px) {
        .slide-content-title h2 {
            max-width: 480px
        }
    }

    @media screen and (min-width: 1024px) and (max-width: 1367px) and (max-height: 1023px) {
        .homepage .slider-section {
            margin-bottom: 70px;
        }
    }

    @media screen and (min-width: 1024px) and (max-width: 1367px) and (max-height: 766px) {
        .homepage .slider-section {
            margin-bottom: 70px;
        }
    }

    @media screen and (min-width: 1202px) and (max-width: 1280px) {
        .slide-content-title h2 {
            font-size: 55px;
        }
    }
</style>