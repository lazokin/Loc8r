/* GET 'home' page */
module.exports.homelist = function(req, res) {
    res.render('locations-list', {
      title: 'ParmaFindr - the best parma near you',
      pageHeader: {
        title: 'ParmaFindr',
        strapline: 'Find the best chicken parmigiana near you!'
      },
      locations: [{
        name: 'Mrs Parma\'s',
        address: '25 Little Bourke St, Melbourne VIC 3000',
        rating: 5,
        facilities: ['Food', 'Beer', 'Wine'],
        distance: '100m'
      },{
        name: 'Melbourne Central Lion Hotel',
        address: '3, 211 La Trobe St, Melbourne VIC 3000',
        rating: 4,
        facilities: ['Food', 'Beer', 'Wine'],
        distance: '100m'
      },{
        name: 'Oxford Scholar Hotel',
        address: '427 Swanston St, Melbourne VIC 3000',
        rating: 2,
        facilities: ['Food', 'Beer', 'Wine'],
        distance: '100m'
      }],
      sidebar: 'Looking for a great parma? ParmaFindr helps you find the best chicken parmigiana near you. Prefer the chips on the side or some ham on the top? ParmaFindr will help you find the taste you\'re looking for.'
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
      title: 'Mrs Parma\'s',
      pageHeader: {
        title: 'Mrs Parma\'s'
      },
      sidebar: {
        context: 'is on ParamFindr because it serves chicken parmigianas.',
        callToAction: 'If you\'ve been and you like their parmas - or if you don\'t - please leave a review to help other people just like you.'
      },
      location: {
        name: 'Mrs Parma\'s',
        address: '25 Little Bourke St, Melbourne VIC 3000',
        rating: 5,
        facilities: ['Food', 'Beer', 'Wine'],
        coords: {lat: -37.8105416, lng: 144.9720871},
        openingTimes: [{
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },{
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },{
          days: 'Sunday',
          closed: true
        }],
        reviews: [{
          author: 'Nikolce Ambukovski',
          rating: 5,
          timestamp: '13 December 2015',
          reviewText: 'What a great place. I can\'t say enough good things about it.'
        },{
          author: 'Nikolce Ambukovski',
          rating: 3,
          timestamp: '4 July 2014',
          reviewText: 'It was okay. The Parama wasn\'t great, but the service was fast.'
        }]
      }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
      title: 'Review Mrs Parma\'s on ParmaFindr',
      pageHeader: {
        title: 'Review Mrs Parma\'s'
      },
    });
};
