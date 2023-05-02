import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { validate } from 'bitcoin-address-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import {
  Grid,
  Box,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  Tooltip,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Paper
} from '@mui/material';

import SpinnerImage from 'assets/images/loading.gif';
import {
  getEURRate,
  getTableData,
  getUSDRate,
  searchAddress,
  searchTransaction,
  subscribe,
  unsubscribe
} from 'actions/btc';
import { setAlert } from 'actions/alert';
import GlobalEnv from 'configs/GlobalEnv';
import MyEnvConfig from 'configs/MyEnvConfig';
import { convertBTC, convertUSD, convertEUR } from 'actions/convertCurrency';
import { Typography } from 'antd';

const baseurl = GlobalEnv.isDebug
  ? `${MyEnvConfig.baseurl.dev}`
  : `${MyEnvConfig.baseurl.prod}`;
const socket = io(`${baseurl}`);

const Dashboard = () => {
  let addressData = [];
  let transactionData = [];
  let {
    eurRate,
    usdRate,
    gAddress,
    gTransaction,
    sAddress,
    sTransaction,
    loading
  } = useSelector((state) => state.btc);
  const [wTable, setWTable] = useState(0);
  const [hash, setHash] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const dispatch = useDispatch();
  const getTopData = () => {
    setWTable(0);
    setHash('');
    dispatch(getTableData());
  };
  useEffect(() => {
    socket.on('transaction-confirmed', (data) => {
      setAlert(
        `Transaction ${data?.txHash} of ${data?.hash} confirmed ${data?.confirmations} times.`,
        'success'
      );
    });
  }, []);
  useEffect(() => {
    dispatch(getUSDRate());
    dispatch(getEURRate());
    dispatch(getTableData());
  }, [dispatch]);
  const searchData = () => {
    if (hash === '') {
      setAlert('Please input Hash Value', 'error');
    } else {
      if (validate(hash)) {
        setWTable(1);
        dispatch(searchAddress(hash));
      } else {
        setWTable(2);
        dispatch(searchTransaction(hash));
      }
    }
  };
  if (wTable === 0) {
    addressData = gAddress;
    transactionData = gTransaction;
  } else if (wTable === 1) {
    addressData = sAddress;
    transactionData = [];
  } else if (wTable === 2) {
    addressData = [];
    transactionData = sTransaction;
  }

  const _renderSpinner = () => {
    return (
      <div className="loader-container">
        <span className="loader">zeply</span>
      </div>
    );
  };

  const _renderTable = () => {
    return (
      <>
        <Box className="table-border">
          <TableContainer component={Paper} style={{ padding: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>Confirmed Transaction</TableCell>
                  <TableCell>Received</TableCell>
                  <TableCell>Spent</TableCell>
                  <TableCell>Unspent</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addressData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.address}
                    </TableCell>
                    <TableCell>{row.confirmed_txs}</TableCell>
                    <TableCell>
                      {currency === 'BTC'
                        ? convertBTC(row.total_received)
                        : currency === 'USD'
                        ? convertUSD(row.total_received, usdRate)
                        : convertEUR(row.total_received, eurRate)}
                    </TableCell>
                    <TableCell>
                      {currency === 'BTC'
                        ? convertBTC(row.total_spent)
                        : currency === 'USD'
                        ? convertUSD(row.total_spent, usdRate)
                        : convertEUR(row.total_spent, eurRate)}
                    </TableCell>
                    <TableCell>
                      {currency === 'BTC'
                        ? convertBTC(row.total_unspent)
                        : currency === 'USD'
                        ? convertUSD(row.total_unspent, usdRate)
                        : convertEUR(row.total_unspent, eurRate)}
                    </TableCell>
                    <TableCell>
                      {currency === 'BTC'
                        ? convertBTC(row.current_balance)
                        : currency === 'USD'
                        ? convertUSD(row.current_balance, usdRate)
                        : convertEUR(row.current_balance, eurRate)}
                    </TableCell>
                    <TableCell>
                      {row.isSubscribed ? (
                        <Tooltip arrow title="UNSUBSCRIBE">
                          <Button
                            className="account-no-btn"
                            onClick={() => dispatch(unsubscribe(row.address))}
                          >
                            <FontAwesomeIcon icon={faCircleXmark} />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip arrow title="SUBSCRIBE">
                          <Button
                            className="account-yes-btn"
                            onClick={() => dispatch(subscribe(row.address))}
                          >
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </Button>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="table-border">
          <TableContainer component={Paper} style={{ padding: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Hash</TableCell>
                  <TableCell>Received Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Size (in bytes)</TableCell>
                  <TableCell>Number of Confirmations</TableCell>
                  <TableCell>Input</TableCell>
                  <TableCell>Output</TableCell>
                  <TableCell>Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>{row.hash}</TableCell>
                    <TableCell>{row.received_time}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell>{row.confirmations}</TableCell>
                    <TableCell>{row.total_in}</TableCell>
                    <TableCell>{row.total_out}</TableCell>
                    <TableCell>
                      {currency === 'BTC'
                        ? convertBTC(row.total_fees)
                        : currency === 'USD'
                        ? convertUSD(row.total_fees, usdRate)
                        : convertEUR(row.total_fees, eurRate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <OutlinedInput
            fullWidth
            value={hash}
            name="hash"
            onChange={(e) => setHash(e.target.value)}
            endAdornment={
              <Button className="search-btn" onClick={searchData}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Select
            fullWidth
            value={currency}
            name="currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={'BTC'}>BTC</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Button className="account-no-btn" onClick={() => getTopData()}>
            Get Top Searched
          </Button>
        </Grid>
      </Grid>
      {loading ? _renderSpinner() : _renderTable()}
    </>
  );
};

export default Dashboard;
