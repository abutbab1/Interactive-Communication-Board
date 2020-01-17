
const crypto 		= require('crypto');
const moment 		= require('moment');
const fs 			= require('fs');
const MongoClient 	= require('mongodb').MongoClient;

var basetitlecat = ['quick chat','time','food','drinks','snacks','activities','emotions','body','clothing','people','describe','kitchen','school','animals','technology','weather','sports','transports','places','position','actions','questions','numbers',	// main categories ids: 1-23
					'wild animals', 'marine animals', 	// animals sub categories - father id: 14 - ids: 24,25
					'face', 'medical', 					// body sub categories - father id: 8 - ids: 26,27
					'colors', 							// clothing sub category - father id: 9 - id: 28
					'shapes',							// describe sub category - father id: 11 - id: 29
					'vegetables', 'fruit'];				// food sub category - father id: 3 - ids: 30,31

var basesrctcat = [ 'base-icb/quickchat.jpg','base-icb/time.jpg','base-icb/food.jpg','base-icb/drinks.jpg','base-icb/snacks.jpg','base-icb/activities.jpg','base-icb/emotions.jpg','base-icb/body.jpg','base-icb/clothing.jpg','base-icb/people.jpg','base-icb/describe.jpg','base-icb/kitchen.jpg','base-icb/school.jpg','base-icb/animals.jpg','base-icb/technology.jpg','base-icb/weather.jpg','base-icb/sports.jpg','base-icb/transport.jpg','base-icb/places.jpg','base-icb/position.jpg','base-icb/actions.jpg','base-icb/questions.jpg','base-icb/numbers.jpg',
					'base-icb/animals/wild_animals.jpg', 'base-icb/animals/marine_animals.jpg',		// animals sub categories
					'base-icb/body/face.jpg', 'base-icb/body/medical.jpg',							// body sub categories
					'base-icb/clothing/colours.jpg',												// clothing sub category
					'base-icb/describe/shapes.jpg',													// describe sub category
					'base-icb/food/vegetables.jpg', 'base-icb/food/fruit.jpg'];						// food sub categories

