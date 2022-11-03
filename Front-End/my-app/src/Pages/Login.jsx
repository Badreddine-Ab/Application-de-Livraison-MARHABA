import React, { useState, useContext,useEffect} from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";
import axios from "axios";
import {UserDataContext} from "../App";
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const navigate=useNavigate();
    let {connectedUserData,setUserData}=useContext(UserDataContext);
    let [error,setError]=useState('');
    const [form,setForm] = useState({
        email:'',
        password:''
    })

    const handleChange = e => {
        setForm({
           ...form, [e.target.name]: e.target.value
        })
      };

      const HandleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", form, {withCredentials: true});
            //login success
            setUserData(res.data);
            console.log(res.data);
          }catch(er){
            //login failed
            console.log(er.response)
            setError(er.response.data.message);
          }
     }

     useEffect(()=>{
        if(connectedUserData!==null){
          navigate('/user')
        }

      },[connectedUserData])
     

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            
            <Form Title="Login" to='/register' error={error} navigate="You don't have an account ?" redirect="Signup here" state={form} setState={setForm} HandleSubmit={HandleSubmit}>
                <Input handleChange={handleChange} state={form.email} setState={setForm} label="Your Email" placeHolder="badr@youcode.com" input="email"/>
                <Input handleChange={handleChange} state={form.password} setState={setForm} label="Your Password" placeHolder="*********" input="password"/>
            </Form>
        </div>
    <p className="text-white"> This is {JSON.stringify(form)}</p>
      </section>
    );
}