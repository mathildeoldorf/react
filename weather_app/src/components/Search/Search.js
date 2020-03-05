import React, {Component} from 'react';
import './Search.css';
// import Axios from 'axios';
import cities from './../../data/city.list.json';

export default class Search extends Component {

    state = {
        city: undefined,
        isLoading: undefined, 
        results: []
    }

    handleInput = (event) => {
        let input = event.target.value;
        if(input.length >= 4){
            const searchResults = [];
            cities.map((singleCity) => {
                if(singleCity.name.startsWith(input)){
                    let singleCityData = {
                        name: singleCity.name,
                        country: singleCity.country
                    }
                    return searchResults.push(singleCityData);
                }

                return searchResults;
                
            });

            this.setState({
                city: event.target.value,
                isLoading: true
            });

            this.handleShowSearchResults(searchResults);
        }
    }

    handleClearSearch = (result) => {
        this.setState({
            city: result
        });
        document.querySelector('.Search').value = '';
        document.querySelector('.Search-results').classList.remove('show');
        document.querySelector('.Search-results').classList.add('hide');
        setTimeout(() => {
            this.handleSendSearchRequestData(result);
        }, 200);
    }

    handleSendSearchRequestData = () => {
        this.props.parentCallbackSearchData(this.state);
   }

   handleShowSearchResults = (results) => {
        if(results.length !== 0){
            this.setState({
                results: results
            });
            document.querySelector('.Search-results').classList.remove('hide');
            document.querySelector('.Search-results').classList.add('show');
        }
        return
   }

    render(){

        const { results } = this.state;

        return(
            <div>
                <input className="Search" type="text" placeholder="Search by typing the name of the city"  onChange={ (event) => this.handleInput(event) }/>
                    <button className="Search-button" onClick={ () => this.handleSendSearchRequestData()}>Search</button>
                <div className="Search-results">

                {   
                this.state.results.length !== 0 ?
                results.map( (result, index) => {
                    
                    console.log(result.name);
                    return (
                    <p className='Search-result' key={'result' + index} onClick={ () => this.handleClearSearch(result.name + ',' + result.country)}>{result.name + ', ' + result.country} </p> 
                    );
                })
                :
                console.log('no-results')
                // <p className='Search-result'>No results</p> 
                
                }
                </div>
            </div>
        );
    }
}