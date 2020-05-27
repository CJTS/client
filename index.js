import WebSocket from 'ws';

class Agent {
    constructor(id) {
        this.ws = new WebSocket('wss://checker-great-cuticle.glitch.me');
        this.agent = { id: id, x: 0, y: 0 };
        this.grid = { x: 0, y: 0 }

        this.ws.on('open', () => {
            console.log('Conexão aberta!');
        });

        this.ws.on('message', (data) => {
            let msg = data.split('|');
            if (msg[0] == 'gridsize') {
                console.log('Grid Inidicalizado.')
                let g = JSON.parse(msg[1]);
                this.grid.x = g.x;
                this.grid.y = g.y;
                setInterval(() => this.run(), 1000);
            }
        });
    }

    run() {
        this.ws.send(`pos|${this.agent.id}|${this.agent.x}|${this.agent.y}`);
        let where = Math.floor(Math.random() * 4);
        if (where == 0) {
            if (this.agent.x > 0) {
                this.agent.x = this.agent.x - 1;
            }
        } else if (where == 1) {
            if (this.agent.y < this.grid.y - 1) {
                this.agent.y = this.agent.y + 1;
            }
        } else if (where == 2) {
            if (this.agent.x < this.grid.x - 1) {
                this.agent.x = this.agent.x + 1;
            }
        } else if (where == 3) {
            if (this.agent.y > 0) {
                this.agent.y = this.agent.y - 1;
            }
        }
    }
}

for (let index = 1; index < 3; index++) {
    new Agent(index);
}