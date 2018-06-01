import React from 'react';
import PropTypes from 'prop-types';

import NotFound from '../components/NotFoundPage';
import Loading from '../components/Loading';
import EditCollective from '../components/EditCollective';

import { addCollectiveToEditData } from '../graphql/queries';

import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import withLoggedInUser from '../lib/withLoggedInUser';

class EditCollectivePage extends React.Component {

  static getInitialProps ({ query: { slug } }) {
    return { slug, ssr: false };
  }

  static propTypes = {
    slug: PropTypes.string, // for addCollectiveToEditData
    ssr: PropTypes.bool,
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
    const { loading, LoggedInUser } = this.state;
    if (loading || data.loading) {
      return <Loading />;
    }

    if (!data.Collective) {
      return (<NotFound />)
    }

    const collective = data.Collective;

    window.OC = { collective };

    return (
      <div>
        <EditCollective collective={collective} LoggedInUser={LoggedInUser} />
      </div>
    );
  }
}

export default withData(withIntl(withLoggedInUser(addCollectiveToEditData(EditCollectivePage))));
