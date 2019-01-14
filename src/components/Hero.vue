<template>
    <div class="hero">
        <canvas id="canvas-hero"></canvas>
        <b-container class="hero-section section-container">
            <div class="hero-content d-flex">
                <div>
                    <h1 class="heading heading-main">
                        налагоджуємо <br/>
                        зв<span class="orange-color">’</span>язки з реальністю
                    </h1>
                    <a href="#about" class="grey-color-link">
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
  import {TweenLite, TimelineMax} from 'gsap/TweenMax';
  import ScrollMagic from 'scrollmagic';

  export default {
    name: 'Hero',

    created: function () {
    },

    mounted() {
      // this.animateHero('canvas-hero');
      // bus.$emit('animateHero', '&');
      $(document).ready(function() {
        const outW = $(window).outerWidth();

        // loading animations
        TweenLite.to($('.hero-section'), 1, {opacity: 1.0});
        TweenLite.fromTo($('.hero .heading-main'), 1.5, {opacity: 0, y: 50}, {opacity: 1.0, y: 0, delay: 0.5});
        TweenLite.fromTo($('.hero .hero-content .grey-color-link'), 1.5, {opacity: 0, x: 100}, {
          opacity: 1.0,
          x: 0,
          delay: 2
        });

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