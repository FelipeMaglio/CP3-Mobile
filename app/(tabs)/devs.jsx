import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ─── DADOS DOS DESENVOLVEDORES ────────────────────────────────────────────────

const desenvolvedores = [
  {
    id: 1,
    nome: 'Felipe Maglio Filho',          
    rm: 'RM: 563512',                
    curso: 'Análise e Desenvolvimento de Sistemas',
    turma: '2TDSPJ',
    funcao: '👨‍💻 Desenvolvedor Full-Stack',
    foto: null, 
    inicial: 'F',
    cor: '#2563EB',
  },
  {
    id: 2,
    nome: 'Mateus Granja dos Santos',    
    rm: 'RM: 564930',            
    curso: 'Análise e Desenvolvimento de Sistemas',
    turma: '2TDSPJ',
    funcao: '🎨 Designer & Dev',
    foto: null, 
    inicial: 'M',
    cor: '#7C3AED',
  },
  
];

// ─── COMPONENTE DE CARD ────────────────────────────────────────────────────────
function DevCard({ dev }) {
  return (
    <View style={styles.card}>
      {/* Foto ou inicial */}
      <View style={[styles.avatarContainer, { backgroundColor: dev.cor }]}>
        {dev.foto ? (
          <Image source={dev.foto} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarLetra}>{dev.inicial}</Text>
        )}
      </View>

      {/* Informações */}
      <View style={styles.info}>
        <Text style={styles.nome}>{dev.nome}</Text>
        <Text style={styles.funcao}>{dev.funcao}</Text>

        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: dev.cor + '20' }]}>
            <Text style={[styles.badgeTexto, { color: dev.cor }]}>
              {dev.rm}
            </Text>
          </View>
        </View>

        <Text style={styles.detalhe}>📚 {dev.curso}</Text>
        <Text style={styles.detalhe}>🏫 Turma: {dev.turma}</Text>
      </View>
    </View>
  );
}

// ─── TELA PRINCIPAL ────────────────────────────────────────────────────────────
export default function DevsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>👨‍💻</Text>
          <Text style={styles.titulo}>Nossa Equipe</Text>
          <Text style={styles.subtitulo}>
            Desenvolvido por alunos da FIAP
          </Text>
        </View>

        {/* CARDS DOS DEVS */}
        <View style={styles.lista}>
          {desenvolvedores.map((dev) => (
            <DevCard key={dev.id} dev={dev} />
          ))}
        </View>

        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>
            🎓 FIAP — Check Point 1{'\n'}
            📱 React Native + Expo
          </Text>
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
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: '#1E293B',
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: 0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  lista: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarLetra: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  funcao: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  detalhe: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 18,
  },
  rodape: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    alignItems: 'center',
  },
  rodapeTexto: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 22,
  },
});