import React from 'react';

import Contract from './Contract';
import { Table } from 'semantic-ui-react'
class Contracts extends React.Component{

    render(){
        let {contracts}= this.props;

        console.log('contracts is', contracts);

        return (
            <Table singleLine celled selectable style={{width:'90%', marginLeft:'5%', marginTop:'10px',marginBottom:'10px', border: '1px solid'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Contract</Table.HeaderCell>
                        <Table.HeaderCell>Lots</Table.HeaderCell>
                        <Table.HeaderCell>Side</Table.HeaderCell>
                        <Table.HeaderCell>P&L</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {contracts.map(contract => <Contract contract={contract} />)}
                </Table.Body>
            </Table>
        );
    }
}

export default Contracts;