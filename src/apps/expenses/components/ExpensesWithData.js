import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withIntl from '../../../lib/withIntl';
import Error from '../../../components/Error';
import Expenses from './Expenses';


class ExpensesWithData extends React.Component {

  static propTypes = {
    collective: PropTypes.object,
    limit: PropTypes.number,
    view: PropTypes.string, // "compact" for homepage (can't edit expense, don't show header), "list" for list view, "details" for details view
    filter: PropTypes.object, // { category, recipient }
    defaultAction: PropTypes.string, // "new" to open the new expense form by default
    includeHostedCollectives: PropTypes.bool,
    filters: PropTypes.bool,
    LoggedInUser: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      LoggedInUser,
      collective,
      view,
      includeHostedCollectives,
      filters
    } = this.props;

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<Error message="GraphQL error" />)
    }

    const expenses = data.allExpenses;

    return (
      <div className="ExpensesWithData">

        <Expenses
          collective={collective}
          expenses={expenses}
          refetch={data.refetch}
          editable={view !== 'compact'}
          view={view}
          fetchMore={this.props.fetchMore}
          filters={filters}
          LoggedInUser={LoggedInUser}
          includeHostedCollectives={includeHostedCollectives}
          />

      </div>
    );
  }

}

const getExpensesQuery = gql`
query Expenses($CollectiveId: Int!, $status: String, $category: String, $fromCollectiveSlug: String, $limit: Int, $offset: Int, $includeHostedCollectives: Boolean) {
  allExpenses(CollectiveId: $CollectiveId, status: $status, category: $category, fromCollectiveSlug: $fromCollectiveSlug, limit: $limit, offset: $offset, includeHostedCollectives: $includeHostedCollectives) {
    id
    description
    status
    createdAt
    updatedAt
    incurredAt
    category
    amount
    currency
    payoutMethod
    privateMessage
    attachment
    collective {
      id
      slug
      currency
      name
      host {
        id
        slug
      }
      stats {
        id
        balance
      }
    }
    fromCollective {
      id
      type
      name
      slug
      image
    }
    user {
      id
      paypalEmail
      email
    }
  }
}
`;

const getExpensesVariables = (props) => {
  const vars = {
    CollectiveId: props.collective.id,
    offset: 0,
    limit: props.limit || EXPENSES_PER_PAGE * 2,
    includeHostedCollectives: props.includeHostedCollectives || false,
    ...props.filter
  };
  if (vars.category) {
    vars.fromCollectiveSlug = null;
  } else {
    vars.category = null;
  }
  return vars;
}

const EXPENSES_PER_PAGE = 10;
export const addExpensesData = graphql(getExpensesQuery, {
  options(props) {
    return {
      variables: getExpensesVariables(props)
    }
  },
  props: ({ data }) => ({
    data,
    fetchMore: () => {
      return data.fetchMore({
        variables: {
          offset: data.allExpenses.length,
          limit: EXPENSES_PER_PAGE
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allExpenses: [...previousResult.allExpenses, ...fetchMoreResult.allExpenses]
          })
        }
      })
    }
  })
});

export default addExpensesData(withIntl(ExpensesWithData));
