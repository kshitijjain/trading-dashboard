import React from 'react';
import {Modal} from 'semantic-ui-react';

import Trade from "./Trade";

class Trades extends React.Component{
    render() {
        let {trades, showTrades, hideTrades}= this.props;

        return (
            <Modal open={showTrades} onClose={hideTrades}>
                <Modal.Content>
                    {trades.map(trade => <Trade trade={trade} />)}
                </Modal.Content>
            </Modal>
        );
    }
}

export default Trades;