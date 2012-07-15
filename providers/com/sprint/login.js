// 1st take a scrapping bill data from sprint.com.

var casper = require('casper').create(),
    utils = require('utils'),
    x = require('casper').selectXPath;

// Login URL.
casper.start('https://mysprint.sprint.com/mysprint/pages/sl/global/login.jsp');

// Fill form out.
casper.then(function() {
  var user = casper.cli.get("user");
  var pass = casper.cli.get("pass");
  this.fill('form#frmUserLoginDL', {
      'USER': user,
      'PASSWORD':pass,
  }, true);
});

// Go to bills
// TODO: This assumes password is always correct.
casper.then(function() {
  this.clickLabel('See bill', 'a');
});

// Grab important data.
casper.then(function() {
  var data = {};
  var summary = x('/html/body/table[1]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[7]/td/table/tbody');

  // Using xpatch because is super simple to grab with chrome.
  // Also a bunch of tables with no class gets pretty bad, pretty quick.
  data.prevTotal = this.fetchText(x('/html/body/table[1]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[7]/td/table/tbody/tr[1]/td[1]/table/tbody/tr/td[2]/b'));
  data.total = this.fetchText(x('/html/body/table[1]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[7]/td/table/tbody/tr[7]/td[1]/table/tbody/tr/td[2]/font/b'));
  data.account = this.fetchText(x('/html/body/table[1]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[1]/td/table/tbody/tr[3]/td[2]'));
  data.billingCycle = this.fetchText(x('/html/body/table[1]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[1]/td/table/tbody/tr[3]/td[3]'));

  // Clean up the screen selection first
  // Remove the payment button, and links.
  this.evaluate(function() {
    jQuery('img[alt="Make Payment Now"]').hide();
    jQuery('.generalLinks').hide().siblings().hide();
  });

  data.summaryUrl = data.account + '-sprint-summary.png';
  this.captureSelector(data.summaryUrl, summary);

  // Dump it all to the screen.
  utils.dump(data);
});

casper.run(function() {
    this.exit();
});
