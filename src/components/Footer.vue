<template>
    <div class="footer" :class="{'is-final-mode': isFinalMode}">
        <div v-if="isFinalMode" class="footer-content d-flex">
            <div class="copy" v-html="$store.state.content.footerCredentials"></div>
            <div class="cosmos">
                <span class="space-ship">🚀</span>
                <a class="strike" href="https://cosmos.studio/" target="_blank" rel="noopener">
                    <span>Made in Cosmos Studio</span>
                </a>
            </div>
        </div>
        <div v-else class="footer-content d-flex justify-content-between align-items-end">
            <div>
                <a :data-link="currentLink.path"
                   href="javascript:void(0)"
                   class="menu-link"
                >
                    <span class="divider d-inline-block"></span>
                    <span class="link-text grey-color-link d-inline-block strike">{{$t(currentLink.title)}}</span>
                </a>
            </div>
            <slot name="progress-bar"></slot>
            <div class="d-none d-lg-block mail">
                <a class="grey-color-link strike" :href="'mailto:' + $store.state.content.email">
                    <span v-html="$store.state.content.email"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
  import {i18n} from "../i18n";

  export default {
    name: 'Footer',

    props: ['link', 'isFinalMode'],

    data() {
      return {
        currentLink: undefined,
        currentLang: i18n.locale
      }
    },

    created() {
      // init on load
      this.currentLink = this.footerNavLinks.find(link => link.name === this.link) || this.footerNavLinks[0];
    },

    watch: {
      '$route'() {
        // update on route change
        if (this.$route.name === 'bio') {
          this.currentLink = this.footerNavLinks.find(link => link.name === 'services');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .footer {
        width: 100%;
        margin: 40px 0 60px;
        font-size: $small-font-size;
        position: relative;
        z-index: 10;

        .footer-content {
            height: 50px;
        }

        &.is-final-mode {
            padding-bottom: 40px;

            .footer-content {
                border-top: 1px solid $dark-grey;
                justify-content: space-between;
                align-items: flex-end;
            }
        }

        .menu-link {
            line-height: 20px;
            color: $grey;

            &:hover {
                text-decoration: none;

                .grey-color-link {
                    color: $white;
                    font-weight: bold;
                }
            }

            .divider {
                width: 2px;
                margin-right: 10px;
                margin-bottom: 1px;
                height: 50px;
                display: block;
                overflow: hidden;
                position: relative;

                &:before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 2px;
                    height: 50px;
                    background-color: $white;
                    animation: line-drop infinite 2.5s cubic-bezier(0.8, 0, 0.4, 1);
                    animation-fill-mode: forwards;
                    animation-delay: 2s;
                }
            }

            .link-text {
                max-width: 62px;
            }
        }

        .mail {
            font-size: $tiny-font-size;
        }

        .cosmos {
            a {
                line-height: 36px;
                color: $grey;

                &:hover, &:active {
                    color: $grey;
                    text-decoration: none;
                }
            }

            .space-ship {
                font-size: $extra-medium-base-font-size;
                display: block;
                float: left;
                width: 35px;
                animation: .2s ease infinite RocketShuffle;
            }
        }
    }

    @include media-max-width($md-max) {
        .footer {
            font-size: 30px;

            &.is-final-mode {
                .footer-content {
                    border: none;
                    height: 100%;
                    flex-direction: column-reverse;
                    justify-content: center;
                    align-items: center;

                    > div {
                        padding-top: 10px;

                        &.copy {
                            font-size: 25px;
                        }
                    }
                }
            }

            .menu-link {
                display: flex;
                align-items: center;

                .link-text {
                    max-width: 100%;
                }

                .divider {
                    height: 2px;
                    width: 60px;
                    border-radius: 0;

                    &:before {
                        width: 60px;
                        height: 2px;
                        background-color: $white;
                        animation-name: line-drop-horizontal;
                    }
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .footer {
            font-size: 20px;

            &.is-final-mode {
                .footer-content {
                    > div {
                        &.copy {
                            font-size: 12px;
                        }
                    }
                }
            }

            .cosmos {
                font-size: 14px;
            }
        }
    }
</style>
