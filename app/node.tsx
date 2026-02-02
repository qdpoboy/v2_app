import { StyleSheet, Text, View } from 'react-native';

export default function Node() {
  return (
    <View style={styles.container}>
      <Text>节点页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});