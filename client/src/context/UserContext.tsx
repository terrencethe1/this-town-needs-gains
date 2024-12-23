import { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo para el contexto
interface UserContextType {
    currentUser: { username: string } | null;
  setCurrentUser: (user: { username: string } | null) => void;
}

// Creamos el contexto con valores iniciales
const UserContext = createContext<UserContextType | undefined>(undefined);

// Creamos un provider para envolver nuestra app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);

  

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
