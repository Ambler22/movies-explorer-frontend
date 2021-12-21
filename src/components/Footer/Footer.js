import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__box">
          <p className="footer__copyright">&copy; 2021</p>
          <nav className="footer__links">
            <a href="https://practicum.yandex.ru/" className="footer_link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/" className="footer_link" target="_blank" rel="noreferrer">Github</a>
            <a href="https://www.facebook.com/" className="footer_link" target="_blank" rel="noreferrer">Facebook</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;