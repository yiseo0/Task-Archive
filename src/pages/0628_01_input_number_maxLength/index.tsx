/* 
    제목 : input[type="number"] maxLength 지정하기
    작업 내용 : 모바일에서 input[type="number"] 입력 시 숫자 키패드로 나오기 때문에 모바일 작업 시 사용하는 것을 권장한다. 
    maxLength 속성은 input[type="text"]일 때만 지정 가능하여, input[type="number"]일 때 maxLength 지정 가능하도록 만들기 
*/

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface IInputProps {
  type?: string;
  maxLength?: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
export const Input = (props: IInputProps) => {
  const maxLength = props.maxLength || undefined;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (maxLength && value.length > maxLength) {
      // value = value.slice(0, maxLength);
      return;
    }
    props.setValue(value);
  };
  return (
    <input
      type={props.type}
      maxLength={maxLength}
      onChange={onChange}
      value={props.value}
    />
  );
};

export default function index() {
  const [stateTextValue, setTextValue] = useState("");
  const [stateNumberValue, setNumberValue] = useState("");

  return (
    <div>
      <Input maxLength={5} value={stateTextValue} setValue={setTextValue} />
      <Input
        type="number"
        maxLength={5}
        value={stateNumberValue}
        setValue={setNumberValue}
      />
    </div>
  );
}
