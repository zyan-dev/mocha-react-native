import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {withTranslation} from 'react-i18next';
import {MCIcon} from '../styled/Text';
import {MCCard} from '../styled/View';
import i18next from 'i18next';

class MCPicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    items: PropTypes.arrayOf(Object).isRequired,
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    placeholder: 'select',
  };

  render() {
    const {t, theme, value, placeholder, items, onChange} = this.props;
    return (
      <MCCard bordered>
        <RNPickerSelect
          value={value}
          onValueChange={itemValue => onChange(itemValue)}
          items={items}
          useNativeAndroidPickerStyle={false}
          textInputProps={{
            fontSize: theme.base.FONT_SIZE_LARGE,
            width: '100%',
          }}
          placeholder={{label: t(placeholder)}}
          Icon={() => <MCIcon name="ios-arrow-down" size={20} />}
          style={{
            inputIOSContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
            },
            inputIOS: {
              color: theme.colors.text,
            },
            inputAndroidContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
            },
            inputAndroid: {
              color: theme.colors.text,
            },
            viewContainer: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      </MCCard>
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
  )(MCPicker),
);
