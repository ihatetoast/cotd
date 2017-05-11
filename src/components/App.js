import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor(){
		super();
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		//ye olde getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}
	componentWillMount(){
		//runs right before the app is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			,{
				context: this,
				state: 'fishes'
			});
		//check local storage to see if there's anything in there from orders
		// JSON.parse(localStorageRef) turns obj into string
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeID}`);
		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}
	componentWillUnmount(){
		base.removeBinding(this.ref);
	}
	componentWillUpdate(nextProps, nextState){

		// console.log("something happened, Tates");
		// console.log({nextProps, nextState});
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
	}
	addFish(fish){
		//update state
		const fishes = {...this.state.fishes};
		//add in new fish
		const timestamp = Date.now();//unique number
		fishes[`fish-${timestamp}`] = fish;//makes a key
		//set state fishes in this addFish set to fishes in state above in constructor
		this.setState({fishes: fishes});
	}
	loadSamples(){
		this.setState({
			fishes: sampleFishes
		});
	}
	addToOrder(key){//requires an argument 
		//update state
		const order = {...this.state.order};
		//update order number
		order[key] = order[key] + 1 || 1;
		this.setState({order: order});//this.setState({order})
	}
	render(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
		
					<ul className="list-of-fishes">
				{/*key is for react. index is for me to pass down*/}
						{Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}

export default App;




























