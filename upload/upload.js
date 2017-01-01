var webPage = require('webpage');
var page = webPage.create();

//var url = 'http://www.tuhaokuai.com/image';
var file = '/Users/yeshaoting/Pictures/27fa013ec0accbe03581a82a296f6e8e.jpg';

var url = 'http://www.gaitubao.com/';
//var file = '/Users/yeshaoting/Pictures/6035219325378201.jpeg';

var count = 5;

page.open(url, function(status) {
	console.log('Status: ' + status);
	if (status == 'success') {
		upload();
	}

    console.log("end");
});

var interval;

function upload() {
	console.log("upload image: " + file);
	//page.uploadFile('div.uploadCtl input[type=file]', file);
    //$('#fileupload').attr('multiple', 'multiple');
	page.uploadFile('#fileupload', file);

    interval = window.setInterval(take_png, 500);
}

function take_png() {
   count--;
   if (count >= 0) {
        console.log(count + ". take png~");
        page.render('screen' + count + '.png'); 
   } else {
       console.log("exit~")
       phantom.exit()
   }
}

