import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export function Participant({ name, participantRemove, index, price }) {
  return (
    <View style={styles.container}>
      <View style={styles.positionBox}>
        <Text style={styles.position}>{index}</Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.priceBox}>
        <Text style={styles.price}>R${price.toFixed(2)}</Text>
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={participantRemove}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1f1e25',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  name: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 16,
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#e23c44",
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
  },

  position: {
    color: "#ffffff",
    fontSize: 16,
  },
  positionBox:{
    borderRightColor: "#464242",
    borderStyle: 'solid',
    borderRightWidth: 2,
    width: 50,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceBox:{
    borderRightColor: "#464242",
    borderLeftColor: "#464242",
    borderStyle: 'solid',
    borderLeftWidth: 2,
    width: 80,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  price:{
    color: '#fff',
  },
})
