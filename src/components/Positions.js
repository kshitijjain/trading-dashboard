import React from 'react';
import {Checkbox, Dropdown, Button, Label} from 'semantic-ui-react';
import './Positions.css';

import Position from './Position';
import spots from '../constants/spots.json';

class Positions extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            expandAll: true,
            showOpenPositions: false,
            selectedSpotList: [],
            profitLossFilterValue: 'all'
        };
    }

    handleExpandAllToggle= () => {
        let expandAll= !this.state.expandAll;
        this.setState({expandAll});
    }

    handleOpenPositionsToggle= (showOpenPositions) => {
        this.setState({showOpenPositions});
    }

    handleSpotFilter= (selectedSpotList) => {
        this.setState({selectedSpotList});
    }

    handleProfitLossFilter= (profitLossFilterValue) => {
        this.setState({profitLossFilterValue});
    };

    render(){
        let {positions}= this.props;
        let {selectedSpotList, showOpenPositions: showOpenPositions, profitLossFilterValue}= this.state;

        let spotList= () => (
            spots.map(spot => ({
                key: spot,
                value: spot,
                text: spot
            }))
        );

        let applyPositionFilters= (position) => {
            let openPositionFilter= () => showOpenPositions?position.isOpen:!position.isOpen;
            let spotFilter= () => (selectedSpotList.length=== 0 || selectedSpotList.includes(position.spot));
            let profitLossFilter= () => (profitLossFilterValue==='all'?true:(profitLossFilterValue=== 'profitable'?position.positionProfit>=0:position.positionProfit<=0));

            return openPositionFilter() && spotFilter() && profitLossFilter();
        };

        let filteredPositions= positions.filter(applyPositionFilters);

        // let {totalProfit, realizedProfit, unrealizedProfit}= filteredPositions.reduce(({totalProfit, realizedProfit, unrealizedProfit}, position) => {
        //     totalProfit+=position.netProfit;
        //     if(position.isOpen) unrealizedProfit+= position.netProfit;
        //     else realizedProfit+= position.netProfit;
        //     return {totalProfit, realizedProfit, unrealizedProfit};
        // }, {totalProfit: 0, realizedProfit: 0, unrealizedProfit: 0});

        let {grossRealizedProfit, totalBrokerage, netRealizedProfit, totalPositions, profitPositions, lossPositions}= filteredPositions.reduce(({grossRealizedProfit, totalBrokerage, netRealizedProfit, totalPositions, profitPositions, lossPositions}, position) => {
            if(!position.isOpen){
                grossRealizedProfit+=position.positionProfit;
                netRealizedProfit+= position.netProfit;
                if(position.netProfit>=0) profitPositions++; else lossPositions++;
            }
            totalBrokerage+= position.brokerage;
            totalPositions++;
            return {grossRealizedProfit, totalBrokerage, netRealizedProfit, totalPositions, profitPositions, lossPositions};
        }, {grossRealizedProfit: 0, totalBrokerage: 0, netRealizedProfit: 0, totalPositions: 0, profitPositions: 0, lossPositions: 0});

        return (
            <>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Dropdown style={{marginRight: 12}} placeholder='Underlying' multiple search selection clearable options={spotList()} value={selectedSpotList} onChange={(e, {value}) => this.handleSpotFilter(value)} />

                    <Button.Group style={{marginRight: 12}}>
                        <Button className={profitLossFilterValue==='all' && 'active-button'} toggle active={profitLossFilterValue=== 'all'} onClick={() => this.handleProfitLossFilter('all')}>All</Button>
                        <Button.Or />
                        <Button  toggle active={profitLossFilterValue=== 'profitable'} onClick={() => this.handleProfitLossFilter('profitable')}>Profitable only</Button>
                        <Button.Or />
                        <Button toggle active={profitLossFilterValue=== 'lossMaking'} onClick={() => this.handleProfitLossFilter('lossMaking')}>Loss making only</Button>
                    </Button.Group>

                    <Button.Group style={{marginRight: 12}}>
                        <Button toggle active={!showOpenPositions} onClick={() => this.handleOpenPositionsToggle(false)}>Closed Positions</Button>
                        <Button.Or />
                        <Button toggle active={showOpenPositions} onClick={() => this.handleOpenPositionsToggle(true)}>Open Positions</Button>
                    </Button.Group>
                </div>

                <div style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        {!showOpenPositions &&
                            <Label size='large' style={{background: grossRealizedProfit>=0?'green': 'red', color: '#fff'}}>
                                Gross realized P&L: {grossRealizedProfit}
                            </Label>
                        }

                        <Label size='large' color='blue'>
                            Total brokerage: {totalBrokerage}
                        </Label>

                        {!showOpenPositions &&
                            <Label size='large'
                                   style={{background: netRealizedProfit >= 0 ? 'green' : 'red', color: '#fff'}}>
                                Net realized P&L: {netRealizedProfit}
                            </Label>
                        }
                    </div>

                    <Checkbox toggle label={this.state.expandAll?'Collapse all':'Expand all'} checked={this.state.expandAll} onChange={this.handleExpandAllToggle} />
                </div>

                {filteredPositions
                    .map((position) => <Position key={position.id} position={position} expandAll={this.state.expandAll}></Position>)
                }

                <div>
                    <Label size='large' color='blue'>
                        Total positions: {totalPositions}
                    </Label>

                    {!showOpenPositions &&
                        <Label size='large' style={{background: 'green', color: '#fff'}}>
                            Positions in profit: {profitPositions}
                        </Label>
                    }

                    {!showOpenPositions &&
                    <Label size='large' color='red'>
                        Positions in loss: {lossPositions}
                    </Label>
                    }
                </div>
            </>
        );
    }
}

export default Positions;