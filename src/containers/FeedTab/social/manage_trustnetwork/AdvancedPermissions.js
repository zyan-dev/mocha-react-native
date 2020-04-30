import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView} from 'components/styled/View';
import {MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {AdvancedPermissions} from 'utils/constants';
import {
  BullhornSvg,
  PointDownSvg,
  AwardSvg,
  MedalSvg,
  ExclamationSvg,
  BoxingSvg,
  HandheartSvg,
  TeaSvg,
} from 'assets/svgs';

class NetworkAdvancedPermissions extends React.Component {
  static propTypes = {
    permissions: PropTypes.array,
    onToggleCheck: PropTypes.func.isRequired,
  };

  static defaultProps = {
    permissions: [],
  };

  render() {
    const {t, theme, permissions, onToggleCheck} = this.props;
    return (
      <MCView>
        {AdvancedPermissions.map(p => {
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
                {p === 'coach' && <BullhornSvg theme={theme} size={30} />}
                {p === 'criticism' && <PointDownSvg theme={theme} size={30} />}
                {p === 'praise' && <AwardSvg size={30} />}
                {p === 'challenges_concerns' && (
                  <MedalSvg theme={theme} size={30} />
                )}
                {p === 'qualities_character' && <ExclamationSvg size={30} />}
                {p === 'approach' && <BoxingSvg size={30} />}
                {p === 'attachment' && (
                  <MCIcon
                    type="FontAwesome5Pro"
                    name="paperclip"
                    color="#DC3E3E"
                    size={25}
                  />
                )}
                {p === 'comfort' && <HandheartSvg theme={theme} size={30} />}
                {p === 'stress_recovery' && <TeaSvg theme={theme} size={30} />}
                {p === 'personality' && (
                  <MCIcon type="FontAwesome5Pro" name="fingerprint" size={25} />
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
  )(NetworkAdvancedPermissions),
);
