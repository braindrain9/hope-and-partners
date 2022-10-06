<template>
    <div class="event">
        <div class="event-container">
            <div class="description" v-for="(event, i) in events" :key="i">
                <div class="category-title" v-if="event.type">{{event.type}}</div>
                <div class="text light-grey-color" v-if="event.title">{{event.title}}</div>
                <div class="text" v-html="event.description"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import {i18n} from "../i18n";
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'Event',

    data() {
      return {
        events: [],
        lang: i18n.locale
      }
    },

    created: function () {
      this.getEvents();
    },

    methods: {
      getEvents() {
        this.$http.get(`wp/v2/events?lang=${this.lang}&per_page=100`).then(response => {
          this.events = this.transformResponseData(response.data);
          this.getEventAnimation();
        }, error => console.log(error));
      },
      getEventAnimation() {
        const controller = new ScrollMagic.Controller(),
              eventAnimation = new TimelineMax()
                .fromTo($('.event'), 1, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, delay: 0.1});

        new ScrollMagic.Scene({
          triggerElement: ".event",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(eventAnimation)
          .addTo(controller);
      }
    }
  }
</script>

<style scoped lang="scss">
    .event {
        padding: 140px 0 40px;
        margin: 0 auto;

        .event-container {
            margin: 0 auto;
            max-width: 900px;
        }

        .description {
            margin-bottom: 50px;

            .category-title {
                font-weight: 500;
                line-height: 21px;
                letter-spacing: $base-spacing;
                font-size: $small-font-size;
                color: $white;
            }

            .text {
                font-weight: 500;
                font-size: $extra-medium-font-size;
            }
        }
    }

    @include media-max-width($lg-max) {
        .event {
            .event-container {
                max-width: 700px;
            }

            .description {
                .text {
                    font-size: $extra-medium-base-font-size;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .bio {
            .event {
                .event-container {
                    max-width: 500px;
                }
            }
        }

        .event {
            padding: 60px 0 20px;

            .description {
                .category-title {
                    font-size: $tiny-font-size;
                }
                .text {
                    font-size: $base-font-size;
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .bio {
            .event {
                padding: 30px 0 0px;

                .event-container {
                    max-width: 100%;
                    padding: 0 15px;
                }
            }
        }

        .event {
            padding: 30px 0 0px;

            .description {
                .category-title {
                    font-size: $extra-tiny-font-size;
                }
                .text {
                    font-size: $small-base-font-size;
                }
            }
        }
    }
</style>
