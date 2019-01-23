<template>
    <div class="services">
        <section class="slider-section">
            <div id="slider-wrap">
                <b-container class="position-relative">
                    <h1 class="heading heading-main">послуги<span class="orange-color">:</span></h1>
                    <canvas id="canvas-services"></canvas>
                </b-container>

                <div class="d-none d-md-block">
                    <div class="slider-content-wrap">
                        <b-container class="services-slider">
                            <div :id="'slide-' + (index + 1)"
                                 v-for="(service, index) in services"
                                 :key="index"
                                 class="slide-content d-flex justify-content-end"
                            >
                                <div class="d-flex align-items-center">
                                    <div class="slide-content-wrap text-block" :data-number="index + 1">
                                        <div class="slide-content-counter">0{{index + 1}}</div>
                                        <span class="letter d-none">{{service.letter}}</span>
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
                    </div>
                    <div id="slider-container">
                        <div class="progress-slider-wrap">
                            <div class="progress-line" id="progress-line"></div>
                        </div>
                    </div>
                </div>

                <div class="d-block d-md-none services-slider">
                    <b-container>
                        <swiper :options="swiperOption" ref="servicesSwiper">
                            <swiper-slide v-for="(service, index) in services" :key="index">
                                <div class="d-flex justify-content-center">
                                    <div class="text-block">
                                        <span class="letter d-none">{{service.letter}}</span>
                                        <h2 :data-number="index + 1">{{service.title}}</h2>
                                        <div class="description" v-html="service.description"></div>
                                    </div>
                                </div>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev" v-html="arrowSvg"></div>
                            <div
                                    class="swiper-pagination"
                                    slot="pagination"
                                    ref="pagination"
                                    :data-before="activeIndex"
                                    :data-after="afterIndex"
                            ></div>
                            <div class="swiper-button-next" slot="button-next" v-html="arrowSvg"></div>
                        </swiper>
                    </b-container>
                </div>

                <b-container class="footer-container">
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
  import arrowSvg from '../assets/img/arrow-grey.svg';
  import bus from '../bus';

  export default {
    name: 'Services',

    props: ['services'],

    data() {
      return {
        arrowSvg,
        activeIndex: '',
        afterIndex: '02',
        swiperOption: {
          speed: 1000,
          parallax: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },

    methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;

        this.activeIndex = index === 0
          ? ''
          : index < 10 ? '0' + index : index;
        console.log(this.partners.length, index, 'partners');

        this.afterIndex = this.partners.length === (index + 1)
          ? ''
          : (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      }
    },

    computed: {
      swiper() {
        return this.$refs.servicesSwiper.swiper;
      }
    },

    mounted() {
      const self = this;
      this.swiper.on('slideChange', () => this.onSwipe(this));

      $(document).ready(function () {
        const outW = $(window).outerWidth();

        if (outW > 576) {
          // self.animateServices('canvas-services');
          // bus.$emit('animateServices', '&');
        }

        $(".reveal-title, .slide-content-title h2").each(function () {
          const title = $(this),
            width = title.width();

          title.html(function (i, html) {
            return html.replace(/\s+/g, '*');
          });
          let texts = title.html().split("*");
          title.html('<span>' + texts.join('</span> <span>') + '</span>');

          title.find("span").each(function () {
            var span = $(this);
            if ((span.position().left + span.width()) > width) {
              span.before('<br>');
            }
          });

          title.find("span").contents().unwrap();
          let lines = title.html().split("<br>");
          title.html('<span class="reveal-wrap"><span class="reveal">' + lines.join('</span></span><span class="reveal-wrap"><span class="reveal">') + '</span></span>');
        });

        $('.services-slider').css({"opacity": 1});

        hideFooterOnLeave();

        if (outW > 767.98) {

          sliderInit();

          var lastScrollTop = 0;
          const pointWidth = $('.progress-pin[data-slide="slide-2"]').data('position');

          let prevLetter = false;

          $(window).scroll(function () {
            const st = $(this).scrollTop();

            if (st > lastScrollTop)
              $('.slider-dots li.dots-point').removeClass('dots-up').addClass('dots-down');
            else
              $('.slider-dots li.dots-point').removeClass('dots-down').addClass('dots-up');

            sliderDownAnim();

            lastScrollTop = st;
          });

          function sliderDownAnim() {
            let elem = document.getElementById("progress-line");

            if (elem) {
              const lineWidth = parseFloat(elem.offsetWidth);

              $('.progress-pin').each(function () {

                const pointPosition = $(this).data('position');

                if (lineWidth > pointPosition) {

                  var pointOffset = pointPosition + pointWidth;

                  if (lineWidth < pointOffset) {

                    let slide = $('#' + $(this).data('slide'));
                    slide.siblings().removeClass('slide-point');
                    slide.addClass('slide-point');

                    let nav = $('#' + $(this).data('dots'));
                    nav.siblings().removeClass('dots-point');
                    nav.addClass('dots-point');

                    const text = $('.slide-content.slide-point .letter');

                    if (outW > 576) {
                      if (text && (prevLetter !== text.text())) {
                        prevLetter = text.text();
                        // bus.$emit('animateServices', text.text());
                      }
                    }
                  }
                }
              });
            }
          }

        }

        function sliderInit() {

          //Define variable
          const controller = new ScrollMagic.Controller(),
            sliderCount = $('.slide-content').length + 0.2,
            progressWrap = $('.progress-slider-wrap'),
            sliderContainer = $('#slider-container'),
            sliderXOffset = 100 - (100 / sliderCount);

          let wipeAnimation,
            pinPosition,
            yOffset,
            scene,
            html;

          //Create Slide, Progress Pin and Nav dots
          html = '<ul class="slider-dots">';
          for (let i = 1; i <= sliderCount; i++) {
            sliderContainer.append('<div id="slide-nav-' + i + '" class="slide"></div>');
            progressWrap.append('<div class="progress-pin" data-dots="dots-nav-' + i + '" data-slide="slide-' + i + '">' + i + '</div>');
            //
            // Add slide navigation dot
            if (i !== sliderCount)
              html += '<li id="dots-nav-' + i + '" data-index="' + i + '">0' + i + '</li>';
          }
          html += '</ul>';
          //
          //Apend nav dots
          $('#slider-wrap .services-slider').prepend(html);

          var slideWidth = $('.slide').width(),
            progressWrapWidth = (slideWidth * (sliderCount - 1)) / 5,
            TimeLineAnim = progressWrapWidth * 4;

          wipeAnimation = new TimelineMax()
            .to(sliderContainer, 1, {x: '-' + sliderXOffset + '%'}, 0)
            .to(".progress-line", 1, {width: progressWrapWidth + 'px'}, 0)
            .to(progressWrap, 1, {x: TimeLineAnim + 'px'}, 0);

          scene = new ScrollMagic.Scene({
            triggerElement: "#slider-wrap",
            triggerHook: "onLeave",
            duration: sliderCount * 100 + "%"
          })
            .setPin("#slider-wrap")
            .setTween(wipeAnimation)
            .addTo(controller);

          const wipeAnimation2 = new TimelineMax()
            .fromTo($('#slide-1'), 1, {opacity: 0}, {opacity: 1});

          new ScrollMagic.Scene({
            triggerElement: "#slide-1",
            triggerHook: "onEnter",
            duration: "80%"
          })
            .setTween(wipeAnimation2)
            .addTo(controller);

          sliderContainer.css("width", sliderCount * 100 + "%");

          $('.slide').css("width", 100 / sliderCount + "%");

          progressWrap.css({
            "width": progressWrapWidth
          });

          yOffset = parseFloat(Math.trunc(progressWrapWidth / (sliderCount - 1)));
          $('.progress-pin').each(function (index) {
            pinPosition = index * yOffset;
            $(this).css("left", pinPosition).attr("data-position", pinPosition);
          });


          // set active slide on load
          $('#slide-1').addClass('slide-point');

          const text = $('#slide-1 .letter');
          bus.$emit('animateServices', text.text());

          window.addEventListener('resize', function () {
            if ($(window).outerWidth() < 768) {
              controller.destroy(true);
              scene = null;
              wipeAnimation = null;
            }
          })
        }

        function hideFooterOnLeave() {
          const controller = new ScrollMagic.Controller();

          const hideAboutFooterAnimation = new TimelineMax()
            .fromTo($('#about footer'), 1, {autoAlpha: 1}, {autoAlpha: 0})
          ;

          const hideAboutFooterScene = new ScrollMagic.Scene({
            triggerElement: "#services",
            triggerHook: "onEnter",
            duration: '80%'
          })
            .setTween(hideAboutFooterAnimation)
            .addTo(controller);

          const hideFooterAnimation = new TimelineMax()
            .fromTo($('#services footer'), 1, {autoAlpha: 1}, {autoAlpha: 0, delay: 1})
          ;

          // hide footer
          const hideFooterScene = new ScrollMagic.Scene({
            triggerElement: "#partners",
            triggerHook: "onEnter",
            duration: '80%'
          })
            .setTween(hideFooterAnimation)
            .addTo(controller);
        }
      })
    },

    components: {
      Footer
    }
  }
</script>

<style lang="scss">
    .services {
        .heading-main {
            padding-left: 125px;
            position: relative;
            z-index: 1;
        }

        .services-slider {
            opacity: 0;

            .text-block {
                color: $white;
                position: relative;

                .slide-content-title h2, h2 {
                    font-weight: bold;
                    line-height: 34px;
                    font-size: 24px;
                    position: relative;
                    margin-bottom: 20px;
                    padding-right: 50px;
                }

                .description {
                    line-height: 20px;
                    font-size: 14px;
                    color: #BCBFC1;
                    padding-right: 50px;
                }

                &:before {
                    content: attr(data-number);
                    font-weight: bold;
                    line-height: 127px;
                    font-size: 90px;
                    color: #1E1E1E;
                    position: absolute;
                    left: -25px;
                    top: -45px;
                }
            }

            .swiper-slide {
                > div {
                    height: calc(100% - 200px);
                    align-items: flex-end;
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
        height: calc(100vh - 375px);;
        min-height: 500px;
    }

    .slide {
        min-height: 500px;
        height: 50vh;
        width: 20%;
        float: left;
        position: relative;
        color: #fff;
    }

    .progress-slider-wrap {
        top: 20px;
        right: 0;
        width: 100%;
        pointer-events: none;
    }

    .progress-line {
        top: 0;
        width: 0;
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
        right: 0;
        border-right: 2px solid $dark-grey;
    }

    .slider-dots li {
        line-height: 28px;
        font-size: 18px;
        text-align: center;
        color: $dark-grey;
        padding: 5px 12px 5px 0;
        opacity: 0;
        transition: opacity .5s ease;
        margin-right: -2px;

        &:first-child, &:last-child, &.dots-point {
            opacity: 1;
        }
    }

    .slider-dots li.dots-point {
        color: white;
        border-right: 2px solid $orange;
    }

    .slide-content {
        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 100%;
        z-index: 3;

        > div {
            width: 50%;
        }
    }

    .slide-content-title h2 {
        white-space: nowrap
    }

    .slider-content-wrap {
        position: absolute;
        z-index: 5;
        width: 100%;
        min-height: 500px;
        height: 50vh;
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

    .services-slider .text-block:before {
        opacity: 0;
        -webkit-transform: translate3d(0, 140px, 0);
        transform: translate3d(0, 140px, 0);
        -webkit-transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.2s cubic-bezier(.4, .25, 0, 1), opacity .7s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.2s cubic-bezier(.4, .25, 0, 1)
    }

    .slide-point .text-block:before {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        transition: opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1);
        -o-transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1);
        transition: transform 1.4s cubic-bezier(.4, .25, 0, 1), opacity .9s cubic-bezier(.4, .25, 0, 1), -webkit-transform 1.4s cubic-bezier(.4, .25, 0, 1)
    }

    .slider-dots li {
        text-transform: uppercase;
    }

    .slide-content-counter:before {
        content: "";
    }

    .progress-line, .progress-pin, .progress-slider-wrap {
        visibility: hidden;
        z-index: 4;
        position: absolute;
    }

    .slide-point {
        z-index: 4
    }

    @include media-min-width ('1400px') {
        .services .services-slider {
            .text-block {
                max-width: 600px;
            }
        }
    }

    @include media-max-width ('1399px') {
        .services .services-slider {
            .text-block {
                max-width: 100%;
            }
        }
    }

    @include media-max-width($lg-max) {
        .services {
            .heading-main {
                padding-left: 40px;
            }
        }
    }

    @include media-max-width($md-max) {
        .slide-content > div {
            width: 80%;
        }
    }

    @include media-max-width($sm-max) {
        .services {
            .heading-main {
                padding-left: 10px;
            }
        }

        .slider-dots {
            display: none;
        }

        .services {
            .services-slider {
                .swiper-slide {
                    > div {
                        height: 350px;
                    }
                }

                .text-block {
                    width: 100%;
                    height: 180px;
                    padding-left: 60px;

                    h2 {
                        font-size: 18px;
                        line-height: 28px;
                        position: relative;

                        &:before {
                            content: attr(data-number);
                            opacity: 1;
                            font-size: 60px;
                            color: #1E1E1E;
                            font-weight: bold;
                            position: absolute;
                            left: - 50px;
                            top: 0;
                            line-height: 60px;
                        }
                    }

                    .description {
                        height: 300px;
                        overflow-y: auto;
                    }
                }
            }
        }

        #slider-wrap {
            height: 100%;
            padding-top: 60px;
        }

        .slide-content-text {
            max-width: 100%;
            width: 100%;
        }
    }

    @include media-max-width($mobile-xs) {
        .services {
            .services-slider {
                .text-block {
                    padding-right: 0;

                    h2 {
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>