var basetitlephrases = [ 'yes','no','hello','goodbye', 'good', 'bad', 'i cant speek', 'thank you', 'please',																																																														// phrases of quick chat category - father id: 1, array index: 0-8, ids: 1-9
						'now','yesterday', 'today', 'tomorrow', 'morning', 'afternoon', 'night','day', 'this week', 'weekend', 'next week', 'this month', 'next month', 'last month', 'one hour', 'minute', 'second',																																				// phrases of time category	- father id: 2, array index: 9-25, ids: 10-26
						'I am hungry', 'I want', 'and', 'I dislike', 'pizza', 'bread', 'boiled egg', 'fried egg', 'croissant', 'cereal', 'porridge', 'pancakes', 'pasta', 'poultry', 'beef', 'fish', 'spaghetti', 'hamburger', 'hot dog', 'pie', 'pepper mill', 'salt', 'tomato sauce', 'vinegar', 'sandwich', 'bagel', 'toast', 'cheese', 'noodles', 'chips',		// phrases of food - father id: 3, array index: 26-55, ids: 27-56
						'I am thirsty', 'I want', 'I dislike', 'drink', 'water', 'orange juice', 'apple juice', 'grape juice', 'cranberry juice', 'pineapple juice', 'lemonade', 'milk', 'milkshake', 'hot chocolate', 'tea', 'coffee', 'wine', 'beer', 'straw', 																									// phrases of drinks - father id: 4, array index: 56-74, ids: 57-75
						'I want', 'ice cream', 'chocolate', 'crisps', 'marshmallows', 'biscuits', 'jelly beans', 'candy cane', 'nuts', 'cake slice', 'chocolate chip biscuit', 'yogurt', 'ice lolly', 'pretzel', 'peanut', 																																			// phrases of snacks - father id: 5, array index: 75-89, ids: 76-90
						'I want', 'to cycle', 'to play basketball', 'to go bowling', 'to play computer games', 'to watch tv', 'to solve puzzle', 'to play soccer', 'to play bingo', 'to bathe', 'to work', 'to cook', 'to exercise', 'to run', 'to celebrate', 'to swim', 'to fish', 'to play darts', 'to play cards',												// phrases of activities - father id: 6, array index: 90-108, ids: 91-109
						'I am', 'You are', 'Are you', 'happy', 'sad', 'angry', 'afraid', 'confused', 'hot', 'excited', 'relaxed',																																																									// phrases of emotions - father id: 7, array index: 109-119, ids: 110-120
						'I have pain in', 'itch', 'head', 'neck', 'shoulder', 'arms', 'right hand', 'left hand', 'elbow', 'back', 'stomach', 'finger', 'leg', 'foot', 'throat', 'hip', 'bottom', 'thumb', 'toe nail', 'finger nail', 'muscles', 'skin', 'bone', 'knee',																								// phrases of body - father id: 8, array index: 120-143, ids: 121-144
						'shirt', 't-shirt', 'trousers', 'shorts', 'jacket', 'coat', 'blouse', 'dress', 'jumper', 'hoodie', 'skirt', 'vest', 'pyjamas', 'glasses', 'sunglasses', 'bobble hat', 'cap', 'bow tie', 'tie', 'socks', 'gloves', 'boots', 'bra', 'boxer shorts', 'pants', 'purse', 'jewellery', 'sandals', 'trainers', 'scarf', 'umbrella', 'watch',		// phrases of clothing - father id: 9, array index: 144-175, ids: 145-176
						'my', 'your', 'family', 'grandfather', 'grandmother', 'mother', 'father', 'sister', 'brother', 'daughter', 'son', 'baby', 'teacher', 'doctor', 'speech language therapist', 'nurse', 'police', 'delivery person', 'post person', 'dentist', 'carpenter', 'secretary', 'taxi driver', 'gardener', 'IT assistant',							// phrases of people - father id: 10, array index: 176-200, ids: 177-201
						'I am', 'it is', 'You are', 'ugly', 'pretty', 'large', 'little', 'same', 'old', 'fast', 'dirty', 'quiet', 'loud', 'fat', 'thin', 'tall', 'short', 'long', 'empty', 'full', 'deep', 'shallow', 'open', 'closed', 'heavy', 'light', 'broken', 'soft', 'hard', 'dry', 'wet', 'sticky',															// phrases of describe - father id: 11, array index: 201-232, ids: 202-233
						'where is', 'I need', 'my', 'fork', 'knife', 'spoon', 'plate', 'drinking glass', 'mug', 'straw', 'serviette', 'bowl', 'place mat', 'cooker', 'fridge', 'apron',																																												// phrases of kitchen - father id: 12, array index: 233-248, ids: 234-249
						'pen', 'pencil', 'pencil sharpener', 'pencil case', 'school bag', 'ring binder', 'calculator', 'scissors', 'board', 'teacher', 'tippex', 'crayon', 'glue', 'stapler',																																										// phrases of school - father id: 13, array index: 249-262, ids: 250-263
						'I have', 'I saw', 'I want', 'dog', 'cat', 'hamster', 'rabbit', 'hedgehog', 'horse', 'donkey', 'sheep', 'frog', 'chick', 'fish', 'chicken', 'mouse', 'rat', 'parrot', 'nest', 'goose', 'cow', 'tortoise', 'camel', 'pig',																													// phrases of animals - father id: 14, array index: 263-286, ids: 264-287
						'I need', 'where is', 'my', 'your', 'computer', 'laptop', 'electric charger', 'battery', 'camera', 'headphones', 'playstation', 'usb stick', 'printer', 'computer mouse', 'ipod', 'iphone', 'stereo', 'dvd player', 'wii', 'remote control', 'computer keyboard',																			// phrases of technology - father id: 15, array index: 287-307, ids: 288-308
						'rain', 'sun', 'snow', 'thunder storm', 'cloudy', 'autumn', 'winter', 'spring', 'summer',																																																													// phrases of weather - father id: 16, array index: 308-316, ids: 309-317
						'football', 'basketball', 'tennis', 'golf', 'pool snooker', 'judo', 'bowling', 'olympic games', 'para olympic games', 'darts',																																																				// phrases of sports - father id: 17, array index: 317-326, ids: 318-327
						'car', 'bus', 'train', 'motorcycle', 'bicycle','boat','ambulance','taxi','ferry', 'fire engine', 'aeroplane', 'army tank', 'wheelchair', 'tractor', 'helicopter', 'jeep',																																									// phrases of transports - father id: 18, array index: 327-342, ids: 328-343
						'house', 'shop', 'bank', 'office block', 'outside', 'beach', 'gym', 'field', 'back garden', 'school', 'surgery health centre', 'garage', 'aquarium',																																														// phrases of places - father id: 19, array index: 343-355, ids: 344-356
						'in', 'out', 'on','under','over','behind', 'in front', 'through', 'between', 'up', 'down', 'left', 'right', 'around', 'forwards', 'backwards', 'before', 'after',																																											// phrases of position - father id: 20, array index: 356-373, ids: 357-374
						'to hear', 'to go', 'to give', 'to get', 'to come', 'to bring', 'to break', 'to think', 'to talk', 'to take', 'to sleep', 'to put', 'to move', 'to make', 'to wake up', 'to wait',																																							// phrases of actions - father id: 21, array index: 374-389, ids: 375-390
						'what', 'why', 'how', 'how many', 'when', 'which', 'where',																																																																					// phrases of questions - father id: 22, array index: 390-396, ids: 391-397
						'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',																																																																		// phrases of numbers - father id: 23, array index: 397-405, ids: 398-406
						'lion', 'tiger', 'wolf','giraffe', 'fox', 'elephant', 'chimpanzee', 'bear', 'bat', 'snake', 'panda', 'kangaroo', 'hippopotamus', 'gorilla', 'zebra', 'dinosaur',																																											// phrases of wild animals - father id: 24, array index: 406-421, ids: 407-422
						'fish', 'gold fish', 'dolphin', 'seal', 'seahorse', 'penguin', 'starfish', 'walrus', 'jellyfish', 'killer whale', 'crocodile', 'crab',																																																		// phrases of marine animals - father id: 25, array index: 422-433, ids: 423-434
						'eyes', 'eye', 'ear', 'eye brow', 'eyelash', 'chin', 'cheek', 'teeth', 'tongue', 'lips', 'gum',																																																												// phrases of face - father id: 26, array index: 434-444, ids: 435-445
						'I need', 'back ache', 'head ache', 'stomach ache', 'tooth ache', 'inhaler', 'rash', 'operation', 'plaster', 'medicine', 'xray', 'surgery health centre', 'syringe', 'tablets', 'blood pressure', 'cut', 'oxygen mask', 'to vomit', 'thermometer',																							// phrases of medical - father id: 27, array index: 445-463, ids: 446-464
						'black', 'white', 'purple', 'yellow', 'pink', 'blue', 'green', 'red', 'color',																																																																// phrases of colors - father id: 28, array index: 464-472, ids: 465-473
						'square', 'circle', 'triangle', 'rectangle', 'oval', 'pentagon', 'hexagon', 'octagon', 'pyramid',																																																											// phrases of shapes - father id: 29, array index: 473-481, ids: 474-482
						'carrot', 'cabbage', 'broccoli', 'beetroot', 'avocado', 'aubergine', 'asparagus', 'pepper', 'peas', 'onion', 'lettuce', 'green beans', 'cucumber', 'chili pepper', 'corn', 'sweet potato', 'salad', 'rice', 'radish', 'pumpkin', 'potato', 'tomato', 																						// phrases of vegetables - father id: 30, array index: 482-503, ids: 483-504
						'kiwi', 'grapes', 'grapefruit', 'cheery', 'banana', 'apricot', 'apple', 'strawberry', 'pineapple', 'pear', 'peach', 'orange', 'melon', 'mango', 'watermelon' ];																																												// phrases of fruit - father id: 31, array index: 504-518, ids: 505-519

