import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TransactionDetail.scss";

const TransactionDetail = (props) => {
  const [detailData, getDetailData] = useState([]);

  useEffect(() => {
    let trxId = props.match.params.trxId;
    const promise = new Promise((resolve, reject) => {
      axios.get(`https://nextar.flip.id/frontend-test`).then(
        (res) => {
          const data = Object.entries(res.data).filter(
            ([idx, res]) => res.id.indexOf("FT82679") !== -1
          );
          getDetailData(data);
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  }, []);
  return (
    <div className="p-detail-post">
      {/* <p className="detail-title">{detailData.beneficiary_name}</p>
      <p className="detail-body">{detailData.body}</p> */}
    </div>
  );
};

export default TransactionDetail;
