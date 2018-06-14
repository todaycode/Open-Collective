import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import { addCreateCollectiveMutation } from '../graphql/mutations';
import moment from 'moment-timezone';
import CreateCollectiveForm from '../components/CreateCollectiveForm';
import CollectiveCover from '../components/CollectiveCover';
import SignInForm from '../components/SignInForm';
import { Button } from 'react-bootstrap';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

class CreateCollective extends React.Component {

  static propTypes = {
    host: PropTypes.object
  }

  constructor(props) {
    super(props);
    const timezone = moment.tz.guess();
    this.state = { collective: { type: 'COLLECTIVE' }, result: {} };
    this.createCollective = this.createCollective.bind(this);
    this.error = this.error.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  error(msg) {
    this.setState({ result: { error: msg }})
  }

  resetError() {
    this.error();
  }

  async createCollective(CollectiveInputType) {
    const { host, LoggedInUser } = this.props;
    if (!CollectiveInputType.tos || (get(host, 'settings.tos') && !CollectiveInputType.hostTos)) {
      this.setState( { result: { error: "Please accept the terms of service" }})
      return;
    }
    this.setState( { status: 'loading' });
    CollectiveInputType.type = 'COLLECTIVE';
    CollectiveInputType.HostCollectiveId = host.id;
    CollectiveInputType.tags = [...host.tags] || [];
    if (CollectiveInputType.category) {
      CollectiveInputType.tags.push(CollectiveInputType.category);
    }
    delete CollectiveInputType.category;
    delete CollectiveInputType.tos;
    delete CollectiveInputType.hostTos;

    try {
      const res = await this.props.createCollective(CollectiveInputType);
      const collective = res.data.createCollective;
      const collectiveUrl = `${window.location.protocol}//${window.location.host}/${collective.slug}?status=collectiveCreated&CollectiveId=${collective.id}`;
      this.setState({ status: 'idle', result: { success: `Collective created successfully` }});
      window.location.replace(collectiveUrl);
    } catch (err) {
      console.error(">>> createCollective error: ", JSON.stringify(err));
      const errorMsg = (err.graphQLErrors && err.graphQLErrors[0]) ? err.graphQLErrors[0].message : err.message;
      this.setState( { status: 'idle', result: { error: errorMsg }})
      throw new Error(errorMsg);
    }
  }

  render() {
    const { LoggedInUser, host } = this.props;
    const canApply = get(host, 'settings.apply');

    const title = `Apply to create a new collective on ${host.name}`;

    return (
      <div className="CreateCollective">
        <style jsx>{`
          .result {
            text-align: center;
            margin-bottom: 5rem;
          }
          .success {
            color: green;
          }
          .error {
            color: red;
          }
          .CollectiveTemplatePicker {
            max-width: 700px;
            margin: 0 auto;
          }
          .CollectiveTemplatePicker .field {
            margin: 0;
          }
          .login {
            margin: 0 auto;
            text-align: center;
          }
        `}</style>

          <Header
            title={title}
            description={host.description}
            twitterHandle={host.twitterHandle}
            image={host.image || host.backgroundImage}
            className={this.state.status}
            LoggedInUser={LoggedInUser}
            />

          <Body>

          <CollectiveCover
            href={`/${host.slug}`}
            title={title}
            collective={host}
            style={get(host, 'settings.style.hero.cover')}
            />

          <div className="content" >

            { !canApply &&
              <div className="error">
                <p><FormattedMessage id="collectives.create.error.HostNotOpenToApplications" defaultMessage="This host is not open to applications" /></p>
              </div>
            }
            { canApply && !LoggedInUser &&
              <div>
                <h2><FormattedMessage id="collectives.create.signin" defaultMessage="Sign in or create an Open Collective account" /></h2>
                <SignInForm next={`/${host.slug}/apply`} />
              </div>
            }
            { canApply && LoggedInUser &&
              <div>

                <CreateCollectiveForm
                  host={host}
                  collective={this.state.collective}
                  onSubmit={this.createCollective}
                  onChange={this.resetError}
                  />

                <div className="result">
                  <div className="success">{this.state.result.success}</div>
                  <div className="error">{this.state.result.error}</div>
                </div>
              </div>
            }
          </div>
          </Body>

          <Footer />
      </div>
    );
  }

}

export default addCreateCollectiveMutation(CreateCollective);