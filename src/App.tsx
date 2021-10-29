//import DStorage from '../abis/DStorage.json'
import { Fragment, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Web3 from 'web3';
import { isJsxClosingFragment } from 'typescript';

//Declare IPFS

const App = () => {
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState('');

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();

    return () => {};
  }, []);

  const loadWeb3 = async () => {
    //Setting up Web3
  };

  const loadBlockchainData = async () => {
    //Declare Web3
    //Load account
    //Network ID
    //IF got connection, get data from contracts
    //Assign contract
    //Get files amount
    //Load files&sort by the newest
    //Else
    //alert Error
  };

  // Get file from user
  const captureFile = (event: any) => {};

  //Upload File
  const uploadFile = (description: any) => {
    //Add file to the IPFS
    //Check If error
    //Return error
    //Set state to loading
    //Assign value for the file without extension
    //Call smart contract uploadFile function
  };

  return (
    <Fragment>
      <Navbar account={account} />
      {isLoading ? (
        <div id='loader' className='text-center mt-5'>
          <p>Loading...</p>
        </div>
      ) : (
        <Main files={files} captureFile={captureFile} uploadFile={uploadFile} />
      )}
    </Fragment>
  );
};

export default App;
