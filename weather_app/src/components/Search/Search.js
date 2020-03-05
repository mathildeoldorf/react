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
                cities.map((singleCity, index) => {
                    if(singleCity.name.startsWith(input)){
                        let singleCityData = {
                            name: singleCity.name,
                            country: singleCity.country
                        }
                        // document.querySelector('.Search-results').innerHTML = singleCityData.name + singleCityData.country;
                        return searchResults.push( singleCityData);
                    }
    
                    return searchResults;
                    
                });

                this.handleShowSearchResults(searchResults);
            }

        this.setState({
            city: event.target.value,
            isLoading: true
        });
    }

    handleClearSearch = (result) => {
        console.log('clearing');
        document.querySelector('.Search-results').style.display = 'none';
        document.querySelector('.Search').value = '';
        setTimeout(() => {
            this.handleSendSearchRequestData(result);
        }, 200);
        
    }

    handleSendSearchRequestData = () => {
        this.props.parentCallbackSearchData(this.state);
   }

   handleShowSearchResults = (results) => {
       console.log(results);
        if(results.length !== 0){
            console.log('there is results');

            this.setState({
                results: results
            });
            
        }
        else{
            console.log('no results');
        }
   }

    render(){

        const {results} = this.state;

        return(
            <div>
                <input className="Search" type="text" placeholder="Search by typing the name of the city"  onChange={ (event) => this.handleInput(event) }/>
                <div className="Search-results">

                {   
                this.state.results.map !== 0 ?
                results.map( (result, index) => {
                    console.log(result.name);
                    document.querySelector('.Search-results').style.display = 'block';
                    return (
                    <p className='Search-result' key={'result' + index} onClick={ () => this.handleClearSearch(result)}>{result.name + ' | ' + result.country} </p> 
                    );
                })
                :
                console.log('no results')
                }
         
                </div>
                <button className="Search-button" onClick={ () => this.handleSendSearchRequestData()}>Search</button>
            </div>
        );
    }
}