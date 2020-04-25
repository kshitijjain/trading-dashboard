import React from 'react';

class Contract extends React.Component{

    render(){
        let {contract}= this.props;

        return (
            <div>{`${contract.strike} ${contract.type}`}</div>
        );
    }
}

export default Contract;