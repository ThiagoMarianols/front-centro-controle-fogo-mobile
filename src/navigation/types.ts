import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  OccurrenceList: undefined;
  OccurrenceDetail: { id: number };
  CompleteOccurrence: { id: number };
  UpdateOccurrence: { id: number };
  SimpleHome: undefined;
  Profile: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
