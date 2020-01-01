import React, {Component} from 'react';
import styled from 'styled-components';

// The progress bar itself
const Bar = styled.div`
    width: ${props => props.percentage * 100}%;
    height: 20px;
    margin: 15px auto;
    background: #2B34B0;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #000;
    align: left;

    left: 13.54%;
    right: 75.42%;
    top: 77.13%;
    bottom: 20.37%;
`;

// The text displaying the percentage of completion
const ProgressText = styled.div`
    left: 19.11%;
    right: 75.42%;
    top: 72.96%;
    bottom: 25.56%;

    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 16px;

    color: #2B34B0;
`

class ProgressBar extends Component {
    render() {
        return (
            <div>
                <ProgressText>{Math.round(this.props.percentage * 100)}% completed</ProgressText>
                <Bar percentage={this.props.percentage}/>
            </div>
        )
    }
}

export default ProgressBar;