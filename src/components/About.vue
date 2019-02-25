<template>
    <div class="about">
        <div class="about-container d-flex align-items-start">
            <img class="about-img"
                 :src="content.imageUrl"
                 alt="About me image"
            />
            <div class="bio-container">
                <h1 class="heading" v-html="content.title"></h1>
                <p class="description" v-html="content.description"></p>
                <p class="bio-link">
                    <span class="divider"></span>
                    <span>повне біо <router-link class="strike" to="/bio"><span>тут</span></router-link></span>
                </p>
            </div>
        </div>
        <Event/>
    </div>
</template>

<script>
  import Event from './Event';
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'About',

    data() {
      return {
        content: {}
      }
    },

    components: {
      Event
    },

    created() {
      this.$http.get('wp/v2/about').then(response => {
        this.content = this.transformResponseData(response.data)[0] || {};
      }, error => console.log(error));
    },

    mounted() {
      $(document).ready(function () {
        const controller = new ScrollMagic.Controller();

        const bioInfoAnimation = new TimelineMax()
          .fromTo($('.about img.about-img'), 1, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.2})
          .fromTo($('.about .bio-container'), 1, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, delay: 0})
        ;

        const photoAnimation = new TimelineMax()
          .fromTo($('.about .about-image'), 1, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, delay: 0.5});

        const bioInfo = new ScrollMagic.Scene({
          triggerElement: ".about-container",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(bioInfoAnimation)
          .addTo(controller);

        const eventAnimation = new TimelineMax()
          .fromTo($('.about .event'), 1, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, delay: 0.5});

        const event = new ScrollMagic.Scene({
          triggerElement: ".about .event",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(eventAnimation)
          .addTo(controller);
      });
    }
  }
</script>

<style scoped lang="scss">
    .about {
        > div {
            margin-bottom: 100px;
        }

        .about-img {
            width: 50%;
            transition: all .5s ease-in-out;
            position: sticky;
            top: 120px;
        }

        .bio-container {
            margin-left: -110px;
            margin-top: 200px;
            position: relative;

            .heading, .description {
                transition: all 0.5s ease-in-out;
            }
        }

        .bio-link {
            font-weight: 500;
            line-height: 32px;
            font-size: 24px;
            letter-spacing: $base-spacing;
            color: $white;

            a {
                font-weight: bold;
                color: $orange;

                &:hover {
                    text-decoration: none;
                }
            }

            .divider {
                width: 40%;
                margin-right: 10px;
                height: 2px;
                overflow: hidden;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                line-height: 30px;

                &:before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: $white;
                    animation: line-drop-horizontal infinite 2.5s cubic-bezier(0.8, 0, 0.4, 1);
                    animation-fill-mode: forwards;
                    animation-delay: 2s;
                }
            }
        }
    }

    @include media-max-width($lg-max) {
        .about {
            > div {
                margin-bottom: 0;
            }

            .about-img {
                width: 40%;
            }

            .bio-container {
                margin-left: 0;
                margin-top: 100px;
            }

            .bio-link {
                font-size: 20px;
            }
        }
    }

    @include media-max-width($sm-max) {
        .about {
            > div {
                flex-direction: column;
            }

            .about-img {
                width: 80%;
                margin: 0 auto;
                position: static;
            }

            .bio-container {
                margin-left: 0;
                margin-top: -50px;
            }

            .bio-link {
                .divider {
                    width: 60px;

                    &:before {
                        width: 60px;
                    }
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .about {
            .bio-link {
                font-size: 18px;
            }
        }
    }
</style>