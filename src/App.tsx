import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Col, Input, Row, Select } from 'antd';

const { Option } = Select;

enum PossibleOptions {
	UNKNOWN = '?',
	VOLTORB = 'V',
	ONE = '1',
	TWO = '2',
	THREE = '3',
}

interface State {
	bodyGrid: string[][];
	possibleOptions: PossibleOptions[];
}

const defaultState: State = {
	bodyGrid: buildGrid(),
	possibleOptions: [PossibleOptions.UNKNOWN, PossibleOptions.VOLTORB, PossibleOptions.ONE, PossibleOptions.TWO, PossibleOptions.THREE],
};

function buildGrid(): PossibleOptions[][] {
	return Array(5).fill(Array(5).fill(PossibleOptions.UNKNOWN));
}

class App extends React.Component {
	state: State = defaultState;

	render() {
		return (
			<div className="App">
				<header className="App-header">
					{this.state.bodyGrid.map((el, outerIndex) => {
						return (
							<Row id="bodyRow" align="bottom" gutter={10}>
								{el.map((innerEl, innerIndex) => {
									return (
										<Col>
											<Input.Group compact>
												<Select
													defaultValue={this.state.bodyGrid[outerIndex][innerIndex]}
													onChange={(value) => {
														console.log(outerIndex + ' ' + innerIndex);
														const newGrid = this.state.bodyGrid;
														newGrid[outerIndex][innerIndex] = value as PossibleOptions;
														this.setState({ bodyGrid: newGrid });
													}}
												>
													{this.state.possibleOptions.map((option) => (
														<Option value={option}>{option}</Option>
													))}
												</Select>
											</Input.Group>
										</Col>
									);
								})}
							</Row>
						);
					})}
				</header>
			</div>
		);
	}
}

export default App;