var basesrctphrases = [ 'yes.jpg','no.jpg','hello.jpg','goodbye.jpg', 'good.jpg', 'bad.jpg', 'non_speaking.jpg', 'thanks.jpg', 'please.jpg',																																																																																						// phrases of quick chat category - father id: 1, array index: 0-8, ids: 1-9
					 	'now.jpg','yesterday.jpg', 'today.jpg', 'tomorrow.jpg', 'morning.jpg', 'afternoon.jpg', 'night.jpg','day.jpg', 'this_week.jpg', 'weekend.jpg', 'next_week.jpg', 'this_month.jpg', 'next_month.jpg', 'last_month.jpg', 'one_hour.jpg', 'minute.jpg', 'second.jpg',																																																			// phrases of time category	- father id: 2, array index: 9-25, ids: 10-26
					 	'hungry.jpg', 'want.jpg', 'and.jpg', 'bad.jpg', 'pizza.jpg', 'bread.jpg', 'boiled_egg.jpg', 'fried_egg.jpg', 'croissant.jpg', 'cereal.jpg', 'porridge.jpg', 'pancakes.jpg', 'pasta.jpg', 'poultry.jpg', 'beef.jpg', 'fish.jpg', 'spaghetti.jpg', 'hamburger.jpg', 'hot_dog.jpg', 'pie.jpg', 'pepper_mill.jpg', 'salt.jpg', 'tomato_sauce.jpg', 'vinegar.jpg', 'sandwich.jpg', 'bagel.jpg', 'toast.jpg', 'cheese.jpg', 'noodles.jpg', 'chips.jpg',							// phrases of food - father id: 3, array index: 26-55, ids: 27-56
						'thirsty.jpg', 'want.jpg', 'bad.jpg', 'drink.jpg', 'water.jpg', 'orange_juice.jpg', 'apple_juice.jpg', 'grape_juice.jpg', 'cranberry_juice.jpg', 'pineapple_juice.jpg', 'lemonade.jpg', 'milk.jpg', 'milkshake.jpg', 'hot_chocolate.jpg', 'tea.jpg', 'coffee.jpg', 'wine.jpg', 'beer.jpg', 'straw.jpg', 																																									// phrases of drinks - father id: 4, array index: 56-74, ids: 57-75
						'want.jpg', 'ice_cream.jpg', 'chocolate.jpg', 'crisps.jpg', 'marshmallows.jpg', 'biscuits.jpg', 'jelly_beans.jpg', 'candy_cane.jpg', 'nuts.jpg', 'cake_slice.jpg', 'chocolate_chip_biscuit.jpg', 'yogurt.jpg', 'ice_lolly.jpg', 'pretzel.jpg', 'peanut.jpg', 																																																				// phrases of snacks - father id: 5, array index: 75-89, ids: 76-90
						'want.jpg', 'cycle.jpg', 'basketball.jpg', 'bowler.jpg', 'computer_game.jpg', 'tv.jpg', 'puzzle.jpg', 'soccer.jpg', 'bingo.jpg', 'bathe.jpg', 'work.jpg', 'cook.jpg', 'exercise.jpg', 'run.jpg', 'celebrate.jpg', 'swim.jpg', 'fish.jpg', 'darts.jpg', 'cards.jpg',																																																			// phrases of activities - father id: 6, array index: 90-108, ids: 91-109
						'i_am', 'you_are', 'are_you', 'happy', 'sad', 'angry', 'afraid', 'confused', 'hot', 'excited', 'relax',																																																																																										// phrases of emotions - father id: 7, array index: 109-119, ids: 110-120
						'i_am_pain', 'itch', 'head', 'neck', 'shoulder', 'arms', 'right_hand', 'left_hand', 'elbow', 'back', 'stomach', 'finger', 'leg', 'foot', 'throat', 'hip', 'bottom', 'thumb', 'toe_nail', 'finger_nail', 'muscles', 'skin', 'bone', 'knee',																																																									// phrases of body - father id: 8, array index: 120-143, ids: 121-144
						'shirt', 't-shirt', 'trousers', 'shorts', 'jacket', 'coat', 'blouse', 'dress', 'jumper', 'hoodie', 'skirt', 'vest', 'pyjamas', 'glasses', 'sunglasses', 'bobble_hat', 'cap', 'bow_tie', 'tie', 'socks', 'gloves', 'boots', 'bra', 'boxer_shorts', 'pants', 'purse', 'jewellery', 'sandals', 'trainers', 'scarf', 'umbrella', 'watch',																																		// phrases of clothing - father id: 9, array index: 144-175, ids: 145-176
						'my', 'your', 'family', 'grandfather', 'grandmother', 'mum', 'dad', 'sister', 'brother', 'daughter', 'son', 'baby', 'teacher', 'doctor', 'speech_language_therapist', 'nurse', 'police', 'delivery', 'post_person', 'dentist', 'carpenter', 'secretary', 'taxi_driver', 'gardener', 'it_assistant',																																											// phrases of people - father id: 10, array index: 176-200, ids: 177-201
						'i_am', 'it_is', 'you_are', 'ugly', 'pretty', 'large', 'little', 'same', 'old_object', 'fast', 'dirty', 'quiet', 'loud', 'fat', 'thin', 'tall', 'short', 'long', 'empty', 'full', 'deep', 'shallow', 'open', 'closed', 'heavy', 'light', 'broken', 'soft', 'hard', 'dry', 'wet', 'sticky',																																													// phrases of describe - father id: 11, array index: 201-232, ids: 202-233
						'whereis', 'ineed', 'my', 'fork', 'knife', 'spoon', 'plate', 'glass', 'mug', 'straw', 'serviette', 'bowl', 'place_mat', 'cooker', 'fridge', 'apron',																																																																														// phrases of kitchen - father id: 12, array index: 233-248, ids: 234-249
						'pen', 'pencil', 'pencil_sharpener', 'pencil_case', 'school_bag', 'ring_binder', 'calculator', 'scissors', 'board', 'teacher', 'tippex', 'crayon', 'glue', 'stapler',																																																																										// phrases of school - father id: 13, array index: 249-262, ids: 250-263
						'i_have.jpg', 'i_saw.jpg', 'iwant.jpg', 'dog.jpg', 'cat.jpg', 'hamster.jpg', 'rabbit.jpg', 'hedgehog.jpg', 'horse.jpg', 'donkey.jpg', 'sheep.jpg', 'frog.jpg', 'chick.jpg', 'fish.jpg', 'chicken.jpg', 'mouse.jpg', 'rat.jpg', 'parrot.jpg', 'nest.jpg', 'goose.jpg', 'cow.jpg', 'tortoise.jpg', 'camel.jpg', 'pig.jpg',																																					// phrases of animals - father id: 14, array index: 263-286, ids: 264-287
						'ineed', 'whereis', 'my', 'your', 'computer', 'laptop', 'electric_charger', 'battery', 'camera', 'headphones', 'playstation', 'usb_stick', 'printer', 'computer_mouse', 'ipod', 'iphone', 'stereo', 'dvd_player', 'wii', 'remote_control', 'computer_keyboard',																																																				// phrases of technology - father id: 15, array index: 287-307, ids: 288-308
						'rain', 'sun', 'snow', 'thunder_storm', 'cloudy', 'autumn', 'winter', 'spring', 'summer',																																																																																													// phrases of weather - father id: 16, array index: 308-316, ids: 309-317
						'football', 'basketball', 'tennis', 'golf', 'pool_snooker', 'judo', 'bowling', 'olympic_games', 'para_olympic_games', 'darts',																																																																																				// phrases of sports - father id: 17, array index: 317-326, ids: 318-327
						'car', 'bus', 'train', 'motorcycle', 'bicycle','boat','ambulance','taxi','ferry', 'fire_engine', 'aeroplane', 'army_tank', 'wheelchair', 'tractor', 'helicopter', 'jeep',																																																																									// phrases of transports - father id: 18, array index: 327-342, ids: 328-343
						'house', 'shop', 'bank', 'office_block', 'outside', 'beach', 'gym', 'field', 'back_garden', 'school', 'surgery_health_centre', 'garage', 'aquarium',																																																																														// phrases of places - father id: 19, array index: 343-355, ids: 344-356
						'in', 'out', 'on','under','over','behind', 'in_front', 'through', 'between', 'up', 'down', 'left', 'right', 'around', 'forwards', 'backwards', 'before', 'after',																																																																											// phrases of position - father id: 20, array index: 356-373, ids: 357-374
						'tohear', 'togo', 'togive', 'toget', 'tocome', 'tobring', 'tobreak', 'tothink', 'totalk', 'totake', 'tosleep', 'toput', 'tomove', 'tomake', 'towakeup', 'towait',																																																																											// phrases of actions - father id: 21, array index: 374-389, ids: 375-390
						'what', 'why', 'how', 'how_many', 'when', 'which', 'where',																																																																																																					// phrases of questions - father id: 22, array index: 390-396, ids: 391-397
						'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',																																																																																																		// phrases of numbers - father id: 23, array index: 397-405, ids: 398-406
						'lion', 'tiger', 'wolf','giraffe', 'fox', 'elephant', 'chimpanzee', 'bear', 'bat', 'snake', 'panda', 'kangaroo', 'hippopotamus', 'gorilla', 'zebra', 'dinosaur',																																																																											// phrases of wild animals - father id: 24, array index: 406-421, ids: 407-422
						'fish', 'goldfish', 'dolphin', 'seal', 'seahorse', 'penguin', 'starfish', 'walrus', 'jellyfish', 'killer whale', 'crocodile', 'crab',																																																																																		// phrases of marine animals - father id: 25, array index: 422-433, ids: 423-434
						'eyes', 'eye', 'ear', 'eyebrow', 'eyelash', 'chin', 'cheek', 'teeth', 'tongue', 'lips', 'gum',																																																																																												// phrases of face - father id: 26, array index: 434-444, ids: 435-445
						'i_need', 'back_ache', 'head_ache', 'stomach_ache', 'tooth_ache', 'inhaler', 'rash', 'operation', 'plaster', 'medicine', 'xray', 'surgery_health_centre', 'syringe', 'tablets', 'blood_pressure', 'cut', 'oxygen_mask', 'vomit', 'thermometer',																																																								// phrases of medical - father id: 27, array index: 445-463, ids: 446-464
						'black', 'white', 'purple', 'yellow', 'pink', 'blue', 'green', 'red', 'color',																																																																																																// phrases of colors - father id: 28, array index: 464-472, ids: 465-473
						'square', 'circle', 'triangle', 'rectangle', 'oval', 'pentagon', 'hexagon', 'octagon', 'pyramid',																																																																																											// phrases of shapes - father id: 29, array index: 473-481, ids: 474-482
						'carrot', 'cabbage', 'broccoli', 'beetroot', 'avocado', 'aubergine', 'asparagus', 'pepper', 'peas', 'onion', 'lettuce', 'green beans', 'cucumber', 'chili_pepper', 'corn', 'sweet_potato', 'salad', 'rice', 'radish', 'pumpkin', 'potato', 'tomato', 																																																						// phrases of vegetables - father id: 30, array index: 482-503, ids: 483-504
						'kiwi', 'grapes', 'grapefruit', 'cheery', 'banana', 'apricot', 'apple', 'strawberry', 'pineapple', 'pear', 'peach', 'orange', 'melon', 'mango', 'watermelon' ];																																																																												// phrases of fruit - father id: 31, array index: 504-518, ids: 505-519

