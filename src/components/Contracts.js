import React from 'react';

import Contract from './Contract';

class Contracts extends React.Component{

    render(){
        let {contracts}= this.props;

        console.log('contracts is', contracts);

        return (
            contracts.map(contract => <Contract contract={contract} />)
        );
    }
}

export default Contracts;