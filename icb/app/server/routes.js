
var CF = require('./modules/class-list');
var AM = require('./modules/account-manager');

module.exports = function(app) {
	const multer = require('multer');
	const upload = multer();
	const fs = require('fs');
/*
	login & logout
*/
	app.get('/', function(req, res){
	// check if the user has an auto login key saved in a cookie //
		if (req.cookies.login == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			AM.validateLoginKey(req.cookies.login, req.ip, function(e, o){
				if (o){
					AM.autoLogin(o.user, o.pass, function(o){
						req.session.user = o;
						res.redirect('/home');
					});
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});

	app.post('/', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'false'){
					res.status(200).send(o);
				}	else{
					AM.generateLoginKey(o.user, req.ip, function(key){
						res.cookie('login', key, { maxAge: 900000 });
						res.status(200).send(o);
					});
				}
			}
		});
	});

	app.post('/logout', function(req, res)
	{
		res.clearCookie('login');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	});

/*
	control panel
*/

	app.get('/home', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.getAllCategories(function(e, categ) {
				AM.getAllPhrases(function (e, phras) {
					res.render('home', {
						title: 'Control Panel',
						classification: CF,
						udata: req.session.user,
						categories: categ,
						phrases: phras
					});
				})
			})
		}
	});

/*
	new accounts
*/

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', classification : CF });
	});

	app.post('/signup', function(req, res){
		var categories = [];
		var phrases = [];
		for (var i = 1; i<=31;i++)
			categories.push({id: i});
		for (var i = 32; i<=550;i++)
			phrases.push({id: i});
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			classf : req.body['classf'],
			SpeechTherapist: "none",
			Categories : categories,
			Phrases : phrases
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

	app.get('/addsubuser', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			res.render('addsubuser', {
				title : 'Create sub user',
				classification : CF,
				udata : req.session.user
			});
		}
	});

	app.get('/addphrase', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.getAllCategories(function(e, categ)
			{
				res.render('addphrase', {
					title : 'Create phrase',
					classification : CF,
					udata : req.session.user,
					categories: categ
				});
			})
		}
	});

	app.post('/addphrase', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			console.log(req.body.file);
				AM.addNewPharse(req.session.user._id,{
				title 	: req.body['title'],
				albumID 	: req.body['albumID'],
			}, function(e, o){
				if (e){
					res.status(400).send(e);
				}	else{
					req.session.user = o;
					res.status(200).send('ok');
				}
			});
		}
	});

	app.get('/addcategory', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			res.render('addcategory', {
				title : 'Create Category',
				classification : CF,
				udata : req.session.user,
			});
		}
	});

	app.post('/addcategory', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.addNewCategory(req.session.user._id,{
				title 	: req.body['title'],
			}, function(e, o){
				if (e){
					res.status(400).send(e);
				}	else{
					req.session.user = o;
					res.status(200).send('ok');
				}
			});
		}
	});

	app.post('/addsubuser', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			var categories = [];
			var phrases = [];
			for (var i = 1; i<=31;i++)
				categories.push({id: i});
			for (var i = 32; i<=550;i++)
				phrases.push({id: i});
			AM.addNewAccount({
				name 	: req.body['name'],
				email 	: req.body['email'],
				user 	: req.body['user'],
				pass	: req.body['pass'],
				classf : 'Companion',
				SpeechTherapist: req.session.user._id,
				Categories : categories,
				Phrases : phrases
			}, function(e, o){
				if (e){
					res.status(400).send(e);
				}	else{
					req.session.user = o.value;
					res.status(200).send('ok');
				}
			});
		}
	});

/*
	view, delete & reset accounts
*/

	app.get('/edituser', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			res.render('edituser', {
				title : 'Control Panel',
				classification : CF,
				udata : req.session.user
			});
		}
	});

	app.post('/edituser', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.updateAccount( req.session.user._id,{
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass']
			}, function(e, o){
				if (e){
					res.status(400).send(e);
				}	else{
					req.session.user = o.value;
					res.status(200).send('ok');
				}
			});
		}
	});

	app.get('/users', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.getAllRecords( function(e, accounts){
			res.render('users', {
				title : 'Account list',
				classification : CF,
				udata : req.session.user,
				accts : accounts
			});
			})
		}
	});

	app.post('/users', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.ConnectToCompanion(req.body['myCompanions'], function(e, o){
				if (e){
					res.status(400).send(e);
				}	else{
					req.session.user = o;
					AM.generateLoginKey(req.session.user.user, req.ip, function(key){
						res.cookie('login', key, { maxAge: 900000 });
						res.status(200).send('ok');
					});
				}
			});
		}
	});

	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});

	app.post('/delete', function(req, res){
		AM.deleteAccount(req.session.user._id, function(e, obj){
			if (!e){
				res.clearCookie('login');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
		});
	});

	app.post('/deletetile', function(req, res){
		AM.deleteTile(req.session.user._id ,req.body.tileid,function(e, obj){
			if (!e){
				req.session.user = obj;
				res.status(200).send('ok');
			}	else{
				res.status(400).send('record not found');
			}
		});
	});

	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });


	app.post('/uploadsound', function (req, res, next) {
		// console.log(req.file); // see what got uploaded
		console.log("here")
		let uploadLocation = __dirname + '/public/uploads/' + req.file.filename; // where to save the file to. make sure the incoming name has a .wav extension

		fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
		res.status(200).send('ok'); //send back that everything went ok

	})

	app.post('/uploadimage', upload.any(), (req, res) => {
		console.log(req.files);
		fs.writeFile("./app/public/users/"+req.files[0].originalname, req.files[0].buffer, (err) => {
			if (err) {
				console.log('Error: ', err);
				res.status(500).send('An error occurred: ' + err.message);
			} else {
				res.status(200).send('ok');
			}
		});
	});
};