var db, accounts, phrases, categories;
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, function(e, client) {
	if (e){
		console.log(e);
	}	else{
		db = client.db(process.env.DB_NAME);
		accounts = db.collection('accounts');
		phrases = db.collection('pharses');
		categories = db.collection('categories');
		// index fields 'user' & 'email' for faster new account validation //
		accounts.createIndex({user: 1, email: 1});
		categories.createIndex({albumID: 1, _id: 1});
		phrases.createIndex({albumID: 1, _id: 1});
		var counter = 1;
		for(var i=0;i<basesrctcat.length;i++,counter++)					// enter categories to data-base
		{
			if(i < 23)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i]});
			else if (i < 25)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i] , albumID: "14"});
			else if (i < 27)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i] , albumID: "8"});
			else if (i < 28)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i] , albumID: "9"});
			else if (i < 29)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i] , albumID: "11"});
			else if (i < 31)
				categories.insertOne({_id: counter, title: basetitlecat[i], srct: basesrctcat[i] , albumID: "3"});
		}

		for(var i=0;i<basetitlephrases.length;i++,counter++)					// enter phrases to data-base
		{
			if(i < 9)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/quick chat/"+basesrctphrases[i] , albumID: "1"});
			else if (i < 26)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/time/"+basesrctphrases[i] , albumID: "2"});
			else if (i < 56)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/food/"+basesrctphrases[i] , albumID: "3"});
			else if (i < 75)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/drinks/"+basesrctphrases[i] , albumID: "4"});
			else if (i < 90)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/snacks/"+basesrctphrases[i] , albumID: "5"});
			else if (i < 109)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/activities/"+basesrctphrases[i] , albumID: "6"});
			else if (i < 120)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/emotions/"+basesrctphrases[i]+".jpg" , albumID: "7"});
			else if (i < 144)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/body/"+basesrctphrases[i]+".jpg" , albumID: "8"});
			else if (i < 176)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/clothing/"+basesrctphrases[i]+".jpg" , albumID: "9"});
			else if (i < 201)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/people/"+basesrctphrases[i]+".jpg" , albumID: "10"});
			else if (i < 233)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/describe/"+basesrctphrases[i]+".jpg" , albumID: "11"});
			else if (i < 249)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/kitchen/"+basesrctphrases[i]+".jpg" , albumID: "12"});
			else if (i < 263)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/school/"+basesrctphrases[i]+".jpg" , albumID: "13"});
			else if (i < 287)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/animals/"+basesrctphrases[i] , albumID: "14"});
			else if (i < 308)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/technology/"+basesrctphrases[i]+".jpg" , albumID: "15"});
			else if (i < 317)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/weather/"+basesrctphrases[i]+".jpg" , albumID: "16"});
			else if (i < 327)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/sports/"+basesrctphrases[i]+".jpg" , albumID: "17"});
			else if (i < 343)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/transports/"+basesrctphrases[i]+".jpg" , albumID: "18"});
			else if (i < 356)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/places/"+basesrctphrases[i]+".jpg" , albumID: "19"});
			else if (i < 374)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/position/"+basesrctphrases[i]+".jpg" , albumID: "20"});
			else if (i < 390)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/actions/"+basesrctphrases[i]+".jpg" , albumID: "21"});
			else if (i < 397)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/questions/"+basesrctphrases[i]+".jpg" , albumID: "22"});
			else if (i < 406)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/numbers/"+basesrctphrases[i]+".jpg" , albumID: "23"});
			else if (i < 422)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/animals/wild animals/"+basesrctphrases[i]+".jpg" , albumID: "24"});
			else if (i < 434)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/animals/marine animals/"+basesrctphrases[i]+".jpg" , albumID: "25"});
			else if (i < 445)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/body/face/"+basesrctphrases[i]+".jpg" , albumID: "26"});
			else if (i < 464)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/body/medical/"+basesrctphrases[i]+".jpg" , albumID: "27"});
			else if (i < 473)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/clothing/colors/"+basesrctphrases[i]+".jpg" , albumID: "28"});
			else if (i < 482)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/describe/shapes/"+basesrctphrases[i]+".jpg" , albumID: "29"});
			else if (i < 504)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/food/vegetables/"+basesrctphrases[i]+".jpg" , albumID: "30"});
			else if (i < 519)
				phrases.insertOne({_id: counter, title: basetitlephrases[i], srct: "base-icb/food/fruit/"+basesrctphrases[i]+".jpg" , albumID: "31"});
		}
		console.log('mongo :: connected to database :: "'+process.env.DB_NAME+'"');
	}
});

