import { Icon } from '@iconify/react';
import {Link} from "react-router-dom"
export default function NavButton(props){
    return(
        <div className={ `${props.bgColor}  flex flex-col p-8 shadow-md hover:shodow-lg rounded-3xl max-w-2xl`}>
	<div className="flex items-center justify-between">
		<div className="flex items-center">
        <Icon icon="ant-design:login-outlined" width={60} color="#dcce78" rotate={props.rotate}/>
			<div className="flex flex-col ml-3">
				<div className={`font-medium leading-none ${props.textColor}`}>{props.navigate}</div>
				<p className={`text-sm  leading-none mt-1 ${props.textColor2}`}>{props.text}
				</p>
			</div>
		</div>
		<Link to={props.button}>
		<button  className="flex-no-shrink bg-gold px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-500 text-white rounded-full">{props.button}</button>
		</Link>
		
	</div>
</div>
    )
}
