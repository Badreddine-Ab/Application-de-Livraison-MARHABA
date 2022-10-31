import NavButton from "../Components/Landing Page/NavButton";
import Header from "../Components/Register/Header";

export default function LandingPage(){
    return (
		
      
<div className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0  justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900">
<Header/>
<NavButton rotate="0" bgColor="bg-white" textColor='text-dark-600' textColor2="text-gray-600" navigate="Create an Account" button="register" text="Create ana account so you can have access to our application"/>
<NavButton rotate="2" bgColor="bg-gray-800" textColor='text-gray-100' textColor2="text-gray-500" navigate ="Sign in" button="login" text="Login using your information so you can have access to your page"/>


</div>

    )
}