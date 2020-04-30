import React from 'react';

import {Checkbox, Dropdown, Button, Label} from 'semantic-ui-react';

import Position from './Position';
import spots from '../constants/spots.json';

class Positions extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            expandAll: false,
            openPositionsOnly: false,
            selectedSpotList: [],
            profitLossFilterValue: 'all'
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

    handleProfitLossFilter= (profitLossFilterValue) => {
        this.setState({profitLossFilterValue});
    };

    render(){
        let {positions}= this.props;
        let {selectedSpotList, openPositionsOnly, profitLossFilterValue}= this.state;

        let spotList= () => (
            spots.map(spot => ({
                key: spot,
                value: spot,
                text: spot
            }))
        );

        let applyPositionFilters= (position) => {
            let openPositionFilter= () => openPositionsOnly?position.isOpen:true;
            let spotFilter= () => (selectedSpotList.length=== 0 || selectedSpotList.includes(position.spot));
            let profitLossFilter= () => (profitLossFilterValue==='all'?true:(profitLossFilterValue=== 'profitable'?position.positionProfit>=0:position.positionProfit<=0));

            return openPositionFilter() && spotFilter() && profitLossFilter();
        };

        let filteredPositions= positions.filter(applyPositionFilters);

        let {totalProfit, realizedProfit, unrealizedProfit}= filteredPositions.reduce(({totalProfit, realizedProfit, unrealizedProfit}, position) => {
            totalProfit+=position.positionProfit;
            if(position.isOpen) unrealizedProfit+= position.positionProfit;
            else realizedProfit+= position.positionProfit;
            return {totalProfit, realizedProfit, unrealizedProfit};
        }, {totalProfit: 0, realizedProfit: 0, unrealizedProfit: 0});

        return (
            <>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Dropdown style={{marginRight: 12}} placeholder='Underlying' multiple search selection clearable options={spotList()} value={selectedSpotList} onChange={(e, {value}) => this.handleSpotFilter(value)} />

                    <Button.Group style={{marginRight: 12}}>
                        <Button toggle active={profitLossFilterValue=== 'all'} onClick={() => this.handleProfitLossFilter('all')}>All</Button>
                        <Button.Or />
                        <Button toggle active={profitLossFilterValue=== 'profitable'} onClick={() => this.handleProfitLossFilter('profitable')}>Profitable only</Button>
                        <Button.Or />
                        <Button toggle active={profitLossFilterValue=== 'lossMaking'} onClick={() => this.handleProfitLossFilter('lossMaking')}>Loss making only</Button>
                    </Button.Group>

                    <Checkbox toggle style={{marginRight: 12}} label='Open positions only'  checked={openPositionsOnly} onChange={this.handleOpenPositionsToggle} />
                </div>

                <div style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <Label size='large' style={{background: totalProfit>=0?'green': 'red', color: '#fff'}}>
                            Total P&L: {totalProfit}
                        </Label>
                        {!openPositionsOnly &&
                            <Label size='large' style={{background: realizedProfit>=0?'green': 'red', color: '#fff'}}>
                                Realized P&L: {realizedProfit}
                            </Label>
                        }
                        <Label size='large' style={{background: unrealizedProfit>=0?'green': 'red', color: '#fff'}}>
                            Unrealized P&L: {unrealizedProfit}
                        </Label>
                    </div>

                    <Checkbox toggle label={this.state.expandAll?'Collapse all':'Expand all'} checked={this.state.expandAll} onChange={this.handleExpandAllToggle} />
                </div>

                {filteredPositions
                    .map((position) => <Position key={position.id} position={position} expandAll={this.state.expandAll}></Position>)
                }
            </>
        );
    }
}

export default Positions;