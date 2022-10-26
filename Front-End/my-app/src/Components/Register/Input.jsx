export default function Input(props){
  
    return(
    <div>
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
        <input type={props.input} name={props.input} id={props.input} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeHolder} required=""/>
    </div>
    )
}