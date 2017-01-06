var webPage = require('webpage');
var page = webPage.create();

var url = "https://www.baidu.com/";

function page_open_callback(status) {
  try {
    console.info("status: " + status);
    if (status == 'fail') {
      console.error("fail to load page~");
      phantom.exit(1);
    }

    console.log("url: " + page.url + "\ttitle: " + page.title);
    page.render("page.png");
  } catch (e) {
    console.log("error: " + e.message);
    phantom.exit(1);
  }

  phantom.exit();
}

// 参见：http://phantomjs.org/api/webpage/method/open.html
page.open(url, page_open_callback);
