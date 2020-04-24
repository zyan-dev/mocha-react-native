import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import TagInput from 'react-native-tags-input';
import {dySize} from 'utils/responsive';

class MCTagInput extends React.Component {
  static propTypes = {
    tags: PropTypes.array,
    updateState: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tags: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onPressEnterOrBlur = () => {
    const {text} = this.state;
    const {tags, updateState} = this.props;
    const temp = tags;
    if (text.length === 0) {
      return;
    }
    temp.push(text);
    updateState({
      tag: this.state.text,
      tagsArray: temp,
    });
    this.setState({text: ''});
  };

  updateState = param => {
    this.props.updateState(param);
    this.setState({text: param.tag});
  };

  render() {
    const {text} = this.state;
    const {t, theme, tags} = this.props;
    if (tags)
      return (
        <TagInput
          ref={ref => (this.input = ref)}
          updateState={param => this.updateState(param)}
          tags={{
            tag: text,
            tagsArray: tags,
          }}
          placeholder={t('tag_input_placeholder')}
          placeholderTextColor={theme.colors.border}
          labelStyle={{
            color: theme.colors.border,
            fontSize: theme.base.FONT_SIZE_MEDIUM,
          }}
          inputContainerStyle={{
            padding: 0,
            margin: 0,
          }}
          containerStyle={{
            borderWidth: 1,
            borderColor: theme.colors.text,
            borderRadius: dySize(4),
            paddingLeft: 0,
            paddingRight: 0,
          }}
          tagStyle={{
            height: dySize(30),
            borderRadius: dySize(8),
            maxWidth: 'auto',
          }}
          tagTextStyle={{
            color: theme.colors.background,
            maxWidth: dySize(300),
          }}
          inputStyle={{
            color: theme.colors.text,
            margin: 0,
            padding: 0,
          }}
          keysForTag={','}
          onSubmitEditing={() => this.onPressEnterOrBlur()}
          onChange={e => this.setState({text: e.nativeEvent.text})}
          blurOnSubmit={false}
          maxLength={30}
        />
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
  )(MCTagInput),
);
