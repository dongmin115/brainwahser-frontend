export default function Navbar() {
  return (
    <div className="flex w-full px-[10%] items-center h-[15%]">
      <ul className="flex-1 flex flex-row">
        <img
          alt="Brain Washer logo"
          src="https://i.ibb.co/Mk5gYZq/brainwasher-logo-text.png"
        />
      </ul>
      <ul className="flex-1 flex justify-center text-2xl gap-20">
        <li className=" text-gray-200">캐릭터 선택</li>
        <li className=" text-gray-200">저장한 음성 및 이미지</li>
      </ul>
      <div className="flex-1"></div>
      {/* 이 부분은 오른쪽 공간을 확보하기 위해 추가합니다. */}
    </div>
  );
}
