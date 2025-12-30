import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { actionsService, type ActionItem } from "../services/getList";
import Pagination from "../components/Pagination";
import logoBe from "../assets/images/LogoBe.webp";
import logoBeWhite from "../assets/images/LogoBeWhite.webp"; // Keep this import for the header
import ColorFulBackground from "../assets/images/ColorFulBackground.webp";
import {
  Menu,
  Home,
  LogOut,
  ChartLine,
  Users,
  DollarSign,
  Store,
  Trophy,
  Copy,
  Shapes,
} from "lucide-react";

const TabStyle =
  "flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors font-medium";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActions = async (page: number) => {
    setIsLoading(true);
    try {
      // 10 items per page as requested
      const response = await actionsService.getAdminList(page, 10);
      setActions(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching actions:", err);
      setError("Error al cargar los datos. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Header full espacio en x */}
      <header className="bg-blue-950 text-white shadow-md z-50 ">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={logoBeWhite}
                alt="Logo Be"
                className="h-8 md:h-10 object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 ">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center text-blue-950 font-bold shadow-md ">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar o menu lateral */}
        <aside
          className={`
            absolute md:static inset-y-0 left-0 z-40
            w-72 bg-white text-gray-800 shadow-xl md:shadow-none border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 flex flex-col h-full
          `}
        >
          {/* Navegacion */}
          <nav className="flex-1 space-y-7">
            <div className="relative w-full">
              <img
                src={ColorFulBackground}
                alt="ColorFulBackground"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logoBe}
                  alt="Logo Be"
                  className="w-3/4 object-contain"
                />
              </div>
            </div>
            <div className="space-y-2 p-4">
              <a href="#" className={TabStyle}>
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#" className={TabStyle}>
                <ChartLine size={20} />
                <span>Impacto</span>
              </a>
              <a href="#" className={TabStyle}>
                <Users size={20} />
                <span>Comunidad</span>
              </a>
              <a href="#" className={TabStyle}>
                <DollarSign size={20} />
                <span>Sponsors</span>
              </a>
              <a href="#" className={TabStyle}>
                <Store size={20} />
                <span>Marketplace</span>
              </a>
              <a href="#" className={TabStyle}>
                <Trophy size={20} />
                <span>Bakanes</span>
              </a>
              <a href="#" className={TabStyle}>
                <Copy size={20} />
                <span>Contenidos</span>
              </a>
              <a href="#" className={TabStyle}>
                <Shapes size={20} />
                <span>Categorias de acciones</span>
              </a>
            </div>
          </nav>

          {/*  Footer del menu lateral*/}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-8 w-full relative">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold text-blue-950">CATEGORIAS</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {isLoading && (
                <div className="p-8 text-center text-gray-500">
                  Cargando datos...
                </div>
              )}

              {!isLoading && error && (
                <div className="p-8 text-center text-red-500">{error}</div>
              )}

              {!isLoading && !error && actions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No hay datos disponibles
                </div>
              )}

              {!isLoading && !error && actions.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="p-4">Icono</th>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Descripción</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Color</th>
                        <th className="p-4">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {actions.map((action) => (
                        <tr
                          key={action.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4">
                            <img
                              src={action.icon}
                              alt={action.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://via.placeholder.com/40";
                              }}
                            />
                          </td>
                          <td className="p-4 font-medium text-gray-900">
                            {action.name}
                          </td>
                          <td
                            className="p-4 text-gray-600 text-sm max-w-xs truncate"
                            title={action.description}
                          >
                            {action.description}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                action.status === 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {action.status === 1 ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                                style={{ backgroundColor: action.color }}
                              />
                              <span className="text-xs text-gray-500 uppercase">
                                {action.color}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-500 text-sm">
                            {new Date(action.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {!isLoading && !error && actions.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
