export default {

  data () {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      navLinks: [
        {
          name: 'home',
          title: 'на головну',
          path: '/',
          hidden: true,
          id: 1
        },
        {
          name: 'about',
          title: 'про мене',
          path: '/about',
          id: 2
        },
        {
          name: 'services',
          path: '/services',
          title: 'послуги',
          id: 3
        },
        {
          name: 'partners',
          path: '/partners',
          title: 'партнери',
          id: 4
        },
        {
          name: 'cases',
          path: '/cases',
          title: 'кейси',
          id: 5
        }
      ],
      footerNavLinks: [
        {
          prevRoute: 'cases',
          name: 'home',
          title: 'на головну',
          path: '/'
        },
        {
          prevRoute: 'home',
          name: 'about',
          title: 'про мене',
          path: '/about'
        },
        {
          prevRoute: 'about',
          name: 'services',
          path: '/services',
          title: 'наші послуги'
        },
        {
          prevRoute: 'services',
          name: 'partners',
          path: '/partners',
          title: 'наші партнери'
        },
        {
          prevRoute: 'partners',
          name: 'cases',
          path: '/cases',
          title: 'наші кейси'
        }
      ]
    }
  },

  methods: {
    getFormattedDate: function (time) {
      let date = new Date(time);
      return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    getQueryString: function( name ) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  }
}
