<template>
    <div>
        <div class="homepage">
            <div class="section position-relative" id="hero">
                <Hero/>
            </div>

            <div class="section" id="about">
                <div class="section-container">
                    <div class="container">
                        <About/>
                    </div>
                    <div class="container footer-container">
                        <Footer link="services"/>
                    </div>
                </div>
            </div>

            <div class="position-relative" id="services" v-if="services.length && partnersLoaded">
                <Services :services="services"/>
            </div>

            <div class="section" id="partners" v-if="partners.length">
                <Partners :partners="partners"/>
            </div>

            <div class="section" id="cases" v-if="cases.length">
                <div class="section-container">
                    <div class="container"><Cases :cases="cases"/></div>
                    <div class="container cases-footer footer-container"><Footer link="contacts"/></div>
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

  export default {
    name: 'Home',

    data() {
      return {
        services: [],
        partners: [],
        cases: [],
        progressBar: 600,
        partnersLoaded: false
      }
    },
    created() {
      document.title = 'Hope & Partners';

      this.$http.get('wp/v2/services?lang=en').then(response => {
        response.data.sort((a, b) => {
          return parseInt(_.get(a, 'title.rendered')) - parseInt(_.get(b, 'title.rendered'));
        });
        this.services = this.transformResponseData(response.data);
      }, error => console.log(error));

      this.$http.get('wp/v2/partners?lang=en')
        .then(response => {
            this.partners = this.transformResponseData(response.data);
        }, error => console.log(error))
        .finally(() => this.partnersLoaded = true);

      this.$http.get('wp/v2/cases?lang=en').then(response => {
        this.cases = this.transformResponseData(response.data);
      }, error => console.log(error));
    },

    components: {
      About,
      Hero,
      Partners,
      Services,
      Cases,
      Contacts,
      Footer
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

    .cases-footer {
        margin-top: 100px;
    }

    #hero {
        padding-top: 100px;
    }

    @include media-max-width($sm-max) {
        .section-container {
            padding-top: 60px;
        }

        #hero {
            padding-top: 0;
        }
    }
</style>