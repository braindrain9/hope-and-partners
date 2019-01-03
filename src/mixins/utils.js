import bus from '../bus';

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
          path: '/#about',
          title: 'про мене',
          id: 2
        },
        {
          name: 'services',
          path: '/#services',
          title: 'послуги',
          id: 3
        },
        {
          name: 'partners',
          path: '/#partners',
          title: 'партнери',
          id: 4
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'кейси',
          id: 5
        }
      ],
      footerNavLinks: [
        {
          name: 'home',
          path: '/',
          title: 'на головну'
        },
        {
          name: 'about',
          path: '/#about',
          title: 'про мене'
        },
        {
          name: 'services',
          path: '/#services',
          title: 'наші послуги'
        },
        {
          name: 'services',
          path: '/#services',
          title: 'наші послуги'
        },
        {
          name: 'partners',
          path: '/#partners',
          title: 'наші партнери'
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'наші кейси'
        },
        {
          name: 'cases',
          path: '/#cases',
          title: 'наші кейси'
        },
        {
          name: 'contacts',
          title: 'де нас знайти?',
          path: '/#contacts'
        }
      ]
    }
  },

  methods: {
    setPartnersFooterPos: function() {
      const headerBlock = $("header .container .navbar"),
            footerBlock = $("footer.full-width-footer"),
            partnersHeading = $(".partners-heading");

      if (footerBlock) {
        const leftHeaderPos  = headerBlock[0].getBoundingClientRect().left;

        footerBlock.css("padding-left", leftHeaderPos);
        partnersHeading.css("padding-left", 100 + leftHeaderPos); // TODO fix
      }
    },
    getFormattedDate: function (time) {
      let date = new Date(time);
      return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    goToServicesFirstSlide: function() {
      location.hash = "#services";
    },

    goToSection: function(hash) {
      this.$store.commit('updateSliding', false);
      this.$store.commit('updateSlidingPartners', false);
      location.href = hash;
    },

    getQueryString: function( name ) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    animateHero: function(id) {
      const canvas = document.getElementById(id),
            ctx = canvas.getContext("2d"),
            mouse = {x:0,y:0};

      var particles = [],
        amount = 0,
        radius = 1;

      const colors = ["#F44336"];

      var ww = canvas.width = window.innerWidth;
      var wh = canvas.height = window.innerHeight;

      function Particle(x,y){
        this.x =  Math.random()*ww;
        this.y =  Math.random()*wh;
        this.dest = {
          x: x,
          y: y
        };
        this.r =  Math.random()*1.2 + 0.1;
        this.vx = (Math.random()-0.5)*20;
        this.vy = (Math.random()-0.5)*20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
      }

      Particle.prototype.render = function() {
        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        const a = this.x - mouse.x;
        const b = this.y - mouse.y;

        const distance = Math.sqrt(a*a + b*b);

        if(distance<(radius*50)){
          this.accX = (this.x - mouse.x)/150;
          this.accY = (this.y - mouse.y)/150;
          this.vx += this.accX;
          this.vy += this.accY;
        }
      };

      function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      function onTouchMove(e){
        if(e.touches.length > 0 ){
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        }
      }

      function onTouchEnd(e){
        mouse.x = -9999;
        mouse.y = -9999;
      }

      function initScene(){
        const text = '&';

        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 700px Montserrat";
        ctx.textAlign = "right";
        ctx.fillText(text, ww/2 - 100, wh/2 + 200);

        const data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];

        for(let i=0; i<ww; i+=Math.round(ww/250)){
          for(let j=0; j<wh; j+=Math.round(ww/250)){
            if(data[((i + j*ww)*4) + 3] > 200){
              particles.push(new Particle(i,j));
            }
          }
        }

        amount = particles.length;
      }

      function onMouseClick(){
        radius++;
        if (radius === 5) {
          radius = 0;
        }
      }

      function render() {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
          particles[i].render();
        }
      }

      bus.$on("animateHero", function() {
        initScene();
      });
      window.addEventListener("resize", initScene);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("click", onMouseClick);
      window.addEventListener("touchend", onTouchEnd);

      requestAnimationFrame(render);
    },

    animateContacts: function(id) {
      const canvas = document.getElementById(id),
        ctx = canvas.getContext("2d"),
        mouse = {x:0,y:0};

      var particles = [],
        amount = 0,
        radius = 1;

      const colors = ["#ccc"];

      var ww = canvas.width = window.innerWidth;
      var wh = canvas.height = window.innerHeight;

      function Particle(x,y){
        this.x = x + (Math.random()-0.5)*10;
        this.y = y + (Math.random()-0.5)*10;
        this.dest = {
          x: x,
          y: y
        };
        this.r =  Math.random()*0.5 + 0.1;
        this.vx = (Math.random()-0.5)*10;
        this.vy = (Math.random()-0.5)*10;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
      }

      Particle.prototype.render = function() {
        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        const a = this.x - mouse.x;
        const b = this.y - mouse.y;

        const distance = Math.sqrt(a*a + b*b);

        if(distance<(radius*40)){
          this.accX = (this.x - mouse.x)/100;
          this.accY = (this.y - mouse.y)/100;
          this.vx += this.accX;
          this.vy += this.accY;
        }
      };

      function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      function onTouchMove(e){
        if(e.touches.length > 0 ){
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        }
      }

      function onTouchEnd(e){
        mouse.x = -9999;
        mouse.y = -9999;
      }

      function initScene(){
        const text = '@';

        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 360px Montserrat";
        ctx.textAlign = "right";
        ctx.fillText(text, ww/2 - 100, wh/2 + 50);

        const data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];

        for(let i=0; i<ww; i+=Math.round(ww/250)){
          for(let j=0; j<wh; j+=Math.round(ww/250)){
            if(data[((i + j*ww)*4) + 3] > 200){
              particles.push(new Particle(i,j));
            }
          }
        }

        amount = particles.length;
      }

      function onMouseClick(){
        radius++;
        if (radius === 5) {
          radius = 0;
        }
      }

      function render() {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
          particles[i].render();
        }
      }

      bus.$on("animateContacts", function() {
        initScene();
      });
      window.addEventListener("resize", initScene);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("click", onMouseClick);
      window.addEventListener("touchend", onTouchEnd);

      requestAnimationFrame(render);
    },

    animateServices: function(id) {
      const canvas = document.getElementById(id),
            ctx = canvas.getContext("2d"),
            mouse = {x:0,y:0};

      var particles = [],
          amount = 0,
          radius = 1;

      const colors = ["#ccc"];

      var ww = canvas.width = window.innerWidth;
      var wh = canvas.height = window.innerHeight;

      function Particle(x,y){
        this.x = x + ((Math.random()-0.5) * 20);
        this.y = y + ((Math.random()-0.5) * 20);
        this.dest = {
          x: x,
          y: y
        };
        this.r =  Math.random()*1.2 + 0.1;
        this.vx = (Math.random()-0.5)*5;
        this.vy = (Math.random()-0.5)*5;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
      }

      Particle.prototype.render = function() {
        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        const a = this.x - mouse.x;
        const b = this.y - mouse.y;

        const distance = Math.sqrt(a*a + b*b);

        if(distance<(radius*50)){
          this.accX = (this.x - mouse.x)/150;
          this.accY = (this.y - mouse.y)/150;
          this.vx += this.accX;
          this.vy += this.accY;
        }
      };

      function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      function onTouchMove(e){
        if(e.touches.length > 0 ){
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        }
      }

      function onTouchEnd(e){
        mouse.x = -9999;
        mouse.y = -9999;
      }

      function initScene(text){
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 420px Montserrat";
        ctx.textAlign = "right";
        ctx.fillText(text, ww/2 - 200, wh/2 + 150);

        const data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];

        for(let i=0; i<ww; i+=Math.round(ww/150)){
          for(let j=0; j<wh; j+=Math.round(wh/150)){
            if(data[((i + j*ww)*4) + 3] > 50){
              particles.push(new Particle(i,j));
            }
          }
        }

        amount = particles.length;
      }

      function onMouseClick(){
        radius++;
        if (radius === 5) {
          radius = 0;
        }
      }

      function render() {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
          particles[i].render();
        }
      }

      bus.$on("animateServices", function(key) {
        initScene(key);
      });
      window.addEventListener("resize", function() {
        initScene('K');
      });
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("click", onMouseClick);
      window.addEventListener("touchend", onTouchEnd);

      requestAnimationFrame(render);
    }
  }
}
