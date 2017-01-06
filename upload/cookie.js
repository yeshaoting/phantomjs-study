var fs = require('fs');

// var file = "/Users/yeshaoting/workspace/scripts/js/phantomjs-study/upload/images/header.png";
var file = "/Users/yeshaoting/Pictures/6035219325378201.jpeg";

var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';

var wasSuccessful = phantom.injectJs('lib/jquery.min.js');

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.viewportSize = {
  width: 1024,
  height: 768
};

phantom.addCookie({
  'name': 'BDUSS',
  'value': 'FBN29ZSVd4bExTUGF5bml3QnJoTzNObVhRbkFwdTg4STg3ck01N2ljOFBhWkZZSVFBQUFBJCQAAAAAAAAAAAEAAAD~9poMxu24o8a9sLIxMjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA~caVgP3GlYQU',
  'domain': '.baidu.com'
});

var url = "http://biaozhu.baidu.com/lbc#/mark-basic"
page.open(url, function(status) {
  console.log(page.url, page.title);

  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit(1);
  }

  page.evaluate(function() {
    // var loginText = $(".login-text");
    // console.log("loginText: " + loginText.text());

    var username = $(".user-name");
    console.log("username: " + username.text());
    if (username == '' || !username) {
      console.log("fail login~");
      phantom.exit(1);
    }

    scrollIntoView($("#shopUpload").get(0));

    function scrollIntoView($element) {
      console.log("scroll element into view~");
      $element.scrollIntoView();
    }

    var $showUploadInput = $("#shopUpload input[type=file]");
    console.log("multiple attr1:" + $showUploadInput.attr("multiple"));
    $showUploadInput.removeAttr("multiple");
    // $showUploadInput.removeAttr("accept");
    console.log("multiple attr2:" + $showUploadInput.attr("multiple"));

  });

  page.render('screenshots/screen_page.png');

  console.log("before upload file~");
  write("index_before.html", page.content);
  page.uploadFile('#shopUpload input[type=file]', file);

  setTimeout(function() {
    page.render('screenshots/screen_upload.png');
    write("index_after.html", page.content);
    console.log("after upload file~");

    phantom.exit();
  }, 5000);

});

function write(file, content) {
  try {
    fs.write(file, content, 'w');
  } catch (e) {
    console.log(e);
  }
}
