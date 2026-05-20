import { router } from 'expo-router';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUser } from '../../context/UserContext';

// Componente reutilizável para cada linha de informação
function InfoRow({ rotulo, valor }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoRotulo}>{rotulo}</Text>
      <Text style={styles.infoValor}>
        {valor || <Text style={styles.semDados}>Não informado</Text>}
      </Text>
    </View>
  );
}

export default function PerfilScreen() {
  const { userData } = useUser();

  // Monta o endereço completo para exibição
  const enderecoCompleto = [
    userData.rua,
    userData.bairro,
    userData.cidade && userData.estado
      ? `${userData.cidade} - ${userData.estado}`
      : userData.cidade || userData.estado,
  ]
    .filter(Boolean)
    .join(', ');

  const temDados = userData.nome || userData.email || userData.rm;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CABEÇALHO AZUL COM FOTO */}
        <View style={styles.header}>
          {userData.foto ? (
            <Image source={{ uri: userData.foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarLetra}>
                {userData.nome ? userData.nome[0].toUpperCase() : '?'}
              </Text>
            </View>
          )}
          <Text style={styles.nomeHeader}>
            {userData.nome || 'Sem nome'}
          </Text>
          <Text style={styles.rmHeader}>
            {userData.rm ? `RM: ${userData.rm}` : 'RM não cadastrado'}
          </Text>
        </View>

        {/* AVISO SE SEM DADOS */}
        {!temDados && (
          <View style={styles.avisoBanner}>
            <Text style={styles.avisoTexto}>
              ⚠️ Você ainda não cadastrou seus dados.{'\n'}
               Vá até a aba {'"'}Cadastro{'"'} e preencha o formulário.
            </Text>
            <TouchableOpacity
              style={styles.avisoBtn}
              onPress={() => router.push('/')}
            >
              <Text style={styles.avisoBtnTexto}>Ir para Cadastro</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CARTÃO: DADOS PESSOAIS */}
        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>👤 Dados Pessoais</Text>
          <InfoRow rotulo="Nome" valor={userData.nome} />
          <InfoRow rotulo="E-mail" valor={userData.email} />
          <InfoRow rotulo="RM" valor={userData.rm} />
        </View>

        {/* CARTÃO: ENDEREÇO */}
        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>📍 Endereço</Text>
          <InfoRow rotulo="CEP" valor={userData.cep} />
          <InfoRow rotulo="Rua" valor={userData.rua} />
          <InfoRow rotulo="Bairro" valor={userData.bairro} />
          <InfoRow rotulo="Cidade" valor={userData.cidade} />
          <InfoRow rotulo="Estado" valor={userData.estado} />
          {enderecoCompleto ? (
            <View style={styles.enderecoCompleto}>
              <Text style={styles.enderecoLabel}>Endereço completo:</Text>
              <Text style={styles.enderecoTexto}>{enderecoCompleto}</Text>
            </View>
          ) : null}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#2563EB',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  avatarLetra: {
    fontSize: 44,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  nomeHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rmHeader: {
    fontSize: 14,
    color: '#BFDBFE',
    marginTop: 4,
  },
  avisoBanner: {
    backgroundColor: '#FEF3C7',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  avisoTexto: {
    color: '#92400E',
    fontSize: 14,
    lineHeight: 20,
  },
  avisoBtn: {
    backgroundColor: '#F59E0B',
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  avisoBtnTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cartaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 8,
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoRotulo: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    width: 90,
  },
  infoValor: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  semDados: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  enderecoCompleto: {
    backgroundColor: '#F0F9FF',
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  enderecoLabel: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
    marginBottom: 4,
  },
  enderecoTexto: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
});