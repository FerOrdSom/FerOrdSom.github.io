

class Simulation {

    constructor() {
        this.simulation_step = 0;
    }
    step() {
        this.simulation_step += 1;
    }
    getSimulationTimeMs() {
        return this.simulation_step * 1000;
    }
}


class Runner {

    constructor(simulation) {
        this.simulation = simulation;
        this.start_time = null;
        this.start_simulation_time = null;
        this.timer = null;
    }
    start() {
        this.start_time = new Date().getTime();
        this.start_simulation_time = this.simulation.getSimulationTimeMs();
        console.log("start sim time value after start(): ", this.simulation.getSimulationTimeMs());
        this.loop();
    }
    stop() {
        this.start_time = null;
        this.start_sim_time = null;
        this.timer = null;
    }
    getDrift() {
        const elapsed_time = new Date().getTime() - this.start_time;
        console.log("elapsed_time: " + elapsed_time);
        const elapsed_simulation_time = this.simulation.getSimulationTimeMs() - this.start_simulation_time;
        console.log("elapsed_sim_time: " + elapsed_simulation_time);
        const drift = elapsed_time - elapsed_simulation_time;
        console.log("drift: " + drift);
        return drift;
    }
    loop(){
        console.log("in loop");
               
        this.simulation.step();
        const drift = this.getDrift();
        let delay = null;
        delay = 1000;        
        let sleep_time = Math.max(0, delay - drift);
        console.log("sleep_time: ", sleep_time);
        this.timer = setTimeout(() => {this.loop()}, sleep_time);
                
        
    }
}

let simulation_1 = new Simulation();
// console.log("start sim time: ", simulation_1.getSimulationTimeMs());
let runner = new Runner(simulation_1);
runner.start();
// console.log("start_time: ", runner.start_time, " start sim time: ", runner.start_simulation_time);



// setTimeout(runner.loop(), 1000);



