import React, { Component } from 'react'
import './App.css';
import './table.css';


class GetEternal extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            mp: 0,
            workers: 0,
            eternalPrice: 0,
            updateTimer: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            planets: ["Odrocury","Thabbiter","Pulmeron","Ecryria","Searus","Gemia","Malphus","Neuter","Grarvis 022","Sorth 33A5","Dutrabos","Lustronides","Zullosie","Yimagua","Haostea","Kongebro","Vuruturn","Droxuyama","Miuq I11","Zapus 5M0","Begelia","Gochimars","Konvides","Donvillon","Ania","Aenerth","Tachiron","Cichurilia","Gagua 07","Sector G"],
            oracle_adjustment: [1,2,3,4.125,5.25,6.5,7.75,9,10.25,11.625,14.375,16.125,18,19.875,22.375,24.125,26.5,28.875,31.375,34,44.5,48.5,52.75,57.25,62,67.125,72.5,78.25,84.25,90.75],
            worker_count: [2,2,3,4,4,6,7,8,9,10,11,12,12,13,13,14,14,15,15,16,17,18,19,20,21,22,23,24,25,26],
            success_chance: [0.88,0.86,0.84,0.82,0.80,0.78,0.76,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.54,0.52,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50],
            visibilityNormal: "",
            visibilityVeteran: "d-none",
            visibilityFleet:"d-none",
            sheetType: "Normal Sheet",
            inputVisVet: "d-none",
            inputVisFleet: "d-none",

            d_success_chance: [0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.71,0.69,0.67,0.6,0.58,0.56,0.54,0.52,0.50,0.48,0.46,0.44,0.42,0.41,0.41,0.41,0.41,0.41,0.39,0.39,0.39,0.39,0.39],
            c_success_chance: [0.88,0.86,0.84,0.82,0.8,0.78,0.76,0.74,0.72,0.70,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.43,0.43,0.43,0.43,0.43,0.40,0.40,0.40,0.40,0.40],
            b_success_chance: [0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.47,0.47,0.47,0.47,0.45,0.45,0.45,0.45,0.45],
            a_success_chance: [0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.71,0.69,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.52,0.52,0.52,0.52,0.52,0.50,0.50,0.50,0.50,0.50],
            s_success_chance: [0.97,0.95,0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.55,0.55,0.55,0.55,0.55,0.53,0.53,0.53,0.53,0.53],
            fleet_rank: "",
            fleet_level: 0,
            rank_reward: [1,1.01,1.02,1.03,1.04,1.05,1.1,1.12,1.14,1.16,1.20,1.205,1.21,1.215,1.22,1.225,1.25,1.255,1.26,1.265,1.27,1.3,1.305,1.31,1.315,1.35],
        }
        
        this.setMP = this.setMP.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setFleetLevel = this.setFleetLevel.bind(this);
        this.setFleetRank = this.setFleetRank.bind(this);
    }

    async loadData(){
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=cryptomines-eternal&vs_currencies=usd"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({eternalPrice: data["cryptomines-eternal"]["usd"]})
        console.log(data);
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 2000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }


    // Normal

    getMinePower(i){
        return this.state.minepower[i]
    }

    getMineETL(i){
        return parseFloat(this.getMineUSD(i)/this.state.eternalPrice).toFixed(3)
    }

    getMineUSD(i){
        return parseFloat(5.0 * this.state.oracle_adjustment[i]).toFixed(2)
    }

    getSuccessChance(i){
        return parseFloat(this.state.success_chance[i] * 100).toFixed(0)
    }

    getRewardsVersusSuccess(i){
        return parseFloat(this.getMineUSD(i)*7 * this.state.success_chance[i]).toFixed(2)
    }

    getContractCost(i){
        return parseFloat(((7*this.state.worker_count[i])/this.state.eternalPrice)).toFixed(3)
    }

    getNetProfit(i){
        return parseFloat(this.getRewardsVersusSuccess(i) - (this.state.worker_count[i]*7)).toFixed(2)
    }
    
    // Veteran
    getVetContractCost(){
        return parseFloat(((7*this.state.workers)/this.state.eternalPrice)).toFixed(3)
    }
    getVetRewardsVersusSuccess(i){
        return parseFloat(this.getMineUSD(i)*7 * this.getMPvsSRforNET(i) / 100).toFixed(2)
    }
    getMPvsSR(i){
        if (this.state.mp > 4899) {
            return '88%'
        } else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return '88%'
            } else if (answer < 50 || this.state.mp < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return this.getSuccessChance(i)+'%'
        }
    }
    //Cloned MP vs SR to use for NetProfit Calculation
    getMPvsSRforNET(i){
        if (this.state.mp > 4899) {
            return 88
        } else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return '88'
            } else if ( answer < 50){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return this.getSuccessChance(i)
        }
    }

    getAdjustedNetProfit(i){
        return parseFloat(((this.getMineUSD(i)*7) * (this.getMPvsSRforNET(i)/100)) - (this.state.workers*7)).toFixed(2)
    }

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

    btnVisNrm = () => {
        this.setState({visibilityNormal: "", visibilityVeteran: "d-none", visibilityFleet: "d-none", inputVisVet: "d-none", inputVisFleet: "d-none", sheetType:"Normal Sheet"})
    }
    btnVisVet = () => {
        this.setState({visibilityVeteran: "", visibilityNormal: "d-none", visibilityFleet: "d-none", inputVisVet: "col-7 row", inputVisFleet: "d-none", sheetType:"Veteran/Input Sheet"})
    }
    btnFleets = () => {
        this.setState({visibilityVeteran: "d-none", visibilityNormal: "d-none", visibilityFleet: "", inputVisVet: "d-none", inputVisFleet: "col-7 row", sheetType:"Fleet Sheet"})
    }


    //(Who called in the) Fleet

    getFleetMineETL(i){
        return parseFloat( ((this.getMineUSD(i)/this.state.eternalPrice) * 0.95) * this.state.rank_reward[this.state.fleet_level] ).toFixed(3)
    }

    getFleetMineUSD(i){
        return parseFloat( ((5.0 * this.state.oracle_adjustment[i]) * 0.95 ) * this.state.rank_reward[this.state.fleet_level] ).toFixed(2)
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
            return this.getFleetDSRM(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSRM(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSRM(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASRM(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSRM(i)
        }   
    }

    getFleetDSR(i){
        if (this.state.mp > 5599) {
            return 91
        } else if (this.state.mp > 1499 && this.state.mp < 5600) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return 91
            } else if (answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetDSRM(i){
        if (this.state.mp > 5599) {
            return '91%'
        } else if (this.state.mp > 1499 && this.state.mp < 5600) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return '91%'
            } else if (answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetCSR(i){
        if (this.state.mp > 5549) {
            return 91
        } else if (this.state.mp > 1499 && this.state.mp < 5550) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return 91
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetCSRM(i){
        if (this.state.mp > 5549) {
            return 91+'%'
        } else if (this.state.mp > 1499 && this.state.mp < 5550) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return 91+'%'
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i] ){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetBSR(i){
        if (this.state.mp > 5299) {
            return 91
        } else if (this.state.mp > 1499 && this.state.mp < 5300) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return 91
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetBSRM(i){
        if (this.state.mp > 5299) {
            return 91+'%'
        } else if (this.state.mp > 1499 && this.state.mp < 5300) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91){
                return 91+'%'
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetASR(i){
        if (this.state.mp > 5049 && i ===0) {
            return 93
        } else if (this.state.mp > 5049 && i !==0){
            return 91
        }
        
        else if (this.state.mp > 1499 && this.state.mp < 5050) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 93
            } else if (answer > 91 && i !== 0){
                return 91
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetASRM(i){
        if (this.state.mp > 5049 && i ===0) {
            return 93+'%'
        } else if (this.state.mp > 5049 && i !==0){
            return 91+'%'
        }
        
        else if (this.state.mp > 1499 && this.state.mp < 5050) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 93+'%'
            } else if (answer > 91 && i !== 0){
                return 91+'%'
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
        }
    }


    getFleetSSR(i){
        if (this.state.mp > 4899 && i === 0){
            return 97
        } else if (this.state.mp > 4899 && i === 1){
            return 95
        } else if (this.state.mp > 4899 && i === 2){
            return 93
        } else if (this.state.mp > 4899 && i === 3){
            return 91
        } else if (this.state.mp > 4899 && i !== 3){
            return 91
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 97
            } else if (answer > 91 && i === 1){
                return 95
            } else if (answer > 91 && i === 2){
                return 93
            } else if (answer > 91 && i === 3){
                return 91
            } else if (answer > 91 && i !== 3){
                return 91
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
        }
    }
    getFleetSSRM(i){
        if (this.state.mp > 4899 && i === 0){
            return 97+'%'
        } else if (this.state.mp > 4899 && i === 1){
            return 95+'%'
        } else if (this.state.mp > 4899 && i === 2){
            return 93+'%'
        } else if (this.state.mp > 4899 && i === 3){
            return 91+'%'
        } else if (this.state.mp > 4899 && i !== 3){
            return 91+'%'
        }
        else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 91 && i === 0){
                return 97+'%'
            } else if (answer > 91 && i === 1){
                return 95+'%'
            } else if (answer > 91 && i === 2){
                return 93+'%'
            } else if (answer > 91 && i === 3){
                return 91+'%'
            } else if (answer > 91 && i !== 3){
                return 91+'%'
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
        }
    }

    getFleetSRvsUSD(i){
        return parseFloat(this.getFleetMineUSD(i)*7 * this.getFleetSuccessChance(i) / 100).toFixed(2)
    }

    getFleetNet(i){
        return parseFloat(((this.getFleetMineUSD(i)*7) * (this.getFleetSuccessChance(i)/100)) - (this.state.workers*7)).toFixed(2)
    }



    render(){
        return(
            <div class="container-fixed mx-5">
                <div class="container-fluid mx-2">
                    <div class="container-fluid">
                        <div class="row align-items-start border border-2 border-dark"> 
                            <p class="col-4 getEternalHeader mt-3"> <b>USD/ETL</b> -{'>'} <span class="text-primary">{this.state.eternalPrice}</span></p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Contract (7 Days) / Worker</b> -{'>'} <span class="text-primary">{parseFloat(7/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                        </div>
                    </div>

                    <div class="contrainer-fluid">
                        <div class="my-3 row">
                            <div class="col-5 row">
                                <div class="col-2">
                                    <button type="button" class="btn btn-custom" onClick={this.btnVisNrm}>Normal</button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-custom" onClick={this.btnVisVet}>Input MP</button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-custom" onClick={this.btnFleets}>Fleets</button>
                                </div>
                                <div class="col-6">
                                    <p class="text-center mt-2">{this.state.sheetType}</p>
                                </div>
                            </div>


                            <div class={this.state.inputVisVet}>
                                <div class="col-2 pt-2">
                                    <p class="text-left">MP:</p>
                                </div>
                                <div class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setMP}></input>
                                </div>
                                <div class="col-2 pt-2">
                                    <p class="text-left">Workers:</p>
                                </div>
                                <div class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setWorkers}></input>
                                </div>
                            </div>

                            <div class={this.state.inputVisFleet}>
                                <div title="MP affects Success Rate (SR)" class="col-2 pt-2">
                                    <p class="text-left">MP:</p>
                                </div>
                                <div title="MP affects Success Rate (SR)" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setMP}></input>
                                </div>
                                <div title="Workers affect Contract Upkeep and Net Profit" class="col-2 pt-2">
                                    <p class="text-left">Workers:</p>
                                </div>
                                <div title="Workers affect Contract Upkeep and Net Profit" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setWorkers}></input>
                                </div>

                                <div class="col-4 mt-2"><p class="text-right">Hover on the fields to show tool-tip</p></div>

                                <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                    <p class="text-left">Fleet Rank:</p>
                                </div>
                                <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setFleetRank}></input>
                                </div>
                                <div title="Fleet Levels are 0 to 25, they increase rewards earned" class="col-2 pt-2">
                                    <p class="text-left">Fleet Level:</p>
                                </div>
                                <div title="Fleet Levels are 0 to 25, they increase rewards earned" class="col-2">
                                    <input type="text" class="input-group-text" onChange={this.setFleetLevel}></input>
                                </div>

                                <div class="col-4 mt-2"><p class="text-right">Input Fleet Rank to show Success Rates</p></div>

                            </div>


                        </div>
                    </div>

                        <div id="normal" class={this.state.visibilityNormal}>
                        <table>
                            <tr class="border border-dark">
                                <th class="border border-2 border-dark">#</th>
                                <th class="border border-2 border-dark">Planet</th>
                                <th class="border border-2 border-dark">MP</th>
                                <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                <th class="border border-2 border-dark">Success Rate (SR)</th>
                                <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                <th class="border border-2 border-dark">Est. Workers</th>
                                <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                <th class="border border-2 border-dark">Net Profit / 7d</th>
                            </tr>
                            {/* Normal */}
                            {(() => {
                                const print = [];
                                for (let i=0; i<30; i++){
                                    print.push(
                                        <tr>
                                            <td class="border border-secondary">{i+1}</td>
                                            <td class="border border-secondary">{this.state.planets[i]}</td>
                                            <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                            <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                            <td class="border border-secondary text-primary">{this.getMineETL(i)} ETL</td>
                                            <td class="border border-secondary">${this.getMineUSD(i)}</td>
                                            <td class="border border-secondary text-secondary"><b>{this.getSuccessChance(i)}%</b></td>
                                            <td class="border border-secondary">${this.getRewardsVersusSuccess(i)}</td>
                                            <td class="border border-secondary">{this.state.worker_count[i]}</td>
                                            <td class="border border-secondary text-primary">{this.getContractCost(i)} ETL</td>
                                            <td class="border border-secondary">${this.getNetProfit(i)}</td>
                                        </tr>
                                    )
                                }
                                return print
                            })()}
                            </table>
                        </div>

                        <div id="veteran" class={this.state.visibilityVeteran}>
                            <table>
                                <tr class="border border-dark">
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                    <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                    <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                    <th class="border border-2 border-dark">Est. Workers</th>
                                    <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                    <th class="border border-2 border-dark">Net Profit / 7d</th>
                                </tr>
                                {/* Veteran */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.planets[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                                <td class="border border-secondary text-primary">{this.getMineETL(i)} ETL</td>
                                                <td class="border border-secondary">${this.getMineUSD(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getMPvsSR(i)}</b></td>
                                                <td class="border border-secondary">${this.getVetRewardsVersusSuccess(i)}</td>
                                                <td class="border border-secondary">{this.state.workers}</td>
                                                <td class="border border-secondary text-primary">{this.getVetContractCost()} ETL</td>
                                                <td class="border border-secondary">${this.getAdjustedNetProfit(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>
                        </div>

                        <div id="veteran" class={this.state.visibilityFleet}>
                            <table>
                                <tr class="border border-dark">
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                    <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                    <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                    <th class="border border-2 border-dark">Est. Workers</th>
                                    <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                    <th class="border border-2 border-dark">Net Profit / 7d</th>
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
                                                <td class="border border-secondary">${this.getFleetMineUSD(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getFleetSuccessChanceM(i)}</b></td>
                                                <td class="border border-secondary">${this.getFleetSRvsUSD(i)}</td>
                                                <td class="border border-secondary">{this.state.workers}</td>
                                                <td class="border border-secondary text-primary">{this.getVetContractCost()} ETL</td>
                                                <td class="border border-secondary">${this.getFleetNet(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>
                        </div>


                        <div class="row align-items-start mt-2">
                            <div class="col-6">
                                <p class="disclaimer">
                                Disclaimer: ORM Matrix is based on observation and not actual value (unless the devs gives us the Data).
                                <br/>
                                All values are approximation and should only be used as a template. ETL/USD updates are every 2 seconds.
                                <br/>
                                Mobile View is currently non-existent. You have been warned. <strike>I'll get back to it if I'm not busy.</strike>
                                </p>
                                
                            </div>
                            <div class="col-6">
                                <p class="credits text-info">
                                Original Sheet and ORM Matrix by: Discord@starl3xx#2691
                                <br/>
                                Made by: Discord@Jucci#0007
                                <br/>
                                Found bugs? Want to help? Send us a message.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default GetEternal
