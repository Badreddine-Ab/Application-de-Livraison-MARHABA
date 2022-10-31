import React from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";

export default function Registration() {
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            <Form Title="Create an account" to="/login">
                <Input label="Your Email" placeHolder="badr@youcode.com" input="email"/>
                <Input label="Your Username" placeHolder="Badrestronger" input="text"/>
                <Input label="Your Password" placeHolder="*********" input="password"/>
                <label for="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>

                <select id="roles" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gold focus:border-gold block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gold dark:focus:border-gold">
                <option selected>Select Your Role</option>
                <option value="id">Client</option>
                <option value="id">DelevreyMan</option>
                <option value="id">Manager</option>
                </select>
            </Form>
        </div>
      </section>
    );
}