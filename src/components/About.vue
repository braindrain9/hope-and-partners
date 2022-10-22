<template>
    <div class="section-container">
        <div class="container">
            <div class="about">
                <div class="about-container d-flex align-items-start">
                    <img class="about-img"
                         :src="content.imageUrl"
                         alt="About me image"
                    />
                    <div class="bio-container">
                        <div class="heading-container">
                            <h2 class="heading" v-html="content.title"></h2>
                        </div>
                        <div class="description" v-html="content.description"></div>
                        <div class="bio-link">
                            <span class="divider"></span>
                            <span>{{$t('allAchievements')}}
                                <router-link class="strike"
                                             :to="lang === 'en' ? '/en/bio' : '/bio'"
                                             :title="$t('allAchievements')">
                                    <span>{{$t('here')}}.</span>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container custom-container">
            <Clients/>
        </div>
        <div class="container footer-container">
            <Footer link="services"/>
        </div>
    </div>
</template>

<script>
  import Clients from './Clients';
  import Footer from './Footer';

  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";
  import {i18n} from "../i18n";

  export default {
    name: 'About',

    components: {
      Clients,
      Footer
    },

    data() {
      return {
        content: {},
        lang: i18n.locale
      }
    },

    created() {
      this.getAboutData();
    },

    methods: {
      getAboutData () {
        this.$http.get(`wp/v2/about?lang=${this.lang}`)
          .then(response => {
            this.content = this.transformResponseData(response.data)[0] || {};
          }, error => console.log(error))
          .finally(() => this.getAboutAnimation());
      },
      getAboutAnimation () {
        const controller = new ScrollMagic.Controller(),
              bioInfoAnimation = new TimelineMax()
                .fromTo($('.about img.about-img'), 1, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.2})
                .fromTo($('.about .bio-container'), 1, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, delay: 0});

        new ScrollMagic.Scene({
          triggerElement: ".about-container",
          triggerHook: "onEnter",
          duration: '100%'
        })
          .setTween(bioInfoAnimation)
          .addTo(controller);
      }
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
            width: 60%;

            .heading, .description {
                transition: all 0.5s ease-in-out;
            }
        }

        .bio-link {
            font-weight: 500;
            line-height: 32px;
            font-size: $extra-medium-base-font-size;
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
                width: 25%;
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
            .about-img {
                width: 40%;
            }

            .bio-container {
                margin-left: 0;
                margin-top: 100px;
            }

            .bio-link {
                font-size: $medium-base-font-size;

                .divider {
                    width: 15%;
                }
            }
        }
    }

    @include media-max-width($md-max) {
        .about {
            > div {
                flex-direction: column;
                margin-bottom: 50px;
            }

            .about-img {
                width: 80%;
                max-width: 434px;
                position: static;
                margin-bottom: 20px;
            }

            .bio-container {
                width: 100%;
                margin-left: 0;
                margin-top: -50px;
            }

            .bio-link {
                font-size: 25px;

                .divider {
                    width: 60px;

                    &:before {
                        width: 60px;
                    }
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .about {
            > div {
                margin-bottom: 0;
            }

            .about-img {
                margin: 0 auto 20px auto;
            }

            .bio-container {
                padding-top: 20px;
            }

            .heading {
                margin-bottom: 0;
            }
        }
    }

    @include media-max-width($mobile-sm) {
        .about {
            .bio-link {
                font-size: $base-font-size;

                .divider {
                    display: block;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
