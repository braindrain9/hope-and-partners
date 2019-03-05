import bus from '../bus';
import './three';
import {TweenMax, Linear, Power4, TweenLite, Sine} from 'gsap/TweenMax';

const GeometryUtils = {
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
      navLinks: [
        {
          name: 'about',
          path: '#about',
          title: 'about',
          id: 2
        },
        {
          name: 'services',
          path: '#services',
          title: 'services',
          id: 3
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'partners',
          id: 4
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'cases',
          id: 5
        }
      ],
      footerNavLinks: [
        {
          name: 'home',
          path: '#hero',
          title: 'home'
        },
        {
          name: 'about',
          path: '#about',
          title: 'about'
        },
        {
          name: 'services',
          path: '#services',
          title: 'ourServices'
        },
        {
          name: 'partners',
          path: '#partners',
          title: 'ourPartners'
        },
        {
          name: 'cases',
          path: '#cases',
          title: 'ourCases'
        },
        {
          name: 'contacts',
          title: 'howToFindUs',
          path: '#contacts'
        }
      ],
      typeface: this.$store.state.content_endpoint + 'dist/src/assets/json/Montserrat_Bold.json'
    }
  },

  methods: {
    transformResponseData: function (data) {
      return data && data.length
        ? data.reduce((arr, item) => {
          arr.push({id: item.id, ...item.acf});
          return arr;
        }, [])
        : [];
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

    removeEventListeners: function() {
      // todo remove event listeners
    },

    getServicesAnimation: function() {
      // Options
      const particleCount = 2000;

      const particleSize = 0.1;

      const defaultAnimationSpeed = 1,
        morphAnimationSpeed = 0,
        color = '#FFFFFF';

      const triggers = $('.services-slider .slide-content .letter');

      const outW = $(window).outerWidth();

      var canvasWidth = window.innerWidth / (outW > 1140 ? 3 : outW > 768 ? 2 : 1);

      if (outW > 768 && canvasWidth < 500) {
        canvasWidth = 550;
      }
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
      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = outW > 768;
      controls.enableZoom = false;
      controls.update();

      var particles = new THREE.Geometry();

      var texts = [];

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

// Texts
      var loader = new THREE.FontLoader();
      // https://dl.dropboxusercontent.com/s/bkqic142ik0zjed/swiss_black_cond.json?

      loader.load(this.typeface, (font) => {
        Array.from(triggers).forEach((trigger, idx) => {
          texts[idx] = {};

          texts[idx].geometry = new THREE.TextGeometry( trigger.textContent, {
            font: font,
            size: 12,
            height: 2,
            curveSegments: 10,
          });

          texts[idx].geometry.center();

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
          morphTo(texts[index].particles);
        });

        if (idx === 0) {
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
      const normalSpeed = (defaultAnimationSpeed/200),
            fullSpeed = (morphAnimationSpeed/100)

      let animationVars = {
        speed: normalSpeed,
        color: color,
        rotation: -45
      }


      function animate() {
        particleSystem.rotation.y += animationVars.speed;

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

        TweenMax.to(animationVars, 0, {
          ease: Linear.easeNone
        });

        for (var i = 0; i < particles.vertices.length; i++){
          TweenMax.to(particles.vertices[i], 2.5, {
            ease: Power4.easeInOut,
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
          })
        }

        // TweenMax.to(animationVars, .1, {
        //   ease: Elastic.easeOut.config( 0.1, .3),
        //   rotation: animationVars.rotation == 45 ? -45 : 45,
        // })
      }

      function slowDown () {
        TweenMax.to(animationVars, 0.3, {ease:
          Power2.easeOut, speed: normalSpeed, delay: 0});
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
      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.update();

      var text = {};

      var particles = new THREE.Geometry();

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

      var loader = new THREE.FontLoader();

      loader.load(this.typeface, ( font ) => {
        text.geometry = new THREE.TextGeometry( '@', {
          font: font,
          size: 12,
          height: 2,
          curveSegments: 10,
        });

        text.geometry.center();

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
        fullSpeed = (morphAnimationSpeed/100);

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

        // TweenMax.to(animationVars, 2, {
        //   ease: Elastic.easeOut.config( 0.1, .3),
        //   rotation: animationVars.rotation == 45 ? -45 : 45,
        // })
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

      const outW = $(window).innerWidth();

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
      controls.enablePan = false;
      controls.enableKeys = false;
      controls.enableRotate = false;
      controls.enableZoom = false;
      controls.update();

      var text = {};

      var raycaster = new THREE.Raycaster(); // create once and reuse
      var mouse = new THREE.Vector2(); // create once and reuse

      var particles = new THREE.Geometry();

      var pMaterial = new THREE.PointsMaterial({
        size: particleSize,
      });

      var loader = new THREE.FontLoader();
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

      function is_touch_device() {
        return (('ontouchstart' in window)
          || (navigator.MaxTouchPoints > 0)
          || (navigator.msMaxTouchPoints > 0));
      }

      if (!is_touch_device()) {
        $(document).mousemove(function(e) {
          e.preventDefault();

          mouseX = e.clientX - windowHalfX;
          mouseY = e.clientY - windowHalfY;

          mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
          mouse.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;

          raycaster.setFromCamera( mouse, camera );
          var intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0) {
            intersects = intersects.filter(obj => obj.distanceToRay < 0.8);
            intersects.forEach((obj, i) => {
              const index = intersects[i].index,
                point = particles.vertices[index],
                startX = point.x,
                startY = point.y;

              TweenMax.to(point, 1, {
                x: random(point.x - maxOffset / 2, point.x + maxOffset / 2),
                y: random(point.y - maxOffset / 2, point.y + maxOffset / 2),
                ease: Sine.easeInOut,
                onComplete
              });

              function onComplete() {
                TweenMax.to(point, 1.5, {
                  x: startX,
                  y: startY,
                  ease: Power2.easeOut,
                  speed: normalSpeed,
                  delay: 0.1
                });
              }
            })
          }
        });
      }

      loader.load(this.typeface, (font) => {
        text.geometry = new THREE.TextGeometry( '&', {
          font: font,
          size: outW > 1200 ? 16 : outW > 768 ? 12 : 10,
          height: outW > 768 ? 5 : 2
        });

        text.geometry.center();

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
      particleSystem.position.y = outW > 768 ? 0 : 4;

      particleSystem.sortParticles = true;

      scene.add(particleSystem);
      particleSystem.position.x = outW > 1400 ? -10 : outW > 1200 ? -8 : outW > 992 ? -5 : outW > 768 ? -2 : 0;

      const normalSpeed = (defaultAnimationSpeed/300),
            fullSpeed = (morphAnimationSpeed/100);

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
