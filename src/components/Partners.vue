<template>
    <section class="partners">
        <div id="partners-container">
            <div class="partners-title-wrapper">
                <div class="container">
                    <h2 class="heading heading-main">партнери<span class="orange-color">:</span></h2>
                </div>
            </div>
            <div class="d-none d-sm-block" id="partners-slider-container">
                <div class="partners-progress-container">
                    <div id="partners-slider">
                        <div class="partner" v-for="(partner, index) in partners" :key="index"
                             :id="'partner' + (index + 1)">
                            <div class="partner-item">
                                <div class="d-flex">
                                    <div class="photo-block">
                                        <div class="bg-number">{{index + 1}}</div>
                                        <img class="photo"
                                             v-lazy="partner.imageUrl"
                                             alt="partner image"
                                        />
                                        <div class="bg-box"></div>
                                    </div>
                                    <div class="description-block">
                                        <h2 class="heading">{{partner.name}}</h2>
                                        <div class="occupation">{{partner.occupation}}</div>
                                        <div class="description"
                                             v-if="partner.description"
                                             v-html="partner.description"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="position-relative timeline-progressbar-container">
                        <div class="d-flex justify-content-around">
                            <div class="progress-name"
                                 v-for="(partner, index) in partners"
                                 :key="index"
                                 :id="'progress-text' + (index + 1)"
                            >
                                {{partner.firstName}}
                            </div>
                        </div>
                        <div class="partners-progress-line">
                            <div class="partners-progress-line-fill" id="partners-progress-line-fill"></div>
                        </div>
                    </div>

                    <Footer class="partners-footer" link="cases"></Footer>
                </div>
            </div>
            <div id="d-block d-sm-none partners-mobile-slider">
                <div class="container">
                    <swiper :options="swiperOption" ref="partnersSwiper">
                        <swiper-slide v-for="(partner, index) in partners" :key="index"
                        >
                            <div class="partner-item">
                                <div class="photo-block">
                                    <img class="photo"
                                         v-lazy="partner.imageUrl"
                                         alt="partner image"
                                    />
                                </div>
                                <div class="description-block">
                                    <h2 class="heading">{{partner.name}}</h2>
                                    <div class="occupation">{{partner.occupation}}</div>
                                    <div class="description"
                                         v-if="partner.description"
                                         v-html="partner.description"
                                    ></div>
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

                    <Footer link="cases"></Footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import ScrollMagic from 'scrollmagic';
  import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
  import {TimelineMax} from "gsap/TweenMax";
  import Footer from './Footer';
  import arrowSvg from '../assets/img/arrow-grey.svg';

  export default {
    name: 'Partners',

    props: ['partners'],

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

    components: {
      Footer
    },

    methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;

        this.activeIndex = index === 0 ? '' : index < 10 ? '0' + index : index;

        this.afterIndex = this.partners.length === (index + 1)
            ? ''
            : (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      }
    },

    computed: {
      swiper() {
        return this.$refs.partnersSwiper.swiper;
      }
    },

    mounted() {
      this.swiper.on('slideChange', () => this.onSwipe(this));
      const self = this;

      $(document).ready(function () {
        const outW = $(window).outerWidth();

        if (outW > 576) {
          partnersInit();
        }

        hideFooterOnLeave();

        // set width and pos
        $('.partner').css("width", 100 / self.partners.length + "%");
        $('.timeline-progressbar-container').css({"left": "200px"});

        let lnPosition, selected;
        $(window).scroll(function () {
          let elem = document.getElementById("partners-progress-line-fill");

          if (elem) {
            const lineWidth = parseFloat(elem.offsetWidth);

            $('.partner').each(function (index) {
              lnPosition = $(this).data('position');
              selected = '#' + $(this).data('partner');
              if ((lineWidth + 500) >= lnPosition) {
                $(this).addClass('fill');
                $('#progress-text' + (index + 1)).addClass('fill');
              } else {
                $(this).removeClass('fill');
                $('#progress-text' + (index + 1)).removeClass('fill');
              }
            });
          }
        });

        if (outW >= 767.98) {
          var timeout;

          for (let i = 0; i < self.partners.length; i++) {
            let x,
                y,
                xmouse,
                ymouse,
                dx = void 0,
                dy = void 0,
                hImg = $(`.partners #partner${i + 1} .photo-block .photo`),
                hBox = $(`.partners #partner${i + 1} .photo-block .bg-box`),
                hNumber = $(`.partners #partner${i + 1} .photo-block .bg-number`),
                WindowH = $(window).height(),
                WindowW = $(window).width();

            $(`#partner${i + 1}`).mousemove(function (event) {

              xmouse = event.clientX || event.pageX;
              ymouse = event.clientY || event.pageY;

              if (!x || !y) {
                x = ((WindowW / 2) - xmouse) * 0.1;
                y = ((WindowH / 2) - ymouse) * 0.1;
              } else {
                dx = (xmouse - x) * 0.125;
                dy = (ymouse - y) * 0.125;
                if (Math.abs(dx) + Math.abs(dy) < 0.1) {
                  x = xmouse;
                  y = ymouse;
                } else {
                  x += dx;
                  y += dy;
                }
              }

              hNumber.removeClass('animation');
              hBox.removeClass('animation');
              hImg.removeClass('animation');

              hNumber.css({
                '-webit-transform': 'translate3d(-' + x / 60 + 'px,-' + y / 60 + 'px,0) translate(-50%, 0)',
                'transform': 'translate3d(-' + x / 60 + 'px,-' + y / 60 + 'px,0)'
              });

              hBox.css({
                '-webit-transform': 'translate3d(' + x / 60 + 'px,-' + y / 30 + 'px,0) translate(-50%, 0)',
                'transform': 'translate3d(' + x / 60 + 'px,-' + y / 30 + 'px,0)'
              });

              hImg.css({
                '-webit-transform': 'translate3d(-' + x / 40 + 'px,' + y / 60 + 'px,0)',
                'transform': 'translate3d(-' + x / 40 + 'px,' + y / 60 + 'px,0)'
              });

              if (timeout) clearTimeout(timeout);
              timeout = setTimeout(mouseStop, 350);
            });

            function mouseStop() {
              hNumber.addClass('animation');
              hBox.addClass('animation');
              hImg.addClass('animation');

              hNumber.css({
                '-webit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
              });

              hBox.css({
                '-webit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
              });

              hImg.css({
                '-webit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
              });
            }
          }
        }

        function partnersInit() {
          const partner1 = document.getElementById("partner1"),
              controller = new ScrollMagic.Controller(),
              slideCount = self.partners.length,
              slideWidth = partner1 ? partner1.clientWidth : 1200,
              offsetLeft = $('#mainMenu')[0].offsetLeft,
              maxWidth = offsetLeft + (slideWidth * (slideCount - 1)),
              progWrap = $('.partners-progress-container'),
              progWrapWidth = maxWidth + offsetLeft;

          let wipeAnimation = new TimelineMax()
              .to("#partners-slider-container", 1, {
                x: '' + offsetLeft + 'px'
              }, 0)
              .to(".partners-progress-line-fill", 1, {
                width: progWrapWidth + 'px'
              }, 0)
              .to(".partners-progress-container", 1, {
                x: -progWrapWidth + 'px'
              }, 0);

          let scene = new ScrollMagic.Scene({
            triggerElement: "#partners-container",
            triggerHook: "onLeave",
            duration: slideCount * 100 + "%"
          })
              .setPin("#partners-container")
              .setTween(wipeAnimation)
              .addTo(controller);

          // set width and position

          progWrap.css({
            "left": offsetLeft,
            "width": progWrapWidth
          });

          // set data position to triger opacity on enter
          const YPosition = parseFloat(progWrap.width() / slideCount);

          $('.partner').each(function (index) {
            const pos = YPosition / 3 + index * YPosition;

            $(this).attr("data-position", pos);
          });

          window.addEventListener('resize', function () {
            const offsetLeft = $('#mainMenu')[0].offsetLeft;

            $('.partners-progress-container').css({
              "left": offsetLeft
            });

            if ($(window).outerWidth() < 576) {
              controller.destroy(true);
              scene = null;
              wipeAnimation = null;
            }
          });
        }

        function hideFooterOnLeave() {
          const controller = new ScrollMagic.Controller();

          const hideFooterAnimation = new TimelineMax()
              .fromTo($('#services .footer'), 1, {autoAlpha: 1}, {autoAlpha: 0, delay: 3})
          ;

          // hide footer
          const hideFooterScene = new ScrollMagic.Scene({
            triggerElement: "#partners",
            triggerHook: "onEnter",
            duration: '50%'
          })
              .setTween(hideFooterAnimation)
              .addTo(controller);
        }
      });
    }
  }
