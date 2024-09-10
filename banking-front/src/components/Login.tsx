import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  password: string;
}

interface LoginRegisterProps {
  onLogin: (token: string) => void; // Acepta la función onLogin como prop
}

const loginSchema = yup.object({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export default function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let response;
      if (isRegistering) {
        // Registro de usuario
        response = await axios.post("/api/auth/register", data);
      } else {
        // Login de usuario
        response = await axios.post("/api/auth/login", data);
      }

      if (response.data.token) {
        onLogin(response.data.token);

        navigate("/dashboard");
      }
      setErrorMessage(null); // Limpiar errores
    } catch {
      setErrorMessage("Error en la autenticación");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isRegistering ? "Registrar nuevo usuario" : "Iniciar sesión"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input fields y errores */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              id="username"
              {...register("username")}
              className={`mt-1 p-2 block w-full border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
              type="text"
              placeholder="Nombre de usuario"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Campo de contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              {...register("password")}
              className={`mt-1 p-2 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
              type="password"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
          >
            {isRegistering ? "Registrar y loguearse" : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isRegistering ? (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button
                className="text-blue-500"
                onClick={() => setIsRegistering(false)}
              >
                Inicia sesión
              </button>
            </p>
          ) : (
            <p>
              ¿No tienes una cuenta?{" "}
              <button
                className="text-blue-500"
                onClick={() => setIsRegistering(true)}
              >
                Regístrate
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
