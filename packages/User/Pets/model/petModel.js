/**********************
* CLASS: Pet          *
* MODEL: Pet          *
* Version : 1.0       *
**********************/
orm.loadCollection(
	Waterline.Collection.extend({
		identity: 'pet',
		connection: 'myLocalOrient',
		attributes: {
			breed: 'string',
			type: 'string',
			name: 'string',
			// Add a reference to User
			owner: {
				model: 'user'
			}
		}
	})
);