const guid = function(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}

/*
	login validation methods
*/

exports.autoLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o == null){
			console.log(user + " Not found in the data base!");
			callback('user-not-found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					console.log("Connecting to: "+ user);
					callback(null, o);
				}	else{
					console.log(user + " found but the password does not match!");
					callback('invalid-password');
				}
			});
		}
	});
}

exports.generateLoginKey = function(user, ipAddress, callback)
{
	let cookie = guid();
	accounts.findOneAndUpdate({user:user}, {$set:{
		ip : ipAddress,
		cookie : cookie
	}}, {returnOriginal : false}, function(e, o){ 
		callback(cookie);
	});
}

exports.validateLoginKey = function(cookie, ipAddress, callback)
{
// ensure the cookie maps to the user's last recorded ip address //
	accounts.findOne({cookie:cookie, ip:ipAddress}, callback);
}

exports.generatePasswordKey = function(email, ipAddress, callback)
{
	let passKey = guid();
	accounts.findOneAndUpdate({email:email}, {$set:{
		ip : ipAddress,
		passKey : passKey
	}, $unset:{cookie:''}}, {returnOriginal : false}, function(e, o){
		if (o.value != null){
			callback(null, o.value);
		}	else{
			callback(e || 'account not found');
		}
	});
}

exports.validatePasswordKey = function(passKey, ipAddress, callback)
{
// ensure the passKey maps to the user's last recorded ip address //
	accounts.findOne({passKey:passKey, ip:ipAddress}, callback);
}

