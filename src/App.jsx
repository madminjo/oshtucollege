import { useEffect, useMemo, useState } from 'react'
import './App.css'

const collegeGroups = [
  {
    id: 'it-tech',
    shortTitle: 'Инженерия и технологии',
    title: 'Department of Engineering and Technology',
    profile: 'Software Engineering',
    duration: '3 years 10 months',
    skills: ['JavaScript', 'React', 'Web APIs'],
    officialUrl: 'https://oshtu.kg/en/2025/11/20/department-of-engineering-and-technology/',
  },
  {
    id: 'edu-it',
    shortTitle: 'ГП и IT отделение',
    title: 'Отделение гуманитарно-педагогическое и IT технологий',
    profile: 'Программирование и информационные инновации',
    duration: '2 года 10 мес. (после 9 кл.) / 1 год 10 мес. (после 11 кл.)',
    skills: ['Python', 'Databases', 'Algorithms'],
    officialUrl: 'https://oshtu.kg/2024/10/09/otdelenie-gumanitarno-pedagogicheskoe-i-it-tehnologij/',
    relatedLinks: [
      {
        label: 'ПЦО «Программирование и информационные инновации»',
        href: 'https://oshtu.kg/2022/05/11/kafedra-informatika-programmirovanie-i-svyaz/',
      },
    ],
  },
  {
    id: 'social-natural',
    shortTitle: 'Центр соц. и естеств. наук',
    title: 'Center for Social and Natural Sciences',
    profile: 'Applied Informatics',
    duration: '3 years',
    skills: ['C++', 'Data Analysis', 'Math for IT'],
    officialUrl: 'https://oshtu.kg/en/2025/11/20/center-for-social-and-natural-sciences/',
  },
]

const groupDescriptions = {
  'it-tech':
    'Фокус на инженерном мышлении, веб-разработке, командной работе и реальных практических кейсах.',
  'edu-it':
    'Структурное подразделение ГТК ОшТУ: готовят педагогов, переводчиков, экономистов, юристов, социальных работников и техников-программистов. В составе — пять предметно-цикловых объединений, в том числе IT-блок (ПиИИ и компьютерные технологии).',
  'social-natural':
    'Центр социальных и естественных наук даёт широкую базу: математика, естественные дисциплины, социально-гуманитарный блок и прикладная информатика — чтобы уверенно работать с данными и цифровыми инструментами.',
}

/** Доп. сведения по подразделению (модули, карьера) — для наглядности на странице */
const groupExtra = {
  'it-tech': {
    modules: ['Инженерная графика и основы проектирования', 'Программирование и веб-технологии', 'Практикум по командным проектам'],
    career: 'Junior developer, QA, веб-студии, продуктовые команды.',
  },
  'edu-it': {
    modules: [
      'ПЦО «Педагогика и переводческое дело»',
      'ПЦО «Экономика»',
      'ПЦО «Право и социальная работа»',
      'ПЦО «Программирование и информационные инновации»',
      'ПЦО «Компьютерные и цифровые технологии»',
    ],
    career:
      'Учителя начальных классов, переводчики, экономисты, финансисты, бухгалтеры, менеджеры, юристы, социальные работники, техники-программисты и смежные IT-специальности.',
  },
  'social-natural': {
    modules: [
      'Математика и основы анализа данных',
      'Информатика и программирование (C++, прикладные задачи)',
      'Естественнонаучные дисциплины',
      'Социально-гуманитарный блок (коммуникации, общество)',
    ],
    career: 'Аналитика данных, прикладной софт, цифровизация процессов в организациях; дальнейшее обучение в вузе.',
  },
}

const quickLinks = [
  { label: 'Information for applicants', href: 'https://oshtu.kg/en/acceptance/' },
  { label: "Information about the Master's program", href: 'https://oshtu.kg/2022/06/01/otdel-magistratury/' },
  { label: 'List of OshTU training programs', href: 'https://oshtu.kg/perechen-programm-podgotovok-oshtu/' },
  { label: 'Conditions created for students', href: 'https://oshtu.kg/usloviya-sozdannye-dlya-studentov/' },
]

const portalLinks = [
  { label: 'Портал OshTU', href: 'https://portal.oshtu.kg/' },
  { label: 'Расписание занятий', href: 'https://portal.oshtu.kg/#/schedule' },
]

