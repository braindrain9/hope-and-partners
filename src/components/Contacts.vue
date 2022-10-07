<template>
    <div>
        <canvas id="canvas-contacts"></canvas>
        <div class="section-container">
            <div class="container">
                <div class="contacts d-flex">
                    <div class="mail-block">
                        <h2>{{$t('contactUs')}}</h2>
                        <div class="mail-text">
                            <div class="mail">
                                <a class="strike" :href="'mailto:' + $store.state.content.email">
                                    <span v-html="$store.state.content.email"></span>
                                </a>
                                <span class="d-none d-lg-inline-block" v-html="arrowSvg"></span>
                            </div>
                            <div class="horizontal-line d-none d-lg-block">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container footer-container">
                <Footer is-final-mode="true"/>
            </div>
        </div>
    </div>
</template>

<script>
  import Footer from './Footer';

  import arrowSvg from '../assets/img/arrow.svg';
  import ScrollMagic from 'scrollmagic';

  export default {
    name: 'Contacts',

    components: {
      Footer
    },

    data() {
      return {
        arrowSvg
      }
    },

    methods: {
      addMailAnimation() {
        const controller = new ScrollMagic.Controller();

        // arrow animation
        new ScrollMagic.Scene({
          triggerElement: "#contacts",
          triggerHook: 0.2,
          duration: '80%'
        })
          .setClassToggle('#contacts .mail-block', 'animation')
          .addTo(controller);
      }
    },

    mounted() {
      this.getContactsAnimation();
      this.addMailAnimation();
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
            h2 {
                font-size: $extra-medium-base-font-size;
                font-weight: bold;
                color: $white;
            }

            .strike {
                span {
                    &:before, &:after {
                        height: 6px;
                    }
                }
            }

            a:hover {
                text-decoration: none;
            }

            .mail {
                font-size: $main-header-font-size;
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
                h2 {
                    font-size: $medium-base-font-size;
                }
                .mail {
                    font-size: $secondary-header-font-size;
                }
            }
        }
    }

    @include media-max-width($md-max) {
        .section-container {
            padding-top: 0;
        }

        .contacts {
            justify-content: center;
            align-items: flex-end;
            text-align: center;

            .mail-block {
                height: 30%;

                h2, .mail {
                    font-size: 40px;
                }

                .arrow-svg {
                    display: none;
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .contacts {
            .mail-block {
                h2 {
                    font-size: $medium-base-font-size;
                    margin-bottom: 20px;
                }

                .mail {
                    font-size: $medium-base-font-size;
                }
            }
        }
    }
</style>
