<template>
    <header>
        <b-container>
            <b-navbar toggleable="md" type="dark">
                <b-nav-toggle id="openMenu" target="">Меню</b-nav-toggle>

                <b-collapse is-nav id="nav_collapse" class="justify-content-between">
                    <b-navbar-nav id="menu">
                        <li
                                class="nav-item"
                                :data-menuanchor="link.name"
                                v-for="link in filteredNavLinks"
                        >
                            <a v-on:click="goToSection(link.path)" :key="link.id" class="nav-link"
                               active-class="active">
                                {{link.title}}
                            </a>
                        </li>
                    </b-navbar-nav>

                    <div class="language-chooser">
                        <b-link class="active">укр</b-link>
                        <b-link>eng</b-link>
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
                    <button id="fadeClose" class="horizontal-grey-link">закрити</button>

                    <b-navbar-brand href="/" right>
                        <div v-html="logoDarkMobile"></div>
                    </b-navbar-brand>
                </b-navbar>
                <div class="wrapper">
                    <b-nav vertical>
                        <li
                                class="nav-item"
                                :data-menuanchor="link.name"
                                v-for="(link, index) in navLinks"
                        >
                            <a v-on:click="goToSection(link.path)"
                               :key="link.id"
                               class="nav-link"
                               active-class="active"
                               :class="{active: index === 0}"
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
    import {TweenMax, TimelineMax} from 'gsap';

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

        mounted() {
            const mobileMenu = document.getElementById("mobileMenu");
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

            openMenu.addEventListener("click", function() {
                menuFadeOpen.restart(); menuFadeOpen.play();
            });
            fadeClose.addEventListener("click", function() {
                menuFadeClose.restart(); menuFadeClose.play();
            });
        }
    }
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        position: fixed;
        padding: 40px 0 20px;
        z-index: 100;
        background: $base-black;
        transform: translate3d(0, 0, 0);
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

                .nav-link {
                    color: $grey;
                    letter-spacing: $base-spacing;

                    &:hover {
                        color: $white;
                        cursor: pointer;
                    }
                }

                &.active {
                    .nav-link {
                        color: $white;
                        font-weight: bold;
                    }
                }
            }

            .language-chooser {
                margin-right: 30px;
                margin-bottom: 2px; // compensate border-bottom height

                a {
                    color: $grey;
                    border-bottom: 2px solid transparent;
                    padding-bottom: 5px;
                    margin: 0 10px;

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

        @include media-max-width($menu-breakpoint) {
        }
    }

    #openMenu {
        &:hover {
            color: white;
        }
    }

    #mobileMenu {
        background: #fff;
        color: #777;
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        padding-top: 40px;
    }

    #fadeClose {
        color: #777;
    }

    .wrapper {
        color: #777;

        .nav {
            padding: 50px 0;
        }

        .nav-item {
            margin-bottom: 25px;

            a.active {
                font-weight: bold;
                color: $base-black;
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
</style>