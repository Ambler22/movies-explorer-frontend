import React from "react";

const Promo = () => {
  return(
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <ul className="promo__navigation">
            <button className="promo__navigation_button"><a href="#project" className="promo__navigation_link">О проекте</a></button>
            <button className="promo__navigation_button"><a href="#tech" className="promo__navigation_link">Технологии</a></button>
            <button className="promo__navigation_button"><a href="#me" className="promo__navigation_link">Студент</a></button>
          </ul>
      </div>
    </section>
  )
}

export default Promo;