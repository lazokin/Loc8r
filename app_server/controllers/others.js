/* GET 'about' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
      title: 'About ParmaFindr',
      content: 'ParmaFindr was created to help people find the best chicken parmigianas.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.'
    });
};

module.exports.angularApp = function(req, res) {
  res.render('layout', { title: 'Loc8r' });
};
