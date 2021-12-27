import React from "react";
import PortfolioIcon from '../../../images/portfolioicon.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__links">
          <li className="portfolio__box"><a href="https://github.com/Ambler22/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">Статичный сайт</a><img src={PortfolioIcon} className="portfolio__icon" alt="иконка"/></li>
          <li className="portfolio__box"><a href="https://github.com/Ambler22/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">Адаптивный сайт</a><img src={PortfolioIcon} className="portfolio__icon" alt="иконка"/></li>
          <li className="portfolio__box"><a href="https://dom.rom.nomoredomains.rocks" className="portfolio__link" target="_blank" rel="noreferrer">Одностраничное приложение</a><img src={PortfolioIcon} className="portfolio__icon" alt="иконка"/></li>
        </ul>
      </div>
    </section>
  )
};

export default Portfolio;