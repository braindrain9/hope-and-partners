<template>
    <div>
        <div class="homepage">
            <div class="section position-relative">
                <Hero/>
            </div>

            <div class="section">
                <b-container class="section-container">
                    <About/>
                    <Footer link="services"/>
                </b-container>
            </div>

            <div class="position-relative" id="services">
                <Services v-if="services.length" :services="services"/>
            </div>

            <div class="section" id="partners">
                <Partners :partners="partners"/>
            </div>

            <div class="section">
                <b-container class="section-container">
                    <Cases/>
                    <Footer link="contacts"/>
                </b-container>
            </div>

            <div class="section position-relative">
                <Contacts/>
            </div>
        </div>
    </div>
</template>

<script>
  import bus from '../bus';
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
            bus.$emit('toggleLoading', false);
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
        min-height: 100vh;
        height: 100%;
    }

    .section-container {
        padding-top: 100px; // compensate fixed header
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