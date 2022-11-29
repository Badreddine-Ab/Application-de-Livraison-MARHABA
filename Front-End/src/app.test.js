import {render,screen} from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom'
import Login from '../src/Pages/Login';
import {BrowserRouter} from 'react-router-dom'


describe('Login', () => {

    test('should login page be rendred', () => { 
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        const email = screen.getByPlaceholderText(/badr@youcode.com/i)
        const password = screen.getByPlaceholderText(/password/i)

        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })
})