import React, { Component } from 'react';

class VideoCounter extends Component {

    render() {
        let { goals } = this.props;
        return (
            <div>
                <span>{this.props.goals.length} видео в списке</span>
            </div>);
    }
};
export default VideoCounter;
