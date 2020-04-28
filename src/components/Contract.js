import React from 'react';
import {Label, Table} from 'semantic-ui-react';

import Trades from "./Trades";

class Contract extends React.Component{
    constructor(props) {
        super(props);

        this.state= {
            showTrades: false
        }
    }

    handleContractRowClick= () => {
        this.setState({showTrades: true});
    }

    hideTrades= () => {
        this.setState({showTrades: false});
    }

    render(){
        let {contract}= this.props;
        let {showTrades}= this.state;

        return (
            <>
               <Table.Row style={{cursor: 'pointer'}} onClick={this.handleContractRowClick}>
                    <Table.Cell>{contract.expiry} {contract.strike}  {contract.type} {contract.isOpen && <Label horizontal color={'blue'} style={{marginLeft: 5}}>Open</Label>}</Table.Cell>
                    <Table.Cell>{contract.lots}</Table.Cell>
                    <Table.Cell>{contract.side}</Table.Cell>
                    <Table.Cell>
                        <Label horizontal style={{background: contract.contractProfit>=0?'green':'red', borderColor: contract.contractProfit>=0?'green':'red', color: '#fff'}}>
                            {contract.contractProfit}
                        </Label>
                    </Table.Cell>
                </Table.Row>

                <Trades trades={contract.trades} showTrades={showTrades} hideTrades={this.hideTrades} />
            </>
        );
    }
}

export default Contract;