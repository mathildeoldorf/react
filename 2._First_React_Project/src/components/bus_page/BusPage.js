import React, {Component} from 'react';
import BusWheel from './BusWheel';

export default class Bus extends Component{
    render(){
        const wheel1 = {number:1, direction: "front"};
        const wheel2 = {number:2, direction: "front"};
        const wheel3 = {number:3, direction: "back"};
        const wheel4 = {number:4, direction: "back"};

        const wheels = [wheel1, wheel2, wheel3, wheel4];

        return(
            <div>
                <h1>The bus</h1>
                {wheels.map((singlewheel, i) => {
                    console.log('Wheel'+i)
                    return( <BusWheel key={'wheel'+i} wheel={singlewheel} />
                    );
                })
                }
                
            </div>
        )
    }  
}