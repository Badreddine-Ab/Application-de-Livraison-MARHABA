const request =  require("supertest");
const app = require("../../server")

describe('POST api/auth/login', () => {
    describe('given a email and a password', () => {
        // check if the email and the password are in the database
        test('should respond with success message', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'badrestronger@gmail.com',
                password:'badr123'
            })
            expect(res.statusCode).toBe(200)
        }) 
        //should respond with a 200 stuts code
    })

    describe('when a email or a password are missing', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'',
                password:''
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    describe('when an email or a password are missing', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'',
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    describe('when a email or a password are missing', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'',
                password:''
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    describe('when a email not found', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'badrfffes@gmail.com',
                password:'badr123'
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    describe('when a email or a password are missing', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'',
                password:''
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    describe('when a wrong password ', () => {
        //should respond with a status code of 400
        test('should respond with a status code of 400', async() => {
            const res = await request(app).post('/api/auth/login').send({
                email:'badrestronger@gmail.com',
                password:'badr'
            })
            expect(res.statusCode).toBe(400)
        }) 
    })

    
    


})