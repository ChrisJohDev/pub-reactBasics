import React from 'react';

export default class Kvittens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name: '',
            number_of_items: '',
            price: '',
            order_total: 0.00
        }

        this.eFormChange = this.eFormChange.bind(this);
        this.eSubmit = this.eSubmit.bind(this);
        console.log('constructor');
    }

    render() {
        console.log('Render');
        return (
            <div id='main' class='main'>
                <div id='heading' class='heading_container'>
                    <h1 class='heading'>Kassa Kvitto</h1>
                </div>
                <div id='input_section' class='input_section'>
                    <form onSubmit={this.eSubmit} >
                        <div id='input_item_section' class='input_item_section'>
                            <h3>Ange Vara</h3>
                            <label htmlFor="product">Produkt:</label>
                            <br />
                            <input id="name" name="name" onChange={this.eFormChange} value={this.state.name} />
                            <br />
                            <label htmlFor="number_or_items">Antal</label>
                            <br />
                            <input id="number_of_items" name="number_of_items" onChange={this.eFormChange} value={this.state.number_of_items} />
                            <br />
                            <label htmlFor="price">Styck Pris:</label>
                            <br />
                            <input id="price" name="price" onChange={this.eFormChange} value={this.state.price} />
                        </div>
                        <div id='input_submit_section' class='input_submit_section'>
                            <br />
                            <button>Nästa Vara</button>
                        </div>
                    </form>
                </div>
                <div id='output_section' class='output_section'>
                    <div id='output_list_section' class='output_list_section'>
                        <ItemList items={this.state.items} />
                    </div>
                    <div id='output_sum_section' class='output_sum_section'>
                        <p>Summa: {Number(this.state.order_total).toFixed(2)}Kr</p>
                    </div>
                </div>
            </div>
        );
    }

    eFormChange(e) {
        var inputObj = {};
        inputObj[e.target.id] = e.target.value;
        this.setState(inputObj);
        console.log('eFormChange');
    }

    eSubmit(e) {
        e.preventDefault();

        if (this.state.name.length === 0 || this.state.number_of_items === 0 || this.state.price === 0) {
            return;
        }

        let tot = (Number(this.state.price) * Number(this.state.number_of_items)) + this.state.order_total;
        const newItem = {
            name: this.state.name,
            number_of_items: this.state.number_of_items,
            price: this.state.price
        };

        this.setState(state => ({
            items: state.items.concat(newItem),
            name: '',
            number_of_items: '',
            price: '',
            order_total: tot
        }));
        document.getElementById('name').focus();
        console.log(this.state.items);
    }
}

const ItemList = (props) => {
    console.log('ItemList');
    return (
        <ul>
            {props.items.map(item => (
                <li key={item.name}>
                    <table><tr><td>
                        {item.name + ':   '}</td><td> {item.number_of_items + 'st,  a ' + Number(item.price).toFixed(2) + 'Kr/styck  -  '}</td>
                        <td class='align_right'>{(Number(item.number_of_items) * Number(item.price)).toFixed(2) + 'Kr'}</td>
                    </tr></table>
                </li>
            ))}
        </ul>
    )
}

