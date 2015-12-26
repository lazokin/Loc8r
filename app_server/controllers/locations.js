var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV == 'production') {
  apiOptions.server = "https://parmafindr.herokuapp.com"
}

var renderHomepage = function(req, res) {
  res.render('locations-list', {
    title: 'ParmaFindr - the best parma near you',
    pageHeader: {
      title: 'ParmaFindr',
      strapline: 'Find the best chicken parmigiana near you!'
    },
    sidebar: 'Looking for a great parma? ParmaFindr helps you find the best chicken parmigiana near you. Prefer the chips on the side or some ham on the top? ParmaFindr will help you find the taste you\'re looking for.'
  });
};

var renderDetailPage = function (req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {
      title: locDetail.name
    },
    sidebar: {
      context: 'is on ParamFindr because it serves chicken parmigianas.',
      callToAction: 'If you\'ve been and you like their parmas - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: locDetail
  });
};

var renderReviewForm = function(req, res, locDetail) {
  res.render('location-review-form', {
    title: 'Review ' + locDetail.name + ' on ParmaFindr',
    pageHeader: {
      title: 'Review ' + locDetail.name
    },
    error: req.query.err,
    url: req.originalURL
  });
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something went wrong";
    content = "Something, somewhere, has gone just a little big wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
}

var getLocationInfo = function(req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(requestOptions, function(err, response, body) {
    var data = body;
    if (response.statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  renderHomepage(req, res);
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

/* POST 'review' page */
module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + "/reviews";
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(requestOptions, function(err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/location/' + locationid);
      } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
      } else {
        _showError(req, res, response.statusCode);
      }
    });
  }
};
