<template>
    <div class="cases">
        <h1 class="heading heading-main">кейси<span class="orange-color">:</span></h1>
        <swiper :options="swiperOption" ref="casesSwiper">
            <swiper-slide class="d-flex align-items-center" v-for="(item, index) in cases" :key="index">
                <div class="slider-item d-flex">
                    <div class="photo-block">
                        <lazy-component tag="div">
                            <iframe :src="item.videoUrl"
                                class="video"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                >
                        </iframe>
                        </lazy-component>
                        <div class="bg-image"></div>
                    </div>
                    <div class="text-block">
                        <h2>{{item.heading}}</h2>
                        <p class="description">
                            {{item.description}}
                        </p>
                        <div class="horizontal-line"></div>
                        <div class="comment d-flex">
                            <div class="photo">
                                <img src="../assets/img/comment.png" alt="">
                            </div>
                            <div class="text">
                                <h3>Анатолій - СТО</h3>
                                <p>дякую проект мені зайшов на всі 100% заробив багато%)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <div v-if="showControls" class="swiper-button-prev" slot="button-prev" v-html="arrowSvg"></div>
            <div
                    class="swiper-pagination"
                    slot="pagination"
                    ref="pagination"
                    :data-before="activeIndex"
                    :data-after="afterIndex"
                    v-if="showControls"
            ></div>
            <div v-if="showControls" class="swiper-button-next" slot="button-next" v-html="arrowSvg"></div>
        </swiper>
    </div>
</template>

<script>
  import arrowSvg from '../assets/img/arrow-grey.svg';
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'Cases',

    props: ['cases'],

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
        },
        showControls: this.cases.length > 1
      }
    },

    methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;

        this.activeIndex = index === 0 ? '' : index < 10 ? '0' + index : index;

        this.afterIndex = this.cases.length === (index + 1)
          ? ''
          : (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      }
    },

    computed: {
      swiper() {
        return this.$refs.casesSwiper.swiper;
      }
    },

    mounted() {
      this.swiper.on('slideChange', () => this.onSwipe(this));

      $(document).ready(function () {
        const controller = new ScrollMagic.Controller();

        const wipeAnimation = new TimelineMax()
          .fromTo($('.cases'), 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 0.5})
        ;

        // hide footer
        const addFadeIn = new ScrollMagic.Scene({
          triggerElement: ".cases",
          triggerHook: "onEnter",
          duration: '90%'
        })
          .setTween(wipeAnimation)
          .addTo(controller);

        hideFooterOnLeave();

        function hideFooterOnLeave() {
          const hideFooterAnimation = new TimelineMax()
            .fromTo($('#cases footer'), 1, {autoAlpha: 1}, {autoAlpha: 0})
          ;

          // hide footer
          const hideFooterScene = new ScrollMagic.Scene({
            triggerElement: "#cases",
            triggerHook: "onLeave",
            duration: '80%'
          })
            .setTween(hideFooterAnimation)
            .addTo(controller);
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .cases {
        height: $home-block-height;
        min-height: 700px;
        position: relative;
        margin: 0 auto;
        padding-top: 100px;
        z-index: 11;

        .heading-main {
            padding-left: 125px;
        }

        .slider-item {
            justify-content: center;
            align-items: center;
        }

        .photo-block {
            position: relative;

            // to compensate bg-image indent
            margin-right: 35px;
            margin-bottom: 20px;

            .video {
                background: $base-black;
                position: relative;
                z-index: 1;
                width: 420px;
                height: 315px;
            }

            .bg-image {
                background: #1E1E1E;
                width: 105%;
                height: 100%;
                position: absolute;
                bottom: -20px;
                left: 20px;
            }
        }

        .text-block {
            color: $white;
            width: 50%;
            max-width: 400px;
            padding-left: 50px;

            h2 {
                font-weight: bold;
                line-height: 34px;
                font-size: 24px;
                margin-bottom: 15px;
            }

            .description {
                font-weight: 500;
                line-height: 24px;
                font-size: 14px;
                margin-bottom: 20px;
                max-height: 250px;
                overflow-y: auto;
            }
        }

        .horizontal-line {
            border-bottom: 2px solid $white;
            width: 40px;
        }

        .comment {
            margin-top: 30px;

            .photo {
                width: 40%;
                min-width: 65px;

                img {
                    border-radius: 50%;
                    height: 60px;
                    width: 60px;
                }
            }

            .text {
                h3 {
                    font-weight: 500;
                    line-height: 20px;
                    font-size: 14px;
                    margin-bottom: 5px;
                }

                p {
                    line-height: 20px;
                    font-size: 14px;
                    color: #BCBFC1;

                    &:before,
                    &:after {
                        content: '"';
                    }
                }
            }
        }

        .tns-outer {
            width: 100%;
        }
    }

    @include media-max-width($lg-max) {
        .cases {
            .heading-main {
                padding-left: 40px;
            }
        }
    }

    @include media-max-width($md-max) {
        .cases {
            height: 100%;

            .heading-main {
                margin-bottom: 40px;
            }

            .slider-item {
                flex-direction: column;
                width: 100%;
            }

            .photo-block {
                margin-bottom: 50px;

                .bg-image {
                    width: 100%;
                }

                .video {
                    width: 520px;
                    height: 340px;
                }
            }

            .text-block {
                width: 90%;
                max-width: 100%;
                margin-bottom: 50px;
                padding-right: 30px;
                padding-left: 40px;

                .description {
                    max-height: 150px;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .cases {
            .heading-main {
                padding-left: 10px;
            }

            .photo-block {
                .video {
                    width: 380px;
                    height: 260px;
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .cases {
            padding-top: 0;

            .photo-block {
                .video {
                    width: 320px;
                    height: 260px;
                }
            }
        }
    }

    @include media-max-width($mobile-sm) {
        .cases {
            .text-block {
                max-width: 90%;
                padding-left: 15px;
                padding-right: 15px;
            }

            .photo-block {
                padding-left: 10px;

                .video {
                    width: 100%;
                    height: 220px;
                }
            }
        }
    }
</style>