import React, { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function CepApp() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  const handleCepChange = (text) => {
    const formattedCep = text.replace(/[^0-9]/g, '').substring(0, 8);
    setCep(formattedCep.replace(/(\d{5})(\d{3})/, '$1-$2'));
  };

  function limpar() {
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscar() {
    if (cep === '' || cep.length !== 9) {
      alert('Digite um cep valido!');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep.replace(/[^0-9]/g, '').substring(0, 8)}`);
      setCepUser(response.data)

      //Fecha o teclado 
      Keyboard.dismiss();
    } catch (error) {
      alert('Cep não encontrado!\nVerifique se o número está correto!');
      limpar();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.titulo}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 30130911'
          value={cep}
          onChangeText={handleCepChange}
          keyboardType='numeric'
          maxLength={9}
          ref={inputRef}
          re
        />
      </View>

      <View style={styles.areaBtn}>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}
          onPress={buscar}
        >
          <Text style={styles.botaoTexto}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}
        >
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {
        cep && cepUser &&
        (<View style={styles.resultado}>
          <Text style={styles.itemTexto}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemTexto}>Logradouro: {cepUser.address}</Text>
          <Text style={styles.itemTexto}>Bairro: {cepUser.district}</Text>
          <Text style={styles.itemTexto}>Cidade: {cepUser.city}</Text>
          <Text style={styles.itemTexto}>Estado: {cepUser.state}</Text>
        </View>)
      }

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titulo: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 50
  },
  areaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15
  },
  botao: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000'
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTexto: {
    fontSize: 22
  }
});