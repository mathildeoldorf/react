import React, {Component} from 'react';
import './Search.css';
import Axios from 'axios';
import getCountryISO2 from 'country-iso-3-to-2';

const APIkey = 'cB21szIO9BPCX6bU9ZYfWRg0ttZ9ugXptQxsJXUsVA4';

export default class Search extends Component {

    state = {
        city: undefined,
        isLoading: undefined, 
        results: []
    }

    async handleFetchSearchResults (event) {
        const input = event.target.value;
        const searchResults = [];

        if(input.length >= 3){
            
            const data = await Axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${input}&apiKey=${APIkey}`);
            const suggestions = data.data.suggestions;
            if(suggestions.length !== 0){

                suggestions.map((singleSuggestion) => {

                    if((singleSuggestion.matchLevel === "county" ) && singleSuggestion.address.county !== undefined){

                        let singleSuggestionData = {
                            name: singleSuggestion.address.county,
                            country: getCountryISO2(singleSuggestion.countryCode)
                        }

                        return searchResults.push(singleSuggestionData);

                    }        

                });
            
                this.setState({
                    city: input,
                    isLoading: true,
                    results: searchResults
                });
            }
        } 

        this.handleShowSearchResults(searchResults);
    }

    handleShowSearchResults = (results) => {
        if(results.length){
            document.querySelector('.Search-results').classList.remove('hide');
            document.querySelector('.Search-results').classList.add('show');
        } else {
            document.querySelector('.Search-results').classList.remove('show');
            document.querySelector('.Search-results').classList.add('hide');
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

    render(){

        const { results } = this.state;

        return(
            <div>
                <input className="Search" type="text" placeholder="Search by typing the name of the city"  onChange={ (event) => this.handleFetchSearchResults(event) }/>
                    <button className="Search-button" onClick={ () => this.handleSendSearchRequestData()}>Search</button>
                <div className="Search-results">

                {   
                results.length !== 0 ?
                results.map( (result, index) => {
                    
                    console.log(result.name);
                    return (
                    <p className='Search-result' key={'result' + index} onClick={ () => this.handleClearSearch(result.name + ',' + result.country)}>{result.name + ', ' + result.country} </p> 
                    );
                })
                
                : 
                
                <p className='Search-result'>No results</p> 

                // :
                // console.log('nothinf')
                
                }
                </div>
            </div>
        );
    }
}