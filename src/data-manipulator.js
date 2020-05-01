const axios= require('axios');

let dataManipulator= async () => {
    let {data}= await axios.get('http://localhost:3001/positions');
    let positions= data;

    let contractProfit;
    let positionProfit;
    let totalProfit=0;
    let isContractOpen;
    let isPositionOpen;
    let brokerage;
    let totalPositions= 0;
    let profitPositions= 0;
    let lossPositions= 0;

    for(position of positions){
        positionProfit= 0;
        brokerage= 0;
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
                if(trade.averagePrice!== 0) brokerage+=20;
            }
            contract.contractProfit= contractProfit;
            if(isContractOpen) contract.isOpen= true; else delete contract.isOpen;
            if(isContractOpen) isPositionOpen= true;
            positionProfit+= contractProfit;
        }
        position.positionProfit= positionProfit;
        position.positionProfitPercentage= positionProfit*100/position.capital;
        position.brokerage= brokerage*118/100;
        position.netProfit= position.positionProfit - position.brokerage;
        position.netProfitPercentage= position.netProfit*100/position.capital;
        if(isPositionOpen) position.isOpen= true; else delete position.isOpen;
        totalProfit+= position.netProfit;
        totalPositions++;
        if(position.netProfit>=0) profitPositions++; else lossPositions++;
        await axios.put(`http://localhost:3001/positions/${position.id}`, position);
        console.log(`Position profit save successfully for #${position.id} ${position.name}`);
    }
    await axios.post('http://localhost:3001/totals', {totalProfit, totalPositions, profitPositions, lossPositions});
    console.log('Total profit saved successfully');
};

dataManipulator().then(() => {console.log('Operation successful')});