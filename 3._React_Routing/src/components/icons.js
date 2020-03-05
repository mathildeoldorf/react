import React, {Component} from 'react';
import { FaBeer, FaSun } from 'react-icons/fa'; // importing an icon from a package inside react-icons

export default class Question extends Component {
    render() {
        return (
            <div>
                <h3> Lets go for a <FaBeer fill={'orange'} />? </h3>
                <FaSun />
            </div>
        );
    };
}