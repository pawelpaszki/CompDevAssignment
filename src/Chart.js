import React from 'react';
import './App.css';
import BarChart from 'react-bar-chart';

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var Chart = React.createClass({
  render() {
    return (
        <div className="main-content-with-search-box">
		<div style={{width: '50%'}}>
                <BarChart ylabel='kg'
                  width={600} //this.state.width
                  height={400}
                  margin={margin}
                  data={this.props.data}/>
			</div>
        </div>
    );
  }
});

export default Chart;