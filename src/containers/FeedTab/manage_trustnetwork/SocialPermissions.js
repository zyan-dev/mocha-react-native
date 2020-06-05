import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {SocialPermissions, AdvancedPermissions} from 'utils/constants';
import {BookLightSvg} from 'assets/svgs';

class NetworkSocialPermissions extends React.Component {
  static propTypes = {
    permissions: PropTypes.array,
    onToggleCheck: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
  };

  static defaultProps = {
    permissions: [],
  };

  render() {
    const {t, theme, permissions, onToggleCheck} = this.props;
    return (
      <MCView>
        {SocialPermissions.map(p => {
          const selected = permissions.indexOf(p) > -1;
          return (
            <MCButton
              key={p}
              row
              align="center"
              onPress={() => onToggleCheck(p)}>
              <MCIcon
                type="FontAwesome"
                name={selected ? 'check-square' : 'square'}
              />
              <H3 style={{flex: 1}} ml={10}>
                {t(`trustnetwork_permissions_${p}`)}
              </H3>
              <MCView width={60} align="center">
                {p === 'resources' && <BookLightSvg theme={theme} size={30} />}
                {p === 'progress' && (
                  <MCIcon
                    type="FontAwesome5Pro-Light"
                    name="arrow-circle-up"
                    size={25}
                  />
                )}
              </MCView>
            </MCButton>
          );
        })}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NetworkSocialPermissions),
);
