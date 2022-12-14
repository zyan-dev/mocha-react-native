import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ReadMore from 'react-native-read-more-text';
import {H5} from '../styled/Text';

class MCReadMoreText extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  _renderTruncatedFooter = handlePress => {
    const {t, theme} = this.props;
    return (
      <H5 color={theme.colors.border} underline onPress={handlePress}>
        {t('button_read_more')}
      </H5>
    );
  };

  _renderRevealedFooter = handlePress => {
    const {t, theme} = this.props;
    return (
      <H5 color={theme.colors.border} underline onPress={handlePress}>
        {t('button_show_less')}
      </H5>
    );
  };

  _handleTextReady = () => {
    // ...
  };

  render() {
    const {children} = this.props;
    return (
      <ReadMore
        numberOfLines={3}
        renderTruncatedFooter={this._renderTruncatedFooter}
        renderRevealedFooter={this._renderRevealedFooter}
        onReady={this._handleTextReady}>
        {children}
      </ReadMore>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(MCReadMoreText),
);
