import { Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StockInfo = ({symbol,stockInfo}) => {


  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
    {stockInfo ? (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Stock Information
        </Typography>
        <Typography variant="subtitle1">Symbol: {stockInfo.Symbol}</Typography>
          {/* <Typography variant="subtitle1">Description: {stockInfo.Description}</Typography> */}
          <Typography variant="subtitle1">Sector: {stockInfo.Sector}</Typography>
          <Typography variant="subtitle1">Industry: {stockInfo.Industry}</Typography>
          <Typography variant="subtitle1">Market Capitalization: {stockInfo.MarketCapitalization}</Typography>
          <Typography variant="subtitle1">Trailing PE Ratio: {stockInfo.TrailingPE}</Typography>
          <Typography variant="subtitle1">Forward PE Ratio: {stockInfo.ForwardPE}</Typography>
      </React.Fragment>
    ) : (
      <Typography variant="body1">Please Select Any Stock...</Typography>
    )}
  </Paper>
  )
}

export default StockInfo
