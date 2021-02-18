import React from 'react'
import axios from 'axios';
import {Button, Dialog, IconButton, withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import RequestPay from "./RequestPay";
import CancelPay from "./CancelPay";
import {CFormGroup, CInput, CSelect} from "@coreui/react";

const styles = theme => ({
  hidden: {
    display: 'none'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class PayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemList: "",
      payList:"",
      reason:"개인사정",
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.stateRefresh = this.stateRefresh.bind(this);
    this.reasonSelect = this.reasonSelect.bind(this)
  }

  componentDidMount() {
    this.getApi();
  }

getApi = () => {
  axios.get("http://localhost:8080/api/students/user/"+this.props.id)
    .then(res => {
      this.setState({
        ItemList: res.data.payList
      })
    })
    .catch(res => console.log(res))
  axios.get("http://localhost:8080/payments/pay/"+this.props.id)
    .then(res => {
      this.setState({
        payList: res.data.list
      })
    })
    .catch(res => console.log(res))
}

  handleClickOpen() {
    this.stateRefresh();
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    })
  }
  reasonSelect = (e) => {
    this.setState({
      reason:e.target.value
    })
  }

  stateRefresh() {
    this.setState({
      ItemList: "",
      payList:"",
      reason:"개인사정",
    });
    this.getApi();
  }

  render() {
    const { ItemList } = this.state;
    const { payList } = this.state;

    const date=(item) => {
      var date = new Date(item);
      var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0] + "  " + new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString().split("T")[1].split(".")[0]
      return dateString
    }

    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>{this.props.itemdata.name}</Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>결제</DialogTitle>
          <DialogContent dividers>
            <strong>결제목록</strong>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <td>NO</td>
                <td>강의명</td>
                <td>수강료</td>
                <td>개강일</td>
                <td>종강일</td>
                <td>결제</td>

              </tr>
              </thead>
              <tbody>

              {ItemList && ItemList.map((itemdata, insertIndex) => {
                return (
                  <tr key={insertIndex}>
                    <td>{itemdata.lectureNo}</td>
                    <td>{itemdata.lectureName}</td>
                    <td>{itemdata.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    <td>{itemdata.start_date}</td>
                    <td>{itemdata.end_date}</td>
                    <td><RequestPay product={itemdata}/></td>

                  </tr>
                );
              })}
              </tbody>
            </table>
            <br/>
            <strong>결제내역</strong>
            <br/>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <td>NO</td>
                <td>결제내용</td>
                <td>수강료</td>
                <td>결제방법</td>
                <td>결제일</td>
                <td>환불사유</td>
                <td>환불결과</td>

              </tr>
              </thead>
              <tbody>

              {payList && payList.map((itemdata, insertIndex) => {
                return (
                  <tr key={insertIndex}>
                      <td>{itemdata.no}</td>
                      <td>{itemdata.name}</td>
                      <td>{itemdata.paidAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                      <td>{itemdata.payMethod}</td>
                      <td>{date(itemdata.paidAt)}</td>
                    {itemdata.cancel === 1 &&
                    <td><CSelect custom id="branch" onChange={this.reasonSelect} defaultValue={itemdata.reason} disabled={true}>
                      <option value="개인사정">개인사정</option>
                      <option value="결제수단변경">결제수단변경</option>
                      <option value="결제오류">결제오류</option>
                      <option value="기타">기타</option>
                    </CSelect>
                    </td>
                        }
                    {itemdata.cancel === 1 &&
                    <td>환불완료</td>
                    }
                    {itemdata.cancel !== 1 &&
                    <td><CSelect custom id="branch" onChange={this.reasonSelect} value={this.state.reason}>
                      <option value="개인사정">개인사정</option>
                      <option value="결제수단변경">결제수단변경</option>
                      <option value="결제오류">결제오류</option>
                      <option value="기타">기타</option>
                    </CSelect>
                    </td>
                    }
                    {itemdata.cancel !== 1 &&
                    <td><CancelPay stateRefresh={this.stateRefresh} product={itemdata} reason={this.state.reason}/></td>
                    }
                  </tr>
                );
              })}
              </tbody>
            </table>
          </DialogContent>

        </Dialog>

      </div>
    )

  }

}
export default withStyles(styles)(PayList)
