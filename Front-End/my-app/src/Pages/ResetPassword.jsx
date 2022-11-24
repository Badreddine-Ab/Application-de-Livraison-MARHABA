import React, { useState, useContext,useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"
import Input from "../Components/Register/Input";
import axios from "axios";



export default function ResetPassword() {
   

    let [error,setError]= useState('');
    let [response,setResponse]= useState('');

    const [form,setForm] = useState({
        password:'',
    })

    const handleChange = e => {
        setForm({
           ...form, [e.target.name]: e.target.value
        })
      };

      const HandleSubmit = async(e) => {
        e.preventDefault()
        try {
          const response = axios.post(`http://localhost:8080/api/auth/resetPassword/${token}`, form, Credential=true)


          setResponse((await response).data)

        } catch (error) {
          console.log(error)
        }
       

     }

     let { token } = useParams()

    return (
        
             <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            
            <Form Title="Forget Password"  error={error} response={response}   state={form} setState={setForm} HandleSubmit={HandleSubmit} method="post">
            <Input handleChange={handleChange} state={form.password} name="newpassword" setState={setForm} label="Your new Password"  input="password"/>
            </Form>
        </div>
  
      </section>
        
    );
};

