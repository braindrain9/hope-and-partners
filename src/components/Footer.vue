<template>
    <footer :class="{'is-final-mode': isFinalMode}">
        <div v-if="isFinalMode" class="footer-content d-flex">
            <div class="copy">&copy; дві тисячі дев'ятнадцятий. hope & partners</div>
            <div class="cosmos">
                <span class="space-ship animated pulse infinite delay-2s">🚀</span>
                <a class="grey-color-link" href="https://cosmos.studio/" target="_blank">Made in Cosmos Studio</a>
            </div>
        </div>
        <div v-else class="footer-content d-flex justify-content-between align-items-end">
            <div>
                <a v-on:click="goToSection(currentLink.path)" class="menu-link">
                    <span class="divider d-inline-block"></span>
                    <span class="link-text grey-color-link d-inline-block">{{currentLink.title}}</span>
                </a>
            </div>
            <slot name="progress-bar"></slot>
            <div class="d-none d-sm-block mail">
                <a class="grey-color-link" href="mailto:hello@hopeandpartners.com">hello@hopeandpartners.com</a>
            </div>
        </div>
    </footer>
</template>

<script>
  export default {
    name: 'Footer',

    props: ['link', 'isFinalMode'],

    data() {
      return {
        currentLink: undefined
      }
    },

    created() {
      // init on load
      this.currentLink = _.find(this.footerNavLinks, {name: this.link}) || this.footerNavLinks[0];
    },

    watch: {
      '$route'() {
        // update on route change
        if (this.$route.name === 'bio') {
          this.currentLink = _.find(this.footerNavLinks, {name: 'services'});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    footer {
        width: 100%;
        margin: 40px 0 60px;
        font-size: 14px;
        position: relative;
        z-index: 10;

        .footer-content {
            height: 50px;
        }

        &.is-final-mode {
            margin-bottom: 0;

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

                .divider {
                    height: 40px;
                }
            }

            .divider {
                height: 20px;
                width: 4px;
                background: $white;
                margin-right: 10px;
                margin-bottom: 1px;
                transition: all 1s ease-out;
            }

            .link-text {
                max-width: 60px;
            }
        }

        .mail {
            font-size: 12px;
        }

        .cosmos {
            a {
                line-height: 36px;
            }

            .space-ship {
                font-size: 24px;
                display: block;
                float: left;
                width: 35px;
            }
        }
    }

    @include media-max-width($sm-max) {
        footer {
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
                            font-size: 12px;
                        }
                    }
                }
            }

            .menu-link {
                display: flex;
                align-items: center;

                &:hover {
                    .divider {
                        height: 2px;
                        width: 40px;
                    }
                }

                .link-text {
                    max-width: 100%;
                }

                .divider {
                    height: 2px;
                    width: 30px;
                }
            }
        }
    }
</style>
