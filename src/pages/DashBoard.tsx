import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { fetchCharacterDashBoard, fetchDashBoard } from "../api/characters.ts";
import SpicyDial from "../components/Dial.tsx";

interface MenuProps {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
  selectedCharacter?: string;
  setSelectedCharacter: (selectedCharacter: string) => void;
}

interface Character {
  name: string;
  topic_frequency: {
    [key: string]: number;
  };
  spicy_frequency: {
    [key: string]: number;
  };
  chat_count: number;
}

interface CategoryData {
  name: string;
  [key: string]: string | number;
}

interface TopicFrequency {
  [key: string]: number;
}

interface Info {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface Image {
  id: number;
  url: string;
  download: number;
}

interface Voice {
  id: number;
  content: string;
  url: string;
  download: number;
}

interface TopicFrequency {
  취업: number;
  학업: number;
  인간관계: number;
  연애: number;
}

interface CharacterDetail {
  average_spice_level: number;
  info: Info;
  top_images: Image[];
  top_voices: Voice[];
  topic_frequency: TopicFrequency;
}

interface SpicyData {
  subject: string;
  [key: string]: string | number;
}

interface PopularData {
  name: string;
  total: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

const SideMenu = ({
  selectedMenu,
  setSelectedMenu,
  setSelectedCharacter,
}: MenuProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-glass backdrop-blur rounded-xl shadow-2xl sm:basis-1/4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 p-[1%] gap-4 text-gray-50">
      <img
        alt="Brain Washer logo"
        src="https://i.ibb.co/Mk5gYZq/brainwasher-logo-text.png"
        className="w-[80%]"
      />
      <p className="2xl:text-xl ml-[3%] mt-[10%] font-bold">DashBoard</p>

      <div
        className={`collapse hover:glass hover:bg-glass hover:backdrop-filter hover:backdrop-blur transition-all duration-300 ease-linear rounded-lg border-none
        ${selectedMenu === "Overview" ? "glass" : ""}`}
        onClick={() => {
          setSelectedMenu("Overview");
        }}
      >
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          <div className="flex flex-row gap-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 lg:size-6 xl:size-7 2xl:size-8"
            >
              <path
                d="M12.5 14.5C12.5 13.3954 13.3954 12.5 14.5 12.5H23C24.1046 12.5 25 13.3954 25 14.5V23C25 24.1046 24.1046 25 23 25H14.5C13.3954 25 12.5 24.1046 12.5 23V14.5Z"
                fill="white"
              />
              <path
                d="M35 14.5C35 13.3954 35.8954 12.5 37 12.5H45.5C46.6046 12.5 47.5 13.3954 47.5 14.5V23C47.5 24.1046 46.6046 25 45.5 25H37C35.8954 25 35 24.1046 35 23V14.5Z"
                fill="white"
              />
              <path
                d="M12.5 37C12.5 35.8954 13.3954 35 14.5 35H23C24.1046 35 25 35.8954 25 37V45.5C25 46.6046 24.1046 47.5 23 47.5H14.5C13.3954 47.5 12.5 46.6046 12.5 45.5V37Z"
                fill="white"
              />
              <path
                d="M35 37C35 35.8954 35.8954 35 37 35H45.5C46.6046 35 47.5 35.8954 47.5 37V45.5C47.5 46.6046 46.6046 47.5 45.5 47.5H37C35.8954 47.5 35 46.6046 35 45.5V37Z"
                fill="white"
              />
              <path
                d="M12.5 14.5C12.5 13.3954 13.3954 12.5 14.5 12.5H23C24.1046 12.5 25 13.3954 25 14.5V23C25 24.1046 24.1046 25 23 25H14.5C13.3954 25 12.5 24.1046 12.5 23V14.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 14.5C35 13.3954 35.8954 12.5 37 12.5H45.5C46.6046 12.5 47.5 13.3954 47.5 14.5V23C47.5 24.1046 46.6046 25 45.5 25H37C35.8954 25 35 24.1046 35 23V14.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 37C12.5 35.8954 13.3954 35 14.5 35H23C24.1046 35 25 35.8954 25 37V45.5C25 46.6046 24.1046 47.5 23 47.5H14.5C13.3954 47.5 12.5 46.6046 12.5 45.5V37Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 37C35 35.8954 35.8954 35 37 35H45.5C46.6046 35 47.5 35.8954 47.5 37V45.5C47.5 46.6046 46.6046 47.5 45.5 47.5H37C35.8954 47.5 35 46.6046 35 45.5V37Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="my-auto text-base lg:text-base xl:text-lg 2xl:text-lg">
              Overview
            </p>
          </div>
        </div>
      </div>
      <div
        className={`collapse collapse-arrow hover:glass hover:bg-glass hover:backdrop-filter hover:backdrop-blur transition-all duration-300 ease-linear rounded-lg border-none
        ${selectedMenu === "Character" ? "glass" : ""}`}
      >
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          <div className="flex flex-row gap-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 lg:size-6 xl:size-7 2xl:size-8"
            >
              <path
                d="M31.6667 21.6667C31.6667 29.0305 25.6971 35 18.3333 35C10.9695 35 5 29.0305 5 21.6667C5 14.3029 10.9695 8.33333 18.3333 8.33333M18.3333 19.6667V6C18.3333 5.44771 18.7821 4.99688 19.3335 5.02951C27.7417 5.52716 34.4728 12.2583 34.9705 20.6665C35.0031 21.2179 34.5523 21.6667 34 21.6667H20.3333C19.2288 21.6667 18.3333 20.7712 18.3333 19.6667Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="my-auto text-base lg:text-base xl:text-lg 2xl:text-lg">
              캐릭터별 통계
            </p>
          </div>
        </div>

        <div className="collapse-content ml-[5%] space-y-2 text-lg">
          <p
            className="w-full cursor-pointer p-2 rounded-lg   hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Andrew");
              setSelectedMenu("Character");
            }}
          >
            Andrew
          </p>
          <p
            className="w-full cursor-pointer p-2 rounded-lg   hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Hyunwoojin");
              setSelectedMenu("Character");
            }}
          >
            현우진
          </p>
          <p
            className="w-full cursor-pointer p-2 rounded-lg  hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Jeonhangil");
              setSelectedMenu("Character");
            }}
          >
            전한길
          </p>
        </div>
      </div>
      <div
        className="btn bg-transparent border-none mt-auto ml-auto hover:bg-blue-500"
        onClick={() => navigate("/")}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.7083 35.8333H35.625C36.7296 35.8333 37.625 34.9378 37.625 33.8333V9.16659C37.625 8.06202 36.7296 7.16659 35.625 7.16659H19.7083M5.375 21.4999H25.0833M25.0833 21.4999L19.7083 26.8749M25.0833 21.4999L19.7083 16.1249"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const OverView = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDashBoard(); // 비동기 함수가 완료될 때까지

      setCategoryData(response.data.characters);
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded">
          <p className="label">{`채팅방 총합: ${payload[0].value}`}</p>
          <p className="intro"></p>
        </div>
      );
    }

    return null;
  };

  // CategoryChart 에 사용할 데이터를 가공하는 함수
  const processCategoryData = (data: Character[]): CategoryData[] => {
    if (!data) return [];
    const categories = ["취업", "학업", "인간관계", "연애"];
    const result = categories.map((category) => {
      const entry: CategoryData = { name: category };
      data.forEach((character) => {
        entry[character.name] = character.topic_frequency[category];
      });
      return entry;
    });

    return result;
  };

  // SpicyChart 에 사용할 데이터를 가공하는 함수
  const processSpicyData = (data: Character[]): SpicyData[] => {
    if (!data) return [];
    const categories = ["0-20", "20-40", "40-60", "60-80", "80-100"];
    const result = categories.map((category) => {
      const entry: SpicyData = { subject: category };
      data.forEach((character) => {
        entry[character.name] = character.spicy_frequency[category];
      });
      return entry;
    });
    return result;
  };

  // PopularChart 에 사용할 데이터를 가공하는 함수
  const processPopularData = (data: Character[]): PopularData[] => {
    return data.map((character) => {
      return {
        name: character.name,
        total: character.chat_count,
      };
    });
  };

  const CategoryChart = ({ data }: { data: CategoryData[] }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={750}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color취업" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color학업" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color인간관계" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color연애" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "#cccccc" }}
            axisLine={{ stroke: "#cccccc" }}
          />
          <YAxis tick={{ fill: "#cccccc" }} axisLine={{ stroke: "#cccccc" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Andrew"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#color취업)"
          />
          <Area
            type="monotone"
            dataKey="Hyunwoojin"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#color학업)"
          />
          <Area
            type="monotone"
            dataKey="Jeonhangil"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#color인간관계)"
          />
          <Area
            type="monotone"
            dataKey="연애"
            stroke="#ff7300"
            fillOpacity={1}
            fill="url(#color연애)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const PopularChart = ({ data }: { data: PopularData[] }) => {
    const colors = ["#C93988", "#17B069", "#8979FF"];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "#cccccc" }}
            axisLine={{ stroke: "#cccccc" }}
          />
          <YAxis tick={{ fill: "#cccccc" }} axisLine={{ stroke: "#cccccc" }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(21,21,21,0.35)" }}
          />
          <Bar dataKey="total" barSize={60}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                fillOpacity={0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const SpicyChart = ({ data }: { data: SpicyData[] }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 30]}
            tick={{ fill: "white" }}
          />
          <Radar
            name="Andrew"
            dataKey="Andrew"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Hyunwoojin"
            dataKey="Hyunwoojin"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Radar
            name="Jeonhangil"
            dataKey="Jeonhangil"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col basis-5/6 gap-8 h-full">
  <div className="flex flex-col w-full h-full gap-4 basis-1/2">
    <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50">카테고리</p>
    <div className="h-full bg-glass backdrop-blur rounded-xl shadow-2xl py-[1%]">
      <CategoryChart data={processCategoryData(categoryData)} />
    </div>
  </div>
  <div className="flex flex-col sm:flex-row basis-1/2 gap-8">
  <div className="flex flex-col w-full h-full gap-4 sm:basis-1/2">
      <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50">인기순위</p>
      <div className="h-full sm:min-h-[300px] bg-glass backdrop-blur rounded-xl shadow-2xl py-[5%]">
        <PopularChart data={processPopularData(categoryData)} />
      </div>
    </div>
    <div className="flex flex-col w-full h-full gap-4 sm:basis-1/2">
      <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50">매운맛 빈도</p>
      <div className="h-full sm:min-h-[300px] bg-glass backdrop-blur rounded-xl shadow-2xl py-[5%]">
        <SpicyChart data={processSpicyData(categoryData)} />
      </div>
    </div>
  </div>
</div>


  );
};

