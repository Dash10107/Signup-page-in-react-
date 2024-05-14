import { Divider, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer } from 'recharts';

const MoreInfo = ({symbol}) => {
    const [stockInfo,setStockInfo] = useState();
    useEffect(()=>{
        const fetchInfo = async()=>{
            const response = await axios.get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo");
            console.log('Response',response);
            setStockInfo(response.data);
        }   

        fetchInfo();
        
    },[symbol])

  return (
    <Paper sx={{ p: 2 }}>
    {/* Company Overview */}
    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          {stockInfo?.Name} ({stockInfo?.Symbol})
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {stockInfo?.Description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>

     {/* Financial Metrics */}
    {/* <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" component="h3">
          Market Capitalization
        </Typography>
        <Typography variant="body1">{stockInfo?.MarketCapitalization}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" component="h3">
          Price to Earnings Ratio (P/E)
        </Typography>
        <Typography variant="body1">{stockInfo?.PERatio}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" component="h3">
          Dividend Yield
        </Typography>
        <Typography variant="body1">{stockInfo?.DividendYield}</Typography>
      </Grid>
    </Grid> */}

    {/* Historical Performance Chart */}
    {/* <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" mt={3}>
          Historical Performance
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={300}>

        </ResponsiveContainer>
      </Grid>
    </Grid>  */}
  </Paper>
  )
}

export default MoreInfo
