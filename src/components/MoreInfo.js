import { Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


const MoreInfo = ({symbol,stockInfo}) => {


  return (
    <Paper sx={{ p: 2 }}>
    {stockInfo ? (
    <>    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
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
    </>
    ):( <Typography variant="body1">Please Select Any Stock...</Typography>)}


  </Paper>
  )
}

export default MoreInfo
