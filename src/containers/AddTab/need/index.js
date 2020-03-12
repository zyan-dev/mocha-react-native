import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3} from 'components/styled/Text';

class AddNeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('add_reflection_need_header')} />
        <H3>Add Need Screen</H3>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddNeedScreen),
);
