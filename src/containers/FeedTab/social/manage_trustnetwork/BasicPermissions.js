import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {BasicPermissions, AdvancedPermissions} from 'utils/constants';
import {
  SheepSvg,
  CarrotSvg,
  FaucetSvg,
  FragileSvg,
  KeySvg,
  FutureSvg,
  AppleSvg,
} from 'assets/svgs';

class NetworkBasicPermissions extends React.Component {
  static propTypes = {
    permissions: PropTypes.array,
    onToggleCheck: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
  };

  static defaultProps = {
    permissions: [],
  };

  render() {
    const {t, theme, permissions, onToggleCheck, onSelectAll} = this.props;
    const selectedAll =
      permissions.length ===
      BasicPermissions.length + AdvancedPermissions.length;
    return (
      <MCView>
        <MCButton row align="center" onPress={() => onSelectAll()}>
          <MCIcon
            type="FontAwesome"
            name={selectedAll ? 'check-square' : 'square'}
          />
          <H3 style={{flex: 1}} ml={10}>
            {t('select_all')}
          </H3>
        </MCButton>
        {BasicPermissions.map(p => {
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
                {p === 'contact' && (
                  <MCIcon type="FontAwesome5" name="phone" size={25} />
                )}
                {p === 'chronotype' && <SheepSvg theme={theme} size={30} />}
                {p === 'nutrition' && <CarrotSvg size={30} />}
                {p === 'hydration' && <FaucetSvg size={30} />}
                {p === 'stress_response' && <FragileSvg size={30} />}
                {p === 'strengths' && (
                  <MCIcon type="FontAwesome5Pro" name="hammer" size={25} />
                )}
                {p === 'core_values' && <KeySvg theme={theme} size={30} />}
                {p === 'dreams' && <FutureSvg size={30} />}
                {p === 'habits' && <AppleSvg size={25} />}
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
  )(NetworkBasicPermissions),
);
