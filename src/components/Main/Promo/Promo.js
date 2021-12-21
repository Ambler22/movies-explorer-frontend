import React from "react";

const Promo = () => {
  return(
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <ul className="promo__navigation">
            <button className="promo__navigation_button">О проекте</button>
            <button className="promo__navigation_button">Технологии</button>
            <button className="promo__navigation_button">Студент</button>
          </ul>
      </div>
    </section>
  )
}

export default Promo;