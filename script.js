// =========================
// CONTINUE BUTTON
// =========================

const btn = document.getElementById("continueBtn");
const siteContent = document.getElementById("siteContent");

document.body.classList.add("locked");

if (btn && siteContent) {
  btn.addEventListener("click", () => {
    document.body.classList.remove("locked");
    siteContent.scrollIntoView({
      behavior: "smooth"
    });
  });
}


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});


// =========================
// FOOTER YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================
// SUPABASE
// =========================

const SUPABASE_URL =
  "https://kvzatgeeuatkcdvsibjt.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_s2Ym-RnAG49LFcS3L8DIbQ_UZ9V3oFw";


// =========================
// JOIN US FORM
// =========================

const joinForm = document.getElementById("joinForm");
const joinStatus = document.getElementById("joinStatus");

if (joinForm) {
  joinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("joinName").value.trim();
    const email = document.getElementById("joinEmail").value.trim();
    const message = document.getElementById("joinMessage").value.trim();

    if (!name || !email || !message) {
      joinStatus.textContent = "Please fill in all fields.";
      return;
    }

    joinStatus.textContent = "Sending...";

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/join_us`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Supabase error:", errorText);

        joinStatus.textContent =
          "Something went wrong. Please try again.";

        return;
      }

      joinStatus.textContent =
        "Thank you! Your message has been sent.";

      joinForm.reset();

    } catch (error) {
      console.error("Connection error:", error);

      joinStatus.textContent =
        "Unable to send right now. Please try again.";
    }
  });
}
// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
const savedTheme = localStorage.getItem("prk-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "☀";
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.textContent = "☀";
      localStorage.setItem("prk-theme", "dark");
    } else {
      themeIcon.textContent = "☾";
      localStorage.setItem("prk-theme", "light");
    }
  });
}
// =========================
// LANGUAGE SWITCHER
// =========================

const languageButton = document.getElementById("languageButton");
const languageMenu = document.getElementById("languageMenu");
const languageSwitcher = document.querySelector(".language-switcher");
const currentLanguage = document.getElementById("currentLanguage");
const languageTransition = document.getElementById("languageTransition");

const translations = {

  en: {
    name: "English",

    eyebrow: "PRK · Purnia, Bihar, India",
    welcome: "Welcome to<br><span>PRK</span>",
    tagline: "Curiosity today.<br>Possibilities tomorrow.",
    continue: "Continue",
    scroll: "Scroll to explore",

    aboutLabel: "01 — ABOUT ME",
    aboutTitle: "I'm Priyanshu Ranjan Karn.<br><span>People call me PRK.</span>",
    aboutLarge: "I'm from Purnia, Bihar, India. I'm a curious person who loves technology and constantly asks one simple question: <strong>why?</strong>",
    aboutBody: "I want to understand how things work, what makes them happen, and what could be possible next. Coding is something I want to learn deeply—not just to write software, but to understand the ideas and systems behind it.",

    driveLabel: "02 — WHAT DRIVES ME",
    driveTitle: "I have too many<br><span>ideas to ignore.</span>",
    driveLarge: "Technology. Software. Applications. AI. Editing. Coding. Communication.",
    driveBody: "I enjoy exploring different fields and connecting ideas that may seem unrelated. I also love conversations, diplomacy, meeting people, and learning from different perspectives.",

    interest1: "Artificial Intelligence",
    interest1Small: "Building what comes next.",
    interest2: "Coding",
    interest2Small: "Learning how technology works.",
    interest3: "Creative Editing",
    interest3Small: "Turning ideas into visuals.",
    interest4: "People & Ideas",
    interest4Small: "Conversation, diplomacy, collaboration.",

    visionLabel: "03 — VISION",
    visionTitle: "The future will be<br><span>built with technology.</span>",
    visionLarge: "I believe technology will become deeply connected to almost every part of human life. And AI has the potential to change the way we understand and shape the world.",
    visionBody: "I'm fascinated by the possibility of using technology to understand patterns, anticipate what may happen next, and make better decisions. I don't want to simply watch that future arrive. I want to help create it.",

    teamLabel: "04 — THE TEAM",
    teamTitle: "Great ideas become<br><span>greater together.</span>",
    teamLarge: "I want to build a super-intelligent, creative team.",
    teamBody: "People with different skills, perspectives, and ambitions can create things that one person could never create alone. I love connecting with people, exchanging ideas, and finding possibilities together.",

    projectsLabel: "05 — UPCOMING PROJECTS",
    projectType: "FIRST PROJECT",
    projectTitle: "Future Asia Journal",
    projectBody: "A news platform covering AI, science, politics, gaming, sports, fitness, and the wider world of ideas and technology.",
    projectStatus: "Explore",

    chinaLabel: "06 — A LITTLE MORE",
    chinaTitle: "There is also a story<br><span>about China.</span>",
    chinaLarge: "I have a special interest in China. There's an interesting story behind it—but I'll tell that story another time.",
    chinaComing: "TO BE CONTINUED…",

    connectLabel: "07 — CONNECT",
    connectTitle: "Let's<br><span>connect.</span>",
    connectLarge: "I love meeting curious people, sharing ideas, starting conversations, and discovering what we can build together.",

    joinLabel: "08 — JOIN US",
    joinTitle: "Have an idea?<br><span>Let's build together.</span>",
    joinLarge: "I'm always interested in meeting curious people, creators, developers, and people with ideas.",
    nameLabel: "NAME",
    emailLabel: "EMAIL",
    messageLabel: "MESSAGE",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Tell me about yourself or your idea...",
    submit: "Send Application",

    backTop: "Back to top ↑",
    language: "Language"
  },

  zh: {
    name: "中文",

    eyebrow: "PRK · 印度比哈尔邦普尔尼亚",
    welcome: "欢迎来到<br><span>PRK</span>",
    tagline: "今天保持好奇。<br>明天创造可能。",
    continue: "继续",
    scroll: "向下探索",

    aboutLabel: "01 — 关于我",
    aboutTitle: "我是 Priyanshu Ranjan Karn。<br><span>大家叫我 PRK。</span>",
    aboutLarge: "我来自印度比哈尔邦普尔尼亚。我是一个充满好奇心的人，热爱科技，也总是在问一个简单的问题：<strong>为什么？</strong>",
    aboutBody: "我想了解事物如何运作、为什么会发生，以及未来还可能出现什么。对我来说，学习编程不仅是为了写软件，更是为了理解背后的思想和系统。",

    driveLabel: "02 — 驱动力",
    driveTitle: "我的想法太多，<br><span>无法忽视。</span>",
    driveLarge: "科技。软件。应用。人工智能。编辑。编程。沟通。",
    driveBody: "我喜欢探索不同领域，并把看似无关的想法联系起来。我也喜欢交流、外交、认识不同的人，并从不同的观点中学习。",

    interest1: "人工智能",
    interest1Small: "创造下一个未来。",
    interest2: "编程",
    interest2Small: "理解科技如何运作。",
    interest3: "创意编辑",
    interest3Small: "把想法变成视觉。",
    interest4: "人与思想",
    interest4Small: "交流、外交与合作。",

    visionLabel: "03 — 愿景",
    visionTitle: "未来将由<br><span>科技创造。</span>",
    visionLarge: "我相信科技会与人类生活的几乎每一个部分深度连接。人工智能也有潜力改变我们理解和塑造世界的方式。",
    visionBody: "我着迷于利用科技理解规律、预测可能发生的事情，并做出更好的决定。我不想只是等待未来到来。我想参与创造它。",

    teamLabel: "04 — 团队",
    teamTitle: "伟大的想法，<br><span>一起会变得更伟大。</span>",
    teamLarge: "我想建立一个超级智能且富有创造力的团队。",
    teamBody: "拥有不同技能、观点和目标的人，可以创造一个人无法独自完成的事情。我喜欢认识人、交换想法，并一起寻找可能性。",

    projectsLabel: "05 — 即将推出的项目",
    projectType: "第一个项目",
    projectTitle: "Future Asia Journal",
    projectBody: "一个关注人工智能、科学、政治、游戏、体育、健身以及更广泛的思想与科技世界的新闻平台。",
    projectStatus: "探索",

    chinaLabel: "06 — 更多故事",
    chinaTitle: "还有一个<br><span>关于中国的故事。</span>",
    chinaLarge: "我对中国有着特别的兴趣。这背后有一个有趣的故事——但我会在另一个时间告诉你。",
    chinaComing: "未完待续…",

    connectLabel: "07 — 联系",
    connectTitle: "让我们<br><span>保持联系。</span>",
    connectLarge: "我喜欢认识充满好奇心的人、分享想法、开始交流，并发现我们可以一起创造什么。",

    joinLabel: "08 — 加入我们",
    joinTitle: "有一个想法？<br><span>让我们一起创造。</span>",
    joinLarge: "我一直期待认识有好奇心的人、创作者、开发者以及有想法的人。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    messageLabel: "留言",
    namePlaceholder: "你的名字",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "介绍一下你自己或你的想法……",
    submit: "发送申请",

    backTop: "返回顶部 ↑",
    language: "语言"
  },

  ja: {
    name: "日本語",

    eyebrow: "PRK · インド・ビハール州・プルニア",
    welcome: "PRKへ<br><span>ようこそ</span>",
    tagline: "今日の好奇心。<br>明日の可能性。",
    continue: "続ける",
    scroll: "スクロールして探索",

    aboutLabel: "01 — 私について",
    aboutTitle: "Priyanshu Ranjan Karnです。<br><span>PRKと呼ばれています。</span>",
    aboutLarge: "インドのビハール州プルニア出身です。テクノロジーが大好きで、いつも一つのシンプルな疑問を持っています。<strong>なぜ？</strong>",
    aboutBody: "物事がどのように動き、なぜ起こり、次に何が可能になるのかを知りたいと思っています。プログラミングは、ソフトウェアを書くためだけでなく、その背後にある考え方や仕組みを深く理解するために学びたいです。",

    driveLabel: "02 — 私を動かすもの",
    driveTitle: "無視できないほど<br><span>アイデアがあります。</span>",
    driveLarge: "テクノロジー。ソフトウェア。アプリ。AI。編集。コーディング。コミュニケーション。",
    driveBody: "さまざまな分野を探求し、一見関係のないアイデアをつなげることが好きです。会話、外交、人との出会い、そして異なる視点から学ぶことも好きです。",

    interest1: "人工知能",
    interest1Small: "次の未来をつくる。",
    interest2: "コーディング",
    interest2Small: "テクノロジーの仕組みを学ぶ。",
    interest3: "クリエイティブ編集",
    interest3Small: "アイデアをビジュアルにする。",
    interest4: "人とアイデア",
    interest4Small: "会話、外交、コラボレーション。",

    visionLabel: "03 — ビジョン",
    visionTitle: "未来は<br><span>テクノロジーでつくられる。</span>",
    visionLarge: "テクノロジーは人間の生活のほぼすべての部分と深くつながっていくと考えています。そしてAIは、世界を理解し形作る方法を変える可能性があります。",
    visionBody: "テクノロジーを使ってパターンを理解し、次に何が起こるかを予測し、より良い判断をする可能性に魅力を感じています。未来をただ待つのではなく、自分もその未来をつくりたいです。",

    teamLabel: "04 — チーム",
    teamTitle: "素晴らしいアイデアは<br><span>一緒ならさらに大きくなる。</span>",
    teamLarge: "スーパーインテリジェントでクリエイティブなチームをつくりたい。",
    teamBody: "異なるスキル、視点、目標を持つ人々が集まれば、一人では決して作れないものを生み出せます。人とつながり、アイデアを交換し、一緒に可能性を探すことが好きです。",

    projectsLabel: "05 — 今後のプロジェクト",
    projectType: "最初のプロジェクト",
    projectTitle: "Future Asia Journal",
    projectBody: "AI、科学、政治、ゲーム、スポーツ、フィットネス、そしてより広い世界のアイデアとテクノロジーを扱うニュースプラットフォーム。",
    projectStatus: "見る",

    chinaLabel: "06 — もう少し",
    chinaTitle: "中国についての<br><span>物語もあります。</span>",
    chinaLarge: "私は中国に特別な関心があります。その背景には面白い物語がありますが、それはまた別の機会に話します。",
    chinaComing: "つづく…",

    connectLabel: "07 — つながる",
    connectTitle: "ぜひ<br><span>つながりましょう。</span>",
    connectLarge: "好奇心旺盛な人と出会い、アイデアを共有し、会話を始め、一緒に何を作れるかを見つけることが好きです。",

    joinLabel: "08 — 参加する",
    joinTitle: "アイデアがありますか？<br><span>一緒につくりましょう。</span>",
    joinLarge: "好奇心旺盛な人、クリエイター、開発者、そしてアイデアを持つ人と出会いたいと思っています。",
    nameLabel: "名前",
    emailLabel: "メール",
    messageLabel: "メッセージ",
    namePlaceholder: "あなたの名前",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "あなた自身やアイデアについて教えてください…",
    submit: "応募を送信",

    backTop: "トップへ戻る ↑",
    language: "言語"
  },

  ko: {
    name: "한국어",

    eyebrow: "PRK · 인도 비하르주 푸르니아",
    welcome: "PRK에<br><span>오신 것을 환영합니다</span>",
    tagline: "오늘의 호기심.<br>내일의 가능성.",
    continue: "계속",
    scroll: "스크롤하여 탐색",

    aboutLabel: "01 — 나에 대해",
    aboutTitle: "저는 Priyanshu Ranjan Karn입니다.<br><span>사람들은 저를 PRK라고 부릅니다.</span>",
    aboutLarge: "저는 인도 비하르주 푸르니아 출신입니다. 기술을 좋아하고 항상 한 가지 간단한 질문을 합니다. <strong>왜?</strong>",
    aboutBody: "저는 사물이 어떻게 작동하고, 왜 일어나며, 다음에는 무엇이 가능할지 이해하고 싶습니다. 코딩도 단순히 소프트웨어를 만들기 위해서가 아니라 그 뒤에 있는 아이디어와 시스템을 깊이 이해하기 위해 배우고 싶습니다.",

    driveLabel: "02 — 나를 움직이는 것",
    driveTitle: "무시할 수 없을 만큼<br><span>아이디어가 많습니다.</span>",
    driveLarge: "기술. 소프트웨어. 애플리케이션. AI. 편집. 코딩. 커뮤니케이션.",
    driveBody: "저는 다양한 분야를 탐구하고 서로 관련 없어 보이는 아이디어를 연결하는 것을 좋아합니다. 대화, 외교, 사람을 만나는 것, 그리고 다양한 관점에서 배우는 것도 좋아합니다.",

    interest1: "인공지능",
    interest1Small: "다음 미래를 만듭니다.",
    interest2: "코딩",
    interest2Small: "기술이 작동하는 방식을 배웁니다.",
    interest3: "크리에이티브 편집",
    interest3Small: "아이디어를 시각적으로 표현합니다.",
    interest4: "사람과 아이디어",
    interest4Small: "대화, 외교, 협업.",

    visionLabel: "03 — 비전",
    visionTitle: "미래는<br><span>기술로 만들어집니다.</span>",
    visionLarge: "기술은 인간의 삶 거의 모든 부분과 깊이 연결될 것이라고 믿습니다. AI는 우리가 세상을 이해하고 만들어가는 방식을 바꿀 가능성이 있습니다.",
    visionBody: "기술을 통해 패턴을 이해하고 앞으로 일어날 일을 예측하며 더 나은 결정을 내릴 수 있다는 가능성에 매력을 느낍니다. 미래가 오는 것을 지켜보기만 하고 싶지 않습니다. 직접 만들고 싶습니다.",

    teamLabel: "04 — 팀",
    teamTitle: "좋은 아이디어는<br><span>함께하면 더 커집니다.</span>",
    teamLarge: "초지능적이고 창의적인 팀을 만들고 싶습니다.",
    teamBody: "서로 다른 기술, 관점, 목표를 가진 사람들이 모이면 한 사람이 혼자 만들 수 없는 것을 만들 수 있습니다. 사람들과 연결하고 아이디어를 나누며 함께 가능성을 찾는 것을 좋아합니다.",

    projectsLabel: "05 — 예정된 프로젝트",
    projectType: "첫 번째 프로젝트",
    projectTitle: "Future Asia Journal",
    projectBody: "AI, 과학, 정치, 게임, 스포츠, 피트니스와 더 넓은 아이디어 및 기술 세계를 다루는 뉴스 플랫폼입니다.",
    projectStatus: "보기",

    chinaLabel: "06 — 조금 더",
    chinaTitle: "중국에 관한<br><span>이야기도 있습니다.</span>",
    chinaLarge: "저는 중국에 특별한 관심이 있습니다. 그 뒤에는 흥미로운 이야기가 있지만, 그 이야기는 다음에 들려드리겠습니다.",
    chinaComing: "계속됩니다…",

    connectLabel: "07 — 연결",
    connectTitle: "우리<br><span>연결해요.</span>",
    connectLarge: "호기심 많은 사람들을 만나고, 아이디어를 공유하고, 대화를 시작하고, 우리가 함께 무엇을 만들 수 있는지 발견하는 것을 좋아합니다.",

    joinLabel: "08 — 함께하기",
    joinTitle: "아이디어가 있나요?<br><span>함께 만들어봐요.</span>",
    joinLarge: "호기심 많은 사람, 크리에이터, 개발자, 그리고 아이디어를 가진 사람들을 만나는 것을 항상 기대합니다.",
    nameLabel: "이름",
    emailLabel: "이메일",
    messageLabel: "메시지",
    namePlaceholder: "이름",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "당신이나 당신의 아이디어를 소개해주세요…",
    submit: "지원 보내기",

    backTop: "맨 위로 ↑",
    language: "언어"
  },

  es: {
    name: "Español",

    eyebrow: "PRK · Purnia, Bihar, India",
    welcome: "Bienvenido a<br><span>PRK</span>",
    tagline: "La curiosidad de hoy.<br>Las posibilidades de mañana.",
    continue: "Continuar",
    scroll: "Desplázate para explorar",

    aboutLabel: "01 — SOBRE MÍ",
    aboutTitle: "Soy Priyanshu Ranjan Karn.<br><span>La gente me llama PRK.</span>",
    aboutLarge: "Soy de Purnia, Bihar, India. Soy una persona curiosa que ama la tecnología y constantemente se hace una simple pregunta: <strong>¿por qué?</strong>",
    aboutBody: "Quiero entender cómo funcionan las cosas, qué las hace suceder y qué podría ser posible después. Quiero aprender programación profundamente, no solo para escribir software, sino para comprender las ideas y sistemas que hay detrás.",

    driveLabel: "02 — LO QUE ME IMPULSA",
    driveTitle: "Tengo demasiadas<br><span>ideas para ignorarlas.</span>",
    driveLarge: "Tecnología. Software. Aplicaciones. IA. Edición. Código. Comunicación.",
    driveBody: "Me gusta explorar diferentes campos y conectar ideas que pueden parecer no relacionadas. También disfruto las conversaciones, la diplomacia, conocer gente y aprender de diferentes perspectivas.",

    interest1: "Inteligencia Artificial",
    interest1Small: "Construyendo lo que viene.",
    interest2: "Programación",
    interest2Small: "Aprendiendo cómo funciona la tecnología.",
    interest3: "Edición Creativa",
    interest3Small: "Convirtiendo ideas en imágenes.",
    interest4: "Personas e Ideas",
    interest4Small: "Conversación, diplomacia y colaboración.",

    visionLabel: "03 — VISIÓN",
    visionTitle: "El futuro será<br><span>construido con tecnología.</span>",
    visionLarge: "Creo que la tecnología estará profundamente conectada con casi todos los aspectos de la vida humana. Y la IA tiene el potencial de cambiar la forma en que entendemos y damos forma al mundo.",
    visionBody: "Me fascina la posibilidad de utilizar la tecnología para comprender patrones, anticipar lo que podría suceder y tomar mejores decisiones. No quiero simplemente observar cómo llega el futuro. Quiero ayudar a crearlo.",

    teamLabel: "04 — EL EQUIPO",
    teamTitle: "Las grandes ideas se vuelven<br><span>aún mejores juntos.</span>",
    teamLarge: "Quiero construir un equipo súper inteligente y creativo.",
    teamBody: "Personas con diferentes habilidades, perspectivas y ambiciones pueden crear cosas que una sola persona nunca podría crear. Me encanta conectar con personas, intercambiar ideas y descubrir posibilidades juntos.",

    projectsLabel: "05 — PRÓXIMOS PROYECTOS",
    projectType: "PRIMER PROYECTO",
    projectTitle: "Future Asia Journal",
    projectBody: "Una plataforma de noticias sobre IA, ciencia, política, videojuegos, deportes, fitness y el mundo más amplio de las ideas y la tecnología.",
    projectStatus: "Explorar",

    chinaLabel: "06 — UN POCO MÁS",
    chinaTitle: "También hay una historia<br><span>sobre China.</span>",
    chinaLarge: "Tengo un interés especial en China. Hay una historia interesante detrás, pero te la contaré en otra ocasión.",
    chinaComing: "CONTINUARÁ…",

    connectLabel: "07 — CONECTAR",
    connectTitle: "Vamos a<br><span>conectar.</span>",
    connectLarge: "Me encanta conocer personas curiosas, compartir ideas, iniciar conversaciones y descubrir qué podemos construir juntos.",

    joinLabel: "08 — ÚNETE",
    joinTitle: "¿Tienes una idea?<br><span>Construyamos juntos.</span>",
    joinLarge: "Siempre me interesa conocer personas curiosas, creadores, desarrolladores y personas con ideas.",
    nameLabel: "NOMBRE",
    emailLabel: "EMAIL",
    messageLabel: "MENSAJE",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Cuéntame sobre ti o sobre tu idea...",
    submit: "Enviar solicitud",

    backTop: "Volver arriba ↑",
    language: "Idioma"
  },

  ru: {
    name: "Русский",

    eyebrow: "PRK · Пурния, Бихар, Индия",
    welcome: "Добро пожаловать в<br><span>PRK</span>",
    tagline: "Любопытство сегодня.<br>Возможности завтра.",
    continue: "Продолжить",
    scroll: "Прокрутите, чтобы исследовать",

    aboutLabel: "01 — ОБО МНЕ",
    aboutTitle: "Я Priyanshu Ranjan Karn.<br><span>Меня называют PRK.</span>",
    aboutLarge: "Я из Пурнии, штат Бихар, Индия. Я любознательный человек, который любит технологии и постоянно задаёт один простой вопрос: <strong>почему?</strong>",
    aboutBody: "Я хочу понимать, как всё работает, почему происходят события и что может стать возможным дальше. Я хочу глубоко изучать программирование — не только для создания программ, но и для понимания идей и систем, которые стоят за ними.",

    driveLabel: "02 — ЧТО МЕНЯ ДВИГАЕТ",
    driveTitle: "У меня слишком много<br><span>идей, чтобы их игнорировать.</span>",
    driveLarge: "Технологии. Программное обеспечение. Приложения. ИИ. Монтаж. Кодинг. Общение.",
    driveBody: "Мне нравится исследовать разные области и соединять идеи, которые могут казаться несвязанными. Я также люблю общение, дипломатию, знакомство с людьми и обучение через разные точки зрения.",

    interest1: "Искусственный интеллект",
    interest1Small: "Создавая то, что будет дальше.",
    interest2: "Программирование",
    interest2Small: "Изучая, как работает технология.",
    interest3: "Творческий монтаж",
    interest3Small: "Превращая идеи в визуальные образы.",
    interest4: "Люди и идеи",
    interest4Small: "Общение, дипломатия, сотрудничество.",

    visionLabel: "03 — ВИДЕНИЕ",
    visionTitle: "Будущее будет<br><span>создано технологиями.</span>",
    visionLarge: "Я верю, что технологии станут глубоко связаны почти со всеми аспектами человеческой жизни. А ИИ способен изменить то, как мы понимаем и формируем мир.",
    visionBody: "Меня увлекает возможность использовать технологии для понимания закономерностей, прогнозирования того, что может произойти дальше, и принятия более правильных решений. Я не хочу просто наблюдать за наступлением будущего. Я хочу помогать его создавать.",

    teamLabel: "04 — КОМАНДА",
    teamTitle: "Великие идеи становятся<br><span>ещё сильнее вместе.</span>",
    teamLarge: "Я хочу создать сверхинтеллектуальную и творческую команду.",
    teamBody: "Люди с разными навыками, взглядами и амбициями могут создавать то, что один человек никогда не смог бы создать в одиночку. Мне нравится знакомиться с людьми, обмениваться идеями и вместе искать новые возможности.",

    projectsLabel: "05 — БУДУЩИЕ ПРОЕКТЫ",
    projectType: "ПЕРВЫЙ ПРОЕКТ",
    projectTitle: "Future Asia Journal",
    projectBody: "Новостная платформа о ИИ, науке, политике, играх, спорте, фитнесе и более широком мире идей и технологий.",
    projectStatus: "Открыть",

    chinaLabel: "06 — ЕЩЁ НЕМНОГО",
    chinaTitle: "Есть ещё одна история<br><span>о Китае.</span>",
    chinaLarge: "У меня особый интерес к Китаю. За этим стоит интересная история — но я расскажу её в другой раз.",
    chinaComing: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ…",

    connectLabel: "07 — СВЯЗЬ",
    connectTitle: "Давайте<br><span>общаться.</span>",
    connectLarge: "Я люблю знакомиться с любознательными людьми, делиться идеями, начинать разговоры и узнавать, что мы можем создать вместе.",

    joinLabel: "08 — ПРИСОЕДИНИТЬСЯ",
    joinTitle: "Есть идея?<br><span>Давайте создадим её вместе.</span>",
    joinLarge: "Мне всегда интересно знакомиться с любознательными людьми, создателями, разработчиками и людьми с идеями.",
    nameLabel: "ИМЯ",
    emailLabel: "EMAIL",
    messageLabel: "СООБЩЕНИЕ",
    namePlaceholder: "Ваше имя",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Расскажите о себе или своей идее...",
    submit: "Отправить заявку",

    backTop: "Наверх ↑",
    language: "Язык"
  }

};


// =========================
// LANGUAGE ELEMENT MAPPING
// =========================

const languageElements = {
  eyebrow: document.querySelector(".hero .eyebrow"),
  welcome: document.querySelector(".hero-title"),
  tagline: document.querySelector(".hero-tagline"),
  continue: document.querySelector("#continueBtn span:first-child"),
  scroll: document.querySelector(".scroll-hint"),

  aboutLabel: document.querySelectorAll(".section-label")[0],
  aboutTitle: document.querySelectorAll(".display")[0],
  aboutLarge: document.querySelectorAll(".large-copy")[0],
  aboutBody: document.querySelectorAll(".body-copy")[0],

  driveLabel: document.querySelectorAll(".section-label")[1],
  driveTitle: document.querySelectorAll(".display")[1],
  driveLarge: document.querySelectorAll(".body-area .large-copy")[0],
  driveBody: document.querySelectorAll(".body-area .body-copy")[0]
