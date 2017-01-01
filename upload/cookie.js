var fs = require('fs');

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
  'value': '0lzNkw0S0JaUVI5LVRDM0k5OE93dUVHMjhHWkl1RUZlSEl5RmVtWUhpTGlDbzlZSVFBQUFBJCQAAAAAAAAAAAEAAAD~9poMxu24o8a9sLIxMjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOJ9Z1jifWdYT',
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

    scrollIntoView($("#shopUpload").get(0));

    function scrollIntoView($element) {
      console.log("scroll element into view~");
      $element.scrollIntoView();
    }

    console.log("multiple attr1:" + $("#shopUpload input[type=file]").attr("multiple"));
    $("#shopUpload input[type=file]").removeAttr("multiple");
    $("#shopUpload input[type=file]").removeAttr("accept");
    console.log("multiple attr2:" + $("#shopUpload input[type=file]").attr("multiple"));

  });

  page.render('screen_page.png');

  write("index.html", page.content);


  console.log("before upload file~");
  page.uploadFile('#shopUpload input[type=file]', '/Users/yeshaoting/workspace/scripts/js/phantomjs-study/upload/header.png');
  page.render('screen_upload.png');
  console.log("after upload file~");

  phantom.exit();
});

function write(file, content) {
  try {
    fs.write(file, content, 'w');
  } catch (e) {
    console.log(e);
  }
}
