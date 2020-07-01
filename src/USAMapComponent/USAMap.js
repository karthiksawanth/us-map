import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import TooltipTable from '../TooltipTableComponent/ToolipTable';
import ToolTipTable from '../TooltipTableComponent/ToolipTable';
// import LinearGradient from './LinearGradient.js';


/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('../usatopo.json');

const PROJECTION_CONFIG = {
  scale: 200,
  center: [10,20] // always in [East Latitude, North Longitude]
  // scale: 350,
  // center: [78.9629, 22.5937]
};

// Red Variants
const COLOR_RANGE = [
  '#FEE8D6',
  '#FFDAB9',
  '#FFCC99',
  '#FFA54F',
  '#EE7621',
  '#FF6600',
  '#CD3700',
  '#F79862',
  'rgb(251,206,177)'
];

const DEFAULT_COLOR = 'orange';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: '#fff'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: '#fff'
  },
  pressed: {
    outline: 'none'
  }
};

// // will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: 'AL', state: 'Alabama', value: getRandomInt(), population: 1000000 },
    { id: 'AK', state: 'Alaska', value: getRandomInt(), population: getRandomInt() },
    { id: 'AZ', state: 'Arizon', value: getRandomInt(), population: 1000000 },
    { id: 'AR', state: 'Arkansas', value: getRandomInt(), population: 1000000 },
    { id: 'CA', state: 'Chhattisgarh', value: getRandomInt(), population: 1000000 },
    { id: 'CO', state: 'California', value: 21 },
    { id: 'CT', state: 'Colorado', value: 22 },
    { id: 'DE', state: 'Delaware', value: getRandomInt(), population: 1000000 },
    { id: 'DC', state: 'District of Columbia', value: 24 },
    { id: 'FL', state: 'Florida', value: 26 },
    { id: 'GA', state: 'Georgia', value: 27 },
    { id: 'HI', state: 'Hawaii', value: getRandomInt(), population: 1000000 },
    { id: 'ID', state: 'Idaho', value: getRandomInt(), population: 1000000 },
    { id: 'IL', state: 'Illinois', value: getRandomInt(), population: 1000000 },
    { id: 'IN', state: 'Indiana', value: getRandomInt(), population: 1000000 },
    { id: 'IA', state: 'Iowa', value: 59 },
    { id: 'KA', state: 'Kansas', value: getRandomInt(), population: 1000000 },
    { id: 'KY', state: 'Kentucky', value: 59 },
    { id: 'LA', state: 'Louisiana', value: 59 },
    { id: 'ME', state: 'Maine', value: getRandomInt(), population: 1000000 },
    { id: 'MD', state: 'Maryland', value: getRandomInt(), population: 1000000 },
    { id: 'MA', state: 'Massachusetts', value: getRandomInt(), population: 1000000 },
    { id: 'MI', state: 'Michigan', value: getRandomInt(), population: 1000000 },
    { id: 'MN', state: 'Minnesota', value: getRandomInt(), population: 1000000 },
    { id: 'MS', state: 'Mississippi', value: 14 },
    { id: 'MO', state: 'Missouri', value: getRandomInt(), population: 1000000 },
    { id: 'MT', state: 'Montana', value: 15 },
    { id: 'NE', state: 'Nebraska', value: 17 },
    { id: 'NV', state: 'Nevada', value: 17 },
    { id: 'NH', state: 'New Hampshire', value: getRandomInt(), population: 1000000 },
    { id: 'NJ', state: 'New Jersey', value: getRandomInt(), population: 1000000 },
    { id: 'NM', state: 'New Mexico', value: 19 },
    { id: 'NY', state: 'New York', value: 20 },
    { id: 'NC', state: 'North Carolina', value: 59 },
    { id: 'ND', state: 'North Dakota', value: 25 },
    { id: 'OH', state: 'Ohio', value: getRandomInt(), population: 1000000 },
    { id: 'OK', state: 'Oklahoma', value: getRandomInt(), population: 1000000 },
    { id: 'OR', state: 'Oregon', value: getRandomInt(), population: 1000000 },
    { id: 'PA', state: 'Pennsylvania', value: getRandomInt(), population: 1000000 },
    { id: 'RI', state: 'Rhode Island', value: getRandomInt(), population: 1000000 },
    { id: 'SC', state: 'South Carolina', value: getRandomInt(), population: 1000000 },
    { id: 'SD', state: 'South Dakota', value: 14 },
    { id: 'TN', state: 'Tennessee', value: getRandomInt(), population: 1000000 },
    { id: 'TX', state: 'Texas', value: 15 },
    { id: 'UT', state: 'Utah', value: 17 },
    { id: 'VT', state: 'Vermont', value: 17 },
    { id: 'VA', state: 'Virginia', value: getRandomInt(), population: 1000000 },
    { id: 'WA', state: 'Washington', value: getRandomInt(), population: 1000000 },
    { id: 'WV', state: 'West Virginia', value: 19 },
    { id: 'WI', state: 'Wisconsin', value: 20 },
    { id: 'WY', state: 'Wyoming', value: 59 },
    
  ];
};

function USAMap() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [population, setPopulation] =useState('')
 
  const [data, setData] = useState(getHeatMapData());

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setPopulation('Population' + ':' + geo.properties.population)
      console.log(geo.properties.name)
    //   setTooltipContent(geo.properties.name + ' : ' +current.value + '\n' + population + JSON.stringify(<TooltipTable />) );
    setTooltipContent(<ToolTipTable 
    stateName={geo.properties.name}/>)
     
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };


  return (
    <div className="map">
     
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={1400}
          height={700}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                // console.log(geo.id);
                const current = data.find(s => s.id === geo.id);
               
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
       
    </div>
  );
}

export default USAMap;
