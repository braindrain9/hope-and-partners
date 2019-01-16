<template>
    <div>
        <canvas id="canvas-contacts"></canvas>
        <b-container class="section-container">
            <div class="contacts d-flex">
                <div class="mail-block">
                    <h1>напишіть нам листа</h1>
                    <div class="mail-text">
                        <div class="mail">
                            <a href="mailto:hello@hopeandpartners.com">hello@hopeandpartners.com</a>
                            <span class="arrow-svg" v-html="arrowSvg"></span>
                        </div>
                        <div class="horizontal-line d-none d-md-block">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer is-final-mode="true"/>
        </b-container>
    </div>
</template>

<script>
  import arrowSvg from '../assets/img/arrow.svg';
  import Footer from './Footer';
  import ScrollMagic from 'scrollmagic';
  import bus from '../bus';

  export default {
    name: 'Contacts',

    data() {
      return {
        arrowSvg
      }
    },

    mounted() {
      const self = this;

      $(document).ready(function() {
        self.animateContacts('canvas-contacts');
        bus.$emit('animateContacts', '&');

        triggerMailAnimation();

        function triggerMailAnimation() {
          const controller = new ScrollMagic.Controller();
          // hide footer
          const hideFooterScene = new ScrollMagic.Scene({
            triggerElement: "#contacts",
            triggerHook: 0.2,
            duration: '80%'
          })
              .setClassToggle('#contacts .mail-block', 'animation')
              .addTo(controller);

          const animation = new ScrollMagic.Scene({
            triggerElement: "#canvas-contacts",
            triggerHook: "onEnter",
            duration: '100%',
          })
            .on('start', function () {
              bus.$emit('animateContacts', '&');
            })
            .addTo(controller);
        }
      })
    },

    components: {
      Footer
    }
  }
</script>

<style scoped lang="scss">
    .contacts {
        height: $home-block-height;
        justify-content: flex-end;
        align-items: center;

        .mail-block {
            h1 {
                font-size: 24px;
                font-weight: bold;
                color: $white;
            }

            .mail-text:hover, &.animation {
                .horizontal-line > div {
                    left: 80%;
                }

                a {
                    color: $orange;
                }
            }

            .mail {
                font-size: 46px;
                font-weight: bold;
                color: $orange;
                margin-bottom: 20px;
            }

            .horizontal-line {
                border-bottom: 2px solid $dark-grey;
                position: relative;

                > div {
                    position: absolute;
                    width: 20%;
                    height: 2px;
                    background: $orange;
                    left: 0;
                    transition: all 1s ease;
                }
            }
        }
    }

    @include media-max-width($lg-max) {
        .contacts {
            .mail-block {
                h1 {
                    font-size: 20px;
                }
                .mail {
                    font-size: 32px;
                }
            }
        }
    }

    @include media-max-width($md-max) {
        .contacts {
            .mail-block {
                h1 {
                    font-size: 16px;
                }
                .mail {
                    font-size: 28px;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .contacts {
            justify-content: center;
            align-items: flex-end;
            text-align: center;

            .mail-block {
                height: 30%;

                h1 {
                    font-size: 20px;
                    margin-bottom: 20px;
                }

                .mail {
                    font-size: 20px;
                }

                .arrow-svg {
                    display: none;
                }
            }
        }
    }
</style>