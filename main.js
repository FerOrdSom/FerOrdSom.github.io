let paragraph = document.createElement("p")
paragraph.innerText="Great, my script works"
document.body.appendChild(paragraph)

class Simulation {

    constructor() {
        this.simulation_step = 0;
    }
    step() {
        this.simulation_step += 1;
        paragraph.innerText = "Currently on step " + this.simulation_step + " of the simulation";
    }
    getSimulationTimeMs() {
        return this.simulation_step * 1000;
    }
}

//compares real and sim times and 
class Runner {

    constructor(simulation) {
        this.simulation = simulation;
        this.start_time = null;
        this.start_simulation_time = null;
        this.timer = null;
    }

    start() {
        this.start_time = new Date();
        this.start_simulation_time = getSimulationTimeMs();
        this.loop();
    }

    stop() {
        this.start_time = null;
        this.start_sim_time = null;
        this.timer = null
    }

    getDrift(){
        const elapsed_time = (new Date()) - this.start_time;
        const elapsed_simulation_time = this.simulation.getSimulationTimeMs() - this.start_simulation_time;
        const drift =  elapsed_time - elapsed_simulation_time;
        return drift;
    }

    loop() {
        this.simulation.step();
        const delay = 100;
        const sleep_time = Math.max(0, delay - this.getDrift());
        this.timer = setTimeout(this.loop(), sleep_time);
    }
}
