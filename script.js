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

    const name = document.getElementById("joinNames").value.trim();
    const email = document.getElementById("joinEmail").value.trim();
    const message = document.getElementById("joinMessage").value.trim();

    if (!name || !email || !message) {
      joinStatus.textContent =
        translations[currentLang]?.formRequired ||
        "Please fill in all fields.";

      return;
    }

    joinStatus.textContent =
      translations[currentLang]?.formSending ||
      "Sending...";

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
          translations[currentLang]?.formError ||
          "Something went wrong. Please try again.";

        return;
      }

      joinStatus.textContent =
        translations[currentLang]?.formSuccess ||
        "Thank you! Your message has been sent.";

      joinForm.reset();

    } catch (error) {
      console.error("Connection error:", error);

      joinStatus.textContent =
        translations[currentLang]?.formConnection ||
        "Unable to send right now. Please try again.";
    }
  });
}


// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("prk-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  if (themeIcon) {
    themeIcon.textContent = "☀";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

      if (themeIcon) {
        themeIcon.textContent = "☀";
      }

      localStorage.setItem("prk-theme", "dark");

    } else {

      if (themeIcon) {
        themeIcon.textContent = "☾";
      }

      localStorage.setItem("prk-theme", "light");
    }
  });
}


// =========================
// LANGUAGE SWITCHER
// =========================

const languageButton =
  document.getElementById("languageButton");

const languageMenu =
  document.getElementById("languageMenu");

const languageSwitcher =
  document.querySelector(".language-switcher");

const currentLanguage =
  document.getElementById("currentLanguage");

const languageTransition =
  document.getElementById("languageTransition");


// Current language
let currentLang =
  localStorage.getItem("prk-language") || "en";


// =========================
// TRANSLATIONS
// =========================

