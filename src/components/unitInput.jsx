import React, { Component } from 'react';
import Unit from './unitOutput'
import { Dropdown, DropdownButton } from 'react-bootstrap';
//convert everything to mm
class Inputfield extends Component {
    state = {  
        length_units:{
            "Millimetre":999,
            "Centimeter":10,
            "Meter":1000,
            "Kilometre":1e+6,
            "Inch":25.4,
            "Feet":304.8,
            "Yard":914,
            "Mile":1.609e+6
        },
        unit:"Feet",
        unit_types:[
            {id:"Inch", value:0},
            {id:"Feet", value:0},
            {id:"Yard", value:0},
            {id:"Mile", value:0},
            {id:"Millimetre", value:0},
            {id:"Centimeter", value:0},
            {id:"Meter", value:0},
            {id:"Kilometre",value:0}
        ],
        current_input_value:0
    };
    getCurrentInput(unit){
        
        const unit_types = this.state.unit_types;
        const input_value = this.state.current_input_value;
        for(var i=0; i<this.state.unit_types.length; i++){
            //console.log(this.state.unit,i, input_value,this.state.length_units[this.state.unit],this.state.length_units[this.state.unit_types[i].id]);
            unit_types[i].value=((input_value*this.state.length_units[unit])/this.state.length_units[this.state.unit_types[i].id]).toPrecision(6);
            this.setState({ unit_types });
        }

    }
    
    doHandleCalc = event => {
        this.setState({current_input_value:event.target.value});
        const unit_types = this.state.unit_types;
        const input_value = event.target.value;
        for(var i=0; i<this.state.unit_types.length; i++){
            //console.log(this.state.unit,i, input_value,this.state.length_units[this.state.unit],this.state.length_units[this.state.unit_types[i].id]);
            unit_types[i].value=((input_value*this.state.length_units[this.state.unit])/this.state.length_units[this.state.unit_types[i].id]).toPrecision(6);
            this.setState({ unit_types });
    
        }
    }
    doChangeUnit = event =>{
        console.log(this.state.unit);
        this.setState({unit:event});
        this.getCurrentInput(event);
    }

    render() { 
        return ( 
            <div>
                <div className="inputFieldWrapper">
                <input className="inputField" 
                type="number"
                placeholder="Measurement"
                onChange={this.doHandleCalc}
                min="0"
                onKeyDown={ (evt) => (evt.key === 'e'  && evt.preventDefault()) || (evt.key === '+'  && evt.preventDefault()) || (evt.key === '-'  && evt.preventDefault())}
                />
                <DropdownButton title={this.state.unit}>
                    {this.state.unit_types.map(unitId => <Dropdown.Item onSelect={this.doChangeUnit} eventKey={unitId.id}>{unitId.id}</Dropdown.Item>)}
                </DropdownButton>
                </div>
                <div className="result">
                <div className="conversionResultArea">
                {this.state.unit_types.map(unit => <Unit key={unit.id} unit={unit.id} value={unit.value}/>)}
                </div>
                </div>
            </div>
         );
    }

    
}
 
export default Inputfield;

//<input id="value" type="number" placeholder="Measurement" oninput="calc(this.value)" onchange="calc(this.value)">