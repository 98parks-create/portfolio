export const projects = [
  {
    id: 1,
    title: "TAD스마트견적",
    subtitle: "SaaS 견적 플랫폼",
    description: "건설·인테리어 현장 종사자를 위한 AI 기반 견적 자동 생성 플랫폼. 한·영·베트남어 다국어 지원, Claude AI 연동, PDF 출력까지 1주일 만에 단독 개발·배포.",
    tech: ["React 19", "Firebase", "Claude API", "jsPDF", "i18next", "PWA", "Kakao OAuth", "Naver OAuth"],
    role: "개인 프로젝트",
    period: "",
    color: "#C8B89A",
    url: "https://tadsmart.co.kr",
    github: "",
    highlights: ["Claude API 견적 자동 생성", "3개국어 다국어 지원", "소셜 로그인 (카카오·네이버)", "PWA 배포"],
    tools: ["GitHub", "Figma", "Firebase Console"],
    codeBlocks: [
      {
        title: "Claude API 견적 자동 생성",
        why: "사용자가 자연어로 공사 내용을 입력하면 AI가 항목·수량·단가를 자동 계산합니다. 단순 텍스트 응답이 아닌 JSON 구조로 반환되도록 프롬프트를 설계해 PDF 생성까지 자동화했습니다.",
        language: "javascript",
        code: `const generateEstimate = async (input) => {
  const res = await fetch('/api/claude', {
    method: 'POST',
    body: JSON.stringify({
      prompt: \`공사 내용: \${input}
다음 JSON 형식으로만 반환. 코드블록 없이 순수 JSON:
{"items":[{"name":"","qty":0,"unit":"","price":0}],"total":0}\`
    })
  });
  const data = await res.json();
  // 코드블록 방어 전처리 후 파싱
  const clean = data.content.replace(/\`\`\`json?|\\n\`\`\`/g, '').trim();
  return JSON.parse(clean);
};`
      },
      {
        title: "jsPDF 다국어 견적서 출력",
        why: "한국어·영어·베트남어 선택에 따라 언어별 폰트와 레이블이 다른 PDF를 생성합니다. i18next 언어 컨텍스트를 PDF 렌더링 단계까지 전달하는 구조가 핵심입니다.",
        language: "javascript",
        code: `const generatePDF = (items, lang) => {
  const doc = new jsPDF();
  const labels = {
    ko: { title: '견적서', item: '품목', qty: '수량', price: '단가' },
    en: { title: 'Estimate', item: 'Item', qty: 'Qty', price: 'Price' },
    vi: { title: 'Báo Giá', item: 'Hạng mục', qty: 'SL', price: 'Đơn giá' }
  };
  const L = labels[lang] || labels.ko;
  doc.setFont('NotoSans');
  doc.text(L.title, 105, 20, { align: 'center' });
  items.forEach((item, i) => {
    doc.text(\`\${item.name} | \${item.qty}\${item.unit} | \${item.price}원\`, 20, 40 + i * 10);
  });
  doc.save(\`\${L.title}_\${Date.now()}.pdf\`);
};`
      },
      {
        title: "Firebase Firestore 견적 이력 관리",
        why: "사용자별 견적 이력을 저장·조회합니다. 견적 항목을 별도 컬렉션이 아닌 배열로 내장(embed)해 단일 문서 조회로 전체 견적을 렌더링, N+1 문제를 방지했습니다.",
        language: "javascript",
        code: `// 견적 저장
const saveEstimate = async (uid, estimate) => {
  await addDoc(collection(db, 'users', uid, 'estimates'), {
    title: estimate.title,
    items: estimate.items, // 배열 내장 → N+1 방지
    total: estimate.total,
    language: i18n.language,
    createdAt: serverTimestamp()
  });
};

// 견적 목록 실시간 조회
const getEstimates = (uid, callback) =>
  onSnapshot(
    query(collection(db, 'users', uid, 'estimates'),
      orderBy('createdAt', 'desc')),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );`
      },
      {
        title: "소셜 로그인 (카카오·네이버 OAuth)",
        why: "현장 노동자 타겟 사용자는 이메일 가입에 거부감이 있어 소셜 로그인을 필수로 구현했습니다. Firebase Authentication과 카카오·네이버 OAuth를 연동했습니다.",
        language: "javascript",
        code: `// 카카오 로그인 → Firebase Custom Token 연동
const loginWithKakao = async () => {
  // 1. 카카오 로그인
  await Kakao.Auth.login();
  const kakaoUser = await Kakao.API.request({ url: '/v2/user/me' });

  // 2. 서버에서 Firebase Custom Token 발급
  const { token } = await fetch('/api/auth/kakao', {
    method: 'POST',
    body: JSON.stringify({ kakaoId: kakaoUser.id })
  }).then(r => r.json());

  // 3. Firebase 로그인
  await signInWithCustomToken(auth, token);
};`
      },
      {
        title: "i18next 다국어 초기화",
        why: "한국어·영어·베트남어를 지원하기 위해 i18next를 설정했습니다. 브라우저 언어를 자동 감지하고, 지원하지 않는 언어는 한국어로 폴백합니다.",
        language: "javascript",
        code: `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: require('./locales/ko.json') },
    en: { translation: require('./locales/en.json') },
    vi: { translation: require('./locales/vi.json') },
  },
  lng: navigator.language.split('-')[0], // 브라우저 언어 자동 감지
  fallbackLng: 'ko',
  interpolation: { escapeValue: false }
});`
      }
    ],
    troubleshooting: [
      {
        what: "Claude API 응답이 마크다운 코드블록으로 감싸져 JSON 파싱 오류 발생",
        why: "프롬프트에 순수 JSON 반환 명시 없음 — 모델이 기본적으로 코드블록을 붙여 반환",
        how: "프롬프트에 '코드블록 없이 순수 JSON만 반환' 명시 + 응답 전처리 함수 추가",
        result: "API 응답 파싱 성공률 100% 달성"
      },
      {
        what: "다국어 PDF 출력 시 선택한 언어와 무관하게 한국어로만 출력",
        why: "PDF 렌더링 단계에서 i18next 언어 컨텍스트를 별도로 전달하지 않음",
        how: "PDF 생성 함수에 현재 언어값을 파라미터로 명시 전달, 언어별 폰트 분기 처리",
        result: "한·영·베트남어 PDF 정상 출력"
      }
    ]
  },
  {
    id: 2,
    title: "여밈",
    subtitle: "상속·복지 AI 안내 앱",
    description: "가족을 잃은 후 홀로 남겨진 분들을 위한 AI 맞춤 상속·복지 정보 안내 서비스. 공공데이터 6개 이상 연동, Gemini + Claude API 이중 AI 구조.",
    tech: ["Python", "Django", "Gemini API", "Claude API", "Kakao Map API", "공공데이터", "PostgreSQL"],
    role: "PM · 팀장 · 기획 · 서비스 디자인",
    period: "",
    color: "#8B7355",
    url: "https://98parks-create.github.io/yeomim-privacy",
    github: "https://github.com/98parks-create",
    highlights: ["팀장 / 4인 팀 프로젝트", "공공 API 병렬처리 65% 속도 개선", "AI 챗봇 (Claude API)", "충청북도 경진대회 출품"],
    tools: ["GitHub", "Figma", "Notion", "Discord"],
    codeBlocks: [
      {
        title: "공공 API 병렬 처리",
        why: "주거·금융·복지 API를 순차 호출하면 10초 이상 소요됩니다. ThreadPoolExecutor로 3개 API를 동시 호출해 응답 시간을 65% 단축했습니다.",
        language: "python",
        code: `from concurrent.futures import ThreadPoolExecutor

def analyze_all(user_data):
    """순차 처리 ~10s → 병렬 처리 ~3.4s (65% 개선)"""
    with ThreadPoolExecutor(max_workers=3) as executor:
        f_housing = executor.submit(analyze_housing, user_data)
        f_finance = executor.submit(analyze_finance, user_data)
        f_welfare = executor.submit(analyze_welfare, user_data)

    return {
        'housing': f_housing.result(),
        'finance': f_finance.result(),
        'welfare': f_welfare.result()
    }`
      },
      {
        title: "점수 계산 & 정규화 시스템",
        why: "사용자 조건(소득·부양·나이 등)을 수치화해 0~100 점수로 변환합니다. Gemini가 이 점수를 기반으로 맞춤 정책 3개를 추천합니다.",
        language: "python",
        code: `def calculate_score(user_data):
    base = 10000  # 기본 점수

    if user_data.get('low_income'):
        base -= 7000
    if user_data.get('is_newlywed'):
        base += 500
    if user_data.get('has_child'):
        base += 800
    if not user_data.get('meets_requirements'):
        base -= 2000

    # 0~100 정규화
    score = max(0, min(100, (base / 10000) * 100))
    return round(score, 1)

def get_gemini_recommendation(score, user_data):
    prompt = f"점수: {score}/100, 조건: {user_data}\\n맞춤 정책 3개를 JSON으로 추천"
    return gemini_model.generate_content(prompt)`
      },
      {
        title: "Claude API 챗봇 대화형 안내",
        why: "상속·장례라는 민감한 주제 특성상 딱딱한 정보 나열보다 대화형 안내가 적합합니다. Claude의 자연스러운 한국어 응답으로 단계별 절차를 안내합니다.",
        language: "python",
        code: `import anthropic

client = anthropic.Anthropic(api_key=settings.CLAUDE_API_KEY)

def chat_with_claude(user_message, context):
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system="""당신은 상속·복지 전문 안내 도우미입니다.
따뜻하고 이해하기 쉬운 말로 단계별로 안내해주세요.
법률 전문 상담은 전문가 연결을 권유하세요.""",
        messages=[
            {"role": "user", "content": f"상황: {context}\\n질문: {user_message}"}
        ]
    )
    return message.content[0].text`
      },
      {
        title: "공공데이터 EUC-KR 인코딩 처리",
        why: "공공데이터포털 일부 API가 EUC-KR 인코딩으로 응답해 한글이 깨지는 문제가 발생했습니다. 인코딩을 명시적으로 지정해 정상 파싱했습니다.",
        language: "python",
        code: `import requests
import xml.etree.ElementTree as ET

def fetch_public_data(url, params):
    response = requests.get(url, params=params)
    # EUC-KR 인코딩 명시 설정
    response.encoding = 'EUC-KR'

    root = ET.fromstring(response.text)
    items = root.findall('.//item')

    return [
        {child.tag: child.text for child in item}
        for item in items
    ]`
      },
      {
        title: "Kakao Map API 시설 위치 검색",
        why: "장례·안전 시설을 지도에서 바로 확인할 수 있도록 카카오맵 API와 연동했습니다. 사용자 위치 기반으로 반경 내 시설을 거리순으로 표시합니다.",
        language: "javascript",
        code: `const searchFacilities = (lat, lng, type) => {
  const ps = new kakao.maps.services.Places();
  const keyword = type === 'funeral' ? '장례식장' : '안전센터';

  ps.keywordSearch(keyword, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      data.forEach(place => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.y, place.x),
          map: map
        });
        addInfoWindow(marker, place.place_name, place.road_address_name);
      });
    }
  }, {
    location: new kakao.maps.LatLng(lat, lng),
    radius: 3000,
    sort: kakao.maps.services.SortBy.DISTANCE
  });
};`
      }
    ],
    troubleshooting: [
      {
        what: "공공 API 3개 순차 호출 시 전체 응답 시간 10초 이상",
        why: "각 API 응답을 기다린 뒤 다음 호출하는 순차 구조",
        how: "ThreadPoolExecutor로 3개 API 병렬 호출로 변경",
        result: "응답시간 10초 → 3.4초 (65% 개선)"
      },
      {
        what: "공공데이터 XML 파싱 중 한글 깨짐",
        why: "일부 API가 EUC-KR 인코딩으로 응답",
        how: "requests 응답 encoding을 EUC-KR로 명시 설정 후 파싱",
        result: "한글 데이터 정상 파싱"
      }
    ]
  },
  {
    id: 3,
    title: "WhatEat",
    subtitle: "점심 메뉴 추천 웹앱",
    description: "직장인의 점심 메뉴 선택 피로를 해결하는 위치 기반 식당 추천 서비스. Kakao Maps API 연동, 커뮤니티 바이럴을 통한 실사용자 유입 경험.",
    tech: ["HTML5", "CSS3", "JavaScript", "Kakao Maps API", "Supabase", "PWA"],
    role: "개인 프로젝트",
    period: "",
    color: "#6B8F71",
    url: "https://whateat-fawn.vercel.app/",
    github: "https://github.com/98parks-create",
    highlights: ["위치 기반 반경 검색", "카테고리 필터링", "즐겨찾기 (Supabase)", "커뮤니티 바이럴 마케팅"],
    tools: ["GitHub", "Vercel", "Supabase Dashboard"],
    codeBlocks: [
      {
        title: "Kakao Maps 위치 기반 반경 검색",
        why: "사용자 현재 위치에서 도보 거리(500m) 내 식당만 표시합니다. 초기에는 radius 미설정으로 전국 검색이 됐고, 파라미터 추가 후 정상 동작했습니다.",
        language: "javascript",
        code: `const searchNearby = (lat, lng, category) => {
  const ps = new kakao.maps.services.Places();

  ps.categorySearch(category, (data, status) => {
    if (status !== kakao.maps.services.Status.OK) return;

    clearMarkers();
    data.forEach(place => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x),
        map: map
      });
      addInfoWindow(marker, place);
    });
  }, {
    location: new kakao.maps.LatLng(lat, lng),
    radius: 500,      // 500m 반경 (도보 기준)
    sort: kakao.maps.services.SortBy.DISTANCE
  });
};`
      },
      {
        title: "Supabase 즐겨찾기 CRUD",
        why: "자주 가는 식당을 저장·관리합니다. Supabase의 Row Level Security(RLS)로 사용자별 데이터 접근을 제어했습니다.",
        language: "javascript",
        code: `// 즐겨찾기 추가
const addFavorite = async (place) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('favorites')
    .insert({
      user_id: user.id,
      place_name: place.place_name,
      address: place.road_address_name,
      category: place.category_name,
      kakao_url: place.place_url
    });
  if (!error) showToast('즐겨찾기에 추가됐어요!');
};

// 즐겨찾기 목록 (RLS 자동 필터)
const getFavorites = async () => {
  const { data } = await supabase
    .from('favorites')
    .select('*')
    .order('created_at', { ascending: false });
  return data;
};`
      },
      {
        title: "현재 위치 GPS 획득",
        why: "사용자 위치를 기반으로 주변 식당을 검색하기 위해 브라우저 Geolocation API를 사용했습니다. 위치 거부 시 기본 위치(서울 중심)로 폴백합니다.",
        language: "javascript",
        code: `const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      // 지원 안 하면 서울 기본값
      resolve({ lat: 37.5665, lng: 126.9780 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      () => resolve({ lat: 37.5665, lng: 126.9780 }), // 거부 시 폴백
      { timeout: 5000 }
    );
  });
};`
      },
      {
        title: "PWA manifest 설정",
        why: "홈 화면에 추가해 앱처럼 사용할 수 있도록 PWA를 구성했습니다. 오프라인 캐싱으로 기본 UI는 네트워크 없이도 표시됩니다.",
        language: "json",
        code: `{
  "name": "WhatEat - 오늘 점심 뭐 먹지?",
  "short_name": "WhatEat",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF6B6B",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`
      }
    ],
    troubleshooting: [
      {
        what: "검색 결과가 현재 위치와 무관한 먼 식당까지 포함",
        why: "radius 파라미터 미설정으로 전국 키워드 검색 동작",
        how: "radius=500, sort=DISTANCE 파라미터 추가",
        result: "도보 이동 가능 반경 내 식당만 표시"
      }
    ]
  },
  {
    id: 4,
    title: "킥오프",
    subtitle: "코치를 위한 레슨 회원관리 앱",
    description: "20년 프로 축구 경력을 바탕으로 기획한 레슨 회원관리 앱, 레슨 회원의 정보 및 레슨 스케줄 관리 및 매출확인",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    role: "개인 프로젝트",
    period: "",
    color: "#4A7FA5",
    url: "https://kickoff-coral.vercel.app/",
    github: "https://github.com/98parks-create",
    highlights: ["20년 축구 경험 기반 기획", "Context API 상태 관리", "팀 매칭 알고리즘", "경기 일정 캘린더"],
    tools: ["GitHub", "Figma", "Vercel", "Notion"],
    codeBlocks: [
      {
        title: "Context API 전역 상태 관리",
        why: "회원 정보·인증 상태를 여러 컴포넌트에서 공유해야 했습니다. props drilling이 3단계 이상 깊어지면서 유지보수가 어려워져 Context API로 전환했습니다.",
        language: "javascript",
        code: `const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);

  const joinTeam = async (teamId) => {
    const res = await api.post(\`/teams/\${teamId}/join\`);
    setTeam(res.data.team);
    setMembers(res.data.members);
  };

  const leaveTeam = async () => {
    await api.post('/teams/leave');
    setTeam(null);
    setMembers([]);
  };

  return (
    <TeamContext.Provider value={{ team, members, joinTeam, leaveTeam }}>
      {children}
    </TeamContext.Provider>
  );
};`
      },
      {
        title: "레슨 스케줄 캘린더 관리",
        why: "코치가 회원별 레슨 일정을 한눈에 확인하고 관리할 수 있도록 캘린더 기능을 구현했습니다. 날짜별 레슨 목록과 매출을 함께 표시합니다.",
        language: "javascript",
        code: `const getLessonsByDate = async (date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const lessons = await Lesson.find({
    scheduledAt: { $gte: startOfDay, $lte: endOfDay },
    coachId: req.user.id
  }).populate('member', 'name phone');

  const totalRevenue = lessons.reduce((sum, l) => sum + l.fee, 0);

  return { lessons, totalRevenue, count: lessons.length };
};`
      },
      {
        title: "회원 출석 체크 및 통계",
        why: "레슨 출석률을 추적해 회원 관리에 활용합니다. 월별 출석률과 누적 레슨 횟수를 집계해 코치가 회원 현황을 파악할 수 있도록 했습니다.",
        language: "javascript",
        code: `const getMemberStats = async (memberId, month) => {
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const lessons = await Lesson.find({
    memberId,
    scheduledAt: { $gte: start, $lte: end }
  });

  const attended = lessons.filter(l => l.status === 'attended').length;
  const total = lessons.length;

  return {
    attendanceRate: total > 0 ? Math.round((attended / total) * 100) : 0,
    totalLessons: total,
    attended,
    absent: total - attended
  };
};`
      },
      {
        title: "매출 통계 집계",
        why: "월별·회원별 매출을 집계해 코치가 수익 현황을 파악할 수 있도록 했습니다. MongoDB aggregation pipeline으로 효율적으로 처리했습니다.",
        language: "javascript",
        code: `const getMonthlyRevenue = async (coachId, year) => {
  const revenue = await Lesson.aggregate([
    {
      $match: {
        coachId: mongoose.Types.ObjectId(coachId),
        status: 'attended',
        scheduledAt: {
          $gte: new Date(\`\${year}-01-01\`),
          $lte: new Date(\`\${year}-12-31\`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$scheduledAt' },
        total: { $sum: '$fee' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
  return revenue;
};`
      }
    ],
    troubleshooting: [
      {
        what: "컴포넌트 간 팀 상태 공유 시 props drilling 3단계 이상으로 유지보수 어려움",
        why: "전역 상태 관리 없이 props로만 데이터 전달",
        how: "Context API 도입으로 팀 정보·인증 상태 전역 관리",
        result: "컴포넌트 구조 단순화, 불필요한 re-render 감소"
      }
    ]
  },
  {
    id: 5,
    title: "태평양애드",
    subtitle: "기업 홈페이지",
    description: "광고자재 제조업체 태평양애드 공식 홈페이지. 제품 소개, 견적 문의, 회사 소개 페이지 구성. 반응형 디자인 적용.",
    tech: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    role: "기획 · 디자인 · 개발 · 배포 (팀)",
    period: "",
    color: "#A5527A",
    url: "https://taepyeongyangad.netlify.app/",
    github: "https://github.com/98parks-create",
    highlights: ["반응형 웹 디자인", "제품 카탈로그", "견적 문의 폼", "Netlify 배포"],
    tools: ["GitHub", "Netlify", "Figma"],
    codeBlocks: [
      {
        title: "반응형 그리드 레이아웃",
        why: "모바일·태블릿·데스크톱 환경에서 모두 최적화된 제품 카탈로그를 표시합니다. CSS Grid의 auto-fill로 화면 크기에 따라 컬럼 수가 자동 조정됩니다.",
        language: "css",
        code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 40px 0;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .hero-title {
    font-size: clamp(28px, 6vw, 48px);
  }
  .nav-menu {
    display: none;
  }
  .nav-menu.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    align-items: center;
    justify-content: center;
  }
}`
      },
      {
        title: "견적 문의 폼 유효성 검사",
        why: "사용자가 필수 정보를 빠뜨리지 않도록 클라이언트 사이드 유효성 검사를 구현했습니다. 각 필드별 오류 메시지를 인라인으로 표시해 UX를 개선했습니다.",
        language: "javascript",
        code: `const validateForm = (fields) => {
  const errors = {};

  if (!fields.name?.trim()) errors.name = '이름을 입력해주세요';
  if (!fields.phone?.match(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/))
    errors.phone = '올바른 전화번호를 입력해주세요';
  if (!fields.email?.includes('@'))
    errors.email = '올바른 이메일을 입력해주세요';
  if (!fields.product) errors.product = '제품을 선택해주세요';
  if (!fields.message?.trim()) errors.message = '문의 내용을 입력해주세요';

  return { isValid: Object.keys(errors).length === 0, errors };
};`
      },
      {
        title: "스크롤 애니메이션 (Intersection Observer)",
        why: "스크롤 시 요소가 뷰포트에 진입할 때 애니메이션을 트리거합니다. 기존 scroll 이벤트보다 성능이 좋고 불필요한 리렌더링이 없습니다.",
        language: "javascript",
        code: `const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate-on-scroll')
    .forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', observeElements);`
      }
    ],
    troubleshooting: [
      {
        what: "모바일에서 네비게이션 메뉴 클릭 시 페이지 이동 후 메뉴가 열린 채로 유지",
        why: "메뉴 닫기 이벤트를 route 변경 시 처리하지 않음",
        how: "링크 클릭 이벤트에 메뉴 닫기 함수 직접 바인딩",
        result: "페이지 이동 후 메뉴 자동 닫힘 정상 동작"
      }
    ]
  },
  {
    id: 6,
    title: "디어레스트",
    subtitle: "편지·기록 앱",
    description: "소중한 사람을 위한 편지 작성·보관 서비스. Firebase 실시간 DB 연동, 반응형 UI, 감성적인 UX 디자인.",
    tech: ["React", "Firebase", "Firestore", "Firebase Auth"],
    role: "개인 프로젝트",
    period: "",
    color: "#7A6FA5",
    url: "https://dearest-official.vercel.app/",
    github: "https://github.com/98parks-create",
    highlights: ["Firebase 실시간 리스너", "소셜 인증", "반응형 UI", "감성 UX 디자인"],
    tools: ["GitHub", "Vercel", "Firebase Console", "Figma"],
    codeBlocks: [
      {
        title: "Firebase 실시간 편지 리스너",
        why: "편지가 추가·삭제될 때 서버 재요청 없이 화면이 즉시 업데이트됩니다. onSnapshot으로 실시간 스트리밍을 구현하고, 컴포넌트 언마운트 시 구독을 해제합니다.",
        language: "javascript",
        code: `useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, 'letters'),
    where('uid', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const unsub = onSnapshot(q, (snap) => {
    setLetters(snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate()
    })));
    setLoading(false);
  }, (err) => {
    console.error('Firestore 오류:', err);
  });

  return () => unsub(); // 클린업
}, [user]);`
      },
      {
        title: "Firebase Auth 소셜 로그인",
        why: "구글 소셜 로그인으로 회원가입 없이 바로 사용할 수 있게 했습니다. 첫 로그인 시 Firestore에 사용자 문서를 자동 생성합니다.",
        language: "javascript",
        code: `const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    // 첫 로그인 시 사용자 문서 생성
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp()
      });
    }
  } catch (e) {
    console.error('로그인 실패:', e.code);
  }
};

useEffect(() => {
  return onAuthStateChanged(auth, setUser);
}, []);`
      },
      {
        title: "편지 작성 에디터",
        why: "감성적인 편지 작성 경험을 위해 자동 저장 기능과 글자 수 카운팅을 구현했습니다. 500ms 디바운스로 불필요한 Firestore 쓰기를 줄였습니다.",
        language: "javascript",
        code: `const useDebouncedSave = (content, letterId, delay = 500) => {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!content || !letterId) return;

    setIsSaving(true);
    const timer = setTimeout(async () => {
      await updateDoc(doc(db, 'letters', letterId), {
        content,
        updatedAt: serverTimestamp()
      });
      setIsSaving(false);
    }, delay);

    return () => clearTimeout(timer); // 디바운스 클린업
  }, [content, letterId, delay]);

  return isSaving;
};`
      },
      {
        title: "Firestore 복합 인덱스 오류 해결",
        why: "where + orderBy 복합 쿼리는 Firestore에서 복합 인덱스가 필요합니다. 오류 메시지의 링크로 인덱스를 생성해 해결했습니다.",
        language: "javascript",
        code: `// 오류 발생 쿼리
const q = query(
  collection(db, 'letters'),
  where('uid', '==', user.uid),    // 조건 필터
  orderBy('createdAt', 'desc')     // 정렬 → 복합 인덱스 필요!
);

// 해결: Firebase 콘솔에서 복합 인덱스 생성
// Collection: letters
// Fields: uid (Ascending) + createdAt (Descending)
// 또는 오류 메시지의 링크 클릭 → 자동 인덱스 생성

// 인덱스 생성 후 정상 동작 확인
onSnapshot(q, (snap) => {
  console.log('letters:', snap.docs.length);
});`
      }
    ],
    troubleshooting: [
      {
        what: "편지 목록 조회 시 Firestore 인덱스 오류 발생",
        why: "where + orderBy 복합 쿼리는 Firestore 복합 인덱스 필요",
        how: "Firebase 콘솔에서 (uid, createdAt) 복합 인덱스 생성",
        result: "복합 쿼리 정상 동작"
      }
    ]
  }
];

export const skills = {
  frontend: ["React", "HTML5", "CSS3", "JavaScript", "i18next", "PWA"],
  backend: ["Python", "Django", "Node.js", "Express", "Firebase", "Supabase"],
  ai: ["Claude API", "Gemini API", "Prompt Engineering", "RAG"],
  tools: ["GitHub", "Figma", "Notion", "Kakao Maps API", "공공데이터 API", "jsPDF"],
  cert: ["리눅스마스터 2급", "프로그래밍기능사", "컴퓨터활용능력 2급", "정보처리기사 (필기 합격)", "정보처리산업기사 (필기 합격)", "ITQ 정보기술자격 파워포인트 B급", "전산응용건축제도기능사 (필기 합격)"]
};