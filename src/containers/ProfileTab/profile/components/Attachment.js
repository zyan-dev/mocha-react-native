import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCIcon} from 'components/common';
import {MCView, MCCard} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {BoxingSvg} from 'assets/svgs';
import {AttachmentOptions} from 'utils/constants';

class AttachmentCard extends React.Component {
  static propTypes = {
    attachment: PropTypes.array,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    attachment: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, attachment, onPressEdit, editable} = this.props;
    const options = _.get(attachment, ['data', 'options'], []);
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_card_attachment')}
            </H3>
            <BoxingSvg size={20} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>{t('profile_card_empty_attachment')}</MCEmptyText>
          </MCCard>
        )}
        {options.length > 0 && (
          <H4 mr={10}>{t('profile_card_attachment_title')}</H4>
        )}
        <MCView width={300}>
          {options.length > 0 &&
            options.map(option => {
              const index = AttachmentOptions.indexOf(option);
              if (index < 0) return null;
              return (
                <MCView
                  bordered
                  br={10}
                  align="center"
                  justify="center"
                  pv={10}
                  mt={15}
                  ph={10}>
                  <H4 align="center" underline mb={10}>
                    {t(`tools_tab_attachment_${option}`)}
                  </H4>
                  <H4>{t(`tools_tab_attachment_${option}_explain`)}</H4>
                </MCView>
              );
            })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(AttachmentCard);
