import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
    state = { showSurveyReview: false };

    renderContent() {
        if (this.state.showSurveyReview) {
            return (
                <SurveyReview
                    onCancel={() => {
                        this.setState({ showSurveyReview: false });
                    }}
                />
            );
        }

        return (
            <SurveyForm
                onSurveySubmit={() => {
                    this.setState({ showSurveyReview: true });
                }}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({ form: 'surveyForm' })(SurveyNew);