/*
	record insertion, update & deletion methods
*/

exports.addNewAccount = function(newData, callback)
{
	accounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			console.log(newData.user + " is taken!");
			callback('username-taken');
		}	else{
			accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					console.log(newData.email + " is taken!");
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('DD/MM/YY, HH:mm:ss');
						console.log(newData.user + " has been created in database!");
						accounts.insertOne(newData, callback);
						fs.mkdir("./app/public/users/"+newData.user,{recursive: true},  function (err){if(err) console.log('error', err);});
					});
				}
			});
		}
	});
}

exports.addNewCategory = function(userid,newData,files, callback)
{
	if(newData.title == "")
	{
		console.log("Can't submit empty title!");
		callback('title-empty');
	}
	else
	{
		if(files == undefined || files[0] == undefined)
		{
			accounts.findOne({_id:getObjectId(userid)}, function(e, o) {
				phrases.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxphr) =>
				{
					categories.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxcat) =>
					{
						var id;
						if(maxphr[0]._id > maxcat[0]._id)
						{
							id = maxphr[0]._id + 1;
						}
						else
						{
							id = maxcat[0]._id + 1;
						}
						if(newData.sound == '' || newData.sound == undefined)
						{
							o.Categories.push({id: id});
							categories.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg"});
						}
						else
						{
							o.Categories.push({id: id, sound: newData.sound});
							categories.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg"});
						}
						console.log(newData.title + " has been created in database!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					});
				});
			});
		}
		else
		{
			accounts.findOne({_id:getObjectId(userid)}, function(e, o) {
				phrases.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxphr) =>
				{
					categories.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxcat) =>
					{
						var id;
						if(maxphr[0]._id > maxcat[0]._id)
						{
							id = maxphr[0]._id + 1;
						}
						else
						{
							id = maxcat[0]._id + 1;
						}
						fs.writeFile("./app/public/users/"+o.user+"/"+newData.title+id+".jpg", files[0].buffer, (err) => {});
						if(newData.sound == '' || newData.sound == undefined)
						{
							o.Categories.push({id: id});
							categories.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg"});
						}
						else
						{
							o.Categories.push({id: id, sound: newData.sound});
							categories.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg"});
						}
						console.log(newData.title + " has been created in database!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					});
				});
			});
		}
	}
};

