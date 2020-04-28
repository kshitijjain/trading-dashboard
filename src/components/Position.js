import React from 'react';

import { Accordion, Icon , Grid, Label} from 'semantic-ui-react'

import Contracts from './Contracts'

class Position extends React.Component{

    constructor(props){
        super(props);

        this.state= {
            isAccordianOpen: true
        }
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
            <Accordion fluid styled style={{marginBottom: 20, border: position.positionProfit>=0?'1px solid green':'1px solid red'}}>
                    <Accordion.Title
                    active={this.state.isAccordianOpen}
                    onClick={this.handleClick}
                    >
                        <Grid >
                            <Grid.Column mobile={16} tablet={8} computer={1}>
                                <Icon name='dropdown' />
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={6}>
                                {position.name}
                                {position.isOpen && <Label horizontal color={'blue'} style={{marginLeft: 5}}>Open</Label>}
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={2}>
                                {position.spot}
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={3}>
                                <Label horizontal color='teal'>
                                    {position.strategy}
                                </Label>

                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={2}>
                                {position.capital}
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={8} computer={2}>
                                <Label horizontal style={{background: position.positionProfit>=0?'green':'red', borderColor: position.positionProfit>=0?'green':'red', color: '#fff'}} ribbon='right' >
                                    {position.positionProfit} ({position.positionProfitPercentage}%)
                                </Label>
                            </Grid.Column>
                        </Grid>
                    </Accordion.Title>

                    <Accordion.Content active={this.state.isAccordianOpen} >
                        <Contracts contracts= {position.contracts} />
                    </Accordion.Content>
                </Accordion>
        );
    }
}

export default Position;