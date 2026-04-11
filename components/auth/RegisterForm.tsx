import Button from "../ui/Button";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
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
        <Button className="auth-submit-btn">Create your account</Button>
      </form>

      <div className="auth-links">
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          Already have an account?
        </button>
      </div>
    </>
  );
}