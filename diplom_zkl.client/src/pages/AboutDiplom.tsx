import React from 'react';
import HeaderTop from '../components/HeaderTop';
import { Typography } from '@mui/joy';
function Projects() {
  return (
    <>
    <HeaderTop Header='О дипломном проекте' />
    <Typography>
    Группа: СБД - 11
Студенты: Левковский Михаил, Зимин Григорий, Кротов Георгий
Тема: Программа для менеджмента задач
Цель: Создать программный продукт, который повысит качество выполнения задач для отдельного пользователя и для группы лиц.

Описание.
Программа представляет собой web-приложение для создания, редактирования и контроля исполнения различных задач. Программа является многопользовательской и работает с аутентифицированными пользователями. Аутентификация может быть как базовая (логин и пароль), так и на основе сторонних сервисов (google - аутентификация). Пользователи могут объединятся в группы (проект), либо работать в программе индивидуально. Пользователи могут создавать задачи, назначить им название, описание, сложность, сроки выполнения и приоритет. Возможно создавать вложенные задачи. Пользователи внутри одной группы (проекта) видят задачи друг друга и могут ими управлять. 

Программа существует в виде web-приложения с разделением на front-end и back-end. Требования:

Функционал аутентификации и авторизации. (Возможно использование google-аутентификации / сторонний сервис)
Регистрация новых пользователей
Изменение данных о себе
Удаление пользователя (информация переносится в архив и доступна 3 месяца).
Авторизация пользователей на основе ролей в проекте. Роли (исполнитель, руководитель) могут меняться от проекта к проекту
Функционал работы с сущностью “Задача”. 
Задача имеет:
название
описание
автора
исполнителя (возможно несколько исполнителей)
сроки
статусы выполнения
сложность задачи
вложенные такие же задачи. Уровень вложенности не ограничен.
Функционал построения статистики и отчетов по задачам. Построение графиков и диаграмм.
Функционал оповещения по изменением статуса задачи (Получать уведомления на email и в Telegram;
Функционал добавления к задаче файлов и других приложений (система плагинов). Динамическое добавление функционала за счет внешних плагинов (библиотек)
Мобильная версия приложения для Android.
Система технической поддержки. Пользователи имеют возможность сообщить о проблеме во время использования программы через почту (в случае закрытой корпоративной сети) либо через Telegram - бот.


Модули программы:
Back-end в виде Rest-api сервиса (Asp.net core 6/7)
СУБД Postgres 14/15/16
Визуальная часть React 18
Мобильная версия приложения на Android

Требования к платформе:
Серверная часть: веб-сервер со средой исполнения не ниже .net 6.0, СУБД MSSQL/Postgres
Клиентская часть: веб-браузер с поддержкой JavaScript

Распределение ролей в разработке дипломной работы.

Зимин Григорий.
Разработка back-end составляющей. 
Разработка системы плагинов
Разработка системы формирования отчетов и статистики
разработка системы импорта и экспорта задач и проектов
Левковский Михаил. 
разработка архитектуры БД. 
разработка мобильной версии приложения для Android
разработка системы развертывания и технической поддержки приложения
Кротов Георгий.
разработка системы пользовательского интерфейса (React)
разработка системы аутентификации и авторизации
разработка части технической поддержки приложения


    </Typography>
    </>
  );
}

export default Projects;