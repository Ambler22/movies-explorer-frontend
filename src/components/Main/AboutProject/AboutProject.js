import React from "react";

const AboutProject = () => {
  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__content">
        <div className="project__wrapper">
          <h4 className="project__subtitle">Дипломный проект включал 5 этапов</h4>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__wrapper">
          <h4 className="project__subtitle">На выполнение диплома ушло 5 недель</h4>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__lines">
        <div className="project__line">
          <p className="project__text_green project__text_small">1 неделя</p>
          <p className="project__text_large">4 недели</p>
        </div>
        <div className="project__line">
          <p className="project__text_grey project__text_small">Back-end</p>
          <p className="project__text_grey project__text_large">Front-end</p>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;