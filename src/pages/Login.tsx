import FormLogin from "../components/FormLogin";
import backgroundImage from "../assets/images/Background.webp";

const Login = () => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <FormLogin />
    </div>
  );
};

export default Login;
