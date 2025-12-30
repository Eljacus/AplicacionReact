import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../services/authService";
import logoBe from "../assets/images/LogoBe.webp";
import { Mail, Lock, Loader2 } from "lucide-react";

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FormLogin = () => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError("");
    try {
      await authService.login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error en login:", err);
      setAuthError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="w-[700px] p-18 bg-white backdrop-blur-sm rounded-2xl ">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <img
          src={logoBe}
          alt="Logo Be"
          className="mx-auto mb-4 w-48 sm:w-56 md:w-64"
        />
        <p className="text-black/80 text-md sm:text-lg md:text-3xl">
          ¡Empieza a conectar tu comunidad ante buenas acciones!
        </p>
      </div>

      {/* Formulario de login */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-black font-medium text-sm md:text-base "
          >
            Correo Electronico
          </label>
          <div className="relative">
            <Mail
              size={20}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                errors.email ? "text-red-500" : "text-black"
              }`}
            />
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Ingresa tu correo electronico"
              className={`w-full pl-10 pr-3 py-2.5 sm:py-3 md:py-3.5 bg-white/20 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-black/30 focus:ring-black focus:border-black"
              } rounded-lg text-sm sm:text-base text-black placeholder-black/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/25`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña Input */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-black font-medium text-sm md:text-base"
          >
            Contraseña
          </label>
          <div className="relative">
            <Lock
              size={20}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                errors.password ? "text-red-500" : "text-black"
              }`}
            />
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Ingresa tu contraseña"
              className={`w-full pl-10 pr-3 py-2.5 sm:py-3 md:py-3.5 bg-white/20 border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-black/30 focus:ring-black focus:border-black"
              } rounded-lg text-sm sm:text-base text-black placeholder-black/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/25`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm pl-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-6 text-center mb-16">
          <a
            href="#"
            className="text-black/80 font-medium text-xs sm:text-sm md:text-lg hover:text-white border-b border-black/30 transition-colors duration-200"
          >
            Recuperar Contraseña
          </a>
        </div>

        {/* Mensaje de error general (API) */}
        {authError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 sm:p-4">
            <p className="text-red-500 text-sm sm:text-base text-center">
              {authError}
            </p>
          </div>
        )}

        {/* Boton de submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-400 text-white cursor-pointer font-bold py-2.5 sm:py-3 md:py-3.5 px-6 rounded-lg text-sm sm:text-base md:text-lg hover:bg-blue-950 transform  active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Ingresando...</span>
            </div>
          ) : (
            "Ingresar"
          )}
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
