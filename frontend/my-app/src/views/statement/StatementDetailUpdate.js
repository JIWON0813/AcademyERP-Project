import React, {useEffect, useRef, useState} from 'react';
import CreateUser from "./StatementDetailCreate";
import UserList from "./StatementDetailList";


function StatementDetailUpdate(props) {
  const [inputs, setInputs] = useState({
    note: '',
    debtor: '',
    creditor: '',
    account: '',
    customer: '',
  });

  const {note, debtor, creditor, account, customer} = inputs;

  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([

  ]);

  useEffect(() => {
    console.log(props.statementDetails)
    setUsers(props.statementDetails);
  }, []);

  useEffect(() => {
    props.setData(users);
  }, [users]);



  const nextId = useRef(props.statementDetails.length);

  const onCreate = () => {
    const user = {
      line: nextId.current,
      statement: props.id,
      note,
      debtor,
      creditor,
      account,
      customer
    };
    setUsers([...users, user]);

    setInputs({
      note: '',
      debtor: '',
      creditor: '',
      account: '',
      customer: '',
    });
    nextId.current += 1;
  };

  const onRemove = line => {
    setUsers(users.filter(user => user.line !== line));
  };

  const updateFieldChanged = line => e => {
    let newArr = [...users];
    let propertyName = e.target.name;
    newArr[line][propertyName] = e.target.value;
    setUsers(newArr);
  }

  return (
    <div>
      <table>
      <thead>
      <tr>
        <td>/</td>
        <td>계정과목</td>
        <td>라인 적요</td>
        <td>차변</td>
        <td>대변</td>
        <td>거래처</td>
      </tr>
      </thead>
      </table>
      <UserList users={users}
                onRemove={onRemove}
                updateFieldChanged={updateFieldChanged}
                disabled={props.disabled}
                buttonDisabled={props.disabled}/>

      <CreateUser
        note={note}
        debtor={debtor}
        creditor={creditor}
        account={account}
        customer={customer}
        onChange={onChange}
        onCreate={onCreate}
        disabled={props.disabled}
        buttonDisabled={props.disabled}
      />

    </div>
  );
}

export default StatementDetailUpdate;
