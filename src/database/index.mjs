import rr from 'realm'

export const Realm = rr

export const UserSchema = {
	name: 'User',
	primaryKey: 'RN',
	properties: {
		name:  'string',
		age: {type: 'int', default: 0},
		RN: 'int',
		picture: 'data?'
  }
}

// export const PersonSchema = {
//   name: 'Person',
//   properties: {
//     name:     'string',
//     birthday: 'date',
//     cars:     'Car[]',
//     picture:  'data?' // optional property
//   }
// }

// Realm.open({schema: [CarSchema, PersonSchema]})
//   .then(realm => {
//     // Create Realm objects and write to local storage
//     realm.write(() => {
//       const myCar = realm.create('Car', {
//         make: 'Honda',
//         model: 'Civic',
//         miles: 1000,
//       });
//       myCar.miles += 20; // Update a property value
//     });

//     // Query Realm for all cars with a high mileage
//     const cars = realm.objects('Car').filtered('miles > 1000');

//     // Will return a Results object with our 1 car
//     cars.length // => 1

//     // Add another car
//     realm.write(() => {
//       const myCar = realm.create('Car', {
//         make: 'Ford',
//         model: 'Focus',
//         miles: 2000,
//       });
//     });

//     // Query results are updated in realtime
//     cars.length // => 2
//   })
//   .catch(error => {
//     console.log(error);
//   });