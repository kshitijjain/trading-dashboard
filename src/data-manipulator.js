const axios= require('axios');

let dataManipulator= async () => {
    let {data}= await axios.get('http://localhost:3001/positions');
    let positions= data;

    let contractProfit;
    let positionProfit;
    let totalProfit=0;
    for(position of positions){
        positionProfit= 0;
        for(contract of position.contracts){
            if(contract.sellAverage!== null && contract.buyAverage!== null) {
                contractProfit = (contract.sellAverage * contract.lotSize - contract.buyAverage * contract.lotSize) * contract.lots;
                positionProfit+= contractProfit;
                contract.contractProfit = contractProfit;
            }
        }
        totalProfit+= positionProfit;
        position.positionProfit= positionProfit;
        await axios.put(`http://localhost:3001/positions/${position.id}`, position);
        console.log(`Position profit save successfully for #${position.id} ${position.name}`);
    }
    await axios.post('http://localhost:3001/totalProfit', {totalProfit});
    console.log('Total profit saved successfully');
};

dataManipulator().then(() => {console.log('Operation successful')});