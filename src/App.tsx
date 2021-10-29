import { Fragment, useEffect, useState, VFC } from 'react';
import Navbar from './components/Navbar';
import Main, { File } from './components/Main';
import Loading from './components/Loading';
import DDrive from './abis/DDrive.json';
import useWeb3 from './hooks/web3Hook';
import { Contract } from 'web3-eth-contract';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const App: VFC = () => {
  const { isLoading, accounts, isWeb3, web3 } = useWeb3();

  const [activeAccount, setActiveAccount] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (isWeb3 && web3) {
      (async () => {
        setActiveAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = (DDrive.networks as any)[networkId!];

        if (networkData) {
          // Assign contract
          const dDrive = new web3.eth.Contract(
            DDrive.abi as any,
            networkData.address
          );
          setContract(dDrive);
          setupEventListeners(dDrive);
          // Get files amount
          const filesCount = await dDrive.methods.fileCount().call();

          setFileCount(filesCount);
          // Load files&sort by the newest
          const fileList = [];
          for (let i = filesCount; i >= 1; i--) {
            const file = await dDrive.methods.files(i).call();
            fileList.push(file);
          }
          setFiles(fileList);
        } else {
          alert('DDrive contract not deployed to detected network.');
        }
      })();
    }
  }, [isWeb3, web3, accounts]);

  const setupEventListeners = (dDrive: Contract) => {
    if (dDrive) {
      dDrive.events
        .FileUploaded()
        .on('data', (event: any) => {
          // console.log('event triggered', event);
          setFiles((prevFiles) => [event.returnValues, ...prevFiles]);
        })
        .on('changed', (event: any) => {
          console.log('update event triggered', event);
        });
    }
  };

  const uploadFile = async (
    description: string,
    file: File,
    callback: (isSuccess: boolean) => void
  ) => {
    try {
      const result = await ipfs.add(file.buffer);

      contract?.methods
        .uploadFile(result.path, result.size, file.type, file.name, description)
        .send({ from: activeAccount })
        .on('transactionHash', (hash: any) => {
          // console.log('Hash', hash);
          callback(true);
        })
        .on('error', (e: Error) => {
          alert('Error Executing the SmartContract');
          console.error('Error', e);
          callback(false);
        });
    } catch (error) {
      alert('Error on uploading to IPFS');
      console.error('IPFS Error', error);
      callback(false);
    }
  };

  return (
    <Fragment>
      <Navbar account={activeAccount} />
      {isLoading ? (
        <Loading />
      ) : (
        <Main files={files} uploadFile={uploadFile} fileCount={fileCount} />
      )}
    </Fragment>
  );
};

export default App;
