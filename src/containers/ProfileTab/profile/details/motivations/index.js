import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {MCHeader, MCImagePicker, MCReadMoreText} from 'components/common';
import {MCView, MCCard, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {reflectionActions} from 'Redux/actions';
import NavigationService from 'navigation/NavigationService';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import MCEditableText from '../../../../../components/common/MCEditableText';
import {MCContent} from '../../../../../components/styled/View';

class MotivationListScreen extends React.PureComponent {
  onPressNew = () => {
    this.props.setInitialReflection('motivation');
    NavigationService.navigate('AddMotivation');
  };

  onPressEdit = item => {
    const {
      selectedReflection,
      selectReflection,
      addOrUpdateReflection,
    } = this.props;
    if (selectedReflection && selectedReflection._id === item._id) {
      // save
      addOrUpdateReflection();
    } else {
      // edit
      selectReflection(item);
    }
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderListItem = ({item}) => {
    const motivation = item.data;
    const {selectedReflection, updateSelectedReflection} = this.props;

    const editable =
      item._id !== undefined && selectedReflection._id === item._id;
    return (
      <MCView
        key={item.key}
        width={320}
        bordered
        align="center"
        br={10}
        mb={20}>
        <MCCard shadow br={1} width={340} align="center">
          <MCView width={300}>
            {editable ? (
              <MCEditableText
                maxLength={200}
                fontSize={18}
                text={selectedReflection.data.title}
                onChange={text => updateSelectedReflection({title: text})}
              />
            ) : (
              <H3>{motivation.title}</H3>
            )}
          </MCView>
        </MCCard>
        <MCView width={300} mt={10} mb={20}>
          {editable ? (
            <MCEditableText
              fontSize={14}
              multiline
              maxLength={1024}
              text={selectedReflection.data.description}
              onChange={text => updateSelectedReflection({description: text})}
            />
          ) : (
            <MCReadMoreText>
              <H4 ml={20}>{motivation.description}</H4>
            </MCReadMoreText>
          )}
        </MCView>
        {motivation.image.length > 0 && (
          <MCImagePicker
            enabled={editable}
            image={motivation.image}
            type="picture"
          />
        )}
        <MCView row align="center" width={300} justify="flex-end">
          <MCButton onPress={() => this.onPressEdit(item)}>
            <MCIcon name={editable ? 'ios-share' : 'ios-create'} />
          </MCButton>
          <MCButton onPress={() => this.onPressRemove(item)}>
            <MCIcon name="ios-trash" />
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {t, motivations} = this.props;
    console.log(motivations);
    return (
      <MCRootView>
        <MCHeader
          title={t('motivation_headerTitle')}
          hasRight={true}
          rightText={t('new')}
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            data={motivations}
            renderItem={this._renderListItem.bind(this)}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>No results</MCEmptyText>}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  motivations: selector.reflections.getMyMotivations(state),
  selectedReflection: state.reflectionReducer.selectedReflection,
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  removeReflection: reflectionActions.removeReflection,
  selectReflection: reflectionActions.selectReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(MotivationListScreen),
);
