import React from 'react';

import { Checkbox,Dropdown } from 'semantic-ui-react';

import Position from './Position';
import spots from '../constants/spots.json';

class Positions extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            expandAll: false,
            openPositionsOnly: false,
            selectedSpotList: []
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

    handleSpotFilter= (selectedSpotList) => {
        this.setState({selectedSpotList});
    }

    render(){
        let {positions}= this.props;
        let {selectedSpotList, openPositionsOnly}= this.state;

        let applyPositionFilters= (position) => {
            if(selectedSpotList.length=== 0 || selectedSpotList.includes(position.spot)){
                if(openPositionsOnly=== true)
                    return position.isOpen;
                else
                    return true;
            }
            else return false;
        };

        let spotList= () => (
            spots.map(spot => ({
                key: spot,
                value: spot,
                text: spot
            }))
        );

        return (
            <>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
                    <Dropdown style={{marginRight: 12}} placeholder='Underlying' multiple search selection clearable options={spotList()} value={selectedSpotList} onChange={(e, {value}) => this.handleSpotFilter(value)} />
                    <Checkbox style={{marginRight: 12}} label='Open positions only' toggle checked={openPositionsOnly} onChange={this.handleOpenPositionsToggle} />
                    <Checkbox label={this.state.expandAll?'Collapse all':'Expand all'} toggle checked={this.state.expandAll} onChange={this.handleExpandAllToggle} />
                </div>

                {positions
                    .filter(applyPositionFilters)
                    .map((position) => <Position key={position.id} position={position} expandAll={this.state.expandAll}></Position>)
                }
            </>
        );
    }
}

export default Positions;