import React from 'react'
import PropTypes from 'prop-types'
import router from '../server/pages';
import { pick } from 'lodash';

class Link extends React.Component {

  static propTypes = {
    route: PropTypes.string,
    params: PropTypes.object,
    target: PropTypes.string,
    title: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.isIframe = window.self !== window.top;
  }

  render() {
    const { route, params, children, ...otherProps } = this.props;
    if (this.isIframe) {
      const routeFromRouter = router.findByName(route);
      if (!routeFromRouter) {
        console.error(">>> cannot find route ", route);
        return (<div>ERROR (see console)</div>);
      }
      const path = routeFromRouter.getAs(params);
      return (<a href={path} {...otherProps}>{children}</a>);
    } else {
      return (<router.Link {...pick(this.props, ['route', 'params', 'href'])}>{children}</router.Link>);
    }
  }
}

export default Link;