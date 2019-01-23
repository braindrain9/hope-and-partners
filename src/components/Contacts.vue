<template>
    <div>
        <canvas id="canvas-contacts"></canvas>
        <div class="section-container">
            <b-container>
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
            </b-container>
            <b-container class="footer-container">
                <Footer is-final-mode="true"/>
            </b-container>
        </div>
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
        const outW = $(window).outerWidth();

        if (outW > 576) {
          // self.animateContacts('canvas-contacts');
          // bus.$emit('animateContacts', '@');
        }

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
    .section-container {
        padding-top: 100px;
    }

    #canvas-contacts {
        height: 100%;
    }

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

            .mail-text:hover {
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
                background: $dark-grey;
                height: 2px;
                width: 100%;
                position: relative;
                overflow: hidden;
                display: block;

                > div {
                    position: absolute;
                    width: 20%;
                    height: 2px;
                    background: $orange;
                    animation: line-horizontal infinite 6s cubic-bezier(0.8, 0, 0.4, 1);
                    animation-fill-mode: forwards;
                    animation-delay: 2s;
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
        .section-container {
            padding-top: 0;
        }


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