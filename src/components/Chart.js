import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import axios from "axios";
import { Button, Grid, Zoom } from "@mui/material";

const intervals = [
  { label: "1 min", value: "1min" },
  { label: "5 min", value: "5min" },
  { label: "15 min", value: "15min" },
  { label: "30 min", value: "30min" },
  { label: "60 min", value: "60min" },
];

export default function Chart({ symbol }) {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("5min");

  const fetchData = async () => {
    if (symbol === "") {
      return;
    }

    // const key = "N1Q5R8UFQVH2VL4P";
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
    );
    console.log("Response", response);

    const timeSeriesData = response.data["Time Series (5min)"];
    // const timeSeriesData = tempData;
    const formattedData = Object.keys(timeSeriesData).map((timestamp) => {
      const dataPoint = timeSeriesData[timestamp];
      const open = parseFloat(dataPoint["1. open"]);
      const close = parseFloat(dataPoint["4. close"]);
      const high = parseFloat(dataPoint["2. high"]);
      const low = parseFloat(dataPoint["3. low"]);

      // Calculate additional data points
      const percentageChange = ((close - open) / open) * 100;
      const averagePrice = (high + low) / 2;

      return {
        timestamp: new Date(timestamp),
        open,
        close,
        high,
        low,
        percentageChange,
        averagePrice,
      };
    });

    console.log("formattedData", formattedData);
    setChartData(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [selectedInterval]);

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    
  };

  return (
    <React.Fragment>
      <Title>{symbol} </Title>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginBottom="1vh"
        spacing={1}
      >
        {intervals.map(({ label, value }) => (
          <Grid item key={value}>
            <Button
              variant={selectedInterval === value ? "contained" : "outlined"}
              onClick={() => handleIntervalChange(value)}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              domain={["auto", "auto"]}
              padding={{ top: 10, bottom: 10 }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="percentageChange"
              stroke="#8884d8"
              name="Percentage Change"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="averagePrice"
              stroke="#82ca9d"
              name="Average Price"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="open"
              stroke="#ff0000"
              name="Open"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#00ff00"
              name="Close"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#0000ff"
              name="High"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#ffff00"
              name="Low"
              dot={false}
            />
            {/* <Zoom />                 */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}
