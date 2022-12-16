## UniswapV3 Position Manager

***


### Installation and Setup 
1. Clone this repository

```sh
git clone git@github.com:k-kgs/uniswapv3-position-manger.git
```

2. Install the dependencies

```sh
npm install
```

3. Run the local node

```sh
npx hardhat node
```

4. Deploy to goerli

```sh
npx hardhat run scripts/deploy.js --network goerli
```

5. Start the app

```sh
npm run dev
```

6. Interact at localhost

```sh
http://localhost:3000
```


### Working 

1. Connect your wallet

2. It will fetch all active position minted by your wallet on uniswapV3

3. Select position

4. Either set a threshold or Exit position based on performance 
Note: In case of threshold it will only exit when (Impermanent Loss < threshold)

![Manage Position Interface](/public/ManagePositionInterface.png )

Note: For IL(Impermanent Loss)  calculation please <a href="/public/ILCalculation.png">refer</a>
