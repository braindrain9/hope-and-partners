<template>
    <div>
        <div class="homepage">
            <div class="section position-relative" id="hero">
                <Hero/>
            </div>

            <div class="section" id="about">
                <div class="section-container">
                    <b-container >
                        <About/>
                    </b-container>
                    <b-container class="footer-container">
                        <Footer link="services"/>
                    </b-container>
                </div>
            </div>

            <div class="position-relative" id="services">
                <Services v-if="services.length" :services="services"/>
            </div>

            <div class="section" id="partners">
                <Partners :partners="partners"/>
            </div>

            <div class="section" id="cases">
                <div class="section-container">
                    <b-container><Cases/></b-container>
                    <b-container class="footer-container"><Footer link="contacts"/></b-container>
                </div>
            </div>

            <div class="section position-relative" id="contacts">
                <Contacts/>
            </div>
        </div>
    </div>
</template>

<script>
  import Hero from './Hero';
  import About from './About';
  import Partners from './Partners';
  import Services from './Services';
  import Cases from './Cases';
  import Contacts from './Contacts';
  import Footer from './Footer';
  import PartnersOld from './PartnersOld';
  // import * as Three from 'three';

  export default {
    name: 'Home',

    data() {
      return {
        services: [],
        partners: [],
        progressBar: 600
      }
    },

    beforeRouteEnter(to, from, next) {
      document.title = 'Hope & Partners';

      $.getJSON('/static/json/services.json', function (services) {
        $.getJSON('/static/json/partners.json', function (partners) {
          next(vm => {
            vm.services = services;
            vm.partners = partners;
          })
        })
      });
    },

    components: {
      About,
      Hero,
      Partners,
      Services,
      Cases,
      Contacts,
      Footer,
      PartnersOld
    }
  }
</script>

<style lang="scss">
    .scrollmagic-pin-spacer {
        height: 100vh !important;
        margin-bottom: 100px !important;
    }

    .section {
        background: $base-black;
        min-height: 90vh;
        height: 100%;
    }

    .section-container {
        position: relative;
        z-index: 1;

        &.services-section {
            padding-top: 150px;
            height: 100%;
        }
    }

    @include media-max-width($sm-max) {
        .section-container {
            padding-top: 60px;
        }
    }
</style>