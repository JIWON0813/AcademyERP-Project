import React from 'react';
import {CInput} from "@coreui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";

function User({user, onRemove,updateFieldChanged,disabled,buttonDisabled}) {
  return (
      <tbody>
      <td>
        <IconButton disabled={buttonDisabled} aria-label="delete" onClick={() => onRemove(user.line)}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </td>
      <td>

          <CInput
            name="account"
            defaultValue={user.account} onChange={updateFieldChanged(user.line)} disabled={disabled}/>
      </td>
      <td>
        <CInput
          name="note"
          defaultValue=
            {user.note} onChange={updateFieldChanged(user.line)} disabled={disabled}/>
      </td>
      <td>
        <CInput
          name="creditor"
          defaultValue=
            {user.creditor} onChange={updateFieldChanged(user.line)} disabled={disabled}/>
      </td>
      <td>
        <CInput
          name="debtor"
          defaultValue=
            {user.debtor} onChange={updateFieldChanged(user.line)} disabled={disabled}/></td>
      <td>
        <CInput
          name="customer"
          defaultValue=
            {user.customer} onChange={updateFieldChanged(user.line)} disabled={disabled}/>
      </td>
      </tbody>
  );
}

function UserList({users, onRemove,updateFieldChanged,disabled,buttonDisabled}) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.line}
          onRemove={onRemove}
          updateFieldChanged={updateFieldChanged}
          disabled={disabled}
          buttonDisabled={buttonDisabled}
        />
      ))}
    </div>
  );
}

export default UserList;
