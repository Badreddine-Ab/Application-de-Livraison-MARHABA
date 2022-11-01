import React, {useRef, useState} from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";

export default function Login() {

    const [form,setForm] = useState({
        email:'',
        password:''
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
            <Form Title="Login" to='/register' state={form} setState={setForm} >
                <Input handleChange={handleChange} state={form.email} setState={setForm} label="Your Email" placeHolder="badr@youcode.com" input="email"/>
                <Input handleChange={handleChange} state={form.password} setState={setForm} label="Your Password" placeHolder="*********" input="password"/>
            </Form>
        </div>
    
      </section>
    );
}