const semesterPlan = [
  { semester: '1 семестр', subjects: 'Алгоритмы, Математика, Академический английский' },
  { semester: '2 семестр', subjects: 'ООП, Базы данных, Веб-верстка' },
  { semester: '3 семестр', subjects: 'Backend, Сетевые технологии, UX/UI основы' },
  { semester: '4 семестр', subjects: 'Frontend React, SQL-практика, Проектный модуль' },
  { semester: '5 семестр', subjects: 'Мобильная разработка, Облачные сервисы, DevOps basics' },
  { semester: '6 семестр', subjects: 'Преддипломная практика, Final project, Защита' },
]

const admissionDocs = [
  'Паспорт/ID (копия)',
  'Аттестат или диплом',
  'Фото 3x4',
  'Заявление абитуриента',
  'Сертификат ORT (если требуется)',
]

const tuitionInfo = [
  { label: 'Бюджетные места', value: 'По конкурсу и рейтингу' },
  { label: 'Контракт', value: 'Сумма зависит от направления' },
  { label: 'Оплата', value: 'По семестрам, через официальный договор' },
]

const newsItems = [
  {
    title: 'OshTU in the International Educational Space: DIGITECH Project',
    date: '02.04.2026',
    category: 'International',
    image: 'https://oshtu.kg/wp-content/uploads/2026/04/whatsapp-image-2026-03-17-at-15.00.30-1-750x375.jpeg',
  },
  {
    title: 'A Seminar Was Held within Erasmus+ CBHE DIGITECH',
    date: '16.03.2026',
    category: 'Science',
    image: 'https://oshtu.kg/wp-content/uploads/2026/03/645473561_2728713570809619_3044827047039488213_n-1-750x536.jpg',
  },
  {
    title: 'OshTU and Antalya Belek University Discuss Erasmus KA171–ICM',
    date: '20.01.2026',
    category: 'Partnerships',
    image: 'https://oshtu.kg/wp-content/uploads/2026/01/615957772_2686882704992706_2489140652951869202_n-1-750x530.jpg',
  },
]

const facilityCards = [
  { title: 'Educational Portal', image: 'https://oshtu.kg/wp-content/uploads/2025/06/portal.png' },
  { title: 'Infrastructure', image: 'https://oshtu.kg/wp-content/uploads/2025/06/infrastukyura.png' },
  { title: 'Programs', image: 'https://oshtu.kg/wp-content/uploads/2025/06/program.png' },
  { title: 'Students', image: 'https://oshtu.kg/wp-content/uploads/2025/06/stud.png' },
]

const stats = [
  { label: 'Educational programs', value: '40+' },
  { label: 'Main location', value: 'Osh' },
  { label: 'Languages', value: 'RU / KG / EN' },
  { label: 'Admission line', value: '+996 770 777 770' },
]

const admissionSteps = [
  {
    title: '1. Choose program',
    text: 'Открой список программ и выбери направление колледжа, которое подходит тебе.',
  },
  {
    title: '2. Submit application',
    text: 'Подай документы через онлайн-прием и проверь статус регистрации.',
  },
  {
    title: '3. Track results',
    text: 'Следи за рейтинговым списком (budget / contract) и результатами поступления.',
  },
]

const faqs = [
  {
    q: 'Где находится колледж?',
    a: '81 Isanova St., Osh, Kyrgyzstan. Это основная локация OshTU.',
  },
  {
    q: 'Есть ли цифровые сервисы для студентов?',
    a: 'Да: Educational Portal, UNIVER+, онлайн-тестирование и библиотечные ресурсы.',
  },
  {
    q: 'Какие IT-направления доступны?',
    a: 'В колледже доступны направления программирования, информационных систем и прикладной информатики.',
  },
  {
    q: 'Где смотреть расписание занятий?',
    a: 'На официальном портале OshTU в разделе schedule.',
  },
  {
    q: 'Когда начинается учебный год?',
    a: 'Обычно осенний семестр стартует в сентябре, точные даты публикуются в расписании и объявлениях.',
  },
]

const highlights = [
  'Dual-формат: офлайн занятия + цифровой портал',
  'Проектная учеба с защитой работ каждый семестр',
  'Подготовка к стажировкам и IT-карьере',
]

