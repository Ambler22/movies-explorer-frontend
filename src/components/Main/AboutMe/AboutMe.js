import React from "react";
import MyPhoto from '../../../images/myphoto.jpeg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__name">Роман</h2>
          <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родился и живу в Москве, закончил московскую спортивную академию. Я люблю спорт и увлекаюсь игрой на музыкальных инструментах. Недавно начал кодить. С 
          2014 года работал в сфере фитнеса. Сейчас пишу диплом и планирую сменить сферу деятельности.
          </p>
          <div className="about-me__links">
            <a href="https://www.facebook.com/profile.php?id=100004093615300" className="about-me__link" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://github.com/Ambler22" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
          <img className="about-me__photo" src={MyPhoto} alt="фото студента" />
      </div>
    </section>
  )
};

export default AboutMe;