import { createContext, useState } from "react";

// ���������� ��� ���������
type AuthContextType = {
    isAuthenticated: boolean; // ����, ������������, ���������������� �� ������������
    setAuth: (auth: boolean) => void; // ������� ��� ��������� �������� isAuthenticated
};

//��������, �� ����������� �� ������������ ������
const FindIsLogin = () => {
    if (sessionStorage.getItem('isLogin') == 'true') {
        return true;
    }
    if (localStorage.getItem('persistent') == 'true') {
        return true;
    }
    return false;

}


// ������� �������� � ����� AuthContextType � ���������� ���������� �� ���������
const AuthContext = createContext<AuthContextType>(
    {
        isAuthenticated: FindIsLogin(),
        setAuth: () => {

        },
});



// ������� ��������� ����������, ������� ������������� ������ ��������� ���� �������� �����������
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    // ���������� ��� useState ��� �������� ���������� isAuthenticated � ������� setAuth ��� �� ���������
    const [isAuthenticated, setAuth] = useState<boolean>(FindIsLogin());

    // ���������� �������� ����������, ��������� �������� isAuthenticated � setAuth � �������� �������� ���������
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

