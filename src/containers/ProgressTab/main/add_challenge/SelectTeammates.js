import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3} from 'components/styled/Text';
import {OvalYellow, OvalGreen} from 'assets/images';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';

class SelectTeammatesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage source={OvalGreen} resizeMode="stretch" />
        <OvalYellowImage source={OvalYellow} resizeMode="stretch" />
        <MCHeader
          title={t('title_progress_tab_select_teammates')}
          hasRight
          rightIcon="arrow-right"
          rightText={t('button_next')}
          onPressRight={() => {}}
        />
        <H3>Select Teammates</H3>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectTeammatesScreen),
);
