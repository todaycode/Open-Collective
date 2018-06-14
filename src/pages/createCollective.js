import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import React from 'react';
import CreateCollective from '../components/CreateCollective';
import { addGetLoggedInUserFunction, addCollectiveData } from '../graphql/queries';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import { intersection } from 'lodash';

class CreateCollectivePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  static getInitialProps ({ query: { hostCollectiveSlug } }) {
    return { slug: hostCollectiveSlug }
  }

  async componentDidMount() {
    const { getLoggedInUser, slug } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser();
    if (LoggedInUser) {
      LoggedInUser.canCreateCollective = Boolean(intersection(LoggedInUser.roles[slug], ['HOST','ADMIN']).length);
    }
    this.setState({LoggedInUser, loading: false});
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
      <div>
        <CreateCollective host={data.Collective} LoggedInUser={this.state.LoggedInUser} />
      </div>
    );
  }
}

export default withData(withIntl(addGetLoggedInUserFunction(addCollectiveData(CreateCollectivePage))));
