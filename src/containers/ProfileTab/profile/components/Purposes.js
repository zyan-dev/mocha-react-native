import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal} from 'components/common';
import {dySize} from 'utils/responsive';

class PurposesCard extends React.Component {
  static propTypes = {
    purposes: PropTypes.arrayOf(Object),
    onPressDetails: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    purposes: [],
    onPressDetails: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPurpose: null,
      showModal: false,
    };
  }

  onPressItem = purpose => {
    this.setState({selectedPurpose: purpose, showModal: true});
  };

  _renderItem = item => {
    const purpose = item.data;
    return (
      <MCCard width={140} key={item._id} mr={15} align="center">
        <MCButton align="center" onPress={() => this.onPressItem(item)} />
      </MCCard>
    );
  };

  render() {
    const {t, purposes, editable} = this.props;
    const {selectedValue, showModal} = this.state;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_purposes')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.props.onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={purposes.slice(0, 4)}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={<MCEmptyText>{t('coming soon')}</MCEmptyText>}
        />
        {selectedValue && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={300} mt={20} />
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(PurposesCard);
