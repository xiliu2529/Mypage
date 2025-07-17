// src/components/Header.jsx
import "./styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Xiliu</div>
      <nav>
        <a href="/" className="link">
          首页
        </a>
        <a href="/about" className="link">
          关于
        </a>
        <a href="/login" className="link">
          登入
        </a>
      </nav>
    </header>
  );
};

export default Header;
