import React from 'react';

function StatementDetailCreate({onCreate,disabled}) {
  return (
    <div>
      <tr>
        <td>
          <button disabled={disabled} onClick={onCreate}>라인 추가</button>
        </td>
      </tr>
    </div>
  );
}

export default StatementDetailCreate;
