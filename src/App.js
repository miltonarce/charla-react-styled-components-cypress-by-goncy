import React, { Component } from 'react';
import Ritmosustanciometro from './Ritmosustanciometro';

class App extends Component {
  state ={
    nombre: '',
    individuos: []
  }

  actualizarNombre = (event) => {
    this.setState({nombre: event.target.value})
  }

  obtenerRitmosustancia = async (event) =>{
    event.preventDefault();
    const request = await fetch("https://wt-3581e5a0e6c19bb4a0552203b2738a9d-0.run.webtask.io/obtener-ritmosustancia")
    const response = await request.json()

    this.setState({
      individuos: [...this.state.individuos, {
        nombre: this.state.nombre, 
        ritmosustancia: response
      }],
      nombre: '',
    })
  }

  render() {
    return (
     <div>
        <h1>Ritmosustanciometro</h1>
        {this.state.individuos.map((individuo)=>
        <Ritmosustanciometro
          nombre={individuo.nombre}
          ritmosustancia={individuo.ritmosustancia} />
        )}
        <form onSubmit={this.obtenerRitmosustancia}>
          <input type="text" onChange={this.actualizarNombre} value={this.state.nombre}/>
          <button type="submit">Obtener ritmosustancia</button>
        </form>
     </div>
    );
  }
}

export default App;
