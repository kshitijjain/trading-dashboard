import React from 'react';

import { Checkbox } from 'semantic-ui-react';

import Position from './Position';

class Positions extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            expandAll: true,
            openPositionsOnly: false
        };
    }

    handleExpandAllToggle= () => {
        let expandAll= !this.state.expandAll;
        this.setState({expandAll});
    }

    handleOpenPositionsToggle= () => {
        let openPositionsOnly= !this.state.openPositionsOnly;
        this.setState({openPositionsOnly});
    }

    render(){
        let applyPositionFilters= (position) => {
            if(this.state.openPositionsOnly=== true)
                return position.isOpen;
            else
                return true;
        };

        return (
            <>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 20}}>
                    <Checkbox style={{marginRight: 12}} label='Open positions only' toggle checked={this.state.openPositionsOnly} onChange={this.handleOpenPositionsToggle} />
                    <Checkbox label={this.state.expandAll?'Collapse all':'Expand all'} toggle checked={this.state.expandAll} onChange={this.handleExpandAllToggle} />
                </div>

                {this.props.positions
                    .filter(applyPositionFilters)
                    .map((position) => <Position position={position} expandAll={this.state.expandAll}></Position>)
                }
            </>
        );
    }
}

export default Positions;