import { createContext, useState, useEffect, use } from "react";
import { User, USER_PROFILE_KEY } from "../utils/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  createUser: (userData: User) => Promise<boolean>;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (userData: User): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userData));

      setUser(userData);

      return true;
    } catch (error) {
      setError("Failed to create user");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_PROFILE_KEY);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        setError("Failed to load user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
