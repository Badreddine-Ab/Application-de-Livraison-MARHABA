import React from "react";
import Header from "../Components/Register/Header"
import Form from "../Components/Register/Form"


export default function Registration() {
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Header/>
            <Form Title="Create an account"/>
        </div>
      </section>
    );
}