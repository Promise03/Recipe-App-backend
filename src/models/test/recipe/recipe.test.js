// import { expect } from 'chai';
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import Recipe from '../../recipe/recipe';

// describe('Recipe Model', () => {
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
//     await Recipe.deleteMany({}); // Clear database before each test
//   });

//   it('should save a recipe with all required fields', async () => {
//     const recipeData = {
//       title: 'Test Recipe',
//       ingredients: 'Flour, Sugar, Eggs',
//       instructions: 'Mix ingredients and bake.',
//       image: 'http://example.com/image.jpg',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);
//     const savedRecipe = await recipe.save();

//     expect(savedRecipe._id).to.exist;
//     expect(savedRecipe.title).to.equal('Test Recipe');
//     expect(savedRecipe.ingredients).to.equal('Flour, Sugar, Eggs');
//     expect(savedRecipe.instructions).to.equal('Mix ingredients and bake.');
//     expect(savedRecipe.image).to.equal('http://example.com/image.jpg');
//     expect(savedRecipe.videoUrl).to.equal('http://example.com/video.mp4');
//     expect(savedRecipe.createdAt).to.exist;
//     expect(savedRecipe.updatedAt).to.exist;
//   });

//   it('should fail to save a recipe without required title', async () => {
//     const recipeData = {
//       ingredients: 'Flour, Sugar, Eggs',
//       instructions: 'Mix ingredients and bake.',
//       image: 'http://example.com/image.jpg',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);

//     let error;
//     try {
//       await recipe.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.title).to.exist;
//     expect(error.errors.title.message).to.include('required');
//   });

//   it('should fail to save a recipe without required ingredients', async () => {
//     const recipeData = {
//       title: 'Test Recipe',
//       instructions: 'Mix ingredients and bake.',
//       image: 'http://example.com/image.jpg',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);

//     let error;
//     try {
//       await recipe.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.ingredients).to.exist;
//     expect(error.errors.ingredients.message).to.include('required');
//   });

//   it('should fail to save a recipe without required instructions', async () => {
//     const recipeData = {
//       title: 'Test Recipe',
//       ingredients: 'Flour, Sugar, Eggs',
//       image: 'http://example.com/image.jpg',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);

//     let error;
//     try {
//       await recipe.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.instructions).to.exist;
//     expect(error.errors.instructions.message).to.include('required');
//   });

//   it('should fail to save a recipe without required image', async () => {
//     const recipeData = {
//       title: 'Test Recipe',
//       ingredients: 'Flour, Sugar, Eggs',
//       instructions: 'Mix ingredients and bake.',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);

//     let error;
//     try {
//       await recipe.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.image).to.exist;
//     expect(error.errors.image.message).to.include('required');
//   });

//   it('should fail to save a recipe without required videoUrl', async () => {
//     const recipeData = {
//       title: 'Test Recipe',
//       ingredients: 'Flour, Sugar, Eggs',
//       instructions: 'Mix ingredients and bake.',
//       image: 'http://example.com/image.jpg',
//     };
//     const recipe = new Recipe(recipeData);

//     let error;
//     try {
//       await recipe.save();
//     } catch (err) {
//       error = err;
//     }

//     expect(error).to.exist;
//     expect(error.name).to.equal('ValidationError');
//     expect(error.errors.videoUrl).to.exist;
//     expect(error.errors.videoUrl.message).to.include('required');
//   });

//   it('should trim whitespace from title', async () => {
//     const recipeData = {
//       title: '  Test Recipe  ',
//       ingredients: 'Flour, Sugar, Eggs',
//       instructions: 'Mix ingredients and bake.',
//       image: 'http://example.com/image.jpg',
//       videoUrl: 'http://example.com/video.mp4',
//     };
//     const recipe = new Recipe(recipeData);
//     const savedRecipe = await recipe.save();

//     expect(savedRecipe.title).to.equal('Test Recipe');
//   });
// });