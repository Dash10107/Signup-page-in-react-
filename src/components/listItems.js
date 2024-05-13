import  React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from 'axios';
import { IconButton, Paper, Snackbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AddIcon from '@mui/icons-material/Add';
const MainListItems = (props) => {
    const {setSymbol} = props
    const token = localStorage.getItem('token');
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user's watchlist from backend when component mounts
        fetchWatchlist();
      }, []);
    
      const fetchWatchlist = async () => {
        setLoading(true);
        try {
          // Make request to backend to fetch user's watchlist
          const response = await axios.get('https://hashing-backend.onrender.com/watchlists',{
            headers: {
              Authorization: token // Include token in the request header
            }
          });
          setWatchlist(response.data.symbols);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch watchlist');
          setLoading(false);
        }
      };

      const removeSymbol = async (symbol) => {
        setLoading(true);
        try {
          // Make request to backend to remove symbol from watchlist
          await axios.delete(`https://hashing-backend.onrender.com/watchlists/${symbol}`,{
            headers: {
              Authorization: token // Include token in the request header
            }
          });
          // Refresh watchlist after removing symbol
          fetchWatchlist();
        } catch (error) {
          setError('Failed to remove symbol from watchlist');
          setLoading(false);
        }
      };
  return (
    <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Watchlist" />
    </ListItemButton>
    {error && <Snackbar open={true} autoHideDuration={6000} message={error} />}
        {watchlist.map((symbol) => (
            <ListItemButton onClick={()=>{setSymbol(symbol)}}>
          <ListItemIcon>

        <LabelImportantIcon />
      </ListItemIcon>
      <ListItemText primary={symbol} />
      <IconButton onClick={(e) => {e.stopPropagation();e.preventDefault(); removeSymbol(symbol)}} aria-label="delete">
              {/* Add icon for removing symbol */}<DeleteIcon/>
            </IconButton>
    </ListItemButton>
        ))}
        <ListItemButton>
          <ListItemIcon>
      </ListItemIcon>
      <ListItemText  primary={<AddIcon/>}/>
     
    </ListItemButton>
  </React.Fragment>
  )
}

export default MainListItems