const departmentGpIt = {
  title: 'Отделение гуманитарно-педагогическое и IT технологий',
  url: 'https://oshtu.kg/2024/10/09/otdelenie-gumanitarno-pedagogicheskoe-i-it-tehnologij/',
  head: 'Заведующая отделением — Зикирова Гулайым Абдылдаевна (к.п.н., доцент)',
  intro:
    'Структурное подразделение ГТК ОшТУ: организует учебный процесс, методическую и воспитательную работу по государственным стандартам СПО. В составе — пять предметно-цикловых объединений, включая IT-блок.',
  heroImage: 'https://oshtu.kg/wp-content/uploads/2024/10/1.jpg',
  gallery: [
    'https://oshtu.kg/wp-content/uploads/2024/10/1.jpg',
    'https://oshtu.kg/wp-content/uploads/2022/05/img-068.jpg',
    'https://oshtu.kg/wp-content/uploads/2022/05/img-070.jpg',
    'https://oshtu.kg/wp-content/uploads/2022/05/img-072.jpg',
    'https://oshtu.kg/wp-content/uploads/2022/05/img-077.jpg',
  ],
}

const pcoProgrammingInnovations = {
  title: 'ПЦО «Программирование и информационные инновации»',
  url: 'https://oshtu.kg/2022/05/11/kafedra-informatika-programmirovanie-i-svyaz/',
  head: 'Зав. ПЦО — Омурзаков Бектур Кадырбекович',
}

const teachersPii = [
  { name: 'Омурзаков Бектур Кадырбекович', role: 'Зав. ПЦО, преподаватель', phone: '+996 559 321 541' },
  { name: 'Адылбекова Нурзада Асылбековна', role: 'Преподаватель', phone: '+996 773 903 303' },
  { name: 'Алдосова Айжамал Жолдошбековна', role: 'Преподаватель', phone: '+996 709 344 303' },
  { name: 'Абдакимова Гулзат Калыбековна', role: 'Преподаватель', phone: '+996 773 836 698' },
  { name: 'Аттокурова Замира Маматжановна', role: 'Преподаватель', phone: '+996 773 129 474' },
  { name: 'Базарбай кызы Гульмира', role: 'Преподаватель', phone: '+996 553 021 191' },
  { name: 'Борончуева Айнура', role: 'Преподаватель', phone: '+996 778 241 282' },
  { name: 'Белек кызы Гульзина', role: 'Преподаватель', phone: '+996 706 171 823' },
  { name: 'Касымбекова Чынар', role: 'Преподаватель', phone: '+996 998 141 287' },
  { name: 'Асыранова Назгуль', role: 'Преподаватель', phone: null },
  { name: 'Мукамидин к. Н.', role: 'Преподаватель', phone: '+996 772 333 983' },
  { name: 'Умурзакова Роза', role: 'Преподаватель', phone: '+996 773 052 475' },
]

const specialtyProgramsPii = [
  {
    code: '230109',
    name: 'Программное обеспечение автоматизированных систем и вычислительной техники',
    qual: 'Техник-программист',
  },
  {
    code: '230701',
    name: 'Прикладная информатика (по отраслям)',
    qual: 'Техник-программист',
  },
  {
    code: '230111',
    name: 'Программирование в компьютерных системах',
    qual: 'Техник-программист',
  },
]

const specialtyProgramsKict = [
  { code: '220206', name: 'Автоматизированные системы обработки информации и управления (АСОИиУ), по отраслям' },
  { code: '230108', name: 'Компьютерные системы и комплексы (КСиК), по отраслям' },
  { code: '230110', name: 'Техническое обслуживание средств вычислительной техники и компьютерных сетей (ТОСВТ)' },
  { code: '210406', name: 'Сети связи и системы коммутации (ССиСК)' },
]

const practicePartners = [
  'ОАО «Кыргызтелеком»',
  'ОАО «Южное управление радиорелейных станций»',
  '«Югас», полиграфический центр «Джети-ТУС», УТРК',
  'ЗАО «ЭлТР», ЗАО «Мегаком», социальные фонды Ошской области',
  'Полиграфический центр «Самат», ЗАО «ЭКО Исламик банк» и др.',
]

const academicMobilityNotes = [
  'Соглашения о сотрудничестве с рядом колледжей, в том числе инновационным колледжем STEM ОшГУ, торгово-экономическим и индустриально-педагогическим колледжами.',
  'Обмен студентами по прикладной информатике и внутренняя мобильность для несовершеннолетних.',
  'Участие преподавателей в академической мобильности для обмена опытом и новыми методами обучения.',
]

