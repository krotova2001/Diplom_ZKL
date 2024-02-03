import { createContext, useState } from "react";

// ���������� ��� ���������
type AuthContextType = {
    isAuthenticated: boolean; // ����, ������������, ���������������� �� ������������
    setAuth: (auth: boolean) => void; // ������� ��� ��������� �������� isAuthenticated
};

// ������� �������� � ����� AuthContextType � ���������� ���������� �� ���������
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuth: () => { },
});

// ������� ��������� ����������, ������� ������������� ������ ��������� ���� �������� �����������
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    // ���������� ��� useState ��� �������� ���������� isAuthenticated � ������� setAuth ��� �� ���������
    const [isAuthenticated, setAuth] = useState<boolean>(false);

    // ���������� �������� ����������, ��������� �������� isAuthenticated � setAuth � �������� �������� ���������
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

