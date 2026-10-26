import { Fragment } from "react";

// 짧은 핵심 문구를 의미 단위로 나눌 때 쓴다. 문구 안의 줄바꿈 문자는 데스크톱(lg)에서만 줄을 나누고,
// 모바일·태블릿에서는 띄어쓰기로 바뀌어 자연스럽게 흐른다. 긴 본문에는 쓰지 않는다.
export function BreakText({ text }: { text: string }) {
  const parts = text.split("\n");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          {" "}
          <br className="hidden lg:inline" />
        </>
      )}
    </Fragment>
  ));
}
