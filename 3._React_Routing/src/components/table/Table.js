import React, {Component} from 'react';
import './Table.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class myTable extends Component{

    componentDidMount(){
        
    }

    render(){
        const {columns, rows} = this.props;
    
        return(  
            <TableContainer>
                <h1>Table</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                        {columns.map((column, i) => {
                            console.log(column);
                            return( 
                                <TableCell key={'table-header' + i} column={column}> 
                                    {column}
                                </TableCell>  
                            );
                        })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* <tr> */}
                    {rows.map((row, i) => {

                        return <TableRow key={"table-row" + i}>{columns.map( column => {
                            return(
                                <TableCell key={column+i}>{row[column]}</TableCell>
                            );
                        })
                        }</TableRow>

                        
                    })
                    }
                    {/* </tr> */}
                    </TableBody>
                    
                </Table>
            </TableContainer>
        );
    }
}