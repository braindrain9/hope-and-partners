import {Linear, Power4, TweenMax, Elastic, Power2, TweenLite, Sine} from "gsap/TweenMax";

export const GeometryUtils = {
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

export const ParticleUtils = {
  createVertices: function (particleCount, emptyArray, points) {
    for (let p = 0; p < particleCount; p++) {
      const vertex = new THREE.Vector3();

      vertex.x = points[p]['x'];
      vertex.y = points[p]['y'];
      vertex.z = points[p]['z'];
      emptyArray.vertices.push(vertex);
    }
  },
  fillParticles: function(particles, particleCount) {
    for (let p = 0; p < particleCount; p++) {
      const vertex = new THREE.Vector3();

      vertex.x = 0;
      vertex.y = 0;
      vertex.z = 0;
      particles.vertices.push(vertex);
    }
  },
  morphToServices: function(animationVars, particles, newParticles) {
    TweenMax.to(animationVars, .1, {
      ease: Power4.easeIn,
      speed: animationVars.fullSpeed,
      onComplete: slowDown
    });

    TweenMax.to(animationVars, 0, {
      ease: Linear.easeNone
    });

    particles.vertices.forEach((point, i) => {
      TweenMax.to(point, 2.5, {
        ease: Power4.easeInOut,
        x: newParticles.vertices[i].x,
        y: newParticles.vertices[i].y,
        z: newParticles.vertices[i].z
      })
    });

    function slowDown () {
      TweenMax.to(animationVars, 0.3, {
        ease: Power2.easeOut,
        speed: animationVars.normalSpeed,
        delay: 0
      });
    }
  },
  morphTo: function(animationVars, particles, newParticles) {
    TweenMax.to(animationVars, .1, {
      ease: Power4.easeIn,
      speed: animationVars.fullSpeed,
      onComplete: slowDown
    });

    TweenMax.to(animationVars, 2, {
      ease: Linear.easeNone
    });

    particles.vertices.forEach((point, i) => {
      TweenMax.to(point, 2, {
        ease: Elastic.easeOut.config( 0.1, .3),
        x: newParticles.vertices[i].x,
        y: newParticles.vertices[i].y,
        z: newParticles.vertices[i].z
      })
    });

    TweenMax.to(animationVars, 2, {
      ease: Elastic.easeOut.config( 0.1, .3),
      rotation: animationVars.rotation === 45 ? -45 : 45,
    });

    function slowDown () {
      TweenMax.to(animationVars, 0.3, {
        ease: Power2.easeOut,
        speed: animationVars.normalSpeed,
        delay: 0.2
      });
    }
  },
  random: function(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
},
  animateParticles: function (particles) {
    const maxOffset = 8,
      minTime = 2.5,
      maxTime = 4.5;

    particles.vertices.forEach((particle) => {
      const animateXY = () => {
        return TweenLite.to(particle, this.random(minTime, maxTime), {
          x: this.random(particle.x - maxOffset, particle.x + maxOffset),
          y: this.random(particle.y - maxOffset, particle.y + maxOffset),
          ease: Sine.easeInOut,
          onComplete: animateXY
        });
      };

      animateXY().progress(Math.random());
    });
  }
}