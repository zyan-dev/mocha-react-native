import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal} from 'components/common';
import {getTitleByKey} from 'services/operators';
import {dySize} from 'utils/responsive';

class ValuesCard extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(Object),
    editable: PropTypes.bool,
    onPressDetails: PropTypes.func,
    onPressNew: PropTypes.func,
  };

  static defaultProps = {
    values: [],
    onPressDetails: () => undefined,
    onPressNew: () => undefined,
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      showModal: false,
    };
  }

  onPressItem = value => {
    this.setState({selectedValue: value, showModal: true});
  };

  _renderValueItem = ({item}) => {
    const value = item.data;
    return (
      <MCCard width={140} key={item._id} mr={15} align="center" mt={10}>
        <MCButton align="center" onPress={() => this.onPressItem(item)}>
          <H4 numberOfLines={1} mb={10}>
            {getTitleByKey('value', value.value)}
          </H4>
          <MCImage width={120} height={120} image={{uri: value.image}} br={6} />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, values, editable, onPressNew} = this.props;
    const {selectedValue, showModal} = this.state;
    return (
      <MCView align="center" mt={30}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_values')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.props.onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={values.slice(0, 4)}
          renderItem={this._renderValueItem}
          keyExtractor={item => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={
            editable ? (
              <MCButton bordered align="center" onPress={() => onPressNew()}>
                <MCEmptyText>{t('profile_card_empty_value')}</MCEmptyText>
                <MCEmptyText>{t('profile_card_empty_value_1')}</MCEmptyText>
              </MCButton>
            ) : (
              <MCEmptyText>{t('profile_card_empty_user_value')}</MCEmptyText>
            )
          }
        />
        {selectedValue && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <MCImage
                image={{uri: selectedValue.data.image}}
                width={120}
                height={120}
                br={6}
              />
              <H3 weight="bold" align="center">
                {getTitleByKey('value', selectedValue.data.value)}
              </H3>
              <H4>{selectedValue.data.phrase}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ValuesCard);
