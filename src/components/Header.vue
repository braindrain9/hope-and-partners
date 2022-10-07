<template>
    <header id="header">
        <div class="container" id="mainMenu">
            <b-navbar toggleable="lg" type="dark">
                <button id="openMenu" v-on:click="showMenu()" class="scrolled">
                    <span>{{$t('menu')}}</span>
                </button>

                <b-collapse is-nav id="nav_collapse" class="justify-content-between">
                    <b-navbar-nav id="menu">
                        <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
                            <a :data-link="link.path"
                               :key="link.id"
                               class="nav-link strike"
                               href="javascript:void(0)"
                            >
                                <span>{{$t(link.title)}}</span>
                            </a>
                        </li>
                    </b-navbar-nav>
                </b-collapse>

                <div class="language-chooser">
                    <span v-for="lang in languages"
                          :key="lang.key"
                          v-on:click="changeLang(lang.key)"
                          :class="{'active': lang.key === currentLang}"
                    >{{lang.title}}</span>
                </div>

                <b-navbar-brand :href="currentLang === 'en' ? '/en' : '/'" right aria-label="Hope & Partners Logo">
                    <div class="d-none d-lg-block" v-html="logo"></div>
                    <div class="d-block d-lg-none" v-html="logoMobile"></div>
                </b-navbar-brand>
            </b-navbar>
        </div>
        <div id="mobileMenu">
            <div class="container">
                <b-navbar variant="faded" type="light">
                    <button id="fadeClose" class="horizontal-grey-link" v-on:click="hideMenu()">
                        {{$t('close')}}<span></span>
                    </button>

                    <b-navbar-brand :href="currentLang === 'en' ? '/en' : '/'" right aria-label="Hope & Partners Logo">
                        <div v-html="logoMobile"></div>
                    </b-navbar-brand>
                </b-navbar>
                <div class="wrapper">
                    <b-nav id="mobile-menu-items" vertical>
                        <li class="nav-item" v-for="(link, index) in navLinks">
                            <a :data-link="link.path"
                               :key="link.id"
                               class="nav-link"
                               :class="{active: index === 0}"
                               v-on:click="hideMenu()"
                               href="javascript:void(0)"
                            >{{$t(link.title)}}</a>
                        </li>
                    </b-nav>
                    <div class="mail-box">
                        <p class="mail" v-html="$store.state.content.email"></p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
  import logo from '../assets/img/logo.svg';
  import logoMobile from '../assets/img/logo-mobile.svg';
  import {TweenMax, TimelineMax, TweenLite} from 'gsap/TweenMax';
  import {i18n} from "../i18n";

  export default {
    name: 'Header',

    data() {
      return {
        currentLang: i18n.locale,
        logo,
        logoMobile,
        languages: [
          {
            key: 'en',
            title: 'eng'
          }, {
            key: 'uk',
            title: 'укр'
          }]
      }
    },

    methods: {
      changeLang(lang) {
        if (i18n.locale !== lang) {
          if (lang === 'en') {
            location.href = (`/en${this.$route.name === 'bio' ? '/bio' : ''}`);
          } else {
            location.href = (`/${this.$route.name === 'bioEng' ? 'bio' : ''}`);
          }
        }
      },
      showMenu() {
        const mobileMenu = document.getElementById("mobileMenu"),
              items = $(".wrapper li"),
              mail = $(".mail-box");

          new TimelineMax()
            .fromTo(mobileMenu, 0.6, {
              x: -1000
            },
            {
              opacity: 1,
              display: 'block',
              width: '100vw',
              height: '100vh',
              x: 0,
              y: 0,
              left: 0,
              top: 0,
              autoRound: false,
              ease: Sine.easeOut
            })
            .staggerFrom(items, 1, {
              autoAlpha: 0,
              y: -15
            }, 0.01)
            .staggerFrom(mail, 0.75, {
              autoAlpha: 0,
              y: 15
            });

        $('#header').css({"position": "fixed"});
      },
      hideMenu() {
        const mobileMenu = document.getElementById("mobileMenu");

        TweenMax.to(mobileMenu, .25, {
          opacity: 0,
          x: 0,
          y: '-100vh',
          display: 'none',
          ease: Sine.easeOut
        });

        $('#header').css({"position": "absolute"});
      }
    },

    mounted() {
      // load animations
      TweenLite.fromTo($('#menu .nav-item'), 1.5, {opacity: 0, y: -20}, {opacity: 1, y: 0, delay: 1.5});
      TweenLite.fromTo($('.language-chooser span'), 1.5, {opacity: 0}, {opacity: 1, delay: 2});
      TweenLite.fromTo($('a.navbar-brand'), 1.5, {opacity: 0, scale: 1.1}, {opacity: 1, delay: 2, scale: 1});
    }
  }
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        padding: 40px 0 20px;
        z-index: 100;
        transform: translate3d(0, 0, 0);
        transition: all .5s ease-in-out;
        position: absolute;
        top: 0;

        .navbar {
            padding: 0;

            .navbar-brand {
                margin-right: 0;
            }

            .nav-item {
                transition: color .5s ease-out;

                &:not(:first-child) {
                    margin: 0 15px;
                }

                &:first-child {
                    .nav-link {
                        padding-left: 0;
                    }
                }

                .nav-link {
                    color: $grey;
                    letter-spacing: $base-spacing;

                    &:hover {
                        color: $white;
                        cursor: pointer;
                    }

                }
            }

            .language-chooser {
                margin-right: 30px;
                margin-bottom: 2px; // compensate border-bottom height

                span {
                    color: $grey;
                    border-bottom: 2px solid transparent;
                    padding-bottom: 5px;
                    margin: 0 10px;
                    display: inline-block;
                    cursor: none !important;

                    &:hover {
                        text-decoration: none;
                        color: $white;
                    }

                    &.active {
                        border-bottom-color: $orange;
                        color: $white;
                    }
                }
            }
        }

        button {
            border: none;
            background: none;
            font-weight: normal;

            &:focus {
                outline: none;
            }
        }
    }

    #openMenu {
        color: $white;
        font-size: $small-base-font-size;
        border-radius: 0;
        padding: 10px 20px 20px 0;

        > span {
            border-bottom: 1px solid $white;
            padding-bottom: 7px;
        }
    }

    #mobileMenu {
        background: $base-black;
        color: $grey;
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        padding-top: 20px;

        .horizontal-grey-link > span {
            line-height: 12px;
        }
    }

    #fadeClose {
        font-size: $small-base-font-size;
        color: $white;
        padding-top: 10px;

        > span {
            display: block;
            margin-right: 0;

            &:before {
                background: $white;
                height: 1px;
            }
        }
    }

    .wrapper {
        color: $grey;
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .nav {
            padding: 50px 0;
        }

        .nav-item {
            margin-bottom: 10px;

            .nav-link {
                color: $white;
                font-weight: bold;
                font-size: $secondary-header-font-size;

                &.active {
                    color: $orange;
                }
            }
        }
    }

    .mail-box {
        position: absolute;
        bottom: 5%;

        p {
            font-size: $medium-base-font-size;
            text-decoration: underline;
        }
    }

    @include media-min-width($md) {
        #openMenu {
            display: none;
        }
    }

    @include media-max-width($md-max) {
        #openMenu {
            font-size: 30px;
        }

        .language-chooser {
            font-size: 30px;
        }
    }

    @include media-max-width($sm-max) {
        #openMenu, .language-chooser {
            font-size: 16px;
        }
    }

    @include media-max-width($xs-max) {
        header {
            padding-top: 20px;

            .navbar {
                flex-wrap: nowrap;

                .language-chooser {
                    margin-right: 0;
                }
            }
        }
    }
</style>
