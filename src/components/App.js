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
		this.removeFish = this.removeFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		//ye olde getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}
	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

	if(localStorageRef) {
	// update our App component's order state
		this.setState({
			order: JSON.parse(localStorageRef)
		});
    }
  }

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}
	componentWillUpdate(nextProps, nextState){

		// console.log("something happened, Tates");
		// console.log({nextProps, nextState});
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
	updateFish(key, updatedFish){
		const fishes = {...this.state.fish};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}
	removeFish(key){
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes })
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
	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	}
	render(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
		
					<ul className="list-of-fishes">
						{Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder} />
				<Inventory 
					addFish={this.addFish} 
					loadSamples={this.loadSamples} 
					removeFish={this.removeFish}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					storeId={this.props.params.storeId}/>
			</div>
		)
	}
}

App.propTypes ={
	params: React.PropTypes.object.isRequired
}

export default App;




























