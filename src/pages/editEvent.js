import React from 'react';
import PropTypes from 'prop-types';

import NotFound from '../components/NotFoundPage';
import Loading from '../components/Loading';
import EditEvent from '../components/EditEvent';

import { addEventCollectiveData } from '../graphql/queries';

import withData from '../lib/withData'
import withIntl from '../lib/withIntl';
import withLoggedInUser from '../lib/withLoggedInUser';

class EditEventPage extends React.Component {

  static getInitialProps ({ query: { parentCollectiveSlug, eventSlug } }) {
    return { parentCollectiveSlug, eventSlug }
  }

  static propTypes = {
    parentCollectiveSlug: PropTypes.string, // not used atm
    eventSlug: PropTypes.string, // for addEventCollectiveData
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
      return <Loading />;
    }

    if (!data.loading && !data.Collective) {
      return (<NotFound />)
    }

    const { LoggedInUser } = this.state;
    const event = data.Collective;

    return (
      <EditEvent event={event} LoggedInUser={LoggedInUser} />
    );
  }
}

export default withData(withIntl(withLoggedInUser(addEventCollectiveData(EditEventPage))));
