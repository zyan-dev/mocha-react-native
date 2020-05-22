import React from 'react';
import {Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const SheepSvg = ({size, theme}) => {
  let color1 = '#EEE4E4';
  let color2 = '#585858';
  if (theme.colors.theme_name === 'Bright') color1 = '#222222';
  return (
    <Svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      className="svg-inline--fa fa-plus fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 33"
      width={size}
      height={size}
      // style={{ marginBottom: 8 }}
    >
      <Path
        d="M20.6303978,6 C19.8826557,6.00340928 19.1589168,6.25631873 18.5808285,6.71621885 C17.3654566,5.79009053 15.6545235,5.79009053 14.4391516,6.71621885 C13.8698363,6.28246907 13.1651362,6.04969631 12.4411437,6.05624755 C11.6422851,6.05597999 10.8659069,6.31271272 10.2336673,6.7862158 C9.66628127,6.37441083 8.97724461,6.15067462 8.26852991,6.14811856 C6.83189781,6.14874353 5.53899338,7.06245379 5.03304623,8.40614534 C4.95828206,8.40114556 4.8835179,8.39864566 4.80875374,8.39864566 C3.71307201,8.39864566 2.67024082,8.94299699 2.01992149,9.85358238 C1.35424916,10.7911416 1.17607917,11.9755639 1.53782153,13.058443 C0.571043534,13.7065398 0,14.7846179 0,15.9870656 C0,17.1707641 0.574910646,18.2682164 1.51655241,18.9063136 C1.15421875,19.9890636 1.33217605,21.1736558 1.99800785,22.1111742 C2.6489717,23.0217596 3.68922482,23.5654859 4.78039491,23.5654859 C4.85193649,23.5654859 4.92412258,23.5654859 4.99566415,23.5586112 C5.49323255,24.9335514 6.75584461,25.8347622 8.21825746,25.8347622 C8.92523429,25.8324683 9.61399242,25.6171248 10.1891955,25.218539 C10.8174955,25.696733 11.5934392,25.9560488 12.3921603,25.954757 C13.1226345,25.9593569 13.833691,25.7268126 14.4120818,25.2941607 C14.9935172,25.7487168 15.7186548,25.9952375 16.4655183,25.9922554 C17.2192076,25.9931212 17.9509725,25.7463898 18.5415129,25.2922858 C19.783864,26.2589402 21.5594467,26.2327023 22.7708443,25.2297885 C23.3366214,25.6402571 24.0235808,25.8633218 24.7301811,25.8660109 C26.1700357,25.8660109 27.4622957,24.9498007 27.9675983,23.6048592 C28.0391399,23.609234 28.1106814,23.6117339 28.182223,23.6117339 C29.3055418,23.6012366 30.3520814,23.0570505 30.9826566,22.1555473 C31.6473367,21.2191767 31.8245905,20.0361269 31.4621785,18.9550615 C32.4289565,18.3063397 32.9993555,17.2276366 33,16.0251889 C33,14.8414904 32.4250894,13.7440382 31.4834476,13.1053159 C31.8467855,12.0211314 31.6685567,10.8347009 31.0013476,9.89608053 C30.3510283,8.98674508 29.3127087,8.44364371 28.2241167,8.44364371 C28.1512861,8.44364371 28.077811,8.44364371 28.0049804,8.45051841 C27.508701,7.0943274 26.2177301,6.16874266 24.7733638,6.16874266 C24.0698047,6.1724849 23.3849383,6.3887533 22.8140271,6.78746575 C22.2035776,6.28533638 21.430868,6.00667993 20.6303978,6 Z"
        id="Path"
        fill={color1}
      />
      <Path
        d="M28.3621307,24.3413672 C27.8432987,25.7283984 26.5164389,26.6732813 25.0380324,26.6732813 C24.3125132,26.6705081 23.6071606,26.4404626 23.026235,26.0171484 C22.9984404,26.0403516 22.9693223,26.0622656 22.9408659,26.0816016 L22.9408659,31.96875 C22.9408659,32.5382936 23.4149251,33 23.9997067,33 L28.2350698,33 C28.8198514,33 29.2939106,32.5382936 29.2939106,31.96875 L29.2939106,24.2724023 C29.0602285,24.3223354 28.8217412,24.3478314 28.582502,24.348457 C28.5090449,24.348457 28.4336025,24.3458789 28.3621307,24.3413672 L28.3621307,24.3413672 Z M12.4490773,26.9968359 L12.5397406,26.7622266 C12.4828279,26.7622266 12.426577,26.7667383 12.3696643,26.7667383 C11.5495576,26.7680705 10.7528382,26.5006394 10.1077156,26.0074805 C9.51711162,26.4185399 8.80991217,26.6406225 8.0840062,26.6429883 C7.3695414,26.6445367 6.67251065,26.4281645 6.09073843,26.0242383 C5.95868761,26.6355213 5.97090688,27.2680305 6.1264743,27.874043 L7.241566,32.2188281 C7.35937795,32.677868 7.78281906,32.9999284 8.26864156,33 L12.6363598,33 C12.9623793,33 13.2701993,32.8536328 13.4708209,32.6033472 C13.6714425,32.3530617 13.7424951,32.0267184 13.6634353,31.7186719 L12.4490773,26.9968359 Z M40.8253485,6.83203125 L37.7646369,5.36378906 L37.7646369,4.125 C37.7646369,2.9859127 36.8165185,2.0625 35.6469553,2.0625 L31.4115922,2.0625 C31.4115922,0.923412703 30.4634738,0 29.2939106,0 C28.1243474,0 27.1762291,0.923412703 27.1762291,2.0625 L27.1762291,7.0640625 C27.739749,7.48770624 28.1655829,8.06090832 28.402499,8.71470703 C28.4772797,8.71019531 28.5527221,8.70761719 28.6275027,8.70761719 C29.7452415,8.70761719 30.8113618,9.26771484 31.4790933,10.2055078 C31.9309043,10.8427193 32.1688098,11.600662 32.1600603,12.3750008 L39.3303977,12.3750008 C39.9411829,12.3755928 40.505431,12.0572797 40.8088041,11.5409766 C41.3110917,10.6863281 42,9.38501953 42,8.66701172 C41.9985438,7.88757697 41.5432904,7.17640343 40.8253485,6.83203125 Z M33.5292737,7.21875 C32.9444921,7.21875 32.470433,6.75704365 32.470433,6.1875 C32.470433,5.61795635 32.9444921,5.15625 33.5292737,5.15625 C34.1140554,5.15625 34.5881145,5.61795635 34.5881145,6.1875 C34.5881145,6.75704365 34.1140554,7.21875 33.5292737,7.21875 Z"
        id="Shape"
        fill={color2}
      />
    </Svg>
  );
};

SheepSvg.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default SheepSvg;
