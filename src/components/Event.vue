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
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'Event',

    data() {
      return {
        events: []
      }
    },

    created: function () {
      this.$http.get('wp/v2/events').then(response => {
          this.events = this.transformResponseData(response.data);
        }, error => console.log(error))
        .finally(() => {
          const controller = new ScrollMagic.Controller();

          const wipeAnimation2 = new TimelineMax()
            .fromTo($('.event .description'), 1, {y: 50, opacity: 0}, {y: 0, opacity: 1, delay: 0.5});

          const scene2 = new ScrollMagic.Scene({
            triggerElement: ".event",
            triggerHook: "onEnter",
            duration: "80%"
          })
            .setTween(wipeAnimation2)
            .addTo(controller);
        })
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
                font-size: 32px;
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
                    font-size: 24px;
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
                    font-size: 12px;
                }
                .text {
                    font-size: 18px;
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
                    font-size: 10px;
                }
                .text {
                    font-size: 16px;
                }
            }
        }
    }
</style>