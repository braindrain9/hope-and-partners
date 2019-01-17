<template>
    <div class="hero">
        <canvas id="canvas-hero"></canvas>
        <b-container class="hero-section section-container">
            <div class="hero-content d-flex">
                <div>
                    <h1 class="heading heading-main">
                        <span>налагоджуємо</span><br/>
                        <span>зв<span class="orange-color">’</span>язки</span>
                        <span>з реальністю</span>
                    </h1>
                    <a v-on:click="goToAbout()" class="scrolled grey-color-link">
                        <span class="horizontal-divider"></span>
                        детальніше
                    </a>
                </div>
            </div>
            <Footer class="d-none d-md-block" link="about"/>
        </b-container>
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

        if (outW > 576) {
          // self.animateHero('canvas-hero');
          // bus.$emit('animateHero', '&');
        }

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

            a {
                display: block;
            }

            .grey-color-link:hover {
                color: white;
            }

            .horizontal-divider {
                position: relative;
                width: 30px;
                height: 2px;
                background-color: $orange;
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
                margin-left: 15px;

                &:before {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    height: 2px;
                    width: 8px;
                    background: $orange;
                    left: -15px;
                }
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