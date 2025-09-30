// // import mongoose from "mongoose";
// // import { MongoMemoryServer } from "mongodb-memory-server";
// // import { expect } from "chai";
// // import User from "../../users/user";

// // let MongoServer;

// // before( async() =>{
// //     MongoServer = await MongoMemoryServer.create();
// //     const uri = MongoServer.getUri();
// //     await mongoose.connect(uri, {
// //         useNewUriparser: true,
// //         useUnifiedTopolopy: true,
// //     });
// // });


// // // clear the database before each test
// // after(async () => {
// //     await mongoose.connection.dropDatabase();
// //     await mongoose.connection.close();
// //     await MongoServer.stop();
// // });

// // describe;

// // ("User model Test", () => {
// //     it("create & save user successfully", async () => {
// //         const validuser = new User({name: "oluwapelumi", email: "rachealoluwapelumi@gmail.com"});
// //         const savedUser = await validuser.save();
// //         expect(savedUser._id).toBeDefined();
// //         expect(savedUser.name).toBe("oluwapelumi");
// //         expect(savedUser.email).toBe("rachealoluwapelumi@gmail.com")
// //     })
// // })

// import { expect } from 'chai';
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import User from '../../users/user';

// describe('User Model', () => {
//   let MongoServer;

//   beforeAll(async () => {
//     MongoServer = await MongoMemoryServer.create();
//     const uri = MongoServer.getUri();
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     await MongoServer.stop();
//   });

//   beforeEach(async () => {
//     await User.deleteMany({}); // Clear database before each test
//   });

//   it('should save a user with all required fields', async () => {
//     const userData = {
//       id: 1,
//       name: 'John Doe',
//     };
//     const user = new User(userData);
//     const savedUser = await user.save();

//     expect(savedUser._id).to.exist;
//     expect(savedUser.id).to.equal(1);
//     expect(savedUser.name).to.equal('John Doe');
//     expect(savedUser.createdAt).to.exist;
//     expect(savedUser.updatedAt).to.exist;
//   });

//   it('should fail to save a user without required id', async () => {
//     const userData = {
//       name: 'John Doe',
//     };
//     const user = new User(userData);

//     let error;
//     try {
//       await user.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.id).to.exist;
//     expect(error.errors.id.message).to.include('required');
//   });

//   it('should fail to save a user without required name', async () => {
//     const userData = {
//       id: 1,
//     };
//     const user = new User(userData);

//     let error;
//     try {
//       await user.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.name).to.exist;
//     expect(error.errors.name.message).to.include('required');
//   });

//   it('should trim whitespace from name', async () => {
//     const userData = {
//       id: 1,
//       name: '  John Doe  ',
//     };
//     const user = new User(userData);
//     const savedUser = await user.save();

//     expect(savedUser.name).to.equal('John Doe');
//   });

//   it('should enforce unique id constraint', async () => {
//     const userData1 = {
//       id: 1,
//       name: 'John Doe',
//     };
//     const userData2 = {
//       id: 1,
//       name: 'Jane Smith',
//     };

//     await new User(userData1).save();

//     let error;
//     try {
//       await new User(userData2).save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('MongoServerError');
//     expect(error.code).to.equal(11000); // Duplicate key error
//   });
// });