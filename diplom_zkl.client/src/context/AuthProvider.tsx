import { createContext, useState } from "react";

// ���������� ��� ���������
type AuthContextType = {
    isAuthenticated: boolean; // ����, ������������, ���������������� �� ������������
    setAuth: (auth: boolean) => void; // ������� ��� ��������� �������� isAuthenticated
};

// ������� �������� � ����� AuthContextType � ���������� ���������� �� ���������
const AuthContext = createContext<AuthContextType>(
    {
        isAuthenticated: localStorage.getItem('persistent')=='true'?true:false,
        setAuth: () => {  },
});

// ������� ��������� ����������, ������� ������������� ������ ��������� ���� �������� �����������
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    // ���������� ��� useState ��� �������� ���������� isAuthenticated � ������� setAuth ��� �� ���������
    const [isAuthenticated, setAuth] = useState<boolean>(localStorage.getItem('persistent') == 'true' ? true : false);

    // ���������� �������� ����������, ��������� �������� isAuthenticated � setAuth � �������� �������� ���������
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

