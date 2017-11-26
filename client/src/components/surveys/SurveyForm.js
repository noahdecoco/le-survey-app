import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    type="text"
                    component={SurveyField}
                    name={name}
                    key={name}
                    label={label}
                />
            );
        });
    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}>
                    {this.renderFields()}
                    <div style={{ marginTop: '20px' }}>
                        <Link
                            to="/surveys"
                            className="red btn-flat white-text left">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn-flat teal white-text right">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
