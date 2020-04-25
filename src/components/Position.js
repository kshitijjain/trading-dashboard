import React from 'react';

import { Accordion, Icon } from 'semantic-ui-react'

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
            <div>
                <Accordion fluid styled>
                    <Accordion.Title
                    active={this.state.isAccordianOpen}
                    onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        {position.name}
                    </Accordion.Title>

                    <Accordion.Content active={this.state.isAccordianOpen}>
                        <Contracts contracts= {position.contracts} />
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
}

export default Position;