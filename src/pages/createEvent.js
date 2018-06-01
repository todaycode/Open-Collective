import React from 'react';
import PropTypes from 'prop-types';

import CreateEvent from '../components/CreateEvent';
import NotFound from '../components/NotFoundPage';
import Loading from '../components/Loading';

import { addCollectiveData } from '../graphql/queries';

import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import withLoggedInUser from '../lib/withLoggedInUser';

class CreateEventPage extends React.Component {

  static getInitialProps ({ query: { parentCollectiveSlug } }) {
    return { slug: parentCollectiveSlug }
  }

  static propTypes = {
    slug: PropTypes.string, // for addCollectiveData
    data: PropTypes.object.isRequired, // from withData
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

    const { data } = this.props;

    if (this.state.loading) {
      return (<Loading />)
    }

    if (!data.loading && !data.Collective) {
      return (<NotFound />)
    }

    return (
      <CreateEvent parentCollective={data.Collective} LoggedInUser={this.state.LoggedInUser} />
    );
  }
}

export default withData(withIntl(withLoggedInUser(addCollectiveData(CreateEventPage))));
