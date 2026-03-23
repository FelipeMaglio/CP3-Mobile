import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

export default function Index() {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    console.log('App iniciado');
  }, []);

  const handleEnviar = () => {
    setEnviado(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Formulário de Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu curso"
          value={curso}
          onChangeText={setCurso}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Fale um pouco sobre você"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Button title="Enviar" onPress={handleEnviar} />

        {enviado && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTitulo}>Dados Informados:</Text>

            <Text>Nome: {nome}</Text>
            <Text>Curso: {curso}</Text>
            <Text>Disciplina: {disciplina}</Text>
            <Text>Descrição: {descricao}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
  },
  resultado: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});