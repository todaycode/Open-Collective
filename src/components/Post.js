import React from 'react'
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    mutate: PropTypes.func,
    refresh: PropTypes.func,
  }

  render () {
    return (
      <div className="pa3 bg-black-05 ma3">
        <div
          className="w-100"
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
          />
        <div className="pt3">
          {this.props.post.description}&nbsp;
          <span className="red f6 pointer dim" onClick={this.handleDelete}>Delete</span>
        </div>
      </div>
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.post.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostWithMutation = graphql(deleteMutation)(Post)

export default PostWithMutation
