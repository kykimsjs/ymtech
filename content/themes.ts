// 시안별 색 테마. 블록 코드는 그대로 두고 디자인 토큰(CSS 변수) 값만 바꿔 끼운다.
// 모든 테마는 CI 색(블루 2117C #415BA6, 틸 315C #007684)을 바탕으로 하고, 중립색과 어두운 구간의 색감만 다르게 한다.

type Ramp = [string, string, string, string, string, string, string, string, string, string, string];
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const ramp = (name: string, values: Ramp) =>
  Object.fromEntries(values.map((value, i) => [`--color-${name}-${steps[i]}`, value]));

// CI 블루 2117C
const ciBlue: Ramp = ["#f0f3fa", "#e1e7f5", "#c3ceea", "#9aabd9", "#6d83c2", "#415ba6", "#354c90", "#2b3d76", "#22305c", "#192344", "#0e152c"];
// CI 틸 315C
const ciTeal: Ramp = ["#e8f5f6", "#cbe9ec", "#98d3d9", "#5db7c1", "#2797a5", "#007684", "#006370", "#00505b", "#003e46", "#002c33", "#001c21"];
// CI 틸을 한 단계 깊게 (흰 바탕 대비 6.6:1)
const deepTeal: Ramp = ["#e8f3f2", "#c9e4e2", "#95cac6", "#5eaaa6", "#2f8a87", "#00666b", "#00565b", "#00464a", "#06393c", "#0b2c2e", "#0a1f20"];
// CI 블루를 회색 쪽으로 누른 슬레이트 네이비
const slateNavy: Ramp = ["#eef1f6", "#dbe1ec", "#b6c1d6", "#8e9dbc", "#63759c", "#43557e", "#364568", "#2b3753", "#212a40", "#171e2e", "#0e131d"];

type Neutrals = {
  canvas: string;
  surface: string;
  surfaceStrong: string;
  line: string;
  lineStrong: string;
  ink: string;
  inkMuted: string;
  inkSubtle: string;
  graphite800: string;
  graphite900: string;
};

const neutrals = (n: Neutrals) => ({
  "--color-canvas": n.canvas,
  "--color-surface": n.surface,
  "--color-surface-strong": n.surfaceStrong,
  "--color-line": n.line,
  "--color-line-strong": n.lineStrong,
  "--color-ink": n.ink,
  "--color-ink-muted": n.inkMuted,
  "--color-ink-subtle": n.inkSubtle,
  "--color-graphite-800": n.graphite800,
  "--color-graphite-900": n.graphite900,
});

export type DraftTheme = {
  id: string;
  key: string;
  name: string;
  summary: string;
  headerTone: "light" | "dark";
  swatches: string[];
  vars: Record<string, string>;
};

export const themes: DraftTheme[] = [
  {
    id: "ci-blue",
    key: "A",
    name: "CI 블루",
    summary: "CI 메인 블루가 주인공입니다. 어두운 구간은 네이비, 중립색은 푸른 기가 도는 회색입니다. 매뉴얼에 가장 충실한 안입니다.",
    headerTone: "light",
    swatches: ["#415ba6", "#007684", "#101a35", "#f3f5f9"],
    vars: {
      ...ramp("brand", ciBlue),
      ...ramp("eco", ciTeal),
      ...neutrals({
        canvas: "#ffffff",
        surface: "#f3f5f9",
        surfaceStrong: "#e8ecf3",
        line: "#dfe4ec",
        lineStrong: "#c3cad6",
        ink: "#101a35",
        inkMuted: "#454f66",
        inkSubtle: "#5d6780",
        graphite800: "#1b2647",
        graphite900: "#131c38",
      }),
    },
  },
  {
    id: "teal-dark",
    key: "B",
    name: "다크 틸",
    summary: "아이오크롭스처럼 거의 검정에 가까운 바탕이 넓고, 포인트는 CI 틸입니다. 관제 장비 같은 기술적인 인상을 줍니다.",
    headerTone: "dark",
    swatches: ["#007684", "#415ba6", "#111314", "#f4f5f5"],
    vars: {
      ...ramp("brand", ciTeal),
      ...ramp("eco", ciBlue),
      ...neutrals({
        canvas: "#ffffff",
        surface: "#f4f5f5",
        surfaceStrong: "#e9ebeb",
        line: "#e1e4e4",
        lineStrong: "#c6cbcb",
        ink: "#111314",
        inkMuted: "#454b4d",
        inkSubtle: "#5f6668",
        graphite800: "#1e2223",
        graphite900: "#161919",
      }),
    },
  },
  {
    id: "mono",
    key: "C",
    name: "모노 + 블루",
    summary: "여의시스템·지노시스처럼 흰 바탕과 회색, 검정이 대부분이고 블루는 버튼과 숫자에만 씁니다. 색을 아껴 정보가 먼저 보입니다.",
    headerTone: "light",
    swatches: ["#111111", "#415ba6", "#f4f4f4", "#ffffff"],
    vars: {
      ...ramp("brand", ciBlue),
      ...ramp("eco", slateNavy),
      ...neutrals({
        canvas: "#ffffff",
        surface: "#f4f4f4",
        surfaceStrong: "#ebebeb",
        line: "#e2e2e2",
        lineStrong: "#c7c7c7",
        ink: "#111111",
        inkMuted: "#474747",
        inkSubtle: "#5e5e5e",
        graphite800: "#262626",
        graphite900: "#1b1b1b",
      }),
    },
  },
  {
    id: "warm-farm",
    key: "D",
    name: "웜 스마트팜",
    summary: "종이처럼 따뜻한 흰색과 베이지 회색 위에 깊은 틸을 씁니다. 어두운 구간은 짙은 청록입니다. 농업 현장에 가까운 색감입니다.",
    headerTone: "light",
    swatches: ["#00666b", "#415ba6", "#0f2627", "#f3efe7"],
    vars: {
      ...ramp("brand", deepTeal),
      ...ramp("eco", ciBlue),
      ...neutrals({
        canvas: "#fbf9f5",
        surface: "#f3efe7",
        surfaceStrong: "#e9e3d8",
        line: "#e4ddd0",
        lineStrong: "#c9bfae",
        ink: "#1f1c17",
        inkMuted: "#4c463d",
        inkSubtle: "#625b50",
        graphite800: "#163334",
        graphite900: "#0f2627",
      }),
    },
  },
];

export const getTheme = (id: string) => themes.find((theme) => theme.id === id);
