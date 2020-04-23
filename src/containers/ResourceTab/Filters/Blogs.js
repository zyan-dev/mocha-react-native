import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {H3} from 'components/styled/Text';
import {MCRootView} from 'components/styled/View';

class BlogResourceScreen extends React.PureComponent {
  render() {
    return (
      <MCRootView>
        <H3>Blogs Page</H3>
      </MCRootView>
    )
  }
}

export default withTranslation()(
  connect(
    null,
    null,
  )(BlogResourceScreen),
);
