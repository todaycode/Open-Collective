import React from 'react';
import PropTypes from 'prop-types';
import Error from '../components/Error';
import withIntl from '../lib/withIntl';
import Expenses from '../components/Expenses';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ExpensesWithData extends React.Component {

  static propTypes = {
    collective: PropTypes.object,
    limit: PropTypes.number,
    LoggedInUser: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { data, LoggedInUser, collective } = this.props;

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<Error message="GraphQL error" />)
    }

    const expenses = data.allExpenses;

    return (
      <div className="ExpensesContainer">

        <Expenses
          collective={collective}
          expenses={expenses}
          refetch={data.refetch}
          fetchMore={data.fetchMore}
          LoggedInUser={LoggedInUser}
          />

      </div>
    );
  }

}


const getExpensesQuery = gql`
query Expenses($CollectiveId: Int!, $status: String, $limit: Int, $offset: Int) {
  allExpenses(CollectiveId: $CollectiveId, status: $status, limit: $limit, offset: $offset) {
    id
    description
    status
    createdAt
    category
    amount
    currency
    payoutMethod
    fromCollective {
      id
      name
      slug
      image
    }
  }
}
`;


const EXPENSES_PER_PAGE = 10;
export const addExpensesData = graphql(getExpensesQuery, {
  options(props) {
    return {
      variables: {
        CollectiveId: props.collective.id,
        offset: 0,
        limit: props.limit || EXPENSES_PER_PAGE * 2
      }
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