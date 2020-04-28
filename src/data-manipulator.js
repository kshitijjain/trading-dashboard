const axios= require('axios');

let dataManipulator= async () => {
    let {data}= await axios.get('http://localhost:3001/positions');
    let positions= data;

    let contractProfit;
    let positionProfit;
    let totalProfit=0;
    let isContractOpen;
    let isPositionOpen;
    for(position of positions){
        positionProfit= 0;
        isPositionOpen= false;
        for(contract of position.contracts){
            contractProfit= 0;
            isContractOpen= 0;
            for(trade of contract.trades){
                if(trade.side=== 'sell') {
                    contractProfit += trade.averagePrice * contract.lotSize * trade.lots;
                    isContractOpen-= trade.lots;
                }
                if(trade.side=== 'buy') {
                    contractProfit -= trade.averagePrice * contract.lotSize * trade.lots;
                    isContractOpen+= trade.lots;
                }
            }
            contract.contractProfit= contractProfit;
            if(isContractOpen) contract.isOpen= true; else delete contract.isOpen;
            if(isContractOpen) isPositionOpen= true;
            positionProfit+= contractProfit;
        }
        position.positionProfit= positionProfit;
        position.positionProfitPercentage= positionProfit*100/position.capital;
        position.isOpen= isPositionOpen;
        totalProfit+= positionProfit;
        await axios.put(`http://localhost:3001/positions/${position.id}`, position);
        console.log(`Position profit save successfully for #${position.id} ${position.name}`);
    }
    await axios.post('http://localhost:3001/totalProfit', {totalProfit});
    console.log('Total profit saved successfully');
};

dataManipulator().then(() => {console.log('Operation successful')});