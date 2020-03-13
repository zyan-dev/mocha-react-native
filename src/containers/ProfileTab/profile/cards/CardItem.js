import React from 'react';
import {MCButton} from 'components/styled/Button';
import {MCCard, MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';

function CardItem({text, icon, width = 150, height = 160, onPress}) {
  return (
    <MCButton onPress={() => onPress()}>
      <MCCard width={width} height={height} p={20} align="center">
        <MCIcon name={icon} size={40} padding={15} />
        <MCView justify="center">
          <H3 align="center">{text}</H3>
        </MCView>
      </MCCard>
    </MCButton>
  );
}

export default CardItem;
