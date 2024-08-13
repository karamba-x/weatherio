import SegmentedControl from "./SegmentedControl"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  {
    name: ' ',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2pm',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '3pm',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '4pm',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '5pm',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '6pm',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '7pm',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Overview = () => {
  return (
    <div className="h-full w-full flex flex-col p-6 gap-4">
      <SegmentedControl />
      <div className="w-full h-[300px] xl:h-full">
        <ResponsiveContainer width="100%" height="95%">
          {/* <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#0d9488" fill="url(#colorUv)" strokeWidth={4} />
        </AreaChart> */}
          <BarChart width={150} height={40} data={data}
            margin={{
              left: -15,
            }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill="url(#colorUv)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>


  )
}

export default Overview