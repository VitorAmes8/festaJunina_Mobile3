import React, { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Participant } from "../components/Participant";
import { Picker } from '@react-native-picker/picker'

export function Home() {
  const [listParticipant, setListParticipant] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [counter, setCounter] = useState(1);

  const priceList = {
    quentaoPequeno: { label: "Quentão Pequeno", price: 5 },
    quentaoMedio: { label: "Quentão Médio", price: 10 },
    quentaoGrande: { label: "Quentão Grande", price: 15 },
    pipocaPequena: { label: "Pipoca Pequena", price: 3 },
    pipocaMedia: { label: "Pipoca Média", price: 6 },
    pipocaGrande: { label: "Pipoca Grande", price: 9 },
    bolo: { label: "Bolo", price: 4 },
    peDeMoleque: { label: "Pé de Moleque", price: 3.5 },
    cachorroQuente: { label: "Cachorro Quente", price: 6.5 }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch("http://192.168.100.110:5000/api/items");
      const data = await response.json();
      setListParticipant(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  }

  async function handleParticipantAdd() {
    if (!selectedItem) {
      Alert.alert("Erro", "Selecione um item");
      return;
    }

    const participantItem = selectedItem.label;
    const participantPrice = selectedItem.price;

    try {
      const response = await fetch("http://192.168.100.110:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: participantItem, price: participantPrice }),
      });

      const data = await response.json();
      setListParticipant((prevState) => [
        ...prevState,
        data,
      ]);

      setSelectedItem(null);
      setCounter(counter + 1);
    } catch (error) {
      console.error("Erro adicionando item:", error);
    }
  }

  async function handleParticipantRemove(participant) {
    Alert.alert(
      "Remover",
      `Deseja remover o item ${participant.item}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            try {
              await fetch(`http://192.168.100.110:5000/api/items/${participant.id}`, {
                method: "DELETE",
              });

              setListParticipant((prevState) =>
                prevState.filter((participantObj) => participantObj !== participant)
              );
              setCounter((prevCounter) => prevCounter - 1);
            } catch (error) {
              console.error("Erro ao remover item:", error);
            }
          },
        },
        {
          text: "Não",
          onPress: () => Alert.alert("Mudei de ideia"),
        },
      ]
    );
  }

  
  function calculateTotalPrice() {
    let totalPrice = 0;
    listParticipant.forEach((participant) => {
      totalPrice += participant.price;
    });
    return totalPrice.toFixed(2);
  }

  function calculateTotalItems() {
    return listParticipant.length;
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titleEvent}>ARRAIÁ DOS GURI</Text>
      <Text style={styles.dateEvent}>Sábado, 8 de julho de 2023</Text>
     </View>

      <View style={styles.form}>
        <Picker
          style={styles.picker}
          selectedValue={selectedItem}
          onValueChange={(itemValue) => setSelectedItem(itemValue)}
        >
            <Picker.Item label="Selecione um item" value={null} enabled={false} />
              {Object.values(priceList).map((item) => (
            <Picker.Item key={item.label} label={item.label} value={item} />
              ))}
        </Picker>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.generalReview}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>
          Custo Total dos Itens: R${calculateTotalPrice()}
          </Text>
        </View>

        <View style={styles.totalItems}>
          <Text style={styles.totalItemsText}>
          {calculateTotalItems()}
          </Text>
        </View>
      </View>

        <FlatList
          data={listParticipant}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
          <View style={styles.participantContainer}>
            <Participant
              name={item.name}  // Use "item.name" em vez de "item.item"
              participantRemove={() => handleParticipantRemove(item)}
              index={index + 1}
              price={item.price}
            />
          </View>
        )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Selecione os pedidos do povo
          </Text>
  )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalReview: {
    backgroundColor: '#1f1e25',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 56,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    backgroundColor: "#131016",
    padding: 24
  },

  titleEvent: {
    color: "#fdfcfe",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48
  },

  dateEvent: {
    color: "#6b6b6b",
    fontSize: 16
  },

  form: {
    width: "100%",
    flexDirection: "row",
    marginTop: 36,
    marginBottom: 42,
    gap: 7
  },

  picker: {
    flex: 1,
    height: 56,
    backgroundColor: "#1f1e25",
    borderRadius: 5,
    color: "#fff"
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#31cf67",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 24
  },

  listEmptyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  },

  participantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  priceText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 16
  },

  totalPrice:{
    borderStyle: 'solid',
    marginLeft: 16,
  },

  totalItems:{
    borderLeftColor: "#464242",
    borderStyle: 'solid',
    borderLeftWidth: 2,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  totalPriceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  totalItemsText:{
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

});