const CharacterChart = ({ character }: { character: string }) => {
  const [data, setData] = useState<CharacterDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCharacterDashBoard(character);
      setData(response.data);
    };

    fetchData();
  }, [character]);

  const CharacterCard = ({ data }: { data: Info }) => {
    return (
      <div className="flex flex-row justify-start w-full h-full items-center gap-2 lg:gap-2 xl:gap-6 2xl:gap-10 p-[10%]">
        <img
          className="rounded-full size-24 lg:size-24 xl:size-28 2xl:size-32"
          src={data.image}
        />
        <div className="flex flex-col gap-1 2xl:gap-2">
          <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#eeeeee] font-bold">
            {data.name}
          </p>
          <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-[#c1c1c1]">
            {data.description}
          </p>
        </div>
      </div>
    );
  };

  const PieCategoryChart = ({ data }: { data: TopicFrequency }) => {
    const COLORS = ["#17B069", "#475BA1", "#4F378B", "#C93988"];
    const chartData: CategoryData[] = data
      ? Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }))
      : [];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }: PieLabelRenderProps & { index: number }) => {
      const radius =
        Number(innerRadius) +
          (Number(outerRadius) - Number(innerRadius)) * 0.5 || 0;
      const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN) || 0;
      const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN) || 0;
      const displayPercent =
        percent !== undefined ? (percent * 100).toFixed(0) : "0";

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > Number(cx) ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${chartData[index].name} - ${displayPercent}%`}
        </text>
      );
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={800}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="70%"
            stroke="none"
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const ImageList = ({ data }: { data: Image[] }) => {
    const downloadImage = (url: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.substring(url.lastIndexOf("/") + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const navigate = useNavigate();

    return (
      <div className="w-full h-full px-[4%] py-[2%] flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50">
            생성 이미지
          </p>
          <button
            className="btn bg-transparent border-none my-auto text-blue-500 hover:bg-transparent cursor-pointer"
            onClick={() => navigate("/list_board")}
          >
            전체보기
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 h-full mx-auto items-center">
          {data.map((item) => (
            <div key={item.id} className="relative group h-fit">
              <img
                src={item.url}
                className="size-28 lg:size-28 xl:size-36 object-cover rounded-xl"
              />
              <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-evenly text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-xl duration-200 ease-linear">
                <div className="flex flex-row items-center gap-2">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 8.75L15 3.75M15 3.75L10 8.75M15 3.75L15 20M25 16.25V23C25 24.1046 24.1046 25 23 25H7C5.89543 25 5 24.1046 5 23V16.25"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-lg">{item.download}</p>
                </div>
                <button
                  onClick={() => downloadImage(item.url)}
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                >
                  다운로드
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TtsList = ({ data }: { data: Voice[] }) => {
    const playAudio = (audioUrl: string) => {
      const audio = new Audio(audioUrl);
      audio.play();
    };

    const downloadAudio = (audioUrl: string, voiceId: number) => {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `voice_${voiceId}.mp3`; // 다운로드할 파일명 지정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="w-full max-h-full px-[4%] py-[4%] flex flex-col gap-4">
        <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50">어록</p>
        <ul className="gap-2 flex flex-col w-full h-full">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex flex-row w-full justify-between gap-2"
            >
              <p className="truncate text-[#cccccc] text-xl w-[20rem] lg:w-[25rem] xl:w-[30rem] 2xl:w-[40rem]">
                {item.content}
              </p>

              <svg
                className="cursor-pointer transition-all duration-200 ease-linear hover:scale-125"
                width="40"
                height="40"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => downloadAudio(item.url, item.id)}
              >
                <g filter="url(#filter0_d_924_519)">
                  <circle
                    cx="22.5"
                    cy="18.5"
                    r="18.5"
                    fill="url(#paint0_linear_924_519)"
                  />
                </g>
                <path
                  d="M28.4168 17.9999L23.0002 23.4166M23.0002 23.4166L17.5835 17.9999M23.0002 23.4166V9.33325M28.4168 26.6666H17.5835"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_924_519"
                    x="0"
                    y="0"
                    width="45"
                    height="45"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_924_519"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_924_519"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_924_519"
                    x1="22.5"
                    y1="0"
                    x2="22.5"
                    y2="37"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#631C43" />
                    <stop offset="1" stopColor="#C93988" />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                className="cursor-pointer transition-all duration-200 ease-linear hover:scale-125"
                width="35"
                height="35"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => playAudio(item.url)}
              >
                <circle
                  cx="13"
                  cy="13"
                  r="13"
                  fill="url(#paint0_linear_779_384)"
                />
                <path
                  d="M10.6742 8.20118C9.89647 7.74368 8.91602 8.30444 8.91602 9.20677V16.7938C8.91602 17.6961 9.89647 18.2569 10.6742 17.7994L17.1232 14.0059C17.89 13.5548 17.89 12.4458 17.1232 11.9947L10.6742 8.20118Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_779_384"
                    x1="13"
                    y1="0"
                    x2="13"
                    y2="26"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#631C43" />
                    <stop offset="1" stopColor="#C93988" />
                  </linearGradient>
                </defs>
              </svg>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {}, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col h-full basis-5/6 gap-8">
      <div className="basis-[40%]  flex flex-row gap-8 h-1/2 overflow-hidden">
        <div className="basis-[35%] bg-glass backdrop-blur rounded-xl shadow-2xl">
          <CharacterCard data={data.info} />
        </div>
        <div className="basis-[65%] bg-glass backdrop-blur rounded-xl shadow-2xl">
          <ImageList data={data.top_images} />
        </div>
      </div>
      <div className="flex flex-row basis-[60%] gap-8">
        <div className="basis-3/5 bg-glass backdrop-blur rounded-xl shadow-2xl py-[1.5%] px-[2%] flex flex-col gap-4 max-h-full">
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-50 basis-1/10">
            인기 카테고리
          </p>
          <PieCategoryChart data={data.topic_frequency} />
        </div>
        <div className="basis-2/5 flex flex-col gap-8 h-full">
          <div className="bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/2 w-full">
            <TtsList data={data.top_voices} />
          </div>
          <div className="bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/2">
            <SpicyDial data={data.average_spice_level} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const menu = ["Overview", "Character"];
  const [selectedMenu, setSelectedMenu] = useState<string>(menu[0]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-[3%] py-[2%]">
      {/* 배경이미지 */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/W5LP6yn/Brain-Wahser.png)] bg-cover bg-fixed z-10 transform scale-y-[-1]" />
      {/* 대시보드 */}
      <div className="max-w-full h-full w-full flex flex-row z-10 rounded-lg gap-8">
        {/* 메뉴 */}
        <SideMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedCharacter={setSelectedCharacter}
        />
        {/* 오른쪽 구간 */}
        {selectedMenu === menu[0] && <OverView />}
        {selectedMenu === menu[1] && (
          <CharacterChart character={selectedCharacter} />
        )}
      </div>
    </div>
  );
};

export default DashBoard;
