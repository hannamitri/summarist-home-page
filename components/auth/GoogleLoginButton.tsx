export default function GoogleLoginButton() {
  return (
    <button type="button" className="auth-social-btn">
      <span className="auth-social-btn__icon-box">
        <img
          className="auth-google-icon"
          src="/assets/google.png"
          alt="Google"
        />
      </span>

      <span className="auth-social-btn__text">Login with Google</span>
    </button>
  );
}