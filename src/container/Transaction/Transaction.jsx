import axios from "axios";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Transaction.scss";
import List from "../../components/Transaction/List";

export default function Transaction() {
  const [trList, getTrList] = useState([]);
  const [totalTransaksi, getTotalTransaksi] = useState(0);
  const [toggleSort, setToggleSort] = useState(false);
  const trxBoxSort = useRef(null);
  const history = useHistory();
  let total = 0;

  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  const handleSort = () => {
    setToggleSort(true);
    setToggleSort(!toggleSort);
  };

  const sortList = (data) => {
    const promise = new Promise((resolve, reject) => {
      axios.get("https://nextar.flip.id/frontend-test").then(
        (result) => {
          if (data === "AZ") {
            const data_result = Object.entries(result.data).sort((a, b) =>
              a.beneficiary_name > b.beneficiary_name
                ? 1
                : b.beneficiary_name > a.beneficiary_name
                ? -1
                : 0
            );
            getTrList(data_result);
          } else if (data === "ZA") {
            const data_result = Object.entries(result.data).sort((a, b) =>
              a.beneficiary_name < b.beneficiary_name
                ? 1
                : b.beneficiary_name < a.beneficiary_name
                ? -1
                : 0
            );
            getTrList(data_result);
          }
          resolve(result.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  const getAllTrList = (search) => {
    const promise = new Promise((resolve, reject) => {
      axios.get("https://nextar.flip.id/frontend-test").then(
        (result) => {
          const data = result.data;
          if (search) {
            const data_result = Object.entries(data).filter(
              ([idx, res]) =>
                res.beneficiary_name.toLowerCase().indexOf(search) !== -1 ||
                res.beneficiary_bank.toLowerCase().indexOf(search) !== -1 ||
                res.sender_bank.toLowerCase().indexOf(search) !== -1
            );
            getTrList(data_result);
          } else {
            getTrList(Object.entries(data));
          }
          total = Object.entries(data)
            .map(([idx, res]) => {
              return res.amount;
            })
            .reduce((partial_sum, a) => partial_sum + a, 0);
          getTotalTransaksi(total);
          resolve(data);
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
        <h1 className="trx-title">Daftar Transaksi</h1>
        <h4 className="trx-greeting">Halo Kak!</h4>
        <p className="trx-desc">
          Kamu telah melakukan transaksi sebesar{" "}
          <span>{formatCurrency.format(totalTransaksi)}</span> sejak menggunakan
          Flip
        </p>
        <div className="trx-box">
          <div className="trx-box-search">
            <i className="fas fa-search" />
            <input
              type="search"
              placeholder="Cari nama atau bank"
              onChange={(e) => getAllTrList(e.target.value)}
            />
          </div>
          <div className="trx-box-sort" onClick={handleSort}>
            <span>URUTKAN</span>
            <i className="fas fa-angle-down" />
            <ul ref={trxBoxSort} className={toggleSort ? "" : "closed"}>
              <li onClick={() => sortList("AZ")}>Nama A-Z</li>
              <li onClick={() => sortList("ZA")}>Nama Z-A</li>
              <li>Tanggal terbaru</li>
              <li>Tanggal terlama</li>
            </ul>
          </div>
        </div>
        <ul className="trx-list">
          {trList.map(([idx, result]) => {
            return <List key={idx} data={result} goDetail={handleDetail} />;
          })}
        </ul>
      </div>
    </Fragment>
  );
}
