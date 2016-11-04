import React from 'react';
import './App.css';

var UserInfo = React.createClass({
	render: function() {
		return (
		<div className="main-content-without-search-box">
			<div className="left-within-main">
				 <table className="table">
					<thead>
					  <tr>
						<th>User name</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>dob</td>
					  </tr>
					  <tr>
						<td>Training from</td>
					  </tr>
					</tbody>
				</table>
			</div>
				<div className="right-within-main">
				<img className="thumb" src="assets/users/4.jpg" alt="placeholder"/>
			</div>
		</div>
		)
	}
});

export default UserInfo;