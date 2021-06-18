import React, { Component } from 'react';

class Unit extends Component {
    state = { 
        unit:this.props.unit,
     }
    render() { 
        return ( 
            <div className="unitDisplayWrapper">
                <div className="unitDisplay">
                <p>{this.state.unit}</p>
                <p>{this.props.value}</p>
                </div>
            </div>
            );
    }
}
 
export default Unit;