import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCIcon} from 'components/common';
import {MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {SirenOnSvg} from 'assets/svgs';

class TriggersCard extends React.Component {
  static propTypes = {
    triggers: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    triggers: {},
    onPressEdit: () => undefined,
  };

  render() {
    const {t, theme, triggers, onPressEdit, editable} = this.props;
    const options = _.get(triggers, ['data', 'options'], []);
    return (
      <MCView align="center" mt={30}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" mr={20}>
            {t('profile_subtitle_triggers')}
          </H3>
          <SirenOnSvg size={30} color={theme.colors.text} />
          <MCView style={{flex: 1}} />
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <MCView mb={20} width={300}>
          {options.map(option => (
            <MCView row align="center">
              <H4>🔹</H4>
              <H4>{option}</H4>
            </MCView>
          ))}
        </MCView>
        {options.length === 0 && <MCEmptyText>No Triggers</MCEmptyText>}
      </MCView>
    );
  }
}

export default withTranslation()(TriggersCard);
