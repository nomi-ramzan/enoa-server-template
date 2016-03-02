/**********************
* CLASS: User         *
* MODEL: User         *
* Version : 1.0       *
**********************/
orm.loadCollection(
	Waterline.Collection.extend({
		identity: 'user',
		connection: 'myLocalOrient',
		attributes: {
			firstName: 'string',
			lastName: 'string',
			// Add a reference to Pets
			pets: {
				collection: 'pet',
				via: 'owner'
			}
		}
	})
);
