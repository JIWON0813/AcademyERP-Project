import React from 'react';
import {CInput} from "@coreui/react";

function StatementDetailCreate({note, debtor, creditor, account, customer, onChange, onCreate,disabled}) {
  return (
    <div>
      <tr>
        <td>
          <button disabled={disabled} onClick={onCreate}>추가</button>
        </td>
        <td>
          <CInput
            name="account"
            placeholder="계정과목"
            onChange={onChange}
            value={account}
            disabled={disabled}
          />
        </td>
        <td>
          <CInput
            name="note"
            placeholder="라인 적요"
            onChange={onChange}
            value={note}
            disabled={disabled}
          />
        </td>
        <td>
          <CInput
            name="creditor"
            placeholder="차변"
            onChange={onChange}
            value={creditor}
            disabled={disabled}
          />
        </td>
        <td>
          <CInput
            name="debtor"
            placeholder="대변"
            onChange={onChange}
            value={debtor}
            disabled={disabled}
          />
        </td>
        <td>
          <CInput
            name="customer"
            placeholder="거래처"
            onChange={onChange}
            value={customer}
            disabled={disabled}
          />
        </td>
      </tr>
    </div>
  );
}

export default StatementDetailCreate;
