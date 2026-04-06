import React from 'react'
import TransactionTable from '../components/TransactionTable'

const Transactions = ({role}) => {
  return (
    <div>
        <TransactionTable role={role}/>
    </div>
  )
}

export default Transactions