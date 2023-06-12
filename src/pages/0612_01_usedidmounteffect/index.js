/* 
    제목 : useEffect 첫 렌더링 방지하는 커스텀 훅 구현(useDidMountEffect)
    사용 기술 및 라이브러리 : react
*/
import { useEffect, useRef, useState } from "react";

// useDidMountEffect
export const useDidMountEffect = (doAction, doState) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) doAction();
    else didMount.current = true;
  }, doState);
};

export default function index() {
  const [data, setData] = useState(0);
  // useDidMountEffect 호출
  useDidMountEffect(() => {
    console.log("test");
  }, [data]);

  return (
    <>
      <button onClick={() => setData((prev) => prev + 1)}></button>
    </>
  );
}
