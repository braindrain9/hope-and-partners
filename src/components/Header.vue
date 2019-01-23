<template>
    <header id="header">
        <b-container id="mainMenu">
            <b-navbar toggleable="md" type="dark">
                <b-nav-toggle id="openMenu" target="">Меню</b-nav-toggle>

                <b-collapse is-nav id="nav_collapse" class="justify-content-between">
                    <b-navbar-nav id="menu">
                        <li
                                class="nav-item"
                                v-for="(link, index) in filteredNavLinks"
                        >
                            <a :href="link.path" :key="link.id" class="nav-link strike">
                                <span>{{link.title}}</span>
                            </a>
                        </li>
                    </b-navbar-nav>

                    <div class="language-chooser">
                        <span class="active">укр</span>
                        <span>eng</span>
                    </div>
                </b-collapse>

                <b-navbar-brand href="/" right>
                    <div class="d-none d-md-block" v-html="logo"></div>
                    <div class="d-block d-md-none" v-html="logoMobile"></div>
                </b-navbar-brand>
            </b-navbar>
        </b-container>
        <div id="mobileMenu">
            <b-container>
                <b-navbar variant="faded" type="light">
                    <button id="fadeClose" class="horizontal-grey-link"><span></span>закрити</button>

                    <b-navbar-brand href="/" right>
                        <div v-html="logoDarkMobile"></div>
                    </b-navbar-brand>
                </b-navbar>
                <div class="wrapper">
                    <b-nav id="mobile-menu-items" vertical>
                        <li
                                class="nav-item"
                                v-for="(link, index) in navLinks"
                        >
                            <a :href="link.path"
                               :key="link.id"
                               class="nav-link"
                               :class="{active: index === 0}"
                               v-on:click="hideMenu()"
                            >
                                {{link.title}}
                            </a>
                        </li>
                    </b-nav>
                    <div class="mail-box">
                        <p class="mail">hello@hopeandpartners.com</p>
                    </div>
                </div>
            </b-container>
        </div>
    </header>
</template>

<script>
  import logo from '../assets/img/logo.svg';
  import logoMobile from '../assets/img/logo-mobile.svg';
  import logoDarkMobile from '../assets/img/logo-dark-mobile.svg';
  import {TweenMax, TimelineMax, TweenLite} from 'gsap/TweenMax';

  export default {
    name: 'Header',

    data() {
      return {
        logo,
        logoMobile,
        logoDarkMobile
      }
    },

    computed: {
      filteredNavLinks: function () {
        return this.navLinks.filter(link => !link.hidden);
      }
    },

    methods: {
      hideMenu: function() {
        const menuFadeClose = TweenMax.to(mobileMenu, .25, {
          paused: true,
          opacity: 0,
          x: 0,
          y: '-100vh',
          display: 'none',
          ease: Sine.easeOut
        });

        $('#header').css({"position": "absolute"});
        menuFadeClose.restart();
        menuFadeClose.play();
      }
    },

    mounted() {
      // load animations
      TweenLite.fromTo($('#menu .nav-item'), 1.5, {opacity: 0, y: -20}, {opacity: 1, y: 0, delay: 1.0});
      TweenLite.fromTo($('.language-chooser span'), 1.5, {opacity: 0}, {opacity: 1, delay: 1.5});
      TweenLite.fromTo($('a.navbar-brand'), 1.5, {opacity: 0, scale: 1.1}, {opacity: 1, delay: 2.5, scale: 1});

      const mobileMenu = document.getElementById("mobileMenu");
      const openMenu = document.getElementById("openMenu");
      const fadeClose = document.getElementById("fadeClose");
      const items = $(".wrapper li");
      const mail = $(".mail-box");

      const menuFadeOpen = new TimelineMax();
      menuFadeOpen.pause();

      menuFadeOpen.fromTo(mobileMenu, 1, {
        x: -2000
      }, {
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
      });

      menuFadeOpen.staggerFrom(items, 1, {
        autoAlpha: 0,
        y: -15
      }, 0.01);

      menuFadeOpen.staggerFrom(mail, 1, {
        autoAlpha: 0,
        y: 15
      });

      const menuFadeClose = TweenMax.to(mobileMenu, .25, {
        paused: true,
        opacity: 0,
        x: 0,
        y: '-100vh',
        display: 'none',
        ease: Sine.easeOut
      });

      openMenu.addEventListener("click", function () {
        $('#header').css({"position": "fixed"});
        menuFadeOpen.restart();
        menuFadeOpen.play();
      });
      fadeClose.addEventListener("click", function () {
        $('#header').css({"position": "absolute"});
        menuFadeClose.restart();
        menuFadeClose.play();
      });
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

        #menu {
            .nav-link.active {
                color: $white;
                font-weight: bold;
            }
        }

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
                        font-weight: bold;
                    }

                    &.active {
                        border-bottom-color: $orange;
                    }
                }
            }
        }

        .navbar-toggler, button {
            border: none;
            background: none;
            font-weight: normal;

            &:focus {
                outline: none;
            }
        }
    }

    #openMenu {
        font-size: 16px;
        padding-left: 0;

        &:hover {
            color: white;
        }
    }

    #mobileMenu {
        background: #fff;
        color: $grey;
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        padding-top: 40px;

        .horizontal-grey-link > span {
            line-height: 12px;
        }
    }

    #fadeClose {
        font-size: 16px;
        color: $grey;
    }

    .wrapper {
        color: $grey;

        .nav {
            padding: 50px 0;
        }

        .nav-item {
            margin-bottom: 25px;

            .nav-link {
                color: $grey;

                &.active {
                    font-weight: bold;
                    color: $base-black;
                }
            }
        }
    }

    .mail-box {
        position: absolute;
        bottom: 5%;

        p {
            font-size: 20px;
            text-decoration: underline;
        }
    }

    @include media-max-width($sm-max) {
        header {
            position: absolute;
            top: 0;
        }
    }
</style>