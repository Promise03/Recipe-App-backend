// import request from 'supertest';
// import app from './index'
// import { expect } from 'chai';
// import mongoose from 'mongoose';
// import { dbConnection } from './config/dbConnection';

// describe('API Endpoints', () => {
//   beforeAll(async () => {
//     // Connect to a test database if needed
//     // For production DB, ensure dbConnection is called in index.js or mock it
//     await dbConnection();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close(); // Close MongoDB connection
//   });

// describe('GET /', () => {
//     it('should return Hello World', async () => {
//       const response = await request(app).get('/');
//       console.log('GET / Status:', response.statusCode, 'Body:', response.body);
//       expect(response.statusCode).to.equal(200);
//       expect(response.text).to.equal('Hello World');
//     });
//   });

//   describe('GET /api/user', () => {
//     it('should return an array of users', async () => {
//       const response = await request(app).get('/api/user');
//       console.log('GET /api/user Status:', response.statusCode, 'Body:', response.body);
//       expect(response.statusCode).to.equal(200);
//       expect(response.body).to.deep.equal([
//         { id: 1, name: 'John Doe' },
//         { id: 2, name: 'Jane Smith' }
//       ]);
//     });
//   });
// });