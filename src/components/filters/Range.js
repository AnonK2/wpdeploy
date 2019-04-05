import React, { Component } from 'react';
import Slider from 'react-input-range';
class Range extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.state = { value: 0 }
  }

  onChange = (val) => {

    // TODO: fix this!!!
    // this.props.input.value = values;
    this.setState({ value: val });
  };

  render() {
    // let { input: { value } } = this.props;

    return (
      <div className="range-slider">
        <label>{this.props.label}</label>
        <Slider
          onChange={this.onChange}
          minValue={parseInt(this.props.range.min)}
          maxValue={parseInt(this.props.range.max)}
          // value={value || this.props.range}
          value={this.state.value}
          onChangeComplete={value => console.log(value)}
        />
      </div>
    );
  }
};

Range.defaultProps = {
  range: { min: 0, max: 100 }
};

export { Range };
