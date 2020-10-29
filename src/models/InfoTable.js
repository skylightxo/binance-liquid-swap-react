import 'bootstrap/dist/css/bootstrap.min.css';
import './info-table.css'
import { Table } from 'react-bootstrap';
import SevenDayChart from './SevenDayChart'
import Arrow from './Arrow'

const InfoTable = ({ data }) => {
    
    let refreshed = new Date(data[data.length - 1].date)
    let now = new Date()
    let dif = ((now - refreshed) / 60000).toFixed(0)

    if (data) {
        return (
            <>
                <h4 className="table-heading">Pool Summary</h4>
                <div className="table-div">

                    <Table hover className="info-table ">
                        <thead>
                            <tr>
                                <th className="table-left">Name</th>
                                <th>Total</th>
                                <th>Coins</th>
                                <th>Daily</th>
                                <th>Weekly</th>
                                <th>7d Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[data.length - 1].pools.map(pool => {

                                let total = Number(pool.coins[0].amount) + Number(pool.coins[1].amount)

                                let colorCell = (number) => {
                                    let num = (Number(number) * 100).toFixed(2)
                                    if (num > 0) {
                                        return (
                                            <span style={{ color: "green" }}>
                                                <Arrow color='green'/>
                                                {num}%
                                            </span>
                                        )
                                    } else {
                                        return (
                                            <span style={{ color: "red" }}>
                                                <Arrow color='red'/>
                                                {Math.abs(num)}%
                                            </span>
                                        )
                                    }
                                }

                                let formatNumber = (num) => {
                                    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }

                                return (
                                    <tr key={pool.name}>
                                        <td className="table-left"><a href="#">{pool.name}</a></td>
                                        <td>${formatNumber(total)}</td>
                                        <td>
                                            <div>
                                                <p className="coin-total">{formatNumber(Number(pool.coins[0].amount))} {pool.coins[0].name}</p>
                                                <p className="coin-total">{formatNumber(Number(pool.coins[1].amount))} {pool.coins[1].name}</p>
                                            </div>
                                        </td>
                                        <td>{colorCell(pool.daily)}</td>
                                        <td>{colorCell(pool.weekly)}</td>
                                        <td><SevenDayChart/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <p className="last-checked">Last checked {dif} mins ago</p>
                </div>
            </>
        )
    } else {
        return (<> </>)
    }


}

export default InfoTable