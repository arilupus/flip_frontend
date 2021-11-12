import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "./Transaction.scss";
import List from "../../components/Transaction/List";

export default function Transaction() {
  const [trList, getTrList] = useState([]);
  const [totalTransaksi, getTotalTransaksi] = useState(0);
  const [trListData, getTrListData] = useState([]);
  const [detailData, getDetailData] = useState([]);

  let total = 0;

  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const getAllTrList = (search) => {
    const promise = new Promise((resolve, reject) => {
      axios.get(`https://nextar.flip.id/frontend-test`).then(
        (res) => {
          const data = Object.entries(res.data).filter(
            ([idx, res]) => res.id.indexOf("FT35650") !== -1
          );
          getDetailData(data);
          console.log(detailData);
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  useEffect(() => {
    getAllTrList();
  }, []);

  return (
    <Fragment>

      <div className="container trx">
        AAAA
        <p>{detailData.id}</p>
        {/* <ul className="trx-list">
          {trListData.map(([idx, result]) => {
            return <List key={idx} data={result} goDetail={handleDetail} />;
          })}
        </ul> */}
      </div>
    </Fragment>
  );
}
