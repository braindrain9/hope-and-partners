<template>
    <div class="services">
        <section class="slider-section">
            <div id="slider-wrap">
                <div class="container custom-container position-relative">
                    <h2 class="heading heading-main">{{$t('services')}}<span class="orange-color">:</span></h2>
                    <canvas id="canvas-services"></canvas>
                </div>

                <div class="d-none d-lg-block">
                    <div class="slider-content-wrap">
                        <div class="container custom-container services-slider">
                            <div :id="'slide-' + (index + 1)"
                                 v-for="(service, index) in services"
                                 :key="index"
                                 class="slide-content d-flex justify-content-end"
                            >
                                <div class="d-flex align-items-center">
                                    <div class="text-block" :data-number="index + 1">
                                        <span class="letter d-none">{{service.letter}}</span>
                                        <div class="slide-content-text-wrap">
                                            <div class="slide-content-text">
                                                <h2 class="slide-content-title">{{service.title}}</h2>
                                                <p class="description" v-html="service.description"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="slider-container">
                        <div class="progress-slider-wrap">
                            <div class="progress-line" id="progress-line"></div>
                        </div>
                    </div>
                </div>

                <div class="d-block d-lg-none services-slider">
                    <div class="container">
                        <swiper :options="swiperOption" ref="servicesSwiper">
                            <swiper-slide v-for="(service, index) in services" :key="index">
                                <div class="d-flex justify-content-center">
                                    <div class="text-block">
                                        <span class="letter d-none">{{service.letter}}</span>
                                        <h2 class="d-none d-lg-block" :data-number="index + 1">{{service.title}}</h2>
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
                    </div>
                </div>

                <div class="container footer-container">
                    <Footer link="partners"/>
                </div>
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
  import Timeout from 'smart-timeout';

  export default {
    name: 'Services',

    props: ['services'],

    components: {
      Footer
    },

    data() {
      return {
        arrowSvg,
        activeIndex: '01',
        afterIndex: '02',
        controllerExist: false
      }
    },

    methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;
        const {activeIndex, afterIndex} = this.onSliderSwipe(index, this.services);

        this.activeIndex = activeIndex;
        this.afterIndex = afterIndex;

        bus.$emit('animateServicesParticles', index);
      },
      hideFooterOnLeave() {
        const controller = new ScrollMagic.Controller(),
          hideAboutFooterAnimation = new TimelineMax()
            .fromTo($('#about .footer'), 1, {autoAlpha: 1}, {autoAlpha: 0}),
          hideFooterAnimation = new TimelineMax()
            .fromTo($('#services .footer'), 1, {autoAlpha: 1}, {autoAlpha: 0, delay: 1});

        new ScrollMagic.Scene({
          triggerElement: "#services",
          triggerHook: "onEnter",
          duration: '80%'
        })
          .setTween(hideAboutFooterAnimation)
          .addTo(controller);

        // hide footer
        new ScrollMagic.Scene({
          triggerElement: "#partners",
          triggerHook: "onEnter",
          duration: '80%'
        })
          .setTween(hideFooterAnimation)
          .addTo(controller);
      },
      sliderInit() {
        const controller = new ScrollMagic.Controller(),
          sliderCount = $('.slide-content').length + 0.2,
          progressWrap = $('.progress-slider-wrap'),
          sliderContainer = $('#slider-container'),
          sliderXOffset = 100 - (100 / sliderCount);

        let pinPosition,
          yOffset,
          scene,
          wipeAnimation,
          slideAnimation,
          html;

        this.controllerExist = true;

        // create slide, progress pin and nav dots
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

        // append nav dots
        $('.slider-content-wrap .services-slider').prepend(html);

        const slideWidth = $('.slide').width(),
          progressWrapWidth = (slideWidth * (sliderCount - 1)) / 5,
          timeLineAnim = progressWrapWidth * 4;

        wipeAnimation = new TimelineMax()
            .to(sliderContainer, 1, {x: '-' + sliderXOffset + '%'}, 0)
            .to(".progress-line", 1, {width: progressWrapWidth + 'px'}, 0)
            .to(progressWrap, 1, {x: timeLineAnim + 'px'}, 0),
        slideAnimation = new TimelineMax()
            .fromTo($('#slide-1'), 1, {opacity: 0}, {opacity: 1});

        scene = new ScrollMagic.Scene({
          triggerElement: "#slider-wrap",
          triggerHook: "onLeave",
          duration: sliderCount * 100 + "%"
        })
          .setPin("#slider-wrap")
          .setTween(wipeAnimation)
          .addTo(controller);

        new ScrollMagic.Scene({
          triggerElement: "#slide-1",
          triggerHook: "onEnter",
          duration: "80%"
        })
          .setTween(slideAnimation)
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
        $('#dots-nav-1').addClass('dots-point');

        bus.$emit('animateServices', $('#slide-1 .letter').text());

        bus.$on('destroyServicesController', () => {
          controller.destroy(this.controllerExist);
          scene = null;
          wipeAnimation = null;
          slideAnimation = null;
          this.controllerExist = false;
        })
      },
      servicesInit() {
        this.sliderInit();

        const pointWidth = $('.progress-pin[data-slide="slide-2"]').data('position');

        let prevLetter = false,
          lastScrollTop = 0;

        $(window).scroll(function () {
          const st = $(this).scrollTop();

          sliderDownAnim();
          lastScrollTop = st;
        });

        // helpers
        function sliderDownAnim() {
          let elem = document.getElementById("progress-line");

          if (elem) {
            const lineWidth = parseFloat(elem.offsetWidth);

            $('.progress-pin').each(function () {
              const pointPosition = $(this).data('position');

              if (lineWidth > pointPosition) {
                const pointOffset = pointPosition + pointWidth;

                if (lineWidth < pointOffset) {
                  let slide = $('#' + $(this).data('slide')),
                    nav = $('#' + $(this).data('dots'));

                  slide.siblings().removeClass('slide-point');
                  slide.addClass('slide-point');

                  nav.siblings().removeClass('dots-point');
                  nav.addClass('dots-point');

                  const text = $('.slide-content.slide-point .letter'),
                    index = $('.slide-content.slide-point').index();

                  if (text && (prevLetter !== text.text())) {
                    prevLetter = text.text();

                    function animateParticles() {
                      bus.$emit('animateServicesParticles', index - 1)
                    }

                    Timeout.clear(animateParticles);
                    Timeout.set(animateParticles, 300);
                  }
                }
              }
            });
          }
        }
      }
    },

    computed: {
      swiper() {
        return this.$refs.servicesSwiper.swiper;
      }
    },

    mounted() {
      const outW = $(window).outerWidth();

      this.swiper.on('slideChange', () => this.onSwipe(this));
      this.getServicesAnimation();
      this.hideFooterOnLeave();

      const {afterIndex} = this.onSliderSwipe(0, this.services);

      this.afterIndex = afterIndex;

      $('.services-slider').css({"opacity": 1});

      if (outW > 991.98) {
       this.servicesInit();
      }

      window.addEventListener('resize', () => {
        // if resized to mobile destroy scrollmagic partners
        if ($(window).outerWidth() < 992) {
            bus.$emit('destroyServicesController');
        }
      });
    }
  }
