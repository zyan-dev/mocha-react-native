import React from 'react';
import {connect} from 'react-redux';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {withTranslation} from 'react-i18next';
import {H3} from 'components/styled/Text';

class TimeLineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('timeline_headerTitle')} />
        <H3>TimeLine Screen</H3>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(TimeLineScreen),
);