const extraStudentLinks = [
  { label: 'Приём абитуриентов (информация)', href: 'https://oshtu.kg/priem-abiturientov/' },
  { label: 'Список программ подготовки ОшТУ', href: 'https://oshtu.kg/perechen-programm-podgotovok-oshtu/' },
  { label: 'Условия для студентов', href: 'https://oshtu.kg/usloviya-sozdannye-dlya-studentov/' },
  { label: 'Главная ОшТУ', href: 'https://oshtu.kg/' },
]

const teachersKict = [
  {
    name: 'Атамкулова Мушарапкан Тешевна',
    role: 'Зав. ПЦО, к.т.н., доцент',
    phone: '+996 700 758 726',
  },
  { name: 'Жолдошова Чынара Камчыбековна', role: 'Преподаватель, магистр', phone: '+996 772 734 003' },
  { name: 'Мусаева Роза Эсеновна', role: 'Преподаватель, магистр', phone: '+996 770 268 500' },
  { name: 'Нышанова Алтынай Сыдыковна', role: 'Преподаватель, магистр', phone: '+996 779 365 669' },
  { name: 'Оморова Салтанат Торонбековна', role: 'Старший преподаватель, магистр', phone: '+996 777 150 509' },
  { name: 'Тажиева Махабат Байышевна', role: 'Преподаватель, магистр', phone: '+996 773 630 365' },
  { name: 'Калбаева Динара Исматиллаевна', role: 'Преподаватель', phone: '+996 770 767 609' },
  { name: 'Куват кызы Канышай', role: 'Преподаватель', phone: '+996 779 049 306' },
  { name: 'Маматибраим уулу Жумабай', role: 'Преподаватель', phone: '+996 770 623 669' },
  { name: 'Шайлиева Каныкей Акылбековна', role: 'Преподаватель', phone: '+996 775 257 705' },
  { name: 'Нурмаматов Актаң Токтоналиевич', role: 'Преподаватель', phone: '+996 706 140 279' },
  { name: 'Таир кызы Айтаңсык', role: 'Учебно-вспомогательный персонал', phone: '+996 557 900 956' },
]

const studentLifePhotos = [
  'https://oshtu.kg/wp-content/uploads/2025/11/588857349_2641048049576172_7751035940813157921_n-750x536.jpg',
  'https://oshtu.kg/wp-content/uploads/2026/03/641270813_2723158321365144_8482620135181192905_n-1-750x536.jpg',
  'https://oshtu.kg/wp-content/uploads/2025/12/591592169_2644530182561292_2242735242279909912_n-1-750x536.jpg',
]

const partnerCompanies = ['IT Park Kyrgyzstan', 'Erasmus+ DIGITECH', 'Regional Startup Hub', 'Local Tech Labs']

const daySchedule = [
  { time: '09:00', activity: 'Лекция по программированию' },
  { time: '11:00', activity: 'Лабораторная работа и практика' },
  { time: '14:00', activity: 'Командный проект / code review' },
  { time: '16:00', activity: 'Менторская сессия и консультации' },
]

