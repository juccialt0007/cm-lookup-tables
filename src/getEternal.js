import React, { Component } from 'react'
import './App.css';
import './table.css';
class GetEternal extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Price
            eternalPrice: 0,
            updateTimer: 0,
            php: 0,
            gbp: 0,
            eur: 0,
            brl: 0,
            thb: 0,
            sgd: 0,
            twd: 0,
            cny: 0,
            inr: 0,
            // Sheet
            mp: 0,
            workers: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            planets: ["Odrocury","Thabbiter","Pulmeron","Ecryria","Searus","Gemia","Malphus","Neuter","Grarvis 022","Sorth 33A5","Dutrabos","Lustronides","Zullosie","Yimagua","Haostea","Kongebro","Vuruturn","Droxuyama","Miuq I11","Zapus 5M0","Begelia","Gochimars","Konvides","Donvillon","Ania","Aenerth","Tachiron","Cichurilia","Gagua 07","Sector G"],
            oracle_adjustment: [1.000,2.019,3.078,4.176,5.315,6.516,7.754,9.033,10.372,11.751,14.429,16.208,18.085,20.083,22.163,24.341,26.659,29.076,31.614,34.292,45.863,49.939,54.016,59.112,64.149,69.304,74.400,80.336,86.529,93.765],
            d_success_chance: [0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.71,0.69,0.67,0.6,0.58,0.56,0.54,0.52,0.50,0.48,0.46,0.44,0.42,0.41,0.41,0.41,0.41,0.41,0.39,0.39,0.39,0.39,0.39],
            c_success_chance: [0.88,0.86,0.84,0.82,0.8,0.78,0.76,0.74,0.72,0.70,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.43,0.43,0.43,0.43,0.43,0.40,0.40,0.40,0.40,0.40],
            b_success_chance: [0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.47,0.47,0.47,0.47,0.45,0.45,0.45,0.45,0.45],
            a_success_chance: [0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.71,0.69,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.52,0.52,0.52,0.52,0.52,0.50,0.50,0.50,0.50,0.50],
            s_success_chance: [0.97,0.95,0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.55,0.55,0.55,0.55,0.55,0.53,0.53,0.53,0.53,0.53],
            fleet_rank: "D",
            fleet_level: 0,
            rank_reward: [1,1.01,1.02,1.03,1.04,1.05,1.1,1.12,1.14,1.16,1.20,1.205,1.21,1.215,1.22,1.225,1.25,1.255,1.26,1.265,1.27,1.3,1.305,1.31,1.315,1.35],
            fuel: [21,43,66,90,114,140,167,195,224,254,311,350,390,434,479,526,576,628,683,741,950,1000,1050,1100,1400,1500,1600,1750,1900,2100],
            // UI
            visibilityNormal: "",
            visibilityFleet:"d-none",
            inputVisFleet: "d-none",
            sheetInfo: "d-none",
            visInfo: "",
            visCredits: "d-none",
            btnHighlightInfo: "btn btn-custom mobile-margin",
            btnHighlightFleet: "btn stretch mobile-margin",
            showFixedHeader: "d-none",
            // UI
            selectDays: "7",
            currency: "USD",
            currencySymbol: "$",
            errorMP: "Not Enough MP",
            averageWorkers: 0,
            // Language
            visLangSelect: "EN",
            visEn: "",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"
        }
        this.setMP = this.setMP.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setFleetLevel = this.setFleetLevel.bind(this);
        this.setFleetRank = this.setFleetRank.bind(this);
    }

    async loadData(){
        // PancakeSwap API - Retired
        // const url = "https://api.pancakeswap.info/api/v2/tokens/0xD44FD09d74cd13838F137B590497595d6b3FEeA4"
        // const response = await fetch(url);
        // const data = await response.json();
        // this.setState({eternalPrice: data["data"]["price"]})

        // USDT to Conversion
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=php%2Cgbp%2Ceur%2Cbrl%2Cthb%2Csgd%2Ctwd%2Ccny%2Cinr"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
        php: data["tether"]["php"],
        gbp: data["tether"]["gbp"],
        eur: data["tether"]["eur"],
        brl: data["tether"]["brl"],
        sgd: data["tether"]["sgd"],
        thb: data["tether"]["thb"],
        twd: data["tether"]["twd"],
        cny: data["tether"]["cny"],
        inr: data["tether"]["inr"]})
        
        // Blockchain Pull Requests for Current Oracle Price
        const Web3 = require('web3');
        const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
        const price = Web3.utils.fromWei(web3.utils.toBN(await web3.eth.getStorageAt('0x1A652dEa38B3522106D1675dbe5fc222e831fE8c', 151)))
        this.setState({eternalPrice: price})
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 5000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }
    // Headers UI
    
    setMP(event){
        this.setState({mp : event.target.value})
    }
    setWorkers(event){
        this.setState({workers: event.target.value})
    }
    setFleetRank(event){
        this.setState({fleet_rank: event.target.value})
    }
    setFleetLevel(event){
        this.setState({fleet_level: event.target.value})
    }
    getAverageWorkers(){
        if (this.state.workers === 0){
            return "Input # of Workers"
        } else if (isNaN(parseFloat(this.state.mp / this.state.workers).toFixed(2))){
            return "Input MP"
        } else if (parseFloat(this.state.mp / this.state.workers).toFixed(2) === "Infinity"){
            return "Input # of Workers not 0"
        } else {
            return parseFloat(this.state.mp / this.state.workers).toFixed(2)
        }
    }

    // UI
    setDays = (event) => {
        this.setState({ selectDays: event.target.value });
      };
    setFleetRank = (event) => {
        this.setState({ fleet_rank: event.target.value });
      };
    setCurrency = (event) => {
        if (event.target.value === "USD"){
            this.setState({currency: event.target.value, currencySymbol: "$"});
        } else if (event.target.value === "PHP"){
            this.setState({currency: event.target.value, currencySymbol: "₱"});
        } else if (event.target.value === "GBP"){
            this.setState({currency: event.target.value, currencySymbol: "£"});
        } else if (event.target.value === "EUR"){
            this.setState({currency: event.target.value, currencySymbol: "€"});
        } else if (event.target.value === "BRL"){
            this.setState({currency: event.target.value, currencySymbol: "R$"});
        } else if (event.target.value === "SGD"){
            this.setState({currency: event.target.value, currencySymbol: "S$"});
        } else if (event.target.value === "THB"){
            this.setState({currency: event.target.value, currencySymbol: "฿"});
        } else if (event.target.value === "CNY"){
            this.setState({currency: event.target.value, currencySymbol: "¥"});
        } else if (event.target.value === "TWD"){
            this.setState({currency: event.target.value, currencySymbol: "NT$"});
        } else if (event.target.value === "INR"){
            this.setState({currency: event.target.value, currencySymbol: "₹"});
        }
        
    }
    setVisLang = (event) => {
        console.log(event.target.value)
        if (event.target.value === "EN"){
            this.setState({visEn: "",
            visThai: "d-none", errorMP: "Not Enough MP",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "ESP"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "", errorMP: "Falta MP",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        }
        else if (event.target.value === "GER"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "", errorMP: "Nicht genug MP",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        }
        else if (event.target.value === "THAI"){
            this.setState({visEn: "d-none",
            visThai: "", errorMP: "ค่า MP ไม่พอ",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        }
        else if (event.target.value === "PER"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "", errorMP: "ام‌پی(MP) کافی نیست",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})}
        else if (event.target.value === "INDO"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "", errorMP: "MP Tidak Cukup",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "GRK"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "", errorMP: "Δεν υπάρχει αρκετό MP",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "BRPT"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "", errorMP: "MP Insuficiente",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "FR"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none", 
            visFR: "", errorMP: "Pas assez de puissance de minage",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "ITA"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none", 
            visFR: "d-none", 
            visITA: "", errorMP: "Non Abbastanza MP",
            visZHtr: "d-none",
            visZHsm: "d-none"})
        } else if (event.target.value === "ZHT"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none", 
            visFR: "d-none", 
            visITA: "d-none", 
            visZHtr: "", errorMP: "挖掘力不足",
            visZHsm: "d-none"})
        } else if (event.target.value === "ZHS"){
            this.setState({visEn: "d-none",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none", 
            visFR: "d-none", 
            visITA: "d-none", 
            visZHtr: "d-none", 
            visZHsm: "", errorMP: "挖掘力不足",})
        }
      };
    btnVisNrm = () => {
        this.setState({sheetInfo: "d-none" ,visibilityNormal: "mb-4", visibilityFleet: "d-none", inputVisFleet: "d-none", btnHighlightInfo: "btn btn-custom mobile-margin", btnHighlightFleet: "btn stretch mobile-margin",visCredits: "d-none"})
    }
    btnFleets = () => {
        this.setState({sheetInfo: "mt-2 text-right-special" ,visibilityNormal: "d-none", visibilityFleet: "overflow", inputVisFleet: "row mt-2", btnHighlightInfo: "btn stretch mobile-margin", btnHighlightFleet: "btn btn-custom mobile-margin",visCredits: ""})
    }
    btnFleetInfo = () => {
        this.setState({visInfo: "mb-4", visFleetLevel: "d-none", visFleetRank: "d-none", btnHighlightCMInfo: "btn btn-custom text-size-14"})
    }
    btnFleetRanks = () => {
        this.setState({visInfo: "d-none", visFleetLevel: "d-none", visFleetRank: "mb-4", btnHighlightCMInfo: "btn stretch text-size-14"})
    }
    btnFleetLevels = () => {
        this.setState({visInfo: "d-none", visFleetLevel: "mb-4", visFleetRank: "d-none", btnHighlightCMInfo: "btn stretch text-size-14"})
    }
    closeTab = () => {
        window.close();
    }
    //(Who called in the) Fleet

    getETLvsCurrency(){
        if(this.state.currency === "USD"){
            return parseFloat(this.state.eternalPrice).toFixed(2)
        } else if (this.state.currency === "PHP") {
            return parseFloat(this.state.eternalPrice * this.state.php).toFixed(2)
        } else if (this.state.currency === "GBP") {
            return parseFloat(this.state.eternalPrice * this.state.gbp).toFixed(2)
        } else if (this.state.currency === "EUR") {
            return parseFloat(this.state.eternalPrice * this.state.eur).toFixed(2)
        } else if (this.state.currency === "BRL") {
            return parseFloat(this.state.eternalPrice * this.state.brl).toFixed(2)
        } else if (this.state.currency === "SGD") {
            return parseFloat(this.state.eternalPrice * this.state.sgd).toFixed(2)
        } else if (this.state.currency === "THB") {
            return parseFloat(this.state.eternalPrice * this.state.thb).toFixed(2)
        } else if (this.state.currency === "CNY") {
            return parseFloat(this.state.eternalPrice * this.state.cny).toFixed(2)
        } else if (this.state.currency === "TWD") {
            return parseFloat(this.state.eternalPrice * this.state.twd).toFixed(2)
        } else if (this.state.currency === "INR") {
            return parseFloat(this.state.eternalPrice * this.state.inr).toFixed(2)
        }
    }

    getMinePower(i){
        return this.state.minepower[i]
    }
    getMineUSD(i){
        if(this.state.currency === "USD"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i]).toFixed(2)
        } else if (this.state.currency === "PHP"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.php).toFixed(2)
        } else if (this.state.currency === "GBP"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.gbp).toFixed(2)
        } else if (this.state.currency === "EUR"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.eur).toFixed(2)
        } else if (this.state.currency === "BRL"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.brl).toFixed(2)
        } else if (this.state.currency === "SGD"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.sgd).toFixed(2)
        } else if (this.state.currency === "THB"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.thb).toFixed(2)
        } else if (this.state.currency === "CNY"){
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.cny).toFixed(2)
        } else if (this.state.currency === "TWD") {
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.twd).toFixed(2)
        } else if (this.state.currency === "INR") {
            return parseFloat(4.0 * this.state.oracle_adjustment[i] * this.state.inr).toFixed(2)
        }
    }

    getMineUSDETL(i){
        return parseFloat(4.0 * this.state.oracle_adjustment[i]).toFixed(2)
    }

    getContractCost(){
        if (this.state.selectDays === "30"){
            return parseFloat(27/this.state.eternalPrice).toFixed(4)
        } else if (this.state.selectDays === "15"){
            return parseFloat(14/this.state.eternalPrice).toFixed(4)
        } 
        else if (this.state.selectDays === "7"){
            return parseFloat(7/this.state.eternalPrice).toFixed(4)
        }
        else if (this.state.selectDays === "3"){
            return parseFloat(3/this.state.eternalPrice).toFixed(4)
        }
    }

    getContractDays(){
        if (this.state.selectDays === "30"){
            return 27
        } else if (this.state.selectDays === "15"){
            return 14
        } else if (this.state.selectDays === "7"){
            return 7
        } else if (this.state.selectDays === "3"){
            return 3
        }
    }

    getFleetMineETL(i){
        return parseFloat((this.getFleetMineUSDETL(i)/this.state.eternalPrice)).toFixed(4)
    }

    getFleetMineUSDETL(i){
        return parseFloat( (this.getMineUSDETL(i) * (this.state.rank_reward[this.state.fleet_level]))).toFixed(2)
    }

    getFleetMineUSD(i){
        return parseFloat( (this.getMineUSD(i) * (this.state.rank_reward[this.state.fleet_level]))).toFixed(2)
    }
    getFleetMineUSDM(i){
        return parseFloat( (this.getMineUSD(i) * (this.state.rank_reward[this.state.fleet_level]))).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    }

    getFleetSRvsUSD(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        } 
        else if (isNaN(parseFloat(this.getFleetMineUSD(i)* this.state.selectDays * this.getFleetSuccessChance(i) / 100).toFixed(2))) {
            return this.state.errorMP
        }
        else {
            return this.state.currencySymbol+parseFloat(this.getFleetMineUSD(i)* this.state.selectDays * this.getFleetSuccessChance(i) / 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
        
    }

    getFleetContractCostETL(){
        return parseFloat(((this.getContractDays()*this.state.workers)/this.state.eternalPrice)).toFixed(4)
    }
    getFleetContractCostUSD(){
        if(this.state.currency === "USD"){
            return parseFloat(this.getContractDays()*this.state.workers).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "PHP"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.php).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "GBP"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.gbp).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "EUR"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.eur).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "BRL"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.brl).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "SGD"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.sgd).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "THB"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.thb).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "CNY"){
            return parseFloat(this.getContractDays()*this.state.workers * this.state.cny).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "TWD") {
            return parseFloat(this.getContractDays()*this.state.workers * this.state.twd).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        } else if (this.state.currency === "INR") {
            return parseFloat(this.getContractDays()*this.state.workers * this.state.inr).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }


    }


    getFleetNet(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        }
        else if (isNaN(parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() ).toFixed(2))){
            return this.state.errorMP
        } else {
            return this.state.currencySymbol+parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }
    getFleetNetFuel(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        }
        else if (isNaN(parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() - (this.getFuel(i)*this.state.selectDays) ).toFixed(2))){
            return this.state.errorMP
        }
        else {
            return this.state.currencySymbol+parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() - (this.getFuel(i)*this.state.selectDays) ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }

    getWorkersUSD(){
        if(this.state.currency === "USD"){
            return this.state.workers*this.getContractDays()
        } else if (this.state.currency === "PHP"){
            return this.state.workers*this.getContractDays()*this.state.php
        } else if (this.state.currency === "GBP"){
            return this.state.workers*this.getContractDays()*this.state.gbp
        } else if (this.state.currency === "EUR"){
            return this.state.workers*this.getContractDays()*this.state.eur
        } else if (this.state.currency === "BRL"){
            return this.state.workers*this.getContractDays()*this.state.brl
        } else if (this.state.currency === "SGD"){
            return this.state.workers*this.getContractDays()*this.state.sgd
        } else if (this.state.currency === "THB"){
            return this.state.workers*this.getContractDays()*this.state.thb
        } else if (this.state.currency === "CNY"){
            return this.state.workers*this.getContractDays()*this.state.cny
        } else if (this.state.currency === "TWD") {
            return this.state.workers*this.getContractDays()*this.state.twd
        } else if (this.state.currency === "INR") {
            return this.state.workers*this.getContractDays()*this.state.inr
        }
    }

    getFuel(i){
        if(this.state.currency === "USD"){
            return parseFloat((this.state.fuel[i]/100)).toFixed(2)
        } else if (this.state.currency === "PHP"){
            return parseFloat((this.state.fuel[i]/100)*this.state.php).toFixed(2)
        } else if (this.state.currency === "GBP"){
            return parseFloat((this.state.fuel[i]/100)*this.state.gbp).toFixed(2)
        } else if (this.state.currency === "EUR"){
            return parseFloat((this.state.fuel[i]/100)*this.state.eur).toFixed(2)
        } else if (this.state.currency === "BRL"){
            return parseFloat((this.state.fuel[i]/100)*this.state.brl).toFixed(2)
        } else if (this.state.currency === "SGD"){
            return parseFloat((this.state.fuel[i]/100)*this.state.sgd).toFixed(2)
        } else if (this.state.currency === "THB"){
            return parseFloat((this.state.fuel[i]/100)*this.state.thb).toFixed(2)
        } else if (this.state.currency === "CNY"){
            return parseFloat((this.state.fuel[i]/100)*this.state.cny).toFixed(2)
        } else if (this.state.currency === "TWD") {
            return parseFloat((this.state.fuel[i]/100)*this.state.twd).toFixed(2)
        } else if (this.state.currency === "INR") {
            return parseFloat((this.state.fuel[i]/100)*this.state.inr).toFixed(2)
        }
    }

    getFuelM(i){
        if(this.state.currency === "USD"){
            return parseFloat((this.state.fuel[i]/100)).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "PHP"){
            return parseFloat((this.state.fuel[i]/100)*this.state.php).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "GBP"){
            return parseFloat((this.state.fuel[i]/100)*this.state.gbp).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "EUR"){
            return parseFloat((this.state.fuel[i]/100)*this.state.eur).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "BRL"){
            return parseFloat((this.state.fuel[i]/100)*this.state.brl).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "SGD"){
            return parseFloat((this.state.fuel[i]/100)*this.state.sgd).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "THB"){
            return parseFloat((this.state.fuel[i]/100)*this.state.thb).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "CNY"){
            return parseFloat((this.state.fuel[i]/100)*this.state.cny).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "TWD") {
            return parseFloat((this.state.fuel[i]/100)*this.state.twd).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        } else if (this.state.currency === "INR") {
            return parseFloat((this.state.fuel[i]/100)*this.state.inr).toLocaleString(undefined, {minimumFractionDigits: 2,
                maximumFractionDigits: 2})
        }
    }

    getFleetSuccessChance(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSR(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSR(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSR(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASR(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSR(i)
        }   
    }

    getFleetSuccessChanceM(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSR(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSR(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSR(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASR(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSR(i)
        }   
    }


    getFleetDSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 88){
                return 88
                } else {
                    return answer
                }
            }
            else if (answer > 88){
                return 88
            } else if ( answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            }
            else {
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetDSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 88){
                return 88+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer > 88){
                return 88+'%'
            } else if ( answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetCSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97
                } else {
                    return answer
                }
            }
            else if (answer >= 88){
                return 88
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            }
            else {
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetCSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer >= 88){
                return 88+'%'
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetBSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97
                } else {
                    return answer
                }
            }
            else if (answer > 88){
                return 88
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }

        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            }
            else {
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetBSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer > 88){
                return 88+'%'
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }

        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetASR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 97 && i < 17){
                return 97
            }  else if (answer >= 90 && i > 15 && i < 25){
                if (i===17) {
                    return 95
                } else if (i===18){
                    return 93
                } else if (i===19){
                    return 91
                } else {
                    return 90
                }
            } else if (answer >= 88 && i > 24 && i < 30){
                return 88
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } 
            else if (this.state.mp < 1500) {
                if (this.state.mp < 100){
                    return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
                } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                    return 'Not Enough MP'
                }
                else {
                    return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
                }
            }
    }
    getFleetASRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 97 && i < 17){
                return 97+'%'
            }  else if (answer >= 90 && i > 15 && i < 25){
                if (i===17) {
                    return 95+'%'
                } else if (i===18){
                    return 93+'%'
                } else if (i===19){
                    return 91+'%'
                } else {
                    return 90+'%'
                }
            } else if (answer >= 88 && i > 24 && i < 30){
                return 88+'%'
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }
    getFleetSSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 91 && i < 20){
                return 97
            }  else if (answer >= 93 && i > 19 && i < 25){
                return 93
            } else if (answer >= 91 && i > 24 && i < 30){
                return 91
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            }
            else {
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetSSRM(i){
    if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 91 && i < 20){
                return 97+'%'
            }  else if (answer >= 93 && i > 19 && i < 25){
                return 93+'%'
            } else if (answer >= 91 && i > 24 && i < 30){
                return 91+'%'
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    render(){
        return(
            <div class="container-fixed px-3">
                <div class="container-fluid px-1">
                    <div class="container-fluid">

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            
                                <div class="modal-body">

                                <div class={this.state.visEn}>
                                <p class="modal-popup"><b class="text-size-17">Disclaimer: </b><br/><br/>This is a Community Project coded solely by me Jucci#0007, so any help from the community to solve equations would be really appreciated.<br/><br/>
                                All calculator values are <b>approximation</b>. Do not take them literally. 
                                <br/><br/>This is best used as a <b>template</b>. <br/><br/>
                                Please don't go complaining in General Chat if your "expectations" are not reached.<br/><br/>
                                The game is audited by a Top BlockChain Auditor. <br/>Your claims of it being rigged are unfounded.
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>I don't understand</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>I don't understand</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">I understand</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">I understand</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visESP}>

                                <p class="modal-popup"><b class="text-size-17">Descargo de Responsabilidad:</b><br/><br/>
                                Este es un proyecto comunitario creado y mantenido únicamente por mí Jucci # 0007, por lo que cualquier ayuda de la comunidad para resolver ecuaciones sería muy bien recibida.<br/><br/>
                                Todos los valores de la calculadora son aproximados. No los tomes literalmente.<br/><br/>
                                Es mejor utilizarlo como plantilla.<br/><br/>
                                Por favor, no vaya a quejarse en el chat general si no se cumplen sus ""expectativas"".<br/><br/>
                                El juego es auditado por un auditor Top de la BlockChain.<br/>
                                Sus afirmaciones de que está manipulado no tienen fundamento.<br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>No entiendo</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>No entiendo</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Entiendo</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Entiendo</button>
                                        </div>
                                        </div>
                                </div>


                                </div>

                                <div class={this.state.visThai}>
                                <p class="modal-popup"><b class="text-size-17">ข้อจำกัดความรับผิดชอบ:</b><br/><br/>
                                นี่เป็นโปรเจคในคอมมูนิตี้ซึ่งเขียนโปรแกรมโดย Jucci#0007 เพียงผู้เดียว ดังนั้นขอขอบคุณทุกๆ ความช่วยเหลือจากเพื่อนๆ ในคอมมูนิตี้ที่ช่วยแก้รายละเอียดสมการของโปรแกรมนี้ให้ใช้งานได้ดีที่สุด<br/><br/>
                                รายละเอียดการคำนวณทั้งหมดนี้เป็นเพียงค่าประมาณการเท่านั้น. ไม่สามารถอ้างอิงจากค่าจริงได้ ไม่แนะนำให้นำค่าที่ได้จากการคำนวณไปใช้จริง<br/><br/>
                                เหมาะที่สดที่จะใช้เป็นเพียงเทมเพลต<br/><br/>
                                โปรดอย่าไปคอมเมนต์ Complain หรือต่อว่าในห้องแชท General ถ้าโปรแกรมคำนวณออกมาไม่ถึงตาม ""ความคาดหวัง"" ของคุณ<br/>
                                เกมดังกล่าวได้รับการ Audit โดย Blockchain Auditor ชั้นนำ การอ้างว่าคุณถูกหลอกลวงนั้นไม่มีมูล โปรดศึกษาและปกป้องข้อมูลของคุณให้ดีที่สุด เท่าที่เป็นไปได้
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>ฉันไม่เข้าใจ</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>ฉันไม่เข้าใจ</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">ฉันเข้าใจและยอมรับ</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">ฉันเข้าใจและยอมรับ</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visGER}>
                                <p class="modal-popup"><b class="text-size-17">Haftungsausschluss:</b><br/><br/>
                                Das ist ein Community Projekt, einzig und alleine programmiert von mir Jucci#0007. Jede Hilfe aus der Community um Gleichungen zu lösen ist sehr willkommen.<br/><br/>
                                Alle berechneten Werte sind eine Schätzung. Die Werte sind nicht genau zunehmen.<br/><br/>
                                Die Tabelle wird am Besten als Vorlage genutzt.<br/><br/>
                                Bitte nicht im General Chat beschweren wenn die ""Erwartungen"" nicht erfüllt werden.<br/><br/>
                                Das Spiel ist von einem Top BlockChain Prüfer überprüft worden.<br/>
                                Behauptungen über Manipulation sind unbegründet."
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Nicht verstanden</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Nicht verstanden</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Verstanden</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Verstanden</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visINDO}>
                                <p class="modal-popup"><b class="text-size-17">Disclaimer:</b><br/><br/>
                                Ini adalah Proyek Komunitas yang dibuat oleh saya Jucci#0007, jadi bantuan apapun dari komunitas untuk memecahkan persamaan akan sangat dihargai.<br/><br/>
                                Semua nilai perhitungan adalah perkiraan. Jangan menelannya mentah-mentah.<br/><br/>
                                Ini paling baik digunakan sebagai template.<br/><br/>
                                Tolong jangan komplain di General Chat jika ""ekspektasi"" anda tidak terpenuhi<br/><br/>
                                Permainan ini telah diaudit oleh Top BlockChain Auditor <br/>
                                Klaimmu tentang dicurangi oleh itu adalah tidak berdasar.
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Aku Tidak Mengerti</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Aku Tidak Mengerti</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Aku Mengerti</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Aku Mengerti</button>
                                        </div>
                                        </div>
                                </div>
                                </div>
                                
                                <div class={this.state.visPER}>
                                <p class="modal-popup"><b class="text-size-17">سلب مسئولیت:</b><br/><br/>
                                این یک پروژه عمومی است که فقط توسط من Jucci#0007 کدگذاری شده است؛
                                بنابراین از هرگونه کمک برای حل معادلات، قدردانی می‌شود.<br/><br/>
                                تمام مقادیر ماشین حساب تقریبی هستند. آنها را به معنای واقعی کلمه نگیرید.<br/><br/>
                                بهتر است از جدول به عنوان یک الگو استفاده شود.<br/><br/>
                                بازی توسط یک محقق برتر BlockChain ممیزی شده است.<br/>
                                ادعای شما مبنی بر تقلب در آن بی‌اساس است.
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>متوجه نشدم</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>متوجه نشدم</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">متوجه هستم</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">متوجه هستم</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visGREEK}>
                                <p class="modal-popup"><b class="text-size-17">Αποποίηση ευθυνών:</b><br/><br/>
                                Αυτό είναι ένα Community Project δημιουργημένο αποκλειστικά από εμένα Jucci#0007, επομένως οποιαδήποτε βοήθεια από την κοινότητα για την επίλυση προβλημάτων θα εκτιμηθεί πραγματικά.<br/><br/>
                                Όλες οι τιμές της αριθμομηχανής είναι κατά προσέγγιση. Μην τις παίρνετε κυριολεκτικά.<br/><br/>
                                Αυτό χρησιμοποιείται καλύτερα ως πρότυπο.<br/><br/>
                                Παρακαλώ μην παραπονιέστε στο General Chat αν δεν εκπληρωθούν οι ""προσδοκίες"" σας.<br/><br/>
                                Το παιχνίδι ελέγχεται από έναν Top BlockChain Auditor.<br/>
                                Οι ισχυρισμοί σας ότι είναι στημένο είναι αβάσιμοι.
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Δεν καταλαβαίνω</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Δεν καταλαβαίνω</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Καταλαβαίνω</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Καταλαβαίνω</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visBRPT}>
                                <p class="modal-popup"><b class="text-size-17">Avisos:</b><br/><br/>

                                Este é um projeto comunitário programado únicamente por mim, Jucci#0007, 
                                então qualquer ajuda da comunidade para solucionar equações é bem vinda.<br/><br/>

                                Todos os valores calculados são aproximações. Não os considere literalmente.<br/><br/>

                                O uso recomendado da calculadora é como um modelo.<br/><br/>

                                Por favor não vá ao Chat Geral reclamar caso suas ""expectativas"" não estejam satisfeitas.<br/><br/>

                                O jogo é auditado por uma das principais Auditorias de BlockChain.<br/>
                                Suas acusações de manipulação não têm fundamento.
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Eu não entendo</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Eu não entendo</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Eu entendo</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Eu entendo</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visFR}>
                                <p class="modal-popup"><b class="text-size-17">"Clause de non-responsabilité :</b>
                                <br/><br/>
                                Ceci est un projet communautaire codé seulement par moi Jucci#0007. 
                                Toute aide de la communauté pour résoudre des problèmes serait appréciée.<br/><br/>
                                Tous les calculs sont approximatifs, ne les prenez pas littéralement.<br/><br/>
                                Ceci est à utiliser comme template.<br/><br/>
                                Merci de ne pas vous plaindre dans le chat général si vos ""expectatives"" ne sont pas atteintes.<br/><br/>
                                Le jeu est audité par une des meilleures sociétés d'audit de sécurité sur la blockchain.<br/>
                                Les preuves que les gains sont truquées sont infondées."
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Je ne comprends pas</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Je ne comprends pas</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Je comprends</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Je comprends</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visITA}>
                                <p class="modal-popup"><b class="text-size-17">"Esclusione di Responsabilità:</b><br/><br/>
                                Questo è un progetto comunitario codificato solo da me Jucci#0007, quindi qualsiasi aiuto dalla comunità per risolvere le equazioni sarebbe davvero apprezzato.<br/><br/>
                                Tutti i valori della calcolatrice sono approssimativi. Non prenderli alla lettera.<br/><br/>
                                Questo è meglio usarlo come modello.<br/><br/>
                                Per favore, non andate a lamentarvi nella chat generale se le vostre ""aspettative"" non vengono raggiunte.<br/><br/>
                                Il gioco è verificato da un Top BlockChain Revisore.<br/>
                                Le tue affermazioni sul fatto che sia truccato sono infondate."
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>Non Capisco</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>Non Capisco</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">Capisco</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">Capisco</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visZHtr}>
                                <p class="modal-popup"><b class="text-size-17">免責聲明：</b><br/><br/>
                                這是一個由我 Jucci#0007 單獨編程的社群專案，因此非常感謝社群對完成計算公式提供的所有幫助。<br/><br/>

                                所有計算器顯示的數值都是近似值。 請不要僅從字面上理解它們。<br/><br/>

                                這里的數據最好用做參考樣本。<br/><br/>

                                如果沒有達到您的“期望”，請不要在 General Chat 頻道中抱怨。<br/><br/>

                                本遊戲已經通過頂級區塊鏈審核機構審核。<br/>
                                有關於它被人為操縱的說法是沒有根據的。
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>我不明白</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>我不明白</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">我明白</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">我明白</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                <div class={this.state.visZHsm}>
                                <p class="modal-popup"><b class="text-size-17">免责声明：</b><br/><br/>

                                这是一个由我 Jucci#0007 单独编程的社群项目，因此非常感谢社群对完成计算公式提供的所有帮助。<br/><br/>

                                所有计算器显示的数值都是近似值。 请不要仅从字面上理解它们。<br/><br/>

                                这里的数据最好用做参考样本。<br/><br/>

                                如果没有达到您的""期望""，请不要在 General Chat 频道中抱怨。<br/><br/>

                                本游戏已经通过顶级区块链审核机构的审核。<br/>
                                有关于它被人为操纵的说法是没有根据的。
                                <br/><br/></p>
                                
                                <div class="row">
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2" onClick={this.closeTab}>我不明白</button>
                                        </div>
                                        
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-secondary width-100 mobile-margin my-2 modal-text-small" onClick={this.closeTab}>我不明白</button>
                                        </div>
                                        </div>
                                        <div class="col-6">
                                        <div class="d-none d-lg-block">
                                            <button type="button" class="btn btn-custom mobile-margin my-2" data-bs-dismiss="modal">我明白</button>
                                        </div>
                                        <div class="d-xs-block d-sm-none">
                                            <button type="button" class="btn btn-custom mobile-margin my-2 modal-text-small" data-bs-dismiss="modal">我明白</button>
                                        </div>
                                        </div>
                                </div>
                                </div>

                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class="row"> 


                                <div class="col-11">

                                <div class={this.state.visEn+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Days</option>
                                        <option selected value="7">7 Days</option>
                                        <option value="15">15 Days</option>
                                        <option value="30">30 Days</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contract / Worker</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visESP+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                    <div class="col-1"></div>
                                    <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                    <option value="3">3 Días</option>
                                    <option selected value="7">7 Días</option>
                                    <option value="15">15 Días</option>
                                    <option value="30">30 Días</option>
                                    </select></div>
                                    <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contrato / Trabajador</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minteo</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visThai+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                    <div class="col-1"></div>
                                    <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                    <option value="3">3 วัน</option>
                                    <option selected value="7">7 วัน</option>
                                    <option value="15">15 วัน</option>
                                    <option value="30">30 วัน</option>
                                    </select></div>
                                    <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>ค่าต่อสัญญา/คนงาน</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>ค่าเปิดตัว/ยาน ใหม่</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visGER+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3 "><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Tage</option>
                                        <option selected value="7">7 Tage</option>
                                        <option value="15">15 Tage</option>
                                        <option value="30">30 Tage</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Vertrag / Arbeiter</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Prägung</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visINDO+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3  "><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Hari</option>
                                        <option selected value="7">7 Hari</option>
                                        <option value="15">15 Hari</option>
                                        <option value="30">30 Hari</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Kontrak / Pekerja</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visPER+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3  "><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 روز</option>
                                        <option selected value="7">7 روز</option>
                                        <option value="15">15 روز</option>
                                        <option value="30">30 روز</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><span class="text-primary">ETL</span> <b>قرارداد/کارگر</b> -{'>'} <span class="text-primary">{this.getContractCost()}</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"><span class="text-primary">ETL</span> <b>استخراج</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)}</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visGREEK+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3  "><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Ημέρες</option>
                                        <option selected value="7">7 Ημέρες</option>
                                        <option value="15">15 Ημέρες</option>
                                        <option value="30">30 Ημέρες</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Συμβόλαιο / Εργάτη</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visBRPT+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3  "><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Dias</option>
                                        <option selected value="7">7 Dias</option>
                                        <option value="15">15 Dias</option>
                                        <option value="30">30 Dias</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contrato / Trabalhador</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Cunhagem</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visFR+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Jours</option>
                                        <option selected value="7">7 Jours</option>
                                        <option value="15">15 Jours</option>
                                        <option value="30">30 Jours</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contrat par travailleur</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visITA+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 Giorni</option>
                                        <option selected value="7">7 Giorni</option>
                                        <option value="15">15 Giorni</option>
                                        <option value="30">30 Giorni</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contratto / Lavoratore</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visZHtr+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 天</option>
                                        <option selected value="7">7 天</option>
                                        <option value="15">15 天</option>
                                        <option value="30">30 天</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>合約/工人</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>鑄造</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                <div class={this.state.visZHsm+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4  row">
                                        <div class="col-1"></div>
                                        <div class="col-3">
                                            <select class="form-select text-left-default getEternalHeader select-currency pl-6" onChange={this.setCurrency} aria-label="Default select">
                                            <option selected value="USD">$ - USD</option>
                                            <option value="PHP">₱ - PHP</option>
                                            <option value="GBP">£ - GBP</option>
                                            <option value="EUR">€ - EUR</option>
                                            <option value="BRL">R$ - BRL</option>
                                            <option value="SGD">S$ - SGD</option>
                                            <option value="THB">฿ - THB</option>
                                            <option value="TWD">NT$ - TWD</option>
                                            <option value="CNY">¥ - CNY</option>
                                            <option value="INR">₹ - INR</option>
                                            </select>
                                        </div>
                                        <div class="col-4 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>/ ETL</b> -{'>'} <span class="text-primary">{this.getETLvsCurrency()}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option value="3">3 天</option>
                                        <option selected value="7">7 天</option>
                                        <option value="15">15 天</option>
                                        <option value="30">30 天</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>合约/工人</b> -{'>'} <span class="text-primary">{this.getContractCost()} ETL</span> </p></div>
                                    </div>
                                    <div class="col-4  mt-3">
                                        <p class="getEternalHeader text-center"> <b>铸造</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                                    </div>
                                </div>

                                </div>

                                {/* Lang Select */}
                                <div class="col-1">
                                <select class="form-select getEternalHeader select-lang" onChange={this.setVisLang} aria-label="Default select">
                                    <option selected value="EN">EN - ENG</option>
                                    <option value="ESP">ES - ESP</option>
                                    <option value="THAI">TH - THAI</option>
                                    <option value="GER">DE - GER</option>
                                    <option value="INDO">ID - INDO</option>
                                    <option value="PER">FA - PERS</option>
                                    <option value="GRK">EL - GREEK</option>
                                    <option value="BRPT">PT - BR</option>
                                    <option value="FR">FR - FRE</option>
                                    <option value="ITA">IT - ITA</option>
                                    <option value="ZHT">ZH - Trad</option>
                                    <option value="ZHS">ZH - Simp</option>
                                </select>
                                </div>

                            </div>
                            
                        </div>
                        {/* Mobile View */}
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            <div class="row d-flex sm-flex align-items-start border border-2 border-dark"> 
                                <p class="col-4 getEternalHeaderM mt-3"> <b>USD/ETL</b>:<br/>  <span class="text-primary">{parseFloat(this.state.eternalPrice).toFixed(2)}</span></p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Contract 7d: </b><br/> <span class="text-primary">{this.getContractCost()} ETL</span> </p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Minting</b>: <br/><span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(4)} ETL</span> </p>
                            </div>
                        </div>
                    </div>

                    <div class="contrainer-fluid">
                        <div class="my-3 row">
                            <div class="row d-none d-lg-block px-0 mx-0">

                                <div class={this.state.visEn+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>Info</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculator</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>Validated with frifster#1185 (Master Papink's) A Rank 5100MP Fleet.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>Fuel Values (Adjusted) are from the game. New Oracle values from Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visESP+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-3"} onClick={this.btnVisNrm}>Info</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-3"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculadora</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo+" text-size-fit-2"}>Validado con la flota de frifster#1185 (Master Papink) Rango A de 5100MP</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-fit-2"}>Los valores de Combustible (Ajustados) provienen del juego. Nuevos valores del Oráculo proporcionados por Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visThai+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-2"} onClick={this.btnVisNrm}>รายละเอียด</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-2"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">คำนวณ</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>Validated with frifster#1185 (Master Papink's) A Rank 5100MP Fleet.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>Fuel Values (Adjusted) are from the game. New Oracle values from Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visGER+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>Info</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Rechner</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>Bestätigt durch frifster#1185 (Master Papink's) A Rank 5100MP Flotte.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>Treibstoffwerte (angepasst) sind aus dem Spiel. Neue Oracle Werte von Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visINDO+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>Info</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Kalkulator</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo+" text-size-fit-2"}>Divalidasi dengan frifster#1185 (Master Papink's) Armada Ranking A 5100MP.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-fit-2"}>Nilai Bahan Bakar (Disesuaikan) adalah berasal dari permainan. Nilai Oracle Baru dari Danii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visPER+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit"} onClick={this.btnVisNrm}>اطلاعات</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">ماشین‌ حساب</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>تایید شده توسط frifster#1185</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>مقادیر سوخت (تنظیم شده) از بازی است. مقادیر جدید اوراکل از Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visGREEK+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-1"} onClick={this.btnVisNrm}>Πληροφορίες</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-1"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Αριθμομηχανή</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo+" text-size-fit"}>Επικυρώθηκε απο frifster#1185 (Master Papink's) με A Rank 5100MP Fleet.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-fit"}>Οι τιμές Καυσίμου(προσαρμοσμένες) είναι από το παιχνίδι. Οι καινούριες τιμές του Oracle είναι από Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visBRPT+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-3"} onClick={this.btnVisNrm}>Informação</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-3"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculadora</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo+" text-size-fit-1"}>Validado com a uma frota de 5100MP Ranque A de frifster#1185 (Master Papink's)</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-fit-1"}>Preços de Combustível (Ajustados) são do jogo. Novos valores do Oráculo por Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visFR+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-2"} onClick={this.btnVisNrm}>Informations</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-2"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculatrice</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>Validé avec la flotte rang A 4900 MP de frifster#1185 (Master Papink's)</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>La valeur de l'essence (ajusté) provient du jeu. Les nouvelles valeurs de l'oracle viennent de Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visITA+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo+" text-size-fit-2"} onClick={this.btnVisNrm}>Info</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet+" text-size-fit-2"} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calcolatrice</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo+" text-size-fit-1"}>Convalidato con la flotta di frifster#1185 (Master Papink's) Flotta Grado A di 5100MP.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-fit-1"}>Valori del combustibile (Aggiustati) sono dal gioco. I nuovi valori dell'Oracolo sono di Danni ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visZHtr+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>資訊</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">計算器</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>已經過 frifster#1185 (Papink | Rin's Disciple) A Rank 5100MP 艦隊驗證.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>油價(已調整)來源於遊戲。新預言機價格來源於 Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>

                                <div class={this.state.visZHsm+" row col-12"}>
                                    <div class="col-5 row">
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>信息</button>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">计算器</button>
                                        </div>
                                        <div class="col-8">
                                            <p class={this.state.sheetInfo}>已经过frifster#1185 （Papink | Rin's Disciple） A Rank 5100MP 艦隊验证.</p>
                                        </div>
                                    </div>
                                    <div class="col-7 row">
                                        <div class="col-12">
                                            <p class={this.state.sheetInfo+" text-size-14"}>油价（已调整）来源于游戏。 新预言机价来源于 Dannii ❤#3151</p>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div class="row px-0 mx-0">
                                <div class="col-2"></div>


                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visEn}>

                                    <div class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">Workers:</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Fleet Rank:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">Fleet Level:</p>
                                    </div>
                                    <div class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visESP}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Trabajadores:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Rango de Flota:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Nivel de Flota:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visThai}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">จำนวนคนงาน:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">แรงค์กองยาน:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">เลเวลกองยาน:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visGER}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Arbeiter:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Flotten Rang:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Flotten Level:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visINDO}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Pekerja:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Ranking Armada:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Level Armada:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visPER}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">ام‌پی(MP):</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">کارگرها:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">رتبه‌ی ناوگان:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">سطح ناوگان:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visGREEK}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Εργάτες:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Βαθμός Στόλου:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Επίπεδο Στόλου:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visBRPT}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Trabalhadores:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Ranque da Frota:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Level da Frota:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visFR}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">Puissance de minage:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Nombre de travailleur:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Rang de la flotte:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Niveau de la flotte:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visITA}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                        <p class="text-left">Lavoratori:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Grado di Flotta:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2 pt-2">
                                        <p class="text-left">Livello di Flotta:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visZHtr}>

                                    <div class="col-2 pt-2">
                                        <p class="text-left">挖掘力：</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">工人：</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">艦隊級別：</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">艦隊等級：</p>
                                    </div>
                                    <div class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>

                                <div class={this.state.inputVisFleet+" col-8 "+this.state.visZHsm}>

                                    <div class="col-2 pt-2">
                                        <p class="text-left">挖掘力：</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">工人：</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x">Avg MP: {this.getAverageWorkers()}</div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">舰队级别：</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">舰队等级：</p>
                                    </div>
                                    <div class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>

                                </div>


                                <div class="col-2"></div>
                                </div>
                            </div>

                            <div class="d-xs-block d-sm-none px-0 mx-0">
                                <div class="px-0 mx-0 row">
                                    <div class="col-6">
                                        <button type="button" class={this.state.btnHighlightInfo} onClick={this.btnVisNrm}>Info</button>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class={this.state.btnHighlightFleet} onClick={this.btnFleets} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculator</button>
                                    </div>
                                </div>
                                <div class={this.state.inputVisFleet+" col-12 pt-4 px-0 mx-0"}>

                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-4 pt-2">
                                        <p class="text-left-M">MP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-8">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">MP affects Success Rate (SR)</p></div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-4 pt-2">
                                        <p class="text-left-M">Workers:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-8">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Workers affect Contract Upkeep and Net Profit</p></div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-4 pt-2">
                                        <p class="text-left-M">Fleet Rank:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-8">
                                        <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                        <option selected value="D">D Rank</option>
                                        <option value="C">C Rank</option>
                                        <option value="B">B Rank</option>
                                        <option value="A">A Rank</option>
                                        <option value="S">S Rank</option>
                                        </select>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Fleet Ranks are: D, C, B, A, and S</p></div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-4 pt-2">
                                        <p class="text-left-M">Fleet Level:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-8">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Fleet Levels are 0 to 25, they increase rewards earned. Default is 0.</p></div>
                                </div>

                            </div>
                        </div>
                    </div>
                        <div id="normal" class={this.state.visibilityNormal}>
                            <div class="my-6">
                            <div class={this.state.visInfo+" row"}>
                                <div class="col-5">
                                    <p class="text-right1 my-2 pt-3">
                                    All Info can be found in: <b><a class="text-size-17" href="https://docs.cryptomines.app/" rel="noreferrer" target="_blank">CryptoMines Whitepaper</a> </b> <br/>
                                    Read the future plans of the game thru here: <b><a class="text-size-17" href="https://cryptomines.medium.com/lets-build-cryptomines-together-roadmap-2022-e3ba5d10a62" rel="noreferrer" target="_blank">CryptoMines 2022 Roadmap</a> </b> <br/><br/>
                                    
                                    What's New?<br/>
                                    ▪️ We now get our USD/ETL straight from Pancho <br/>&emsp;&emsp;(Courtesy of midgetino#9342 and h0m3us3r#1911)<br/>
                                    ▪️ You can now choose your currency fiat apart from USD (open for adding more).<br/>
                                    ▪️ 3 Days have been added. Default is still 7. <br/>
                                    <br/>

                                    Upcoming:<br/>
                                    ▪️ Until the updates for the changes are live, the sheet will remain as it is.<br/>
                                    ▪️ Mobile View is still in EN, has no day or language select. Will come back for it when I have the time.<br/>
                                    
                                    </p>
                                </div>
                                <div class="col-6">
                                    <p class="text-right1 my-2 pt-3">
                                    ▪️ Translation to other language in the works:<br/> 
                                    &emsp;&emsp; ESP/Spanish - Mod AwesomeD#8553 &#38; DaniSciB 🔱#9456<br/>
                                    &emsp;&emsp; DE/German - Maschs#6651<br/>
                                    &emsp;&emsp; FA/Persian - hesen7#1593<br/>
                                    &emsp;&emsp; ID/Indonesian - Mbun#1456<br/>
                                    &emsp;&emsp; EL/Greek - ExiLeD#3745<br/>
                                    &emsp;&emsp; PT/BR - midgetino#9342<br/>
                                    &emsp;&emsp; TH/Thai - KITTYPUNKZ#2657<br/>
                                    &emsp;&emsp; FR/FRE - Kelhom#0651<br/>
                                    &emsp;&emsp; IT/ITA - DaniSciB 🔱#9456<br/>
                                    &emsp;&emsp; Chinese Trad/Simp - BoogieMan#8590 &#38; Floatmachiatto#4399<br/>
                                    
                                    &emsp;&emsp; VI/Vietnam - No TL<br/><br/>
                                    DM Me in Discord if you want to help translate to your language not listed: Jucci#0007
                                    </p>
                                </div>
                                

                            </div>
                            </div>
                        </div>

                        <div id="fleet" class={this.state.visibilityFleet}>

                            <table>

                                <tr class={this.state.visEn+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                    <th class="border border-2 border-dark">Mine Reward ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Fuel Cost ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays}d Reward ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Fleet Contract / {this.state.selectDays}d (ETL)</th>
                                    <th class="border border-2 border-dark">Fleet Contract / {this.state.selectDays}d ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Net Profit / {this.state.selectDays}d</th>
                                    <th class="border border-2 border-dark">Net Profit - Fuel / {this.state.selectDays}d</th>
                                </tr>

                                <tr class={this.state.visESP+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planeta</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oráculo</th>
                                    <th class="border border-2 border-dark">Recompensa de Minado (ETL)</th>
                                    <th class="border border-2 border-dark">Recompensa de Minado ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Costo de Combustible ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Tasa de éxito (TE)</th>
                                    <th class="border border-2 border-dark">Recompensa de {this.state.selectDays} Días * TE ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Contrato de Flota / {this.state.selectDays} Días (ETL)</th>
                                    <th class="border border-2 border-dark">Contrato de Flota / {this.state.selectDays} Días ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Beneficio Neto / {this.state.selectDays} Días </th>
                                    <th class="border border-2 border-dark">Beneficio Neto - Costo de Combustible / {this.state.selectDays} Días</th>
                                </tr>

                                <tr class={this.state.visThai+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">ดาว</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">รางวัลที่ได้ (ETL)</th>
                                    <th class="border border-2 border-dark">รางวัลที่ได้ ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">ค่าน้ำมัน ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">อัตราการขุดสำเร็จ</th>
                                    <th class="border border-2 border-dark">รางวัล {this.state.selectDays} วัน * อัตราขุดสำเร็จ ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">ค่าสัญญาคนงาน {this.state.selectDays} วัน (ETL)</th>
                                    <th class="border border-2 border-dark">ค่าสัญญาคนงาน {this.state.selectDays} วัน ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">รางวัลสุทธิทั้งหมด {this.state.selectDays} วัน</th>
                                    <th class="border border-2 border-dark">รางวัลทั้งหมด หลังหักค่าน้ำมัน {this.state.selectDays} วัน</th>
                                </tr>

                                <tr class={this.state.visGER+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">Minenbelohnung (ETL)</th>
                                    <th class="border border-2 border-dark">Minenbelohnung ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Treibstoffkosten ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Gewinnwahrscheinlichkeit (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays} Tage Belohnung ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Flotten Vertrag / {this.state.selectDays} Tage (ETL)</th>
                                    <th class="border border-2 border-dark">Flotten Vertrag / {this.state.selectDays} Tage ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Netto Profit / {this.state.selectDays} Tage </th>
                                    <th class="border border-2 border-dark">Netto Profit - Treibstoff / {this.state.selectDays} Tage</th>
                                </tr>

                                <tr class={this.state.visINDO+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">Hadiah Pertambangan (ETL)</th>
                                    <th class="border border-2 border-dark">Hadiah Pertambangan ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Harga Bahan Bakar ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Tingkat Keberhasilan (SR)</th>
                                    <th class="border border-2 border-dark">Hadiah {this.state.selectDays}H ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Kontrak Armada / {this.state.selectDays}H (ETL)</th>
                                    <th class="border border-2 border-dark">Kontrak Armada / {this.state.selectDays}H ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Laba Bersih / {this.state.selectDays}H</th>
                                    <th class="border border-2 border-dark">Laba Bersih - Bahan Bakar / {this.state.selectDays}H</th>
                                </tr>

                                <tr class={this.state.visPER+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">سیاره</th>
                                    <th class="border border-2 border-dark">ام پی(MP)</th>
                                    <th class="border border-2 border-dark">اوراکل</th>
                                    <th class="border border-2 border-dark">پاداش استخراج (اترنالی)</th>
                                    <th class="border border-2 border-dark">پاداش استخراج ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">هزینه‌ سوخت ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">میزان موفقیت (م‌م)</th>
                                    <th class="border border-2 border-dark">پاداش {this.state.selectDays} روز ({this.state.currency}) * م‌م</th>
                                    <th class="border border-2 border-dark">قرارداد ناوگان / {this.state.selectDays} روز (اترنالی)</th>
                                    <th class="border border-2 border-dark">قرارداد ناوگان / {this.state.selectDays} روز ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">سود خالص / {this.state.selectDays} روز</th>
                                    <th class="border border-2 border-dark">سود خالص با کسر سوخت / {this.state.selectDays} روز</th>
                                </tr>

                                <tr class={this.state.visGREEK+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Πλανήτης</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">Ανταμοιβή απο Mining (ELT)</th>
                                    <th class="border border-2 border-dark">Ανταμοιβή απο Mining ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Κόστος Καυσίμου ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Ποσοστό Επιτυχίας (ΠΕ)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays} μέρες ανταμοιβής ({this.state.currency}) * (ΠΕ)</th>
                                    <th class="border border-2 border-dark">Συμβόλαιο Στόλου / {this.state.selectDays} μέρες (ETL)</th>
                                    <th class="border border-2 border-dark">Συμβόλαιο Στόλου / {this.state.selectDays} μέρες ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Καθαρό Κέρδος / {this.state.selectDays} μέρες</th>
                                    <th class="border border-2 border-dark">Καθαρό Κέρδος - Καύσιμο / {this.state.selectDays} μέρες</th>
                                </tr>

                                <tr class={this.state.visBRPT+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planeta</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oráculo</th>
                                    <th class="border border-2 border-dark">Recompensa (ETL)</th>
                                    <th class="border border-2 border-dark">Recompensa ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Taxa de Combustível ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Taxa de Sucesso (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays}d Recompensa ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Contrato da Frota {this.state.selectDays}d (ETL)</th>
                                    <th class="border border-2 border-dark">Contrato da Frota {this.state.selectDays}d ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Lucro Bruto / {this.state.selectDays}d</th>
                                    <th class="border border-2 border-dark">Lucro Bruto - Combustível / {this.state.selectDays}d</th>
                                </tr>

                                <tr class={this.state.visFR+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Planète</th>
                                    <th class="border border-2 border-dark">Puissance de minage</th>
                                    <th class="border border-2 border-dark">Oracle</th>
                                    <th class="border border-2 border-dark">Récompense de minage (ETL)</th>
                                    <th class="border border-2 border-dark">Récompense de minage ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Coût de l'essence ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Pourcentage de réussite (SR)</th>
                                    <th class="border border-2 border-dark">Récompense sur{this.state.selectDays}j ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Contrat de la flotte / {this.state.selectDays}j (ETL)</th>
                                    <th class="border border-2 border-dark">Contrat de la flotte / {this.state.selectDays}j ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Profit net / {this.state.selectDays}j</th>
                                    <th class="border border-2 border-dark">Profit net - essence / {this.state.selectDays}j</th>
                                </tr>

                                <tr class={this.state.visITA+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Pianeta</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracolo</th>
                                    <th class="border border-2 border-dark">Ricompense in Miniera (ETL)</th>
                                    <th class="border border-2 border-dark">Ricompense in Miniera ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Costo del Combustibile ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Tasso di Successo (TS)</th>
                                    <th class="border border-2 border-dark">Ricompensa di {this.state.selectDays} Giorni * TS ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Contratto di Flotta / {this.state.selectDays} Giorni (ETL)</th>
                                    <th class="border border-2 border-dark">Contratto di Flotta / {this.state.selectDays} Giorni ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Utile Netto / {this.state.selectDays} Giorni</th>
                                    <th class="border border-2 border-dark">Utile Netto - Combustibile / {this.state.selectDays} Giorni</th>
                                </tr>

                                <tr class={this.state.visZHtr+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">行星</th>
                                    <th class="border border-2 border-dark">挖掘力</th>
                                    <th class="border border-2 border-dark">預言機</th>
                                    <th class="border border-2 border-dark">挖礦獎勵 (ETL)</th>
                                    <th class="border border-2 border-dark">挖礦獎勵 ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">油費 ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">勝率 (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays}d獎勵 ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">艦隊合約 / {this.state.selectDays}d (ETL)</th>
                                    <th class="border border-2 border-dark">艦隊合約 / {this.state.selectDays}d ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">淨利潤 / {this.state.selectDays}d</th>
                                    <th class="border border-2 border-dark">淨利潤 - 油費 / {this.state.selectDays}d</th>
                                </tr>

                                <tr class={this.state.visZHsm+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">行星</th>
                                    <th class="border border-2 border-dark">挖掘力</th>
                                    <th class="border border-2 border-dark">预言机</th>
                                    <th class="border border-2 border-dark">挖矿奖励 (ETL)</th>
                                    <th class="border border-2 border-dark">挖矿奖励 ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">油费 ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">胜率 (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays}d奖励 ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">舰队合约 / {this.state.selectDays}d (ETL)</th>
                                    <th class="border border-2 border-dark">舰队合约 / {this.state.selectDays}d ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">净利润 / {this.state.selectDays}d</th>
                                    <th class="border border-2 border-dark">净利润 - 油费 / {this.state.selectDays}d</th>
                                </tr>

                                {/* Fleet */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.planets[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetMineETL(i)} ETL</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFleetMineUSDM(i)}</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFuelM(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getFleetSuccessChanceM(i)}%</b></td>
                                                <td class="border border-secondary">{this.getFleetSRvsUSD(i)}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetContractCostETL()} ETL</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFleetContractCostUSD()}</td>
                                                <td class="border border-secondary">{this.getFleetNet(i)}</td>
                                                <td class="border border-secondary">{this.getFleetNetFuel(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>


                        </div>
                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class={this.state.visCredits}>
                                <div class="row align-items-start mt-6">
                                    
                                    <div class="col-6">
                                        <p class="disclaimer">
                                        Disclaimer: 
                                        <br/>ORM Matrix is based on observation and not actual value (unless the devs gives us the Data).
                                        <br/>
                                        All values are approximation and should only be used as a template. 
                                        <br/>
                                        ETL/USD updates are from Pancho's Logs in this <a href="https://bscscan.com/address/0x1A652dEa38B3522106D1675dbe5fc222e831fE8c" rel="noreferrer" target="_blank">Address</a>
                                        <br/>
                                        Mobile View is still in EN. Will update it when I'm free.
                                        </p>
                                        
                                    </div>
                                    <div class="col-6">
                                        <p class="credits text-info">
                                        Original Sheet and Oracle Values by: starl3xx#2691
                                        <br/>
                                        New Oracle Values by: Dannii ❤#3151
                                        <br/>
                                        Found bugs? Want to help? DM me directly in Discord: Jucci#0007
                                        <br/>
                                        If you found this sheet helpful: <button class="btn text-size-12 text-info px-0 mx-0 mb-0 py-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button> 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            
                            <div class={this.state.visCredits}>
                                <div class="row mt-2">
                                <div class="col-12">
                                    
                                    <p class="disclaimer1">
                                    Disclaimer: 
                                    <br/>ORM Matrix is based on observation and not actual value (unless the devs gives us the Data).
                                    <br/>
                                    All values are approximation and should only be used as a template. 
                                    <br/>
                                    ETL/USD updates are from Pancho's Logs in this <a href="https://bscscan.com/address/0x1A652dEa38B3522106D1675dbe5fc222e831fE8c" rel="noreferrer" target="_blank">Address</a>
                                    <br/>
                                    Mobile View is still in EN. Will update it when I'm free.
                                    </p>
                                </div>
                                <div class="col-12">
                                    <p class="credits1 text-info">
                                    Original Sheet and Oracle Values by: starl3xx#2691
                                    <br/>
                                    New Oracle Values by: Dannii ❤#3151
                                    <br/>
                                    Made by: Discord @ Jucci#0007
                                    <br/>
                                    Found bugs? Want to help? DM me directly.
                                    <br/>
                                    If you found this sheet helpful: <br/><button class="btn text-info px-0 mx-0 text-size-10" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button>
                                    </p>

                                    <div className="copyonclick">

                                    </div>
                                </div>
                                        
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default GetEternal
