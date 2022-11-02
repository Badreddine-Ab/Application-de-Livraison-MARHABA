import React , {useState} from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";

export default function Registration() {
    
    const [form,setForm] = useState({
        email:'',
        password:'',
        username:'',
        role:''
    })

    const handleChange = e => {
        setForm({
           ...form, [e.target.name]: e.target.value
        })
      };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            <Form Title="Create an account" to="/login">
                <Input handleChange={handleChange} state={form.email} setState={setForm} label="Your Email" placeHolder="badr@youcode.com" input="email"/>
                <Input handleChange={handleChange} state={form.username} setState={setForm} label="Your Username" placeHolder="Badrestronger" input="username"/>
                <Input handleChange={handleChange} state={form.password} setState={setForm} label="Your Password" placeHolder="*********" input="password"/>
                <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>

                <select id="roles" onChange={handleChange} name="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gold focus:border-gold block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gold dark:focus:border-gold">
                <option select hidden>Select Your Role</option>
                <option value="id1">Client</option>
                <option value="id2">DelevreyMan</option>
                <option value="id3">Manager</option>
                </select>
            </Form>
        </div>
        <p className="text-white"> This is {JSON.stringify(form)}</p>
      </section>
    );
}