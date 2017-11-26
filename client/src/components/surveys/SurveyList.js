import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderContent() {
        return _.map(this.props.surveys, survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">
                            Title: {survey.title}
                        </span>
                        <p>Body: {survey.body}</p>
                        <p>Yes: {survey.yes}</p>
                        <p>No: {survey.no}</p>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);
