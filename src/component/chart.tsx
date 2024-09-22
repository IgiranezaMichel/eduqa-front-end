import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { RegistrationDao } from '../controller/registrationdao';
import { Role } from '../enum/role';
export default function RegistrationStatusPieChart(prop:{semesterId:string, role:Role}) {
  const [data,setData] = useState<any>([])
  useEffect(() => {
    new RegistrationDao()
    .getRegisteredUserForASemesterCount(prop.semesterId,prop.role).then((data) => {
      setData((data.data));      
    })
  },[prop.semesterId,prop.role])

  const sizing = {
    margin: { right: 5 },
    width: 100,
    height: 100,
    legend: { hidden: true },
  };

  const TOTAL = data.map((item:any) => item.value).reduce((a:any, b:any) => a + b, 0);
  
const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};
  return (
    <PieChart
      series={[
        {
          outerRadius: 40,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
