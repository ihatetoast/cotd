import React from 'react';
import { getFunName } from '../helpers.js';


class StorePicker extends React.Component{
	goToStore(event){
		event.preventDefault();
		const storeId = this.storeInput.value;
		console.log(`going to ${storeId} now`);
		this.context.router.transitionTo(`/store/${storeId}`)
		//1: grab the text from the box
		//2: transition from / to /store/:storeId
	}
	render(){
		return (
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
		{/**/}
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=>{this.storeInput=input}}/>
				<button type="submit">Visit Store 👉🏽</button>
			</form>
		)
	}
}

StorePicker.contextTypes ={
	router: React.PropTypes.object
}

export default StorePicker;



















