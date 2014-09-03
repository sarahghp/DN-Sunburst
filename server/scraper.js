var fs = require('fs'),
	request = require('request'),
	exec = require('child_process').exec;

function getTree () {
	request.get("https://news.layervault.com/u/tree.json")
			.pipe(fs.createWriteStream("tree.json")
				.on('finish', function(){
					exec('git commit -am "Auto tree update"', function(error){
						if (!error){
							exec('git push origin gh-pages');
						}
					});
				}));
	console.log('Updated' + new Date());
}

getTree();