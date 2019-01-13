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
  import {TweenLite} from 'gsap/TweenMax';

  export default {
    name: 'Hero',

    created: function () {
    },

    mounted() {
      // this.animateHero('canvas-hero');
      // bus.$emit('animateHero', '&');
      TweenLite.fromTo($('.hero .heading-main'), 1.5, {opacity: 0, y: 100, delay: 0}, {opacity: 1.0, y: 0, delay: 0.5});
      TweenLite.fromTo($('.hero .hero-content .grey-color-link'), 1.5, {opacity: 0, x: 100}, {
        opacity: 1.0,
        x: 0,
        delay: 2
      });
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