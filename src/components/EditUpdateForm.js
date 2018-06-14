import React from 'react';
import PropTypes from 'prop-types';
import withIntl from '../lib/withIntl';
import { defineMessages, FormattedNumber, FormattedMessage } from 'react-intl';
import { capitalize } from '../lib/utils';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import InputField from './InputField';
import HTMLEditor from './HTMLEditor';
import Button from './Button';
import { pick, get } from 'lodash';
import storage from '../lib/storage';

class EditUpdateForm extends React.Component {

  static propTypes = {
    update: PropTypes.object,
    LoggedInUser: PropTypes.object,
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.messages = defineMessages({
      'title.label': { id: 'updates.new.title.label', defaultMessage: "Title"}
    });

    this.state = {
      modified: false,
      update: props.update ? pick(props.update, 'title', 'html') : {},
      loading: false
    };

    this.storageKey = `EditUpdateForm#${get(this.props, 'update.id') || ''}`;
    console.log(">>> storageKey", this.storageKey);
  }

  componentDidMount() {
    const savedState = storage.get(this.storageKey);
    if (savedState && !this.props.update) {
      console.log(">>> restoring EditUpdateForm state", savedState);
      this.setState(savedState);
    }
    this._isMounted = true;
    this.forceUpdate();
  }

  handleChange(attr, value) {
    const update = {
      ...this.state.update,
      [attr]: value
    };
    const newState = { modified: true, update };
    storage.set(this.storageKey, newState);
    this.setState(newState)
    this.props.onChange && this.props.onChange(update);
  }

  async onSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    try {
      await this.props.onSubmit(this.state.update);
      this.setState({ modified: false, loading: false });
      storage.set(this.storageKey, null);
    } catch (e) {
      this.setState({ loading: false });
      console.error("EditUpdateForm onSubmit error", e);
    }
    return false;
  }

  render() {
    const { LoggedInUser, intl } = this.props;
    const { update } = this.state;
    if (!this._isMounted) return (<div />);

    return (
        <div className={`EditUpdateForm ${this.props.mode}`}>
        <style jsx>{`
          .EditUpdateForm {
            font-size: 1.2rem;
            overflow: hidden;
            margin: 0 1rem 5rem 1rem;
          }
          .col {
            float: left;
            display: flex;
            flex-direction: column;
            margin-right: 1rem;
            margin-top: 1rem;
          }
          .row {
            clear: both;
            margin-left: 0;
            margin-right: 0;
          }
          .row .col.large {
            width: 100%;
          }
          .row.actions {
            margin-top: 7rem;
          }
          label {
            text-transform: uppercase;
            color: #aaaeb3;
            font-weight: 300;
            font-family: lato, montserratlight, arial;
            white-space: nowrap;
          }
          .netAmountInCollectiveCurrency {
            font-weight: bold;
          }
          .error {
            color: red;
          }
        `}</style>
        <style global jsx>{`
          .EditUpdateForm .inputField {
            margin: 0;
          }

          .EditUpdateForm .help-block {
            font-size: 1.2rem;
          }

        `}</style>

        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col large">
              <InputField
                name="title"
                defaultValue={update.title}
                label={intl.formatMessage(this.messages['title.label'])}
                onChange={(title) => this.handleChange('title', title)}
                />
            </div>
          </div>
          <div className="row">
            <div className="col large">
              <HTMLEditor
                onChange={(html) => this.handleChange('html', html)}
                defaultValue={update.html}
                />
            </div>
          </div>

          <div className="row actions">
            <Button className="bluewhite" type="submit" ref="submit" disabled={this.state.loading} >
              { this.state.loading && <FormattedMessage id="form.processing" defaultMessage="processing" /> }
              { !this.state.loading && <FormattedMessage id="update.new.save" defaultMessage="Save Update" /> }
            </Button>
          </div>

          <div className="row">
            <div className="col large">
              { this.state.error &&
                <div className="error">
                  {this.state.error}
                </div>
              }
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default withIntl(EditUpdateForm);