import bus from '../bus';
// var GeometryUtils =  require('three/examples/js/utils/GeometryUtils')(THREE);
// var OrbitControls = require('three-orbit-controls')(THREE);
// import * as THREE from 'three';
// var GeometryUtils = require('three/examples/js/utils/GeometryUtils')(THREE);
import './three';
import {TweenMax, Linear, Power4,TimelineMax, TweenLite, Sine} from 'gsap/TweenMax';
// import {inGeometry} from 'three.randompoints';
// import '../../static/json/Montserrat_Bold'
// var GeometryUtils = require('three/examples/js/utils/GeometryUtils')(THREE);

var GeometryUtils = {
  randomPointsInGeometry: function ( geometry, n ) {
    var face, i,
      faces = geometry.faces,
      vertices = geometry.vertices,
      il = faces.length,
      totalArea = 0,
      cumulativeAreas = [],
      vA, vB, vC;

    // precompute face areas

    for ( i = 0; i < il; i ++ ) {

      face = faces[ i ];

      vA = vertices[ face.a ];
      vB = vertices[ face.b ];
      vC = vertices[ face.c ];

      face._area = this.triangleArea( vA, vB, vC );

      totalArea += face._area;

      cumulativeAreas[ i ] = totalArea;

    }

    // binary search cumulative areas array

    function binarySearchIndices( value ) {

      function binarySearch( start, end ) {

        // return closest larger index
        // if exact number is not found

        if ( end < start )
          return start;

        var mid = start + Math.floor( ( end - start ) / 2 );

        if ( cumulativeAreas[ mid ] > value ) {

          return binarySearch( start, mid - 1 );

        } else if ( cumulativeAreas[ mid ] < value ) {

          return binarySearch( mid + 1, end );

        } else {

          return mid;

        }

      }

      var result = binarySearch( 0, cumulativeAreas.length - 1 );
      return result;

    }

    // pick random face weighted by face area

    var r, index,
      result = [];

    var stats = {};

    for ( i = 0; i < n; i ++ ) {

      r = Math.random() * totalArea;

      index = binarySearchIndices( r );

      result[ i ] = this.randomPointInFace( faces[ index ], geometry );

      if ( ! stats[ index ] ) {

        stats[ index ] = 1;

      } else {

        stats[ index ] += 1;

      }

    }

    return result;

  },
  randomPointInTriangle: function () {

    var vector = new THREE.Vector3();

    return function ( vectorA, vectorB, vectorC ) {

      var point = new THREE.Vector3();

      var a = Math.random();
      var b = Math.random();

      if ( ( a + b ) > 1 ) {

        a = 1 - a;
        b = 1 - b;

      }

      var c = 1 - a - b;

      point.copy( vectorA );
      point.multiplyScalar( a );

      vector.copy( vectorB );
      vector.multiplyScalar( b );

      point.add( vector );

      vector.copy( vectorC );
      vector.multiplyScalar( c );

      point.add( vector );

      return point;

    };

  }(),
  randomPointInFace: function ( face, geometry ) {

    var vA, vB, vC;

    vA = geometry.vertices[ face.a ];
    vB = geometry.vertices[ face.b ];
    vC = geometry.vertices[ face.c ];

    return this.randomPointInTriangle( vA, vB, vC );

  },
  triangleArea: function () {

    var vector1 = new THREE.Vector3();
    var vector2 = new THREE.Vector3();

    return function ( vectorA, vectorB, vectorC ) {

      vector1.subVectors( vectorB, vectorA );
      vector2.subVectors( vectorC, vectorA );
      vector1.cross( vector2 );

      return 0.5 * vector1.length();

    };

  }()
};

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
          path: '#about',
          title: 'про мене',
          id: 2
        },
        {
          name: 'services',
          path: '#services',
          title: 'послуги',
          id: 3
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'партнери',
          id: 4
        },
        {
          name: 'cases',
          path: '#cases',
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
          path: '#about',
          title: 'про мене'
        },
        {
          name: 'services',
          path: '#services',
          title: 'наші послуги'
        },
        {
          name: 'services',
          path: '#services',
          title: 'наші послуги'
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'наші партнери'
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'наші кейси'
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'наші кейси'
        },
        {
          name: 'contacts',
          title: 'де нас знайти?',
          path: '#contacts'
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
        this.r =  Math.random()*1.5 + 0.3;
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

        for(let i=0; i<ww; i+=Math.round(ww/200)){
          for(let j=0; j<wh; j+=Math.round(ww/200)){
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
      // window.addEventListener("touchmove", onTouchMove);
      // window.addEventListener("click", onMouseClick);
      // window.addEventListener("touchend", onTouchEnd);

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
        this.r =  Math.random()*0.8 + 0.1;
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
      // window.addEventListener("touchmove", onTouchMove);
      // window.addEventListener("click", onMouseClick);
      // window.addEventListener("touchend", onTouchEnd);

      requestAnimationFrame(render);
    },

    animateServices: function(id) {
      const canvas = document.getElementById(id),
            ctx = canvas.getContext("2d"),
            mouse = {x:0,y:0};

      var particles = [],
          amount = 0,
          radius = 1;

      const colors = ["#fff"];

      var ww = canvas.width = window.innerWidth;
      var wh = canvas.height = window.innerHeight;

      function Particle(x,y){
        this.x = x + ((Math.random()-0.5) * 20);
        this.y = y + ((Math.random()-0.5) * 20);
        this.dest = {
          x: x,
          y: y
        };
        this.r =  Math.random()*0.8 + 0.1;
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
        ctx.fillText(text, 400, wh/3 + 150);

        const data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];

        for(let i=0; i<ww; i+=Math.round(ww/150)){
          for(let j=0; j<wh; j+=Math.round(wh/150)){
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

      bus.$on("animateServices", function(key) {
        initScene(key);
      });
      window.addEventListener("resize", function() {
        initScene('K');
      });
      window.addEventListener("mousemove", onMouseMove);
      // window.addEventListener("touchmove", onTouchMove);
      // window.addEventListener("click", onMouseClick);
      // window.addEventListener("touchend", onTouchEnd);

      requestAnimationFrame(render);
    },

    removeEventListeners: function() {
      // todo remove event listeners
    },

    getServicesAnimation: function() {
      // Options
      const particleCount = 4000;

      const particleSize = 0.1;

      const defaultAnimationSpeed = 1,
        morphAnimationSpeed = 18,
        color = '#FFFFFF';

      const triggers = $('.services-slider .text-block .letter');

      const outW = $(window).outerWidth();

      var canvasWidth = window.innerWidth / (outW > 1140 ? 3 : outW > 768 ? 2 : 1);
      var canvasHeight = window.innerHeight * 0.75;

      var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-services'), alpha : true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 );

      camera.position.y = 0;
      camera.position.z = 35;

      var light = new THREE.AmbientLight( 0xFFFFFF, 1 );
      scene.add( light );

      var controls = new THREE.OrbitControls( camera );
      controls.noPan = true;
      controls.noKeys = true;
      controls.noRotate = outW < 768;
      controls.noZoom = true;
      controls.update();

      var particles = new THREE.Geometry();

      var texts = [];

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

// Texts
      var loader = new THREE.FontLoader();
      var typeface = 'static/json/Montserrat_Bold.json';
      // https://dl.dropboxusercontent.com/s/bkqic142ik0zjed/swiss_black_cond.json?

      loader.load( typeface, ( font ) => {
        Array.from(triggers).forEach((trigger, idx) => {
          texts[idx] = {};

          texts[idx].geometry = new THREE.TextGeometry( trigger.textContent, {
            font: font,
            size: 12,
            height: 2,
            curveSegments: 10,
          });

          THREE.GeometryUtils.center( texts[idx].geometry );

          texts[idx].particles = new THREE.Geometry();

          texts[idx].points = GeometryUtils.randomPointsInGeometry(texts[idx].geometry, particleCount);

          createVertices(texts[idx].particles, texts[idx].points);

          enableTrigger(trigger, idx);

        });
      });

// Particles
      for (var p = 0; p < particleCount; p++) {
        var vertex = new THREE.Vector3();
        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;

        particles.vertices.push(vertex);
      }

      function createVertices (emptyArray, points) {
        for (var p = 0; p < particleCount; p++) {
          var vertex = new THREE.Vector3();
          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];

          emptyArray.vertices.push(vertex);
        }
      }

      function enableTrigger(trigger, idx) {
        bus.$on("animateServicesParticles", function(index) {
          morphTo(texts[index || idx].particles);
        });

        if (idx == 0) {
          morphTo(texts[idx].particles);
        }
      }

      var particleSystem = new THREE.Points(
        particles,
        pMaterial
      );

      // particleSystem.position.x = -15;
      // particleSystem.position.y = 4;

      particleSystem.sortParticles = true;

// Add the particles to the scene
      scene.add(particleSystem);

// Animate
      const normalSpeed = (defaultAnimationSpeed/100),
            fullSpeed = (morphAnimationSpeed/100)

      let animationVars = {
        speed: normalSpeed,
        color: color,
        rotation: -45
      }


      function animate() {
        particleSystem.rotation.y += animationVars.speed;

        // camera.position.y += (mouseY - camera.position.y) * 0.005;
        // targetRotation += 0.01;

        // camera.position.z = animationVars.rotation;
        // camera.position.y = animationVars.rotation;
        // camera.lookAt( particleSystem.position );
        // camera.lookAt(0, 0, 0);

        particles.verticesNeedUpdate = true;

        particleSystem.material.color = new THREE.Color( animationVars.color );

        window.requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }

      animate();

      function morphTo (newParticles) {

        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 2, {
          ease: Linear.easeNone
        });
        // particleSystem.material.color.setHex(color);

        for (var i = 0; i < particles.vertices.length; i++){
          TweenMax.to(particles.vertices[i], 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        }

        TweenMax.to(animationVars, 2, {
          ease: Elastic.easeOut.config( 0.1, .3),
          rotation: animationVars.rotation == 45 ? -45 : 45,
        })
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0.2});
      }
    },

    getContactsAnimation: function() {
      // Options
      const particleCount = 3000;

      const particleSize = 0.1;

      const defaultAnimationSpeed = 1,
        morphAnimationSpeed = 18,
        color = '#F44336';

      const outW = $(window).outerWidth();

      var canvasWidth = outW > 768 ? window.innerWidth / 2 : window.innerWidth;
      var canvasHeight = window.innerHeight * 0.75;

      var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-contacts'), alpha : true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize( canvasWidth, canvasHeight);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 );

      camera.position.y = 0;
      camera.position.z = 35;

      var light = new THREE.AmbientLight( 0xFFFFFF, 1 );
      scene.add( light );

      var controls = new THREE.OrbitControls( camera );
      controls.noPan = true;
      controls.noKeys = true;
      controls.noRotate = true;
      controls.noZoom = true;
      controls.update();

      var text = {};

      var particles = new THREE.Geometry();

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

      var loader = new THREE.FontLoader();
      var typeface = 'static/json/Montserrat_Bold.json';

      loader.load( typeface, ( font ) => {
        text.geometry = new THREE.TextGeometry( '@', {
          font: font,
          size: 12,
          height: 2,
          curveSegments: 10,
        });

        THREE.GeometryUtils.center( text.geometry );

        text.particles = new THREE.Geometry();

        text.points = GeometryUtils.randomPointsInGeometry(text.geometry, particleCount);

        createVertices(text.particles, text.points);

        morphTo(text.particles);
      });

// Particles
      for (var p = 0; p < particleCount; p++) {
        var vertex = new THREE.Vector3();
        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;

        particles.vertices.push(vertex);
      }

      function createVertices (emptyArray, points) {
        for (var p = 0; p < particleCount; p++) {
          var vertex = new THREE.Vector3();
          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];

          emptyArray.vertices.push(vertex);
        }
      }

      var particleSystem = new THREE.Points(
        particles,
        pMaterial
      );

      particleSystem.sortParticles = true;

      scene.add(particleSystem);

      const normalSpeed = (defaultAnimationSpeed/300),
        fullSpeed = (morphAnimationSpeed/100)

      let animationVars = {
        speed: normalSpeed,
        color: color,
        rotation: -45
      }


      function animate() {
        particleSystem.rotation.y -= animationVars.speed;
        particles.verticesNeedUpdate = true;

        particleSystem.material.color = new THREE.Color( animationVars.color );

        window.requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }

      animate();

      function morphTo (newParticles) {

        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 2, {
          ease: Linear.easeNone
        });
        // particleSystem.material.color.setHex(color);

        for (var i = 0; i < particles.vertices.length; i++){
          TweenMax.to(particles.vertices[i], 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        }

        TweenMax.to(animationVars, 2, {
          ease: Elastic.easeOut.config( 0.1, .3),
          rotation: animationVars.rotation == 45 ? -45 : 45,
        })
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0.2});
      }
    },

    getHeroAnimation: function() {
      // Options
      const particleCount = 5000;

      const particleSize = 0.1;

      const defaultAnimationSpeed = 1,
        morphAnimationSpeed = 18,
        color = '#F44336';

      const outW = $(window).outerWidth();

      var canvasWidth = window.innerWidth;
      var canvasHeight = window.innerHeight;

      var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-hero'), alpha : true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 );

      camera.position.y = 0;
      camera.position.z = 35;

      var light = new THREE.AmbientLight( 0xFFFFFF, 1 );
      scene.add( light );

      var controls = new THREE.OrbitControls( camera );
      controls.noPan = true;
      controls.noKeys = true;
      controls.noRotate = true;
      controls.noZoom = true;
      controls.update();

      var text = {};

      var particles = new THREE.Geometry();

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

      var loader = new THREE.FontLoader();
      var typeface = 'static/json/Montserrat_Bold.json';
      var mouseX = 0, mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      var maxOffset = 8;
      var minTime = 2.5;
      var maxTime = 4.5;

      function random(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return min + (max - min) * Math.random();
      }

      $(document).mousemove(function(e) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      });

      loader.load( typeface, ( font ) => {
        text.geometry = new THREE.TextGeometry( '&', {
          font: font,
          size: outW > 1200 ? 16 : outW > 992 ? 12 : 8,
          height: outW > 992 ? 5 : 2
        });

        THREE.GeometryUtils.center( text.geometry );

        text.particles = new THREE.Geometry();

        text.points = GeometryUtils.randomPointsInGeometry(text.geometry, particleCount);

        createVertices(text.particles, text.points);

        morphTo(text.particles);
      });


      for (var p = 0; p < particleCount; p++) {
        var vertex = new THREE.Vector3();
        vertex.x = 0;
        vertex.y = 0;
        vertex.z = 0;

        particles.vertices.push(vertex);
      }

      function createVertices (emptyArray, points) {
        for (var p = 0; p < particleCount; p++) {
          var vertex = new THREE.Vector3();
          vertex.x = points[p]['x'];
          vertex.y = points[p]['y'];
          vertex.z = points[p]['z'];

          emptyArray.vertices.push(vertex);
        }
      }

      function animateParticles(particles) {
        particles.vertices.forEach((particle) => {
          animateXY().progress(Math.random());

          function animateXY() {
            return TweenLite.to(particle, random(minTime, maxTime), {
              x: random(particle.x - maxOffset, particle.x + maxOffset),
              y: random(particle.y - maxOffset, particle.y + maxOffset),
              ease: Sine.easeInOut,
              onComplete: animateXY
            });
          }
        });
      }

      animateParticles(particles);

      var particleSystem = new THREE.Points(
        particles,
        pMaterial
      );

      particleSystem.rotation.y = 0;
      particleSystem.rotation.x = 0;

      particleSystem.sortParticles = true;

      scene.add(particleSystem);
      particleSystem.position.x = outW > 1400 ? -10 : outW > 1200 ? -8 : outW > 992 ? -5 : 0;

      const normalSpeed = (defaultAnimationSpeed/300),
        fullSpeed = (morphAnimationSpeed/100)

      let animationVars = {
        speed: normalSpeed,
        color: color,
        rotation: -45
      }


      function animate() {
        camera.position.x = particleSystem.position.x + ( mouseX - camera.position.x ) * 0.005;
        camera.position.y = ( - mouseY - camera.position.y ) * 0.005;
        camera.position.z = 35;
        camera.lookAt( scene.position );

        // var pCount = particleCount;
        // while (pCount--)
        //
        // {
        //   var particle = particles.vertices[pCount];
        //   console.log(particle.y, 'particle.y');
        //   // particle.y += Math.random();
        //   particleSystem.geometry.vertices.needsUpdate = true;
        // }

        particles.verticesNeedUpdate = true;

        particleSystem.material.color = new THREE.Color( animationVars.color );

        window.requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }

      animate();
      function morphTo (newParticles) {

        TweenMax.to(animationVars, .1, {
          ease: Power4.easeIn,
          speed: fullSpeed,
          onComplete: slowDown
        });

        TweenMax.to(animationVars, 2, {
          ease: Linear.easeNone
        });
        // particleSystem.material.color.setHex(color);

        for (var i = 0; i < particles.vertices.length; i++){
          TweenMax.to(particles.vertices[i], 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        }

        TweenMax.to(animationVars, 2, {
          ease: Elastic.easeOut.config( 0.1, .3),
          rotation: animationVars.rotation == 45 ? -45 : 45,
        })
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0.2});
      }
    }
  }
}
