import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { postCreateUser } from "../../redux/actions/POST/index";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Signin.css";
import Logo from "../../Assets/Images/Logo.png";
const INITIAL_STATE = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  wallet: 0,
  isActive: true,
  isAdmin: false,
};
const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^[\s\S]{8,25}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const CreateUserForm = () => {
  const { loginWithRedirect } = useAuth0();
  const [register, setRegister] = useState(INITIAL_STATE);
  const [validateRegister, setValidateRegister] = useState({
    name: true,
    email: true,
    password: true,
    equalsPassword: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setRegister({
      ...register,
      [name]: value,
    });
    setValidateRegister({
      ...validateRegister,
      [name]: expresiones[name].test(value.trim()),
    });
  };
  const handleSubmitRegister = async (evt) => {
    evt.preventDefault();
    if (
      !validateRegister.name ||
      !validateRegister.email ||
      !validateRegister.password ||
      !validateRegister.equalsPassword
    ) {
      setTimeout(() => {
        setValidateRegister({
          ...validateRegister,
        });
      }, 2500);
      return setValidateRegister({
        ...validateRegister,
      });
    }
    dispatch(postCreateUser(register));
    // // window.localStorage.setItem(PASSWORD, register.password);
    setRegister(INITIAL_STATE);
    return navigate("/home");
  };

  return (
    <div className="container-register">
      <div className="container-logo-adilbet">
        <img src={Logo} alt="Logo-adilbet" className="Logo-login" />
      </div>
      <div className="container-register-form">
        <div className="container-form-body">
          <h3 className="title-form">Regístrate</h3>
          <form onSubmit={handleSubmitRegister} className="form-body">
            {/* NOMBRE */}
            <div class="form-floating mb-3 ">
              <input
                type="text"
                name="name"
                class={`form-control ${ validateRegister.name ? "" : "is-invalid" }`}
                id={ validateRegister.name ? "floatingInputInvalid" : "floatingInput" }
                placeholder="name"
                onChange={handleChange}
              />
              <label for="floatingInput">Nombre</label>
            </div>
            {validateRegister.name ? null : (
              <span className="span-form">El nombre no puede contener números y menos de 5 letras</span>
            )}

            {/* USUARIO */}
            <div class="form-floating mb-3">
              <input
                type="text"
                name="userName"
                class="form-control"
                id="floatingInput"
                placeholder="name"
                onChange={handleChange}
              />
              <label for="floatingInput">Nombre de usuario</label>
            </div>

            {/* EMAIL */}
            <div class="form-floating mb-3">
              <input
                type="email"
                name="email"
                class={`form-control ${ validateRegister.email ? "" : "is-invalid" }`}
                id={ validateRegister.email ? "floatingInputInvalid" : "floatingInput" }
                placeholder="name@example.com"
                onChange={handleChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            {validateRegister.email ? null : (
              <span className="span-form">El correo electrónico no es válido</span>
            )}

            {/* CONTRASEÑA */}
            <div class="form-floating mb-3">
              <input
                type="password"
                name="password"
                class="form-control"
                id="floatingInput"
                placeholder="Contraseña"
                value={register.password}
                onChange={handleChange}
              />
            <label for="floatingInput">Contraseña</label>
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div className="form-floating mb-3">
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirmar Contraseña"
                class={`form-control ${ validateRegister.password ? "" : "is-invalid" }`}
                id={ validateRegister.password ? "floatingInputInvalid" : "floatingInput" }
                value={register.confirm_password}
                onChange={handleChange}
              />
            <label for="floatingInput">Confirmar contraseña</label>
            </div>
            {validateRegister.password ? null : (
              <span className="span-form">
                La contraseña debe contener mínimo 8 caracteres
              </span>
            )}
            {register.password !== register.confirm_password &&
            register.password.length >= 8 ? (
              <span className="span-form">Las contraseñas no coinciden</span>
            ) : null}

            {/* TELEFONO */}
            <div className="form-floating mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Telefono"
                class="form-control"
                id="floatingInput"
                value={register.phone}
                onChange={handleChange}
              />
            <label for="floatingInput">Teléfono</label>
            </div>
            
            {/* BOTON DE REGISTRO */}
            <div className="button-check-register">
              <button className="btn btn-primary btn-color">Regístrate</button>
            </div>

            {/* Auth0 de 3ros */}
              <button
                onClick={() => loginWithRedirect()}
                className="container-google"
              >
              <img
                src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                alt="google-logo"
                className="google-logo"
              />
                Inicia con Google
              </button>

          </form>
          <div className="register-link">
            <p className="text-form-register">¿Ya tienes cuenta?</p>
            <Link to="/login" className="btn btn-outline-primary">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;