import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/FirefighterIllustration.styles';

export const FirefighterIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.helmet}>
        <View style={styles.helmetTop} />
        <View style={styles.helmetVisor} />
        <View style={styles.helmetBadge}>
          <View style={styles.badgeShine} />
        </View>
      </View>
      
      <View style={styles.emblem}>
        <View style={styles.emblemInner} />
      </View>
      
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
    </View>
  );
};
