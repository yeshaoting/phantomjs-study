var webPage = require('webpage');
var page = webPage.create();

var url = 'http://wiki.sankuai.com/pages/viewpage.action?pageId=701889608';
phantom.addCookie({
  'name'     : 'TGC',   /* required property */
  'value'    : '4a967b7cdf344392ac1e*968aee06266',  /* required property */
  'domain'   : '.sankuai.com',
  'path'     : '/',                /* required property */
  'httponly' : false,
  'secure'   : false,
  'expires'  : (new Date()).getTime() + (1000 * 60 * 60 * 24)   /* <-- expires in 1 hour */
});


page.open(url, function(status) {
  page.render('page1.png');
  if (status == 'fail') {
    console.log("页面加载失败");
    return;
  }
  
  page.open(url, function(status) {

    console.log("url: " + page.url);
    console.log("title: " + page.title);
    console.log("content: " + page.content);

    page.render('page2.png');
    // page.evaluate(function() {
    //     var obj = document.querySelectorAll('button')[0];
    //     click(obj);
    // });
    phantom.exit();
  }
});


