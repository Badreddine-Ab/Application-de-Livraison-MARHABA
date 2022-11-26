import React , {useState, useContext} from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

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

      let [error,setError]=useState('');

      const HandleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", form);
            //registersuccess
           setError(res.data.message)
            console.log(res.data);
          }catch(er){
            //register failed
            console.log(er.response)
            setError(er.response.data.message);
          }
     }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            <Form Title="Create an account" error={error} to="/login" navigate="Already have an account ?" redirect="Signin here"  HandleSubmit={HandleSubmit}>
                <Input name="email" handleChange={handleChange} state={form.email} setState={setForm} label="Your Email" placeHolder="badr@youcode.com" input="email"/>
                <Input name="username" handleChange={handleChange} state={form.username} setState={setForm} label="Your Username" placeHolder="Badrestronger" input="username"/>
                <Input name="password" handleChange={handleChange} state={form.password} setState={setForm} label="Your Password" placeHolder="*********" input="password"/>
                <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>

                <select id="roles" onChange={handleChange} name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gold focus:border-gold block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gold dark:focus:border-gold">
                <option select hidden>Select Your Role</option>
                <option value="635226b5fff4bebfd4790ce9">Client</option>
                <option value="634e5dbf1a111ed3d51f7e6a">DelevreyMan</option>
                <option value='634e5dbf1a111ed3d51f7e69' >Manager</option>
                </select>
            </Form>
        </div>
        <p className="text-white"> This is {JSON.stringify(form)}</p>
      </section>
    );
}