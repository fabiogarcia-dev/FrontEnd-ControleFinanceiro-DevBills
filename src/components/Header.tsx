import { Activity, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { authState, signOut } = useAuth();
    const user = authState.user;
    console.log(user);


  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-black text-gray-800 shadow-md">
      {/* Logo e título à esquerda */}
      <div className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-[#37E359]" />
        <p className="text-lg font-semibold text-[#37E359]">DevBills</p>
      </div>

      {/* Navegação centralizada */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-sm font-medium">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-[#37E359]" : "text-gray-600 hover:text-[#37E359]"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transacoes"
          className={({ isActive }) =>
            isActive ? "text-[#37E359]" : "text-gray-600 hover:text-[#37E359]"
          }
        >
          Transações
        </NavLink>
      </nav>
      {/* Usuário à direita */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white text-sm">{user.displayName}</span>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-[#37E359]"
              />
              
            )}
            <LogOut
              onClick={signOut}
              className="w-8 h-8 text-sm text-white border border-[#37E359] px-2 py-1 rounded hover:bg-[#37E359] hover:text-black transition cursor-pointer"
            >
            </LogOut>
          </>
        ) : (
          <span className="text-white text-sm">Não autenticado</span>
        )}
      </div>

    </header>
  );
};

export default Header;