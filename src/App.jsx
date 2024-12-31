import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Master from './layout/Master';
import Dashboard from './pages/Dashboard/Dashboard';
import Transaction from './pages/transaction/Transaction';
import Bill_payment from './pages/Bill_payment/Bill_payment';
import FundWallet from './pages/fund_wallet/FundWallet';
import VirtualCard from './pages/virtual_card/VirtualCard';
import Profile from './pages/profile/Profile';
import Security from './pages/Security/Security';
import HelpCenter from './pages/helpCenter/HelpCenter';
import Policy from './pages/policy/Policy';
import Betting from './pages/Betting_account/Betting';
import EnterInfo from './pages/EnterInfo/EnterInfo';
import Nodification from './pages/nodifications/Nodification';
import TransactionRecipt from './pages/transaction/TransactionRecipt';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Master />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='transactions' element={<Transaction />} />
          <Route path='bill/payment' element={<Bill_payment />} />
          <Route path='fund/wallet' element={<FundWallet />} />
          <Route path='virtual/card' element={<VirtualCard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='security' element={<Security />} />
          <Route path='help-center' element={<HelpCenter />} />
          <Route path='privacy-policy' element={<Policy />} />
          <Route path='nodifications' element={<Nodification />} />


          {/* not in navbar  */}
          <Route path='betting-account' element={<Betting />} />
          <Route path='betting/EnterInfo' element={<EnterInfo />} />
          <Route path='transactions/receipt' element={<TransactionRecipt />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
