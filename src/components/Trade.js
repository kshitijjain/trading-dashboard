import React from "react";

class Trade extends React.Component{
    render(){
        let {trade}= this.props;

        return(
            <div>{trade.averagePrice}</div>
        );
    }
}

export default Trade;