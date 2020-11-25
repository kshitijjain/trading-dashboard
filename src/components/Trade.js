import React from "react";
import {List, Label} from 'semantic-ui-react';

class Trade extends React.Component{
    render(){
        let {trade}= this.props;

        return(
                <List.Item style={{display:'flex', alignItems:'center'}}>
                    <Label horizontal style={{background: trade.side==='sell'?'green':'#2185d0', color:'#fff'}} size="large">{trade.side==='sell'?'Sell':'Buy'}</Label>
                    <List.Content>
                        <List.Header as='a'>Date: {trade.date}</List.Header>
                        <List.Description>
                            Lots: {trade.lots} Price: {trade.averagePrice}
                        </List.Description>
                    </List.Content>
                </List.Item>
        );
    }
}

export default Trade;