</script>

<style lang="scss">
    .services {
        .heading-main {
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
                    font-size: $extra-medium-base-font-size;
                    position: relative;
                    margin-bottom: 20px;
                    padding-right: 50px;
                }

                .description {
                    line-height: 20px;
                    font-size: $small-font-size;
                    color: $light-grey;
                    padding-right: 50px;
                }

                &:before {
                    content: attr(data-number);
                    font-weight: bold;
                    line-height: 127px;
                    font-size: $large-letter-font-size;
                    color: $extra-dark-grey;
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
        min-height: 300px;
    }

    .slide {
        height: 50vh;
        width: 20%;
        float: left;
        position: relative;
        color: $white;
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
        font-size: $base-font-size;
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
        color: $white;
        border-right: 2px solid $orange;
    }

    .slide-content {
        position: absolute;
        top: 55%;
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

    .slider-content-wrap {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 50vh;
    }

    .slide-content-text-wrap {
        position: relative;
        overflow: hidden
    }

    .slide-content-text {
        width: 470px;
        opacity: 0;

        .description, .slide-content-title {
            opacity: 0;
            transform: translate3d(0, 140px, 0);
        }
    }

    .slide-point .slide-content-text {
        opacity: 1;

        .slide-content-title {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity 2s ease, transform 2s ease;
            transition-delay: .8s;
        }

        .description {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity 2s cubic-bezier(.4, .25, 0, 1), transform 2.4s cubic-bezier(.4, .25, 0, 1);
            transition-delay: 1.5s;
        }
    }

    .services-slider .text-block:before {
        opacity: 0;
        transform: translate3d(-10px, 60px, 0);
        transition: opacity 2s cubic-bezier(.4, .25, 0, 1), transform 1.2s cubic-bezier(.4, .25, 0, 1);
    }

    .slide-point .text-block:before {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: opacity 1s cubic-bezier(.4, .25, 0, 1), transform 1.4s cubic-bezier(.4, .25, 0, 1);
        transition-delay: 1.2s;
    }

    .slider-dots li {
        text-transform: uppercase;
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

    @include media-max-width($md-max) {
        .slider-dots {
            display: none;
        }

        .services {
            .services-slider {
                .swiper-slide {
                    > div {
                        height: 100%;
                    }
                }

                .text-block {
                    width: 100%;
                    height: 450px;
                    padding-left: 0;

                    h2 {
                        font-size: $base-font-size;
                        line-height: 28px;
                        position: relative;

                        &:before {
                            content: attr(data-number);
                            opacity: 1;
                            font-size: $medium-letter-font-size;
                            color: $extra-dark-grey;
                            font-weight: bold;
                            position: absolute;
                            left: - 50px;
                            top: 0;
                            line-height: 60px;
                        }
                    }

                    .description {
                        height: 100%;
                        overflow-y: auto;
                        font-size: 30px;
                        line-height: 45px;
                        color: $white;
                        font-weight: 700 !important;

                        p, span {
                            font-weight: 700 !important;
                        }

                        @include overflow-y-scroll();
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

    @include media-max-width($sm-max) {
        .services {
            .services-slider .text-block {
                height: 350px;

                .description {
                    font-size: 18px;
                    line-height: 25px;
                }
            }
        }

    }

    @include media-max-width($mobile-xs) {
        .services {
            .services-slider {
                .text-block {
                    padding-right: 0;

                    h2 {
                        font-size: $small-base-font-size;
                    }
                }
            }
        }
    }
</style>
