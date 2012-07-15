// 1st take a scrapping bill data from sprint.com.

var casper = require('casper').create(),
    utils = require('utils'),
    x = require('casper').selectXPath;

function cleanS(s) {
  s = s.replace(/(\r\n|\n|\r|\t)/gm,"");
  return s;
}

// Login URL.
casper.start('https://myservices.timewarnercable.com/');

// Fill form out.
casper.then(function() {
  var user = casper.cli.get("user");
  var pass = casper.cli.get("pass");
  this.fill('form#sidebarLogin', {
      'username': user,
      'password':pass,
  }, true);
});

// Go to bills
// TODO: This assumes password is always correct.
casper.then(function() {
  this.click(x('//*[@id="payXpressBilling"]/div[2]/a'));
});

// Take to statement.
casper.then(function() {
  this.click('a[href="/twnyc/everythingPresentStatement.do"]');
});

// Grab important data.
casper.then(function() {
  var data = {};

  data.prevTotal = cleanS(this.fetchText(x('//*[@id="csg_base_moduleWidget_1"]/div/div/div/div/div/div/div/div/div/div[3]/div[3]/div[2]/div[2]/div[1]/div[1]/div[2]')));
  data.current =   cleanS(this.fetchText(x('//*[@id="csg_base_moduleWidget_1"]/div/div/div/div/div/div/div/div/div/div[3]/div[3]/div[2]/div[2]/div[1]/div[2]/div[2]')));
  data.total = cleanS(this.fetchText(x('//*[@id="csg_base_moduleWidget_1"]/div/div/div/div/div/div/div/div/div/div[3]/div[3]/div[2]/div[2]/div[1]/div[3]/div[2]')));
  data.account = cleanS(this.fetchText(x('//*[@id="csg_base_moduleWidget_1"]/div/div/div/div/div/div/div/div/div/div[1]/table/tbody/tr[1]/td')));
  data.billingCycle = cleanS(this.fetchText(x('//*[@id="csg_base_moduleWidget_1"]/div/div/div/div/div/div/div/div/div/div[3]/div[2]/div[2]')));

  // Dump it all to the screen.
  utils.dump(data);
});

casper.run(function() {
    this.exit();
});
