import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon, MCTagsView} from 'components/common';
import {CarrotSvg} from 'assets/svgs';

class NutritionCard extends React.Component {
  static propTypes = {
    nutrition: PropTypes.object,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    nutrition: {},
    onPressEdit: () => undefined,
  };

  render() {
    const {t, nutrition, editable, onPressEdit} = this.props;
    const bests = _.get(nutrition, ['data', 'best'], []);
    const worsts = _.get(nutrition, ['data', 'worst'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_nutrition')}
            </H3>
            <CarrotSvg size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <H4 underline>{t('tools_tab_question_best_nutrition')}</H4>
        <MCTagsView tags={bests} />
        <H4 mt={20} underline>
          {t('tools_tab_question_worst_nutrition')}
        </H4>
        <MCTagsView tags={worsts} />
      </MCView>
    );
  }
}

export default withTranslation()(NutritionCard);
