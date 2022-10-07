<template>
    <div class="hero">
        <canvas id="canvas-hero"></canvas>
        <div class="hero-section section-container">
            <div class="container">
                <div class="hero-content d-flex">
                    <div>
                        <h1 class="heading heading-main" v-html="$store.state.content.heroHeading"></h1>
                        <div class="details-link">
                            <a v-on:click="goToAbout()" class="scrolled grey-color-link">
                                <span class="horizontal-divider"></span>
                                <span class="link">{{$t('detailed')}}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container footer-container">
                <Footer class="d-none d-lg-block" link="about"/>
            </div>
        </div>
    </div>
</template>

<script>
  import Footer from './Footer';

  import {TimelineMax} from 'gsap/TweenMax';
  import ScrollMagic from 'scrollmagic';

  export default {
    name: 'Hero',

    components: {
      Footer
    },

    methods: {
      goToAbout() {
        $('html, body').css({"scroll-behavior": "smooth"});

        setTimeout(function () {
          $(document).scrollTop($('#about').offset().top);
          $('html, body').css({"scroll-behavior": "auto"});
        }, 100);
      },
      hideFooterOnLeave() {
        const controller = new ScrollMagic.Controller(),
              hideFooterAnimation = new TimelineMax()
                .fromTo($('.hero .footer'), 1, {autoAlpha: 1}, {autoAlpha: 0, delay: 0.2});

        new ScrollMagic.Scene({
            triggerElement: ".hero",
            triggerHook: "onLeave",
            duration: '80%'
        })
          .setTween(hideFooterAnimation)
          .addTo(controller);
      }
    },

    mounted() {
      this.getHeroAnimation();
      this.hideFooterOnLeave();
    }
  }
</script>

<style scoped lang="scss">
    .hero {
        padding-top: 100px; // compensate header
    }

    .hero-section {
        opacity: 0;

        .hero-content {
            height: $home-block-height;
            align-items: center;
            justify-content: flex-end;

            >  div {
                max-width: 580px;
            }

            .details-link {
                .link {
                    margin-left: 60px;
                }

                .horizontal-divider {
                    position: absolute;
                    top: 10px;
                    width: 30px;
                    height: 2px;
                    background-color: $orange;
                    display: inline-block;
                    margin-right: 10px;
                    margin-left: 15px;
                    transition: width 1s cubic-bezier(0.8, 0, 0.4, 1), color .5s ease-in-out;

                    &:before {
                        content: '';
                        position: absolute;
                        display: inline-block;
                        height: 2px;
                        width: 8px;
                        background: $orange;
                        left: -15px;
                        transition: width .2s cubic-bezier(0.8, 0, 0.4, 1), color .5s ease-in-out;
                    }
                }

                &:hover {
                    .horizontal-divider {
                        background-color: $white;
                        width: 155px;

                        &:before {
                            width: 15px;
                            background: $white;
                        }
                    }
                }
            }

            .grey-color-link:hover {
                color: $white;
            }
        }
    }

    @include media-max-width($md-max) {
        .hero {
            padding-top: 0;
            padding-bottom: 150px;

            .details-link {
                font-size: 30px;
                line-height: 18px;
            }

            .heading-main {
                font-size: $main-header-font-size-large;
                line-height: 70px;
            }
        }

        .hero-section {
            .hero-content {
                height: calc(100vh - 130px);
                align-items: flex-end;
                justify-content: left;

                > div {
                    max-width: 420px;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .hero-section {
            .hero-content {
                height: calc(100vh - 150px);
            }

            .heading {
                font-size: $medium-font-size;
                line-height: 42px;

                &-main {
                    font-size: $secondary-header-font-size;
                }
            }

            .details-link {
                font-size: 18px;
            }
        }
    }

    @include media-max-width($mobile-xs) {
        .hero-section {
            .hero-content {
                height: calc(100vh - 150px);

                > div {
                    max-width: 100%;
                }
            }
        }
    }
</style>
