import Button from "../ui/Button";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  return (
    <>
      <form className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
        />
        <Button className="auth-submit-btn">Login</Button>
      </form>

      <div className="auth-links">
        <button type="button" className="auth-link">
          Forgot your password?
        </button>
      </div>

      <div className="auth-modal__footer">
        <button type="button" className="auth-link" onClick={onSwitchToRegister}>
          Don&apos;t have an account?
        </button>
      </div>
    </>
  );
}