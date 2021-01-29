import React,{ Component } from "react";
import { Link } from 'react-router-dom';
class HR extends Component {

    render() {
        return (
            <div>
                <table>
                    <tr><td>
                        <Link to={"/sal_list"}>직원급여조회</Link>
                    </td></tr>
                </table>
            </div>
        )
    }
}

export default HR;