const translations = {

  // ======================
  // ENGLISH
  // ======================

  en: {
    name: "English",

    eyebrow: "PRK · Purnia, Bihar, India",

    welcome: "Welcome to<br><span>PRK</span>",

    tagline:
      "Curiosity today.<br>Possibilities tomorrow.",

    continue: "Continue",

    scroll: "Scroll to explore",

    aboutLabel: "01 — ABOUT ME",

    aboutTitle:
      "I'm Priyanshu Ranjan Karn.<br><span>People call me PRK.</span>",

    aboutLarge:
      "I'm from Purnia, Bihar, India. I'm a curious person who loves technology and constantly asks one simple question: <strong>why?</strong>",

    aboutBody:
      "I want to understand how things work, what makes them happen, and what could be possible next. Coding is something I want to learn deeply—not just to write software, but to understand the ideas and systems behind it.",


    driveLabel:
      "02 — WHAT DRIVES ME",

    driveTitle:
      "I have too many<br><span>ideas to ignore.</span>",

    driveLarge:
      "Technology. Software. Applications. AI. Editing. Coding. Communication.",

    driveBody:
      "I enjoy exploring different fields and connecting ideas that may seem unrelated. I also love conversations, diplomacy, meeting people, and learning from different perspectives.",


    interest1Title:
      "Artificial Intelligence",

    interest1Text:
      "Building what comes next.",

    interest2Title:
      "Coding",

    interest2Text:
      "Learning how technology works.",

    interest3Title:
      "Creative Editing",

    interest3Text:
      "Turning ideas into visuals.",

    interest4Title:
      "People & Ideas",

    interest4Text:
      "Conversation, diplomacy, collaboration.",


    visionLabel:
      "03 — VISION",

    visionTitle:
      "The future will be<br><span>built with technology.</span>",

    visionLarge:
      "I believe technology will become deeply connected to almost every part of human life. And AI has the potential to change the way we understand and shape the world.",

    visionBody:
      "I'm fascinated by the possibility of using technology to understand patterns, anticipate what may happen next, and make better decisions. I don't want to simply watch that future arrive. I want to help create it.",


    teamLabel:
      "04 — THE TEAM",

    teamTitle:
      "Great ideas become<br><span>greater together.</span>",

    teamLarge:
      "I want to build a super-intelligent, creative team.",

    teamBody:
      "People with different skills, perspectives, and ambitions can create things that one person could never create alone. I love connecting with people, exchanging ideas, and finding possibilities together.",


    projectsLabel:
      "05 — UPCOMING PROJECTS",

    projectType:
      "FIRST PROJECT",

    projectTitle:
      "Future Asia Journal",

    projectDescription:
      "A news platform covering AI, science, politics, gaming, sports, fitness, and the wider world of ideas and technology.",

    projectStatus:
      "Explore",


    chinaLabel:
      "06 — A LITTLE MORE",

    chinaTitle:
      "There is also a story<br><span>about China.</span>",

    chinaLarge:
      "I have a special interest in China. There's an interesting story behind it—but I'll tell that story another time.",

    chinaComing:
      "TO BE CONTINUED…",


    connectLabel:
      "07 — CONNECT",

    connectTitle:
      "Let's<br><span>connect.</span>",

    connectText:
      "I love meeting curious people, sharing ideas, starting conversations, and discovering what we can build together.",

    instagram:
      "INSTAGRAM",

    telegram:
      "TELEGRAM",

    github:
      "GITHUB",

    linkedin:
      "LINKEDIN",

    email:
      "EMAIL",


    joinLabel:
      "08 — JOIN US",

    joinTitle:
      "Have an idea?<br><span>Let's build together.</span>",

    joinText:
      "I'm always interested in meeting curious people, creators, developers, and people with ideas.",

    nameLabel:
      "NAME",

    emailLabel:
      "EMAIL",

    messageLabel:
      "MESSAGE",

    namePlaceholder:
      "Your name",

    emailPlaceholder:
      "your@email.com",

    messagePlaceholder:
      "Tell me about yourself or your idea...",

    sendApplication:
      "Send Application",


    language:
      "Language",

    backToTop:
      "Back to top ↑",


    formRequired:
      "Please fill in all fields.",

    formSending:
      "Sending...",

    formSuccess:
      "Thank you! Your message has been sent.",

    formError:
      "Something went wrong. Please try again.",

    formConnection:
      "Unable to send right now. Please try again."
  },


  // ======================
  // CHINESE
  // ======================

  zh: {
    name: "中文",

    eyebrow:
      "PRK · 印度比哈尔邦普尔尼亚",

    welcome:
      "欢迎来到<br><span>PRK</span>",

    tagline:
      "今天保持好奇。<br>明天创造可能。",

    continue:
      "继续",

    scroll:
      "向下探索",


    aboutLabel:
      "01 — 关于我",

    aboutTitle:
      "我是 Priyanshu Ranjan Karn。<br><span>大家叫我 PRK。</span>",

    aboutLarge:
      "我来自印度比哈尔邦普尔尼亚。我是一个充满好奇心的人，热爱科技，也总是在问一个简单的问题：<strong>为什么？</strong>",

    aboutBody:
      "我想了解事物如何运作、为什么会发生，以及未来还可能出现什么。对我来说，学习编程不仅是为了写软件，更是为了理解背后的思想和系统。",


    driveLabel:
      "02 — 驱动力",

    driveTitle:
      "我的想法太多，<br><span>无法忽视。</span>",

    driveLarge:
      "科技。软件。应用。人工智能。编辑。编程。沟通。",

    driveBody:
      "我喜欢探索不同领域，并把看似无关的想法联系起来。我也喜欢交流、外交、认识不同的人，并从不同的观点中学习。",


    interest1Title:
      "人工智能",

    interest1Text:
      "创造下一个未来。",

    interest2Title:
      "编程",

    interest2Text:
      "理解科技如何运作。",

    interest3Title:
      "创意编辑",

    interest3Text:
      "把想法变成视觉。",

    interest4Title:
      "人与思想",

    interest4Text:
      "交流、外交与合作。",


    visionLabel:
      "03 — 愿景",

    visionTitle:
      "未来将由<br><span>科技创造。</span>",

    visionLarge:
      "我相信科技会与人类生活的几乎每一个部分深度连接。人工智能也有潜力改变我们理解和塑造世界的方式。",

    visionBody:
      "我着迷于利用科技理解规律、预测可能发生的事情，并做出更好的决定。我不想只是等待未来到来。我想参与创造它。",


    teamLabel:
      "04 — 团队",

    teamTitle:
      "伟大的想法，<br><span>一起会变得更伟大。</span>",

    teamLarge:
      "我想建立一个超级智能且富有创造力的团队。",

    teamBody:
      "拥有不同技能、观点和目标的人，可以创造一个人无法独自完成的事情。我喜欢认识人、交换想法，并一起寻找可能性。",


    projectsLabel:
      "05 — 即将推出的项目",

    projectType:
      "第一个项目",

    projectTitle:
      "Future Asia Journal",

    projectDescription:
      "一个关注人工智能、科学、政治、游戏、体育、健身以及更广泛的思想与科技世界的新闻平台。",

    projectStatus:
      "探索",


    chinaLabel:
      "06 — 更多故事",

    chinaTitle:
      "还有一个<br><span>关于中国的故事。</span>",

    chinaLarge:
      "我对中国有着特别的兴趣。这背后有一个有趣的故事——但我会在另一个时间告诉你。",

    chinaComing:
      "未完待续…",


    connectLabel:
      "07 — 联系",

    connectTitle:
      "让我们<br><span>保持联系。</span>",

    connectText:
      "我喜欢认识充满好奇心的人、分享想法、开始交流，并发现我们可以一起创造什么。",

    instagram:
      "INSTAGRAM",

    telegram:
      "TELEGRAM",

    github:
      "GITHUB",

    linkedin:
      "LINKEDIN",

    email:
      "邮箱",


    joinLabel:
      "08 — 加入我们",

    joinTitle:
      "有一个想法？<br><span>让我们一起创造。</span>",

    joinText:
      "我一直期待认识有好奇心的人、创作者、开发者以及有想法的人。",

    nameLabel:
      "姓名",

    emailLabel:
      "邮箱",

    messageLabel:
      "留言",

    namePlaceholder:
      "你的名字",

    emailPlaceholder:
      "your@email.com",

    messagePlaceholder:
      "介绍一下你自己或你的想法……",

    sendApplication:
      "发送申请",


    language:
      "语言",

    backToTop:
      "返回顶部 ↑",


    formRequired:
      "请填写所有字段。",

    formSending:
      "正在发送……",

    formSuccess:
      "谢谢！你的消息已经发送。",

    formError:
      "出现了一些问题，请再试一次。",

    formConnection:
      "暂时无法发送，请稍后再试。"
  },


  // ======================
  // JAPANESE
  // ======================

  ja: {
    name: "日本語",

    eyebrow:
      "PRK · インド・ビハール州・プルニア",

    welcome:
      "PRKへ<br><span>ようこそ</span>",

    tagline:
      "今日の好奇心。<br>明日の可能性。",

    continue:
      "続ける",

    scroll:
      "スクロールして探索",


    aboutLabel:
      "01 — 私について",

    aboutTitle:
      "Priyanshu Ranjan Karnです。<br><span>PRKと呼ばれています。</span>",

    aboutLarge:
      "インドのビハール州プルニア出身です。テクノロジーが大好きで、いつも一つのシンプルな疑問を持っています。<strong>なぜ？</strong>",

    aboutBody:
      "物事がどのように動き、なぜ起こり、次に何が可能になるのかを知りたいと思っています。プログラミングは、ソフトウェアを書くためだけでなく、その背後にある考え方や仕組みを深く理解するために学びたいです。",


    driveLabel:
      "02 — 私を動かすもの",

    driveTitle:
      "無視できないほど<br><span>アイデアがあります。</span>",

    driveLarge:
      "テクノロジー。ソフトウェア。アプリ。AI。編集。コーディング。コミュニケーション。",

    driveBody:
      "さまざまな分野を探求し、一見関係のないアイデアをつなげることが好きです。会話、外交、人との出会い、そして異なる視点から学ぶことも好きです。",


    interest1Title:
      "人工知能",

    interest1Text:
      "次の未来をつくる。",

    interest2Title:
      "コーディング",

    interest2Text:
      "テクノロジーの仕組みを学ぶ。",

    interest3Title:
      "クリエイティブ編集",

    interest3Text:
      "アイデアをビジュアルにする。",

    interest4Title:
      "人とアイデア",

    interest4Text:
      "会話、外交、コラボレーション。",


    visionLabel:
      "03 — ビジョン",

    visionTitle:
      "未来は<br><span>テクノロジーでつくられる。</span>",

    visionLarge:
      "テクノロジーは人間の生活のほぼすべての部分と深くつながっていくと考えています。そしてAIは、世界を理解し形作る方法を変える可能性があります。",

    visionBody:
      "テクノロジーを使ってパターンを理解し、次に何が起こるかを予測し、より良い判断をする可能性に魅力を感じています。未来をただ待つのではなく、自分もその未来をつくりたいです。",


    teamLabel:
      "04 — チーム",

    teamTitle:
      "素晴らしいアイデアは<br><span>一緒ならさらに大きくなる。</span>",

    teamLarge:
      "スーパーインテリジェントでクリエイティブなチームをつくりたい。",

    teamBody:
      "異なるスキル、視点、目標を持つ人々が集まれば、一人では決して作れないものを生み出せます。人とつながり、アイデアを交換し、一緒に可能性を探すことが好きです。",


    projectsLabel:
      "05 — 今後のプロジェクト",

    projectType:
      "最初のプロジェクト",

    projectTitle:
      "Future Asia Journal",

    projectDescription:
      "AI、科学、政治、ゲーム、スポーツ、フィットネス、そしてより広い世界のアイデアとテクノロジーを扱うニュースプラットフォーム。",

    projectStatus:
      "見る",


    chinaLabel:
      "06 — もう少し",

    chinaTitle:
      "中国についての<br><span>物語もあります。</span>",

    chinaLarge:
      "私は中国に特別な関心があります。その背景には面白い物語がありますが、それはまた別の機会に話します。",

    chinaComing:
      "つづく…",


    connectLabel:
      "07 — つながる",

    connectTitle:
      "ぜひ<br><span>つながりましょう。</span>",

    connectText:
      "好奇心旺盛な人と出会い、アイデアを共有し、会話を始め、一緒に何を作れるかを見つけることが好きです。",

    instagram:
      "INSTAGRAM",

    telegram:
      "TELEGRAM",

    github:
      "GITHUB",

    linkedin:
      "LINKEDIN",

    email:
      "EMAIL",


    joinLabel:
      "08 — 参加する",

    joinTitle:
      "アイデアがありますか？<br><span>一緒につくりましょう。</span>",

    joinText:
      "好奇心旺盛な人、クリエイター、開発者、そしてアイデアを持つ人と出会いたいと思っています。",

    nameLabel:
      "名前",

    emailLabel:
      "メール",

    messageLabel:
      "メッセージ",

    namePlaceholder:
      "あなたの名前",

    emailPlaceholder:
      "your@email.com",

    messagePlaceholder:
      "あなた自身やアイデアについて教えてください…",

    sendApplication:
      "応募を送信",


    language:
      "言語",

    backToTop:
      "トップへ戻る ↑",


    formRequired:
      "すべての項目を入力してください。",

    formSending:
      "送信中…",

    formSuccess:
      "ありがとうございます！メッセージが送信されました。",

    formError:
      "問題が発生しました。もう一度お試しください。",

    formConnection:
      "現在送信できません。後でもう一度お試しください。"
  },


  // ======================
  // KOREAN
  // ======================

  ko: {
    name: "한국어",

    eyebrow:
      "PRK · 인도 비하르주 푸르니아",

    welcome:
      "PRK에<br><span>오신 것을 환영합니다</span>",

    tagline:
      "오늘의 호기심.<br>내일의 가능성.",

    continue:
      "계속",

    scroll:
      "스크롤하여 탐색",


    aboutLabel:
      "01 — 나에 대해",

    aboutTitle:
      "저는 Priyanshu Ranjan Karn입니다.<br><span>사람들은 저를 PRK라고 부릅니다.</span>",

    aboutLarge:
      "저는 인도 비하르주 푸르니아 출신입니다. 기술을 좋아하고 항상 한 가지 간단한 질문을 합니다. <strong>왜?</strong>",

    aboutBody:
      "저는 사물이 어떻게 작동하고, 왜 일어나며, 다음에는 무엇이 가능할지 이해하고 싶습니다. 코딩도 단순히 소프트웨어를 만들기 위해서가 아니라 그 뒤에 있는 아이디어와 시스템을 깊이 이해하기 위해 배우고 싶습니다.",


    driveLabel:
      "02 — 나를 움직이는 것",

    driveTitle:
      "무시할 수 없을 만큼<br><span>아이디어가 많습니다.</span>",

    driveLarge:
      "기술. 소프트웨어. 애플리케이션. AI. 편집. 코딩. 커뮤니케이션.",

    driveBody:
      "저는 다양한 분야를 탐구하고 서로 관련 없어 보이는 아이디어를 연결하는 것을 좋아합니다. 대화, 외교, 사람을 만나는 것, 그리고 다양한 관점에서 배우는 것도 좋아합니다.",


    interest1Title:
      "인공지능",

    interest1Text:
      "다음 미래를 만듭니다.",

    interest2Title:
      "코딩",

    interest2Text:
      "기술이 작동하는 방식을 배웁니다.",

    interest3Title:
      "크리에이티브 편집",

    interest3Text:
      "아이디어를 시각적으로 표현합니다.",

    interest4Title:
      "사람과 아이디어",

    interest4Text:
      "대화, 외교, 협업.",


    visionLabel:
      "03 — 비전",

    visionTitle:
      "미래는<br><span>기술로 만들어집니다.</span>",

    visionLarge:
      "기술은 인간의 삶 거의 모든 부분과 깊이 연결될 것이라고 믿습니다. AI는 우리가 세상을 이해하고 만들어가는 방식을 바꿀 가능성이 있습니다.",

    visionBody:
      "기술을 통해 패턴을 이해하고 앞으로 일어날 일을 예측하며 더 나은 결정을 내릴 수 있다는 가능성에 매력을 느낍니다. 미래가 오는 것을 지켜보기만 하고 싶지 않습니다. 직접 만들고 싶습니다.",


    teamLabel:
      "04 — 팀",

    teamTitle:
      "좋은 아이디어는<br><span>함께하면 더 커집니다.</span>",

    teamLarge:
      "초지능적이고 창의적인 팀을 만들고 싶습니다.",

    teamBody:
      "서로 다른 기술, 관점, 목표를 가진 사람들이 모이면 한 사람이 혼자 만들 수 없는 것을 만들 수 있습니다. 사람들과 연결하고 아이디어를 나누며 함께 가능성을 찾는 것을 좋아합니다.",


    projectsLabel:
      "05 — 예정된 프로젝트",

    projectType:
      "첫 번째 프로젝트",

    projectTitle:
      "Future Asia Journal",

    projectDescription:
      "AI, 과학, 정치, 게임, 스포츠, 피트니스와 더 넓은 아이디어 및 기술 세계를 다루는 뉴스 플랫폼입니다.",

    projectStatus:
      "보기",


    chinaLabel:
      "06 — 조금 더",

    chinaTitle:
      "중국에 관한<br><span>이야기도 있습니다.</span>",

    chinaLarge:
      "저는 중국에 특별한 관심이 있습니다. 그 뒤에는 흥미로운 이야기가 있지만, 그 이야기는 다음에 들려드리겠습니다.",

    chinaComing:
      "계속됩니다…",


    connectLabel:
      "07 — 연결",

    connectTitle:
      "우리<br><span>연결해요.</span>",

    connectText:
      "호기심 많은 사람들을 만나고, 아이디어를 공유하고, 대화를 시작하고, 우리가 함께 무엇을 만들 수 있는지 발견하는 것을 좋아합니다.",

    instagram:
      "INSTAGRAM",

    telegram:
      "TELEGRAM",

    github:
      "GITHUB",

    linkedin:
      "LINKEDIN",

    email:
      "EMAIL",


    joinLabel:
      "08 — 함께하기",

    joinTitle:
      "아이디어가 있나요?<br><span>함께 만들어봐요.</span>",

    joinText:
      "호기심 많은 사람, 크리에이터, 개발자, 그리고 아이디어를 가진 사람들을 만나는 것을 항상 기대합니다.",

    nameLabel:
      "이름",

    emailLabel:
      "이메일",

    messageLabel:
      "메시지",

    namePlaceholder:
      "이름",

    emailPlaceholder:
      "your@email.com",

    messagePlaceholder:
      "당신이나 당신의 아이디어를 소개해주세요…",

    sendApplication:
      "지원 보내기",


    language:
      "언어",

    backToTop:
      "맨 위로 ↑",


    formRequired:
      "모든 항목을 입력해주세요.",

    formSending:
      "전송 중…",

    formSuccess:
      "감사합니다! 메시지가 전송되었습니다.",

    formError:
      "문제가 발생했습니다. 다시 시도해주세요.",

    formConnection:
      "지금은 전송할 수 없습니다. 나중에 다시 시도해주세요."
  },


  // ======================
  // SPANISH
  // ======================

  es: {
    name: "Español",

    eyebrow:
      "PRK · Purnia, Bihar, India",

    welcome:
      "Bienvenido a<br><span>PRK</span>",

    tagline:
      "La curiosidad de hoy.<br>Las posibilidades de mañana.",

    continue:
      "Continuar",

    scroll:
      "Desplázate para explorar",


    aboutLabel:
      "01 — SOBRE MÍ",

    aboutTitle:
      "Soy Priyanshu Ranjan Karn.<br><span>La gente me llama PRK.</span>",

    aboutLarge:
      "Soy de Purnia, Bihar, India. Soy una persona curiosa que ama la tecnología y constantemente se hace una simple pregunta: <strong>¿por qué?</strong>",

    aboutBody:
      "Quiero entender cómo funcionan las cosas, qué las hace suceder y qué podría ser posible después. Quiero aprender programación profundamente, no solo para escribir software, sino para comprender las ideas y sistemas que hay detrás.",


    driveLabel:
      "02 — LO QUE ME IMPULSA",

    dr