function SiteHeader({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const anchors = [
    { href: '#about', label: 'О колледже' },
    { href: '#department', label: 'Отделение' },
    { href: '#programs', label: 'Программы' },
    { href: '#schedule', label: 'Расписание' },
    { href: '#admission', label: 'Прием 2026' },
    { href: '#news', label: 'Новости' },
    { href: '#contacts', label: 'Контакты' },
  ]

  return (
    <header className="topbar">
      <img
        className="topbar__logo"
        src="https://oshtu.kg/wp-content/uploads/2025/04/logo-en1.png"
        alt="OshTU logo"
      />
      <button
        type="button"
        className={menuOpen ? 'burger burger--open' : 'burger'}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={menuOpen ? 'topbar__nav topbar__nav--open' : 'topbar__nav'}>
        {anchors.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={activeSection === item.href.slice(1) ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function GroupSelector() {
  const [selectedGroupId, setSelectedGroupId] = useState(collegeGroups[0].id)
  const selectedGroup = useMemo(
    () => collegeGroups.find((group) => group.id === selectedGroupId),
    [selectedGroupId],
  )
  const extra = selectedGroup ? groupExtra[selectedGroup.id] : null

  return (
    <div id="groups" className="group-block">
      <div className="group-selector">
        <label htmlFor="group">Подразделение / направление</label>
        <select
          id="group"
          value={selectedGroupId}
          onChange={(event) => setSelectedGroupId(event.target.value)}
        >
          {collegeGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.shortTitle}
            </option>
          ))}
        </select>
      </div>
      {selectedGroup && (
        <article className="group-card">
          <h3>{selectedGroup.profile}</h3>
          <p className="group-card__dept">
            <strong>Полное название:</strong> {selectedGroup.title}
          </p>
          <p>
            <strong>Срок обучения:</strong> {selectedGroup.duration}
          </p>
          <p>{groupDescriptions[selectedGroup.id]}</p>
          {extra && (
            <>
              <h4 className="group-card__sub">Учебные блоки</h4>
              <ul>
                {extra.modules.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p>
                <strong>Карьера после выпуска:</strong> {extra.career}
              </p>
            </>
          )}
          <h4 className="group-card__sub">Ключевые навыки</h4>
          <ul>
            {selectedGroup.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          {selectedGroup.officialUrl && (
            <p className="group-card__link">
              <a href={selectedGroup.officialUrl} target="_blank" rel="noreferrer">
                Страница подразделения на сайте OshTU
              </a>
            </p>
          )}
          {selectedGroup.relatedLinks?.map((link) => (
            <p key={link.href} className="group-card__link">
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </p>
          ))}
        </article>
      )}
      <div className="cards cards--small">
        {collegeGroups.map((group) => (
          <article key={group.id} className="card">
            <h3>{group.profile}</h3>
            <p>{group.shortTitle}</p>
            <p>{group.duration}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function TeacherGrid({ staff }) {
  return (
    <div className="teacher-grid">
      {staff.map((person) => (
        <article key={person.name} className="teacher-card">
          <h4>{person.name}</h4>
          <p className="teacher-card__role">{person.role}</p>
          {person.phone ? (
            <a className="teacher-card__phone" href={`tel:${person.phone.replace(/\s/g, '')}`}>
              {person.phone}
            </a>
          ) : (
            <span className="teacher-card__muted">Телефон — на сайте OshTU</span>
          )}
        </article>
      ))}
    </div>
  )
}

function NewsSection() {
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(newsItems.map((item) => item.category))]
  const filteredNews =
    category === 'All' ? newsItems : newsItems.filter((item) => item.category === category)

  return (
    <>
      <h2>Latest OshTU News</h2>
      <div className="news-filter">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={item === category ? 'chip chip--active' : 'chip'}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="news-grid">
        {filteredNews.map((news) => (
          <article key={news.title} className="news-card">
            <img src={news.image} alt={news.title} loading="lazy" />
            <div>
              <span>{news.date}</span>
              <h3>{news.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTopButton, setShowTopButton] = useState(false)

  const institutionFacts = [
    { label: 'Преподавателей', value: '120+' },
    { label: 'Поступивших в 2025', value: '950+' },
    { label: 'Студентов в колледже', value: '2 400+' },
    { label: 'Лабораторий и кабинетов', value: '40+' },
  ]

  const intakeInfo = [
    { title: 'Старт приема документов', value: '20 июня 2026' },
    { title: 'Конец приема (бюджет)', value: '10 августа 2026' },
    { title: 'Конец приема (контракт)', value: '25 августа 2026' },
    { title: 'Публикация списков', value: 'до 30 августа 2026' },
  ]

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-section')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((element) => revealObserver.observe(element))

    const sectionIds = ['about', 'department', 'programs', 'schedule', 'admission', 'news', 'contacts']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.2, 0.4, 0.65],
      },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      setShowTopButton(window.scrollY > 700)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="page">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>
      <SiteHeader activeSection={activeSection} />

      <section id="about" className="hero reveal-section">
        <div className="hero__badge">Osh Technological University | College of IT</div>
        <h1>Колледж программистов OshTU — длинная полная страница</h1>
        <p className="hero__text">
          Здесь собрана полная информация об учебе: программы, преподаватели, набор студентов,
          сроки приема документов, новости и контакты. Все в одном месте.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="https://oshtu.kg/en/home-4/" target="_blank" rel="noreferrer">
            Официальный сайт OshTU
          </a>
          <a className="btn btn--ghost" href="#admission">
            Перейти к приему
          </a>
        </div>
      </section>

      <section className="section section--accent reveal-section">
        <h2>Почему это интересно</h2>
        <div className="highlights">
          {highlights.map((item) => (
            <article key={item} className="highlight-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section stats-section reveal-section">
        <h2>Ключевые данные учреждения</h2>
        <div className="stats-grid">
          {stats.concat(institutionFacts).map((item) => (
            <article key={item.label} className="stat-card">
              <p className="stat-card__value">{item.value}</p>
              <p className="stat-card__label">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="programs" className="section reveal-section">
        <h2>Направления и группы</h2>
        <p className="section__lead">
          Выбери группу и сразу посмотри чему учат, сколько длится обучение и какие навыки получишь.
        </p>
        <GroupSelector />
      </section>

      <section id="department" className="section section--alt reveal-section">
        <h2>{departmentGpIt.title}</h2>
        <p className="section__lead">{departmentGpIt.intro}</p>
        <p className="section__lead">
          <strong>{departmentGpIt.head}</strong> — данные с официальной страницы отделения на сайте OshTU.
        </p>
        <div className="links-grid">
          <a href={departmentGpIt.url} target="_blank" rel="noreferrer">
            Страница отделения на oshtu.kg
          </a>
          <a href={pcoProgrammingInnovations.url} target="_blank" rel="noreferrer">
            ПЦО «Программирование и информационные инновации»
          </a>
        </div>
        <figure className="department-hero">
          <img src={departmentGpIt.heroImage} alt="Отделение гуманитарно-педагогическое и IT технологий" loading="lazy" />
        </figure>
        <h3 className="department-subtitle">Фото с сайта OshTU</h3>
        <div className="department-gallery">
          {departmentGpIt.gallery.map((src) => (
            <figure key={src} className="department-gallery__item">
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
        <h3 className="department-subtitle">Пять ПЦО отделения</h3>
        <ol className="department-pco-list">
          <li>Предметно-цикловое объединение «Педагогика и переводческое дело»</li>
          <li>Предметно-цикловое объединение «Экономика»</li>
          <li>Предметно-цикловое объединение «Право и социальная работа»</li>
          <li>Предметно-цикловое объединение «Программирование и информационные инновации»</li>
          <li>Предметно-цикловое объединение «Компьютерные и цифровые технологии»</li>
        </ol>
        <h3 className="department-subtitle">{pcoProgrammingInnovations.title}</h3>
        <p className="section__lead">
          <strong>{pcoProgrammingInnovations.head}</strong>. Подробности, специализации и документы ПЦО — на странице кафедры.
        </p>
        <TeacherGrid staff={teachersPii} />
        <h3 className="department-subtitle">ПЦО «Компьютерные и цифровые технологии»</h3>
        <p className="section__lead">
          С 1 сентября 2025 года ПЦО возглавляет к.т.н., доцент Атамкулова Мушарапкан Тешевна (по данным страницы отделения).
        </p>
        <TeacherGrid staff={teachersKict} />
      </section>

      <section className="section reveal-section">
        <h2>Специализации и учебные профили</h2>
        <p className="section__lead">
          Коды и названия направлений — по материалам ПЦО на сайте OshTU (для ориентира абитуриентов).
        </p>
        <div className="split-panels">
          <div>
            <h3 className="department-subtitle">ПЦО «Программирование и информационные инновации»</h3>
            <div className="plan-table-wrap">
              <table className="plan-table plan-table--compact">
                <thead>
                  <tr>
                    <th>Код</th>
                    <th>Специальность</th>
                    <th>Квалификация</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtyProgramsPii.map((row) => (
                    <tr key={row.code}>
                      <td>{row.code}</td>
                      <td>{row.name}</td>
                      <td>{row.qual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="department-subtitle">ПЦО «Компьютерные и цифровые технологии»</h3>
            <div className="plan-table-wrap">
              <table className="plan-table plan-table--compact">
                <thead>
                  <tr>
                    <th>Код</th>
                    <th>Направление</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtyProgramsKict.map((row) => (
                    <tr key={row.code}>
                      <td>{row.code}</td>
                      <td>{row.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h3 className="department-subtitle">Практика и партнёры отрасли</h3>
        <ul className="plain-list plain-list--tight">
          {practicePartners.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="department-subtitle">Академическая мобильность</h3>
        <ul className="plain-list plain-list--tight">
          {academicMobilityNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="department-subtitle">Полезные ссылки</h3>
        <div className="links-grid">
          {extraStudentLinks.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section className="section reveal-section">
        <h2>Как обучают студентов</h2>
        <div className="steps-grid">
          <article className="step-card">
            <h3>1. Теория + практика</h3>
            <p>Каждый модуль включает лекции, лабораторные и реальные IT-проекты.</p>
          </article>
          <article className="step-card">
            <h3>2. Командная работа</h3>
            <p>Студенты работают в командах, как в реальных продуктовых и аутсорс-компаниях.</p>
          </article>
          <article className="step-card">
            <h3>3. Защита проектов</h3>
            <p>В конце семестра проходит защита проектов перед преподавателями и наставниками.</p>
          </article>
        </div>
      </section>

      <section className="section section--accent reveal-section">
        <h2>Как проходит учебный день</h2>
        <div className="timeline">
          {daySchedule.map((item) => (
            <article key={item.time} className="timeline__item">
              <p className="timeline__time">{item.time}</p>
              <p>{item.activity}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal-section">
        <h2>Educational Process & Facilities</h2>
        <div className="facility-grid">
          {facilityCards.map((item) => (
            <article key={item.title} className="facility-card">
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="schedule" className="section section--alt reveal-section">
        <h2>Портал и расписание</h2>
        <p className="section__lead">Следи за учебным процессом через официальный портал и расписание OshTU.</p>
        <div className="links-grid">
          {portalLinks.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section className="section reveal-section">
        <h2>Учебный план по семестрам</h2>
        <div className="plan-table-wrap">
          <table className="plan-table">
            <thead>
              <tr>
                <th>Семестр</th>
                <th>Ключевые предметы</th>
              </tr>
            </thead>
            <tbody>
              {semesterPlan.map((row) => (
                <tr key={row.semester}>
                  <td>{row.semester}</td>
                  <td>{row.subjects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="admission" className="section reveal-section">
        <h2>Когда принимают абитуриентов</h2>
        <p className="section__lead">
          Ориентировочный календарь приема и шаги поступления для колледжа OshTU.
        </p>
        <div className="cards cards--small">
          {intakeInfo.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
        <div className="links-grid">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <div className="steps-grid">
          {admissionSteps.map((step) => (
            <article key={step.title} className="step-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="admission-grid">
          <article className="card">
            <h3>Документы для поступления</h3>
            <ul className="plain-list">
              {admissionDocs.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Бюджет и контракт</h3>
            <ul className="plain-list">
              {tuitionInfo.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="news" className="section reveal-section">
        <NewsSection />
      </section>

      <section className="section reveal-section">
        <h2>Студенческая жизнь в OshTU</h2>
        <div className="life-grid">
          {studentLifePhotos.map((photo) => (
            <figure key={photo} className="life-photo">
              <img src={photo} alt="Student life at OshTU" loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section reveal-section">
        <h2>Партнеры и карьерные возможности</h2>
        <p className="section__lead">
          Студенты проходят практику, участвуют в конкурсах и получают доступ к реальным IT-кейсам.
        </p>
        <div className="chips-wrap">
          {partnerCompanies.map((item) => (
            <span key={item} className="chip chip--active">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section section--alt reveal-section">
        <h2>Частые вопросы</h2>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article key={faq.q} className="faq-card">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacts" className="section reveal-section">
        <h2>Контакты и приемная комиссия</h2>
        <div className="cards cards--small">
          <article className="card">
            <h3>Адрес</h3>
            <p>81 Isanova St., Osh, Kyrgyzstan</p>
          </article>
          <article className="card">
            <h3>Rector&apos;s reception</h3>
            <p>+996 3222 4-38-83</p>
          </article>
          <article className="card">
            <h3>Admission committee</h3>
            <p>+996 770 777 770 | +996 705 058 022 | +996 777 485 042</p>
          </article>
        </div>
        <div className="map-wrap">
          <h3>Локация на Google Maps</h3>
          <iframe
            title="Osh Technological University on map"
            src="https://www.google.com/maps?q=Osh%20Technological%20University%2C%2081%20Isanova%20St%2C%20Osh&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer className="footer reveal-section">
        <h2>Osh Technological University named after Academician M.M. Adyshev</h2>
        <p>Город Ош, Кыргызская Республика</p>
        <p>Официальная страница: https://oshtu.kg/en/home-4/</p>
      </footer>
      {showTopButton && (
        <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Наверх
        </button>
      )}
    </main>
  )
}
export default App
