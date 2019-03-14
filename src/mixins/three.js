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