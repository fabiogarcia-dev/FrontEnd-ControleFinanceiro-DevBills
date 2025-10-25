import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthState } from "../types/auth";
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";

interface AuthContextProps {
    authState: AuthState;
    signWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [authState, setAutState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false
    });

    const signWithGoogle = async (): Promise<void> => {
        setAutState( (prev) => ({...prev, loading: true}));

        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider);
        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'Erro ao tentar logar'

            setAutState( (prev) => ({...prev, loading: false, error: message}));
        }
    };

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if(user){
                setAutState({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    error: null,
                    loading: false,
                });
            }else{
                setAutState({ user: null, error: null, loading: false});
            }
        },
        (error) => {
            console.error("Erro na autenticação");
            setAutState({user: null, error: error.message, loading: false});
        },
    );
        return () => unsubscribe();
    }, []);

    const signOut = async (): Promise<void> => {
        setAutState( (prev) => ({...prev, loading: true}));
        try {
            await firebaseSignOut(firebaseAuth);
        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'Erro ao tentar logar'

            setAutState( (prev) => ({...prev, loading: false, error: message}));            
        }
    };

    return (
        <AuthContext.Provider value={{authState, signWithGoogle, signOut}}>{children}</AuthContext.Provider>
    );  
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
};