import { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksTestnet } from '@stacks/network';
import { callReadOnlyFunction, cvToValue, standardPrincipalCV, uintCV } from '@stacks/transactions';

const App = () => {
  const { doOpenAuth, doOpenContractCall, userSession } = useConnect();
  const [userData, setUserData] = useState<any>(null);

  const network = new StacksTestnet();

  const connectWallet = () => {
    doOpenAuth();
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
  };

  const handleMint = async () => {
    if (!userData) return;
    const functionArgs = [standardPrincipalCV(userData.profile.stxAddress.testnet)];
    doOpenContractCall({
      network,
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // deployer address, adjust
      contractName: 'nft',
      functionName: 'mint',
      functionArgs,
      onFinish: (data) => {
        console.log('Mint tx:', data);
      },
    });
  };

  const handleBuy = async (id: number) => {
    // Implement buy logic
  };

  return (
    <div>
      <h1>Gated.so - NFT Marketplace</h1>
      {!userData ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {userData.profile.stxAddress.testnet}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
          <button onClick={handleMint}>Mint NFT</button>
          {/* Add more buttons */}
        </div>
      )}
    </div>
  );
};

export default App;