import React from 'react';
import PropTypes from 'prop-types';

import CreateOrganization from '../components/CreateOrganization';
import Loading from '../components/Loading';

import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import withLoggedInUser from '../lib/withLoggedInUser';

class CreateOrganizationPage extends React.Component {

  static propTypes = {
    getLoggedInUser: PropTypes.func.isRequired, // from withLoggedInUser
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = await getLoggedInUser();
    this.setState({ LoggedInUser, loading: false });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />)
    }

    return (
      <div>
        <CreateOrganization LoggedInUser={this.state.LoggedInUser} />
      </div>
    );
  }
}

export default withData(withIntl(withLoggedInUser(CreateOrganizationPage)));