</script>

<style scoped lang="scss">
    .partners {
        margin-bottom: 100px;

        .heading-main {
            padding-left: 125px;
        }

        .partner-item {
            width: 1000px;
            display: inline-block;
            padding: 0 0 0 150px;
            transition: all .5s ease-in-out;
            opacity: 1;
        }

        .photo-block {
            width: 450px;
            position: relative;

            .animation {
                transition: all 1s ease-in-out;
            }

            .bg-number {
                font-weight: bold;
                line-height: 407px;
                font-size: 288px;
                color: #1E1E1E;
                position: absolute;
                top: -70px;
            }

            .photo {
                position: relative;
                left: 90px;
                z-index: 1;
                width: 265px;
                height: 395px;
                transition: all .5s ease;
                object-fit: cover;
            }

            .bg-box {
                width: 307px;
                left: 80px;
                background: #1E1E1E;
                height: 354px;
                position: absolute;
                top: 70px;
            }
        }

        .description-block {
            padding-top: 40px;
            height: 450px;

            .occupation {
                line-height: 28px;
                font-size: 18px;
                color: #BCBFC1;
                opacity: 0.7;
            }

            .heading {
                margin-bottom: 10px;
            }

            .description {
                margin-top: 40px;
                font-weight: 500;
                line-height: 25px;
                font-size: 14px;
                letter-spacing: 0.01em;
                max-width: 400px;
                height: 300px;
                overflow-y: auto;
            }
        }

        .progress-name {
            font-size: 18px;
            padding-bottom: 20px;
            transition: color .5s ease-in-out;

            &.fill {
                color: white;
            }
        }

        .partners-footer {
            margin: 0;
            position: absolute;
            width: calc(100% + 500px);
            left: 0;
            bottom: -8px;
        }

        #partners-slider {
            height: 55vh;
            min-height: 500px;

            .partner {
                float: left;
                width: 1200px;
                padding: 0 0 0 150px;

                &:not(.fill) {
                    .partner-item {
                        opacity: 0.2;

                        .photo-block {
                            .photo {
                                filter: grayscale(100%);
                                transition: all .2s ease-in-out;
                            }
                        }

                        .description-block {
                            h2, .description {
                                color: $grey;
                            }
                        }
                    }
                }
            }

            .progress-name:not(.fill) {
                color: $grey;
            }
        }

        #partners-container {
            padding-top: 100px;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            perspective: 1000;
            margin-bottom: 185px;
            position: relative;

            .partners-title-wrapper {
                position: absolute;
                top: 150px;
                width: 100%;
                z-index: 5;
            }

            #partners-slider-container {
                width: 500%;
                height: 100%;

                .partners-progress-container {
                    position: absolute;
                    bottom: 50px;
                    left: 0;
                    width: 100%;
                    z-index: 4
                }

                .partners-progress-line {
                    position: relative;
                    height: 3px;
                    width: 100%;
                    background-color: $grey;
                    z-index: 4
                }

                .partners-progress-line-fill {
                    height: 3px;
                    position: absolute;
                    top: 0;
                    width: 0;
                    background-color: $orange;
                    z-index: 4
                }
            }
        }
    }

    @media screen and (max-width: $lg-max), screen and (max-height: 920px) {
        .partners {
            .heading-main {
                padding-left: 40px;
            }

            #partners-slider {
                min-height: 450px;
                height: 50vh;
            }

            .partner-item {
                .photo-block {
                    width: 380px;

                    .photo {
                        width: 220px;
                        height: 300px;
                    }

                    .bg-box {
                        width: 250px;
                        height: 250px;
                    }
                }

                .description-block {
                    padding-top: 10px;
                    height: 400px;

                    .heading {
                        margin-bottom: 0;
                    }

                    .occupation {
                        font-size: 14px;
                    }

                    .description {
                        margin-top: 20px;
                    }
                }
            }

            .progress-name {
                font-size: 14px;
            }
        }
    }

    @include media-max-width($sm-max) {
        .partners {
            .heading-main {
                padding-left: 10px;
            }
        }
    }

    @media screen and (orientation: portrait) {
        .partners {
            #partners-slider {
                height: 55vh;
            }
        }
    }

    @include media-max-width($xs-max) {
        .partners {
            margin-bottom: 0;

            #partners-container {
                height: 100%;
                margin-bottom: 0;
                padding-top: 60px;

                .partners-title-wrapper {
                    position: static;

                    .heading-main {
                        margin-bottom: 40px;
                    }
                }
            }

            .partner-item {
                padding: 0;
                width: 100%;

                .photo-block {
                    width: 100%;
                    margin-bottom: 20px;
                    text-align: center;

                    .photo {
                        display: inline-block;
                        background-position: center top;
                        position: static;
                        width: 200px;
                        height: 200px;
                        -webkit-box-shadow: 10px 10px 0px 0px #1E1E1E;
                        -moz-box-shadow: 10px 10px 0px 0px #1E1E1E;
                        box-shadow: 10px 10px 0px 0px #1E1E1E;
                    }
                }

                .description-block {
                    padding: 0 35px;
                    max-width: 90%;

                    .description {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>