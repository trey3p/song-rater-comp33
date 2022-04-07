import React from 'react';
import {Button} from 'reactstrap';
import Ratings from './Ratings';
import Albums from './Albums';

class Rm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selectedTab: ''
        }
    }

    setTab = (tab) => {
        this.setState({selectedTab: tab})
    }

    selectedTab = () => {
        switch(this.state.selectedTab){
            case 'A':
                return <Ratings />
            case 'B':
                return <Albums />
            default:
                return <div>Hey</div>
        }
    }

    render() {
        return(
            <div>
                
                <Button onClick={() => this.setTab('A')}> Ratings </Button>
                <Button onClick={() => this.setTab('B')}> Albums </Button>
                <Button onClick={() => this.setTab('C')}>  Homepage</Button>
                
                {this.selectedTab()}
            </div>
        )
    }  
}

export default Rm;