import { FaUser } from "react-icons/fa";

export default function GuestLoginButton() {
  return (
    <button type="button" className="auth-guest-btn">
      <span className="auth-guest-btn__icon-box">
        <FaUser size={16} />
      </span>

      <span className="auth-guest-btn__text">Login as a Guest</span>
    </button>
  );
}