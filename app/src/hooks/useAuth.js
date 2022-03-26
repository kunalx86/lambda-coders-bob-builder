import { useContext } from "react";
import { AuthContext } from "src/providers/authProvider";

export const useAuth = () => useContext(AuthContext);