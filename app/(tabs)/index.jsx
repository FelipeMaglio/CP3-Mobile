import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { useUser } from '../../context/UserContext';
import { buscarEnderecoPorCep } from '../../services/viaCep';

export default function CadastroScreen() {
  // Context API
  const { userData, updateField } = useUser();

  // Estados locais
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  const [salvo, setSalvo] = useState(false);

  // ─────────────────────────────────────────────
  // CÂMERA
  // ─────────────────────────────────────────────

  const abrirCamera = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Permita o acesso à câmera nas configurações do celular.'
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      updateField('foto', resultado.assets[0].uri);
    }
  };

  // ─────────────────────────────────────────────
  // GALERIA
  // ─────────────────────────────────────────────

  const abrirGaleria = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Permita o acesso à galeria nas configurações.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      updateField('foto', resultado.assets[0].uri);
    }
  };

  // ─────────────────────────────────────────────
  // ESCOLHER FOTO
  // ─────────────────────────────────────────────

  const escolherFoto = () => {
    Alert.alert(
      'Foto do Perfil',
      'Escolha uma opção',
      [
        {
          text: '📷 Câmera',
          onPress: abrirCamera,
        },
        {
          text: '🖼️ Galeria',
          onPress: abrirGaleria,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  // ─────────────────────────────────────────────
  // BUSCAR CEP
  // ─────────────────────────────────────────────

  const buscarCep = async (cep) => {
    updateField('cep', cep);

    setErroCep('');

    const apenasNumeros = cep.replace(/\D/g, '');

    // Só busca se tiver 8 números
    if (apenasNumeros.length !== 8) {
      return;
    }

    setCarregandoCep(true);

    try {
      const endereco = await buscarEnderecoPorCep(cep);

      updateField('rua', endereco.rua);
      updateField('bairro', endereco.bairro);
      updateField('cidade', endereco.cidade);
      updateField('estado', endereco.estado);

      setErroCep('');
    } catch (erro) {
      updateField('rua', '');
      updateField('bairro', '');
      updateField('cidade', '');
      updateField('estado', '');

      setErroCep(
        erro.message ||
          'Erro ao buscar CEP. Verifique sua conexão.'
      );
    } finally {
      setCarregandoCep(false);
    }
  };

  // ─────────────────────────────────────────────
  // SALVAR
  // ─────────────────────────────────────────────

  const handleSalvar = () => {
    if (!userData.nome.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Preencha o nome.'
      );
      return;
    }

    if (!userData.email.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Preencha o e-mail.'
      );
      return;
    }

    if (!userData.rm.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Preencha o RM.'
      );
      return;
    }

    setSalvo(true);

    Alert.alert(
      'Sucesso',
      'Dados salvos com sucesso!'
    );
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.titulo}>
              Formulário de Cadastro
            </Text>

            <Text style={styles.subtitulo}>
              Preencha seus dados abaixo
            </Text>
          </View>

          {/* FOTO */}
          <TouchableOpacity
            style={styles.fotoContainer}
            onPress={escolherFoto}
          >
            {userData.foto ? (
              <Image
                source={{ uri: userData.foto }}
                style={styles.fotoPreview}
              />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Text style={styles.fotoIcone}>
                  📷
                </Text>

                <Text style={styles.fotoTexto}>
                  Adicionar Foto
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* DADOS */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>
              Dados Pessoais
            </Text>

            <Text style={styles.label}>
              Nome Completo *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={userData.nome}
              onChangeText={(v) =>
                updateField('nome', v)
              }
            />

            <Text style={styles.label}>
              E-mail *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              value={userData.email}
              onChangeText={(v) =>
                updateField('email', v)
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>
              RM *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="12345"
              value={userData.rm}
              onChangeText={(v) =>
                updateField('rm', v)
              }
              keyboardType="numeric"
            />
          </View>

          {/* ENDEREÇO */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>
              Endereço
            </Text>

            <Text style={styles.label}>
              CEP
            </Text>

            <View style={styles.cepContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.cepInput,
                ]}
                placeholder="00000-000"
                value={userData.cep}
                onChangeText={buscarCep}
                keyboardType="numeric"
                maxLength={9}
              />

              {carregandoCep && (
                <ActivityIndicator
                  size="small"
                  color="#2563EB"
                  style={styles.cepLoader}
                />
              )}
            </View>

            {erroCep ? (
              <Text style={styles.erroTexto}>
                ⚠️ {erroCep}
              </Text>
            ) : null}

            <Text style={styles.label}>
              Rua
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.inputAutoPreenchido,
              ]}
              value={userData.rua}
              onChangeText={(v) =>
                updateField('rua', v)
              }
            />

            <Text style={styles.label}>
              Bairro
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.inputAutoPreenchido,
              ]}
              value={userData.bairro}
              onChangeText={(v) =>
                updateField('bairro', v)
              }
            />

            <View style={styles.linhaDouble}>
              <View
                style={{
                  flex: 2,
                  marginRight: 8,
                }}
              >
                <Text style={styles.label}>
                  Cidade
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    styles.inputAutoPreenchido,
                  ]}
                  value={userData.cidade}
                  onChangeText={(v) =>
                    updateField('cidade', v)
                  }
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>
                  UF
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    styles.inputAutoPreenchido,
                  ]}
                  value={userData.estado}
                  onChangeText={(v) =>
                    updateField('estado', v)
                  }
                  maxLength={2}
                />
              </View>
            </View>
          </View>

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleSalvar}
          >
            <Text style={styles.botaoTexto}>
              Salvar Dados
            </Text>
          </TouchableOpacity>

          {salvo && (
            <View style={styles.sucessoBanner}>
              <Text style={styles.sucessoTexto}>
                ✅ Dados salvos com sucesso!
              </Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  fotoContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },

  fotoPreview: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#2563EB',
  },

  fotoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },

  fotoIcone: {
    fontSize: 28,
  },

  fotoTexto: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },

  secao: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 4,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },

  inputAutoPreenchido: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },

  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cepInput: {
    flex: 1,
  },

  cepLoader: {
    marginLeft: 12,
  },

  erroTexto: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 4,
  },

  linhaDouble: {
    flexDirection: 'row',
  },

  botaoSalvar: {
    backgroundColor: '#2563EB',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  sucessoBanner: {
    backgroundColor: '#D1FAE5',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },

  sucessoTexto: {
    color: '#065F46',
    fontWeight: '600',
    fontSize: 14,
  },
});