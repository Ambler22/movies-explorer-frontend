import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const PagesNotFound = () => {

  const navigate = useNavigate();
  const returnPreviousPage = () => navigate(-1);

  return (
    <section className="not-found">
      <h1 className="not-found__number">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      {/* <Link className="not-found__link" to='/'>Назад</Link> */}
      <button className="not-found__link" onClick={returnPreviousPage}>Назад</button>
    </section>
  )
}

export default PagesNotFound;