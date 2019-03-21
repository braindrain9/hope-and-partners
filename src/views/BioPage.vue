<template>
    <div class="bio">
        <div class="container">
            <div class="row">
                <div class="heading-block col-sm-12 offset-sm-0 col-md-7 offset-md-5">
                    <a :href="lang === 'en' ? '/en#about' : '/#about'" class="bio-link horizontal-grey-link">
                        <span></span>
                        <span class="d-inline-block strike"><span>{{$t('back')}}</span></span>
                    </a>
                    <h1 class="heading heading-main"v-html="$t('myCompleteBio')"></h1>
                    <div class="tiny-font-size white-color">{{$t('updatedAt')}} {{updated}}</div>
                </div>
            </div>
        </div>
        <div class="bio-info">
            <div class="container">
                <div class="row">
                    <div class="photo-block col-md-5 col-sm-12 d-none d-md-block">
                        <img class="photo"
                             v-lazy="photo"
                             v-for="(photo, i) in photos"
                             alt="bio image"
                             :key="i"/>
                    </div>
                    <div class="description-block col-md-7 col-sm-12">
                        <div class="description description-dark" v-for="bio in biography" :key="bio.id">
                            <img class="photo d-md-none"
                                 v-if="bio.imageUrl"
                                 v-lazy="bio.imageUrl"
                                 alt="bio image"/>
                            <h2 v-if="bio.title">{{bio.title}}</h2>
                            <div class="paragraph" v-if="bio.content" v-html="bio.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Event/>

        <div class="container footer-container">
            <Footer link="partners"/>
        </div>
    </div>
</template>

<script>
  import Event from '../components/Event';
  import Footer from '../components/Footer';

  import ScrollMagic from 'scrollmagic';
  import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
  import {TimelineMax, TweenLite} from "gsap/TweenMax";
  import {i18n} from "../i18n";

  export default {
    name: 'BioPage',

    components: {
      Event,
      Footer
    },

    data() {
      return {
        biography: [],
        photos: [],
        updated: '',
        lang: i18n.locale
      }
    },

    created() {
      this.getBioData();
    },

    methods: {
      getBioData() {
        this.$http.get(`wp/v2/bio?lang=${this.lang}`)
          .then(response => {
            this.biography = this.transformResponseData(response.data);
            this.photos = this.biography.map(bio => bio.imageUrl).filter(image => image);
            this.updated = this.formatDate(this.findLatestDate(response.data));
          }, error => console.log(error))
          .finally(() => {
            this.addBioAnimation();
          });
      },
      findLatestDate (dates) {
        if (dates.length === 0) return null;

        let latestDate = dates[0].modified;

        dates.forEach((date) => {
          if (date.modified > latestDate){
            latestDate = date.modified;
          }
        });

        return latestDate;
      },
      formatDate(date) {
        if (date) {
          let formattedDate = new Date(date);

          formattedDate = formattedDate.toLocaleDateString(undefined, {day:'2-digit'})
            + '.' + formattedDate.toLocaleDateString(undefined, {month:'2-digit'})
            + '.' + formattedDate.toLocaleDateString(undefined, {year:'numeric'});

          return formattedDate;
        }
      },
      addBioAnimation() {
        TweenLite.to($('.bio'), 1, {opacity: 1});
        TweenLite.fromTo($('.bio .bio-info'), 1, {y: 100}, {y: 0});
        TweenLite.fromTo($('.bio .heading-block'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});
        TweenLite.fromTo($('.bio .heading-main'), 1, {x: 50, opacity: 0}, {x: 0, opacity: 1});

        const controller = new ScrollMagic.Controller();

        // photo animation
        $.each($('.bio .photo-block > .photo'), (index, elem) => {
          const photoAnimation = new TimelineMax()
            .fromTo(elem, 1, {y: 20, opacity: index ? 0.5 : 1}, {y: 0, opacity: 1});

          new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: "onEnter",
            duration: "100%"
          })
            .setTween(photoAnimation)
            .addTo(controller);
        });

        // description animation
        $.each($('.bio .row .description-block .description .paragraph'), (index, elem) => {
          const descriptionAnimation = new TimelineMax()
            .fromTo(elem, 1, {y: 50, opacity: 0.5}, {y: 0, opacity: 1});

          new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: "onEnter",
            duration: "100%"
          })
            .setTween(descriptionAnimation)
            .addTo(controller);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    .bio {
        padding-top: 220px;
        opacity: 0;

        a:not(.horizontal-grey-link):hover {
            color: $orange;
            text-decoration: underline;
        }

        .heading-block {
            padding-bottom: 100px;

            .bio-link {
                font-size: $extra-medium-base-font-size;
            }

            .heading-main {
                margin-bottom: 20px;
            }
        }

        .bio-info {
            background: $white;
            padding-bottom: 40px;

            .photo-block {
                display: inline-block;
                margin-top: -275px;
            }

            .photo {
                height: 650px;
                margin-bottom: 40px;
                width: 100%;
                object-fit: cover;
                object-position: center;
            }

            .description-block {
                margin-top: 50px;

                .description {
                    max-width: 600px;

                    div {
                        font-weight: 500;
                        line-height: 27px;
                        font-size: $medium-base-font-size;
                        margin-bottom: 60px;
                    }

                    h2 {
                        font-weight: bold;
                        font-size: $extra-medium-base-font-size;
                        margin-bottom: 15px;
                    }

                    p {
                        margin-bottom: 28px;
                    }

                    a:hover {
                        color: $orange;
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    @include media-max-width($lg-max) {
        .bio {
            .bio-info {
                .photo {
                    height: 550px;
                }

                .description-block {
                    .description {
                        h2 {
                            font-size: $medium-base-font-size;
                        }
                        div {
                            font-size: $small-base-font-size;
                            margin-bottom: 40px;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width($md-max) {
        .bio {
            .heading-block {
                .bio-link {
                    font-size: $base-font-size;
                }
            }

            .bio-info {
                .photo-block {
                    margin-top: -235px;
                }

                .photo {
                    height: 380px;
                }

                .description-block {
                    .description {
                        div {
                            font-size: $small-font-size;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width($sm-max) {
        .bio {
            padding-top: 120px;

            .footer-container {
                padding-bottom: 30px;
            }

            .heading-block {
                .bio-link {
                    font-size: $small-base-font-size;
                }
            }

            .bio-info {
                .photo-block {
                    margin-top: -75px;
                    display: block;
                }

                .photo {
                    height: 600px;
                    max-width: 100%;
                    margin: 0 auto 20px;
                    opacity: 1 !important;
                }

                .description-block {
                    margin-top: -80px;

                    .description {
                        h2 {
                            font-size: $medium-base-font-size;
                        }
                        div {
                            font-size: $small-font-size;
                        }
                    }
                }
            }
        }
    }

    @include media-max-width('450px') {
        .bio {
            .bio-info {
                .photo {
                    height: 500px;
                }
            }
        }
    }

    @include media-max-width($mobile-xs) {
        .bio {
            .bio-info {
                .photo {
                    height: 400px;
                }
            }
        }
    }
</style>