exports.addNewPharse = function(userid,newData, files, callback)
{
	if(newData.title == "")
	{
		console.log("Can't submit empty title!");
		callback('title-empty');
	}
	else
	{
		if(files == undefined || files[0] == undefined)
		{
			accounts.findOne({_id:getObjectId(userid)}, function(e, o) {
				phrases.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxphr) =>
				{
					categories.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxcat) =>
					{
						var id;
						if(maxphr[0]._id > maxcat[0]._id)
						{
							id = maxphr[0]._id + 1;
						}
						else
						{
							id = maxcat[0]._id + 1;
						}
						if(newData.albumID == '')
						{
							if(newData.sound == '' || newData.sound == undefined)
							{
								o.Phrases.push({id: id});
								phrases.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg"});
							}
							else
							{
								o.Phrases.push({id: id, sound: newData.sound});
								phrases.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg"});
							}
						}
						else
						{
							if(newData.sound == '' || newData.sound == undefined)
							{
								o.Phrases.push({id: id});
								phrases.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg" , albumID: newData.albumID});
							}
							else
							{
								o.Phrases.push({id: id, sound: newData.sound});
								phrases.insertOne({_id: id, title: newData.title, srct: "base-icb/ICB.jpg", albumID: newData.albumID});
							}
						}
						console.log(newData.title + " has been created in database!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					});
				});
			});
		}
		else
		{
			accounts.findOne({_id:getObjectId(userid)}, function(e, o) {
				phrases.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxphr) =>
				{
					categories.find().sort( [[ '_id', -1 ]] ).limit(1).toArray( (err, maxcat) =>
					{
						var id;
						if(maxphr[0]._id > maxcat[0]._id)
						{
							id = maxphr[0]._id + 1;
						}
						else
						{
							id = maxcat[0]._id + 1;
						}
						fs.writeFile("./app/public/users/"+o.user+"/"+newData.title+id+".jpg", files[0].buffer, (err) => {});
						if(newData.albumID == '')
						{
							if(newData.sound == '' || newData.sound == undefined)
							{
								o.Phrases.push({id: id});
								phrases.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg"});
							}
							else
							{
								o.Phrases.push({id: id, sound: newData.sound});
								phrases.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg"});
							}
						}
						else
						{
							if(newData.sound == '' || newData.sound == undefined)
							{
								o.Phrases.push({id: id});
								phrases.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg" , albumID: newData.albumID});
							}
							else
							{
								o.Phrases.push({id: id, sound: newData.sound});
								phrases.insertOne({_id: id, title: newData.title, srct: o.user+"/"+newData.title+id+".jpg" , albumID: newData.albumID});
							}
						}
						console.log(newData.title + " has been created in database!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					});
				});
			});
		}
	}
};

exports.ConnectToCompanion = function(compuser,callback)
{
	accounts.findOne({user:compuser}, function(e, o) {
		if (o) {
			console.log("Connecting to sub user: "+ compuser);
			callback(null, o);
		}
		console.log(compuser + " Not found in the data base!");
	});
};

exports.updateAccount = function(id,newData, callback)
{
	accounts.findOne({email:newData.email}, function(e, o) {
		if (o && o._id != id) {
			console.log(newData.email + " is taken!");
			callback('email-taken');
		}
		else
		{
			accounts.findOne({_id:getObjectId(id)}, function(e, o) {
				if(newData.pass != "")
				{
					saltAndHash(newData.pass, function(hash){
						o.pass = hash;
						o.name = newData.name;
						o.email = newData.email;
						console.log(o.user + " has been updated!");
						accounts.findOneAndUpdate({_id:getObjectId(id)}, {$set:o}, {returnOriginal : false}, callback(null,o));
					});
				}
				else
				{
					o.name = newData.name;
					o.email = newData.email;
					console.log(o.user + " has been updated!");
					accounts.findOneAndUpdate({_id: getObjectId(id)}, {$set: o}, {returnOriginal: false}, callback(null, o));
				}
			});
		}
	});
}

exports.updatePassword = function(passKey, newPass, callback)
{
	saltAndHash(newPass, function(hash){
		newPass = hash;
		accounts.findOneAndUpdate({passKey:passKey}, {$set:{pass:newPass}, $unset:{passKey:''}}, {returnOriginal : false}, callback);
	});
}

/*
	account lookup methods
*/

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res);
	});
}

exports.getAllCategories = function(callback)
{
	categories.find().toArray(
		function(e, res) {
			if (e) callback(e)
			else callback(null, res);
		});
}

exports.getAllPhrases = function(callback)
{
	phrases.find().toArray(
		function(e, res) {
			if (e) callback(e)
			else callback(null, res);
		});
}

exports.deleteAccount = function(id, callback)
{
	console.log("The user has been deleted!");
	accounts.deleteOne({_id: getObjectId(id)}, callback);
}

exports.deleteTile = function(id, tileid, callback)
{
	var found = false;
	accounts.findOne({_id:getObjectId(id)}, function(e, o) {
		if (e)
		{
			console.log("Cannot find user!");
			callback(e);
		}
		else
		{
			categories.find().toArray(function(err, catarray)
			{
				var allalbums = [];
				for(var j=0; j<tileid.length; j++)
				{
					for(var i = 0; i<o.Categories.length && !found; i++)			// delete chosen category
					{
						if(o.Categories[i].id == tileid[j])
						{
							o.Categories.splice(i,1);
							found = true;
						}
					}
					for(var i = 0; i<o.Phrases.length && !found; i++)				// delete chosen phrase
					{
						if(o.Phrases[i].id == tileid[j])
						{
							o.Phrases.splice(i,1);
							found = true;
						}
					}
					for(var i = 0; i < catarray.length; i++)						// delete sub categories and save the ids
					{
						if(catarray[i].albumID == String(tileid[j]))
						{
							allalbums.push({albumID: String(catarray[i]._id)});
							for (var z = 0; z < o.Categories.length; z++) {
								if (o.Categories[z].id == catarray[i]._id) {
									o.Categories.splice(z, 1);
									break;
								}
							}
						}
						else if(catarray[i]._id == tileid[j])
						{
							allalbums.push({albumID: String(catarray[i]._id)});
						}
					}
					found =false;
				}
				if(allalbums.length > 0)
					phrases.find({$or : allalbums}).toArray(function(err, phraarray) {
						for (var j = 0; j < phraarray.length; j++) {
							for (var z = 0; z < o.Phrases.length; z++) {
								if (o.Phrases[z].id == phraarray[j]._id) {
									o.Phrases.splice(z, 1);
									break;
								}
							}
						}
						console.log("tiles has been deleted!");
						accounts.findOneAndUpdate({_id: getObjectId(id)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					});
				else
				{
					console.log("tiles has been deleted!");
					accounts.findOneAndUpdate({_id: getObjectId(id)}, {$set: o}, {returnOriginal: false}, callback(null, o));
				}
			});
		}
	});
}

exports.editTile = function(userid, newtitle, newsound,  newimage, tileid, callback)
{
	var found = false;
	accounts.findOne({_id:getObjectId(userid)}, function(e, o) {
		if (e)
		{
			console.log("Cannot find user!");
			callback(e);
		}
		else
		{
			for(var i=0; i<o.Phrases.length && !found; i++)					// searching in phrases
			{
				if(o.Phrases[i].id == Number(tileid))
				{
					found = true;
					if(newimage == undefined || newimage[0] == undefined)
					{
						if(newsound == undefined || newsound == '')
						{
							if(o.Phrases[i].sound != undefined && o.Phrases[i].srct != undefined)
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.Phrases[i].srct, sound: o.Phrases[i].sound}
							}
							else if(o.Phrases[i].sound != undefined)
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, sound: o.Phrases[i].sound};
							}
							else if (o.Phrases[i].srct != undefined)
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.Phrases[i].srct};
							}
							else
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle};
							}
							console.log("Tile has been edited!");
							accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
						}
						else
						{
							if(o.Phrases[i].srct != undefined)
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.Phrases[i].srct, sound: newsound};
							}
							else
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, sound: newsound};
							}
							console.log("Tile has been edited!");
							accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
						}
					}
					else
					{
						fs.writeFile("./app/public/users/"+o.user+"/"+newtitle+tileid+".jpg", newimage[0].buffer, (err) => {});
						if(newsound == undefined || newsound == '')
						{
							if(o.Phrases[i].sound != undefined)
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg", sound: o.Phrases[i].sound};
							}
							else
							{
								o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg" };
							}
						}
						else
						{
							o.Phrases[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg", sound: newsound};
						}
						console.log("Tile has been edited!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					}
				}
			}
			for(var i=0; i<o.Categories.length && !found; i++)
			{
				if(o.Categories[i].id == Number(tileid))
				{
					found = true;
					if(newimage == undefined || newimage[0] == undefined)
					{
						if(newsound == undefined || newsound == '')
						{
							if(o.Categories[i].sound != undefined && o.Categories[i].srct != undefined)
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.Categories[i].srct, sound: o.Categories[i].sound}
							}
							else if(o.Categories[i].sound != undefined)
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, sound: o.Categories[i].sound};
							}
							else if (o.Categories[i].srct != undefined)
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.Categories[i].srct};
							}
							else
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle};
							}
							console.log("Tile has been edited!");
							accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
						}
						else
						{
							if(o.Categories[i].srct != undefined)
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.Categories[i].srct, sound: newsound};
							}
							else
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, sound: newsound};
							}
							console.log("Tile has been edited!");
							accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
						}
					}
					else
					{
						fs.writeFile("./app/public/users/"+o.user+"/"+newtitle+tileid+".jpg", newimage[0].buffer, (err) => {});
						if(newsound == undefined || newsound == '')
						{
							if(o.Categories[i].sound != undefined)
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg", sound: o.Categories[i].sound};
							}
							else
							{
								o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg" };
							}
						}
						else
						{
							o.Categories[i] = {id: Number(tileid), title: newtitle, srct: o.user+"/"+newtitle+tileid+".jpg", sound: newsound};
						}
						console.log("Tile has been edited!");
						accounts.findOneAndUpdate({_id: getObjectId(userid)}, {$set: o}, {returnOriginal: false}, callback(null, o));
					}
				}
			}
		}
	});
};

/*exports.deleteAllAccounts = function(callback)					// if we want to restart the database
{
	accounts.deleteMany({}, callback);
};*/

/*
	private encryption & validation methods
*/

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
};

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
};

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
};

