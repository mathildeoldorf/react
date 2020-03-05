import React, {Component} from 'react';
import Table from './../../components/table/Table';
import {BounceLoader} from 'react-spinners';

export default class Cities extends Component{

    _isMounted = false;

    state = {
        data: [],
        isLoading: true
    }

    async componentDidMount(){
        this._isMounted = true;
        // fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities')
        // .then(response => response.json())
        // .then(response => 
        //     this.setState({data: response, isLoading: false})
        //     );

        const res = await fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities');
        const cities = await res.json();
        this.setState({data: cities, isLoading: false});
    }

    render(){

    console.log(this.state);

    const {data, isLoading} = this.state;
    
        return(
            <div>
                <p>Cities</p>
                { isLoading ?
                    <BounceLoader className="Loader" />
                :
                <Table columns={['City', 'State', 'District']} rows={data}/>
                }
            </div>
        );
    }
}