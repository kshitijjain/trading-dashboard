import React from 'react';
import {List, Modal, Header} from 'semantic-ui-react';

import Trade from "./Trade";

class Trades extends React.Component{
    render() {
        let {trades, showTrades, hideTrades}= this.props;

        return (
            <Modal open={showTrades} onClose={hideTrades}>
                <Modal.Header>Trades</Modal.Header>
                <Modal.Content>
                    <List divided verticalAlign='middle'>
                        {trades.map((trade, index) => <Trade key={index} trade={trade} />)}
                    </List>
                </Modal.Content>
            </Modal>
        );
    }
}

export default Trades;