import { createContext, useContext, useState } from 'react';

// Valores padrão
const defaultUserData = {
  nome: '',
  email: '',
  rm: '',
  cep: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  foto: null,
};

// Cria o contexto
const UserContext = createContext();

// Provider
export function UserProvider({ children }) {
  const [userData, setUserData] = useState(defaultUserData);

  // Atualiza apenas um campo
  const updateField = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateField,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook customizado
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }

  return context;
}