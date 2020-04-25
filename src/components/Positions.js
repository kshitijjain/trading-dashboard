import React from 'react';

import { Checkbox } from 'semantic-ui-react';

import Position from './Position';

class Positions extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            expandAll: false
        };
    }

    handleExpandAllChange= () => {
        let expandAll= !this.state.expandAll;
        this.setState({expandAll});
    }

    render(){
        return (
            <div>
                <Checkbox style={{marginBottom:'30px'}} 
                label={this.state.expandAll?'Collapse all':'Expand all'}
                toggle checked={this.state.expandAll} onChange={this.handleExpandAllChange} />

                {this.props.positions.map((position) => <Position position={position} expandAll={this.state.expandAll}></Position>)}
            </div>
        );
    }
}

export default Positions;