import React from 'react';

import { Accordion, Icon , Grid, Label} from 'semantic-ui-react'

import Contracts from './Contracts'

class Position extends React.Component{

    constructor(props){
        super(props);

        this.state= {
            isAccordianOpen: false
        };
    }

    componentDidMount(){
        this.setState({
            isAccordianOpen: this.props.expandAll
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.expandAll!== prevProps.expandAll){
            this.setState({
                isAccordianOpen: this.props.expandAll
            });
        }
     }

    handleClick= () => {
        let isAccordianOpen= !this.state.isAccordianOpen;

        this.setState({isAccordianOpen});
    }

    render(){
        let {position}= this.props;

        return (
            <Accordion fluid styled style={{marginBottom: 10, border: position.positionProfit>=0?'1px solid green':'1px solid red'}}>
                    <Accordion.Title
                    active={this.state.isAccordianOpen}
                    onClick={this.handleClick}
                    >
                        <Grid style={{display: 'flex', alignItems: 'center'}}>
                            <Grid.Column mobile={16} tablet={6} computer={5}>
                                <Icon name='dropdown' />
                                {position.name}
                                {position.isOpen && <Label horizontal color={'teal'} style={{marginLeft: 5}}>Open</Label>}
                            </Grid.Column>

                            <Grid.Column style={{display: 'flex', alignItems: 'center'}} mobile={16} tablet={10} computer={3}>
                                {position.spot}
                                <Label horizontal color='teal' style={{marginLeft: 5}}>
                                    {position.strategy}
                                </Label>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={6} computer={2}>
                                Capital: {position.capital}
                            </Grid.Column>

                            <Grid.Column style={{display: 'flex', justifyContent: 'flex-end'}} mobile={16} tablet={10} computer={6}>
                                    {/*<Label horizontal style={{background: position.positionProfit>=0?'green':'red', borderColor: position.positionProfit>=0?'green':'red', color: '#fff'}}  >*/}
                                    {/*    Profit {position.positionProfit} ({position.positionProfitPercentage.toFixed(2)}%)*/}
                                    {/*</Label>*/}
                                    {/*<Label horizontal color={'teal'} style={{marginLeft: 5}}>Brokerage {position.brokerage}</Label>*/}
                                    <Label horizontal size='large' style={{background: position.netProfit>=0?'green':'red', borderColor: position.positionProfit>=0?'green':'red', color: '#fff'}}>
                                        Net Profit {position.netProfit} ({position.netProfitPercentage.toFixed(2)}%)
                                    </Label>
                            </Grid.Column>
                        </Grid>
                    </Accordion.Title>

                    <Accordion.Content active={this.state.isAccordianOpen} >
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Label horizontal style={{background: position.positionProfit>=0?'green':'red', borderColor: position.positionProfit>=0?'green':'red', color: '#fff'}}  >
                                Gross Profit {position.positionProfit} ({position.positionProfitPercentage.toFixed(2)}%)
                            </Label>
                            <Label horizontal color='blue' style={{marginLeft: 5}}>Brokerage {position.brokerage}</Label>
                        </div>
                        <Contracts contracts= {position.contracts} />
                    </Accordion.Content>
                </Accordion>
        );
    }
}

export default Position;