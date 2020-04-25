module.exports= {
    positions: [
        {
            spot: "USDINR",
            name: "Position 1",
            contracts: [
                {
                    type: "PE",
                    strike: 76,
                    expiry: "28-04-2020",
                    side: "short",
                    lots: 15,
                    sellValue: 0.075,
                    buyValue: 0.1,
                    lotSize: 1000
                }
            ]
        },
        {
            spot: "USDINR",
            name: "Position 2",
            contracts: [
                {
                    type: "PE",
                    strike: 76,
                    expiry: "28-04-2020",
                    side: "short",
                    lots: 15,
                    sellValue: 0.075,
                    buyValue: 0.1,
                    lotSize: 1000
                }
            ]
        }
        
    ]
};