import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyForm = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h1>Survey Review</h1>
            {reviewFields}
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={onCancel}
                    className="white-text btn-flat yellow darken-3 left">
                    Cancel
                </button>
                <button
                    onClick={() => submitSurvey(formValues, history)}
                    className="white-text btn-flat green darken-3 right">
                    Submit
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyForm));
