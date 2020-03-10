import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MCImage from './MCImage';
import {dySize} from 'utils/responsive';

class MCImagePicker extends React.PureComponent {
  static propTypes = {
    round: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    onSelectImage: PropTypes.func.isRequired,
    image: PropTypes.string,
    enabled: PropTypes.bool,
    type: PropTypes.oneOf(['avatar', 'picture']),
  };
  static defaultProps = {
    round: false,
    width: 100,
    height: 100,
    image: '',
    enabled: true,
    type: 'avatar',
  };
  constructor(props) {
    super(props);
    this.state = {
      imageUri: props.image,
    };
  }
  onPressPicker = () => {
    if (!this.props.enabled) {
      return;
    }
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      this.setState({imageUri: image.path});
      this.props.onSelectImage(image); // image object (path, data ...)
    });
  };
  render() {
    const {imageUri} = this.state;
    const {round, width, height, type, theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.onPressPicker()}
        style={{
          width: dySize(width),
          height: dySize(height),
          overflow: 'hidden',
          borderRadius: round ? dySize(width) / 2 : 0,
          borderWidth: 1,
          padding: 0,
          borderColor: theme.colors.border,
        }}>
        <MCImage
          width={width}
          height={height}
          image={{uri: imageUri}}
          type={type}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default connect(mapStateToProps, undefined)(MCImagePicker);
