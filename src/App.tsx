import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Col, Divider, Input, InputNumber, Row, Select } from 'antd';
import { calculate } from './algorithm';

const { Option } = Select;

export enum PossibleOptions {
	UNKNOWN = '?',
	VOLTORB = 'V',
	ONE = 1,
	TWO = 2,
	THREE = 3,
}

interface State {
	bodyGrid: PossibleOptions[][];
	rightGrid: number[][];
	bottomGrid: number[][];
	possibleOptions: PossibleOptions[];
}

const defaultState: State = {
	bodyGrid: [
		[PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN],
		[PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN],
		[PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN],
		[PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN],
		[PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN, PossibleOptions.UNKNOWN],
	],
	rightGrid: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	bottomGrid: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	possibleOptions: [PossibleOptions.UNKNOWN, PossibleOptions.VOLTORB, PossibleOptions.ONE, PossibleOptions.TWO, PossibleOptions.THREE],
};

class App extends React.Component {
	state: State = defaultState;

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Row>
						<Col>
							{this.state.bodyGrid.map((el, outerIndex) => {
								return (
									<Row className="row" key={outerIndex}>
										{el.map((innerEl, innerIndex) => {
											return (
												<Col className="column" key={innerIndex}>
													<Input.Group compact>
														<Select
															className="input"
															value={this.state.bodyGrid[outerIndex][innerIndex]}
															onChange={(value) => {
																const newGrid = this.state.bodyGrid;
																newGrid[outerIndex][innerIndex] = value;
																this.setState({ bodyGrid: newGrid });
															}}
														>
															{this.state.possibleOptions.map((option) => (
																<Option value={option} key={option}>
																	{option}
																</Option>
															))}
														</Select>
													</Input.Group>
												</Col>
											);
										})}
									</Row>
								);
							})}
							<Row>
								{this.state.bottomGrid.map((el, outerIndex) => {
									return (
										<Col className="column" key={outerIndex}>
											{el.map((innerEl, innerIndex) => {
												return (
													<Row className="row bottomRow" key={innerIndex}>
														<InputNumber
															className="input"
															min={0}
															max={15}
															value={this.state.bottomGrid[outerIndex][innerIndex]}
															onChange={(value) => {
																const newGrid = this.state.bottomGrid;
																newGrid[outerIndex][innerIndex] = value;
																this.setState({ bottomGrid: newGrid });
															}}
														></InputNumber>
													</Row>
												);
											})}
										</Col>
									);
								})}
							</Row>
						</Col>
						<Col>
							{this.state.rightGrid.map((el, outerIndex) => {
								return (
									<Row className="row" key={outerIndex}>
										{el.map((innerEl, innerIndex) => {
											return (
												<Col className="column columnSides" key={innerIndex}>
													<InputNumber
														className="input"
														min={0}
														max={15}
														value={this.state.rightGrid[outerIndex][innerIndex]}
														onChange={(value) => {
															const newGrid = this.state.rightGrid;
															newGrid[outerIndex][innerIndex] = value;
															this.setState({ rightGrid: newGrid });
														}}
													></InputNumber>
												</Col>
											);
										})}
									</Row>
								);
							})}
						</Col>
					</Row>
					<Divider />
					<div style={{ width: '100%' }}>
						<Button className="button" onClick={() => calculate(this.state.bodyGrid, this.state.bottomGrid, this.state.rightGrid)}>
							Calculate
						</Button>
						<Button className="button" href="/">
							Reset
						</Button>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
