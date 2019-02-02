<template>
    <div class="hero">
        <canvas id="canvas-hero"></canvas>
        <div class="hero-section section-container">
            <div class="container">
                <div class="hero-content d-flex">
                    <div>
                        <h1 class="heading heading-main">
                            <span>налагоджуємо</span><br/>
                            <span>зв<span class="orange-color">’</span>язки</span>
                            <span>з реальністю</span>
                        </h1>
                        <div class="details-link">
                            <a v-on:click="goToAbout()" class="scrolled grey-color-link">
                                <span class="horizontal-divider"></span>
                                <span class="link">детальніше</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container footer-container">
                <Footer class="d-none d-md-block" link="about"/>
            </div>
        </div>
    </div>
</template>

<script>
  import Footer from './Footer';
  import {TimelineMax} from 'gsap/TweenMax';
  import ScrollMagic from 'scrollmagic';
  import bus from '../bus';

  export default {
    name: 'Hero',

    methods: {
      goToAbout: function () {
        $('html, body').css({"scroll-behavior": "smooth"});

        const target = $('#about');

        // $(document).scrollTop(target.offset().top);

        // setTimeout(function () {
        // $('html, body').animate({
        //   scrollTop: target.offset().top
        // }, 0);
        setTimeout(function () {
          // DsBody.animate({
          //   scrollTop: target.offset().top
          // }, 0);
          $(document).scrollTop(target.offset().top);
          $('html, body').css({"scroll-behavior": "auto"});
        }, 100);
      }
    },

    mounted() {
      const self = this;

      $(document).ready(function () {
        const outW = $(window).outerWidth();

        self.getHeroAnimation();

        hideFooterOnLeave();

        // hide footer
        function hideFooterOnLeave() {
          const controller = new ScrollMagic.Controller();

          const hideFooterAnimation = new TimelineMax()
            .fromTo($('.hero footer'), 1, {autoAlpha: 1}, {autoAlpha: 0, delay: 0.2})
          ;
          const hideFooterScene = new ScrollMagic.Scene({
            triggerElement: ".hero",
            triggerHook: "onLeave",
            duration: '80%'
          })
            .setTween(hideFooterAnimation)
            .addTo(controller);
        }
      })


    },

    destroyed() {
      this.removeEventListeners()
    },

    components: {
      Footer
    }
  }
</script>

<style scoped lang="scss">
    .hero-section {
        opacity: 0;

        .hero-content {
            height: $home-block-height;
            align-items: center;
            justify-content: flex-end;

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
                color: white;
            }
        }
    }

    @include media-max-width($sm-max) {
        .hero-section {
            .hero-content {
                height: calc(100vh - 200px);
                align-items: flex-end;
                justify-content: left;
            }
        }
    }

    @include media-max-width($mobile-xs) {
        .hero-section {
            .hero-content {
                height: calc(100vh - 150px);
            }
        }
    }
</style>