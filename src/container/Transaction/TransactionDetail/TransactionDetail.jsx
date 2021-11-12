import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./TransactionDetail.scss";

const TransactionDetail = (props) => {
  const [detailData, getDetailData] = useState([]);
  const [tglBuat, getTglBuat] = useState([]);
  const trxId = props.match.params.trxId;

  const history = useHistory();

  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const getTrDetail = () => {
    const promise = new Promise((resolve, reject) => {
      axios.get(`https://nextar.flip.id/frontend-test`).then(
        (result) => {
          const data = Object.entries(result.data).filter(
            ([idx, res]) => res.id.toLowerCase().indexOf(trxId) !== -1
          );
          getDetailData(data);

          const initTglBuat = data.created_at.substring(0, 10);
          let dd = initTglBuat.substring(8, 10);
          let mm = initTglBuat.substring(5, 7);
          let yy = initTglBuat.substring(0, 4);

          if (mm === "01") {
            mm = "Januari";
          } else if (mm === "02") {
            mm = "Februari";
          } else if (mm === "03") {
            mm = "Maret";
          } else if (mm === "04") {
            mm = "April";
          } else if (mm === "05") {
            mm = "Mei";
          } else if (mm === "06") {
            mm = "Juni";
          } else if (mm === "07") {
            mm = "Juli";
          } else if (mm === "08") {
            mm = "Agustus";
          } else if (mm === "09") {
            mm = "September";
          } else if (mm === "10") {
            mm = "Oktober";
          } else if (mm === "11") {
            mm = "November";
          } else if (mm === "12") {
            mm = "Deesember";
          }

          getTglBuat(`${dd} ${mm} ${yy}`);
          resolve(result.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  useEffect(() => {
    getTrDetail();
  }, []);

  return (
    <div className="container detail-trx">
      <h1 className="detail-trx-title">Daftar Transaksi</h1>
      <div className="detail-trx-header">
        <p className="detail-trx-header-id">ID TRANSAKSI: #{detailData.id}</p>
        <span
          className={`detail-trx-header-status ${
            detailData.status === "SUCCESS" ? "SUCCESS" : "PENDING"
          }`}
        >
          {detailData.status === "SUCCESS" ? "Berhasil" : "Pengecekan"}
        </span>
      </div>
      <div className="detail-trx-info">
        <i class="fas fa-inbox" />
        <ul className="detail-trx-info-list">
          <li>
            <p className="detail-trx-info-list-title">PENGIRIM</p>
            <p className="detail-trx-info-list-content">
              {detailData.sender_bank.length === 3 ||
              detailData.sender_bank.length === 4
                ? detailData.sender_bank.toUpperCase()
                : detailData.sender_bank.charAt(0).toUpperCase() +
                  detailData.sender_bank.slice(1)}
            </p>
          </li>
          <li>
            <p className="detail-trx-info-list-title">PENERIMA</p>
            <div className="detail-trx-info-list-content">
              <p>
                {detailData.beneficiary_bank.length === 3 ||
                detailData.beneficiary_bank.length === 4
                  ? detailData.beneficiary_bank.toUpperCase()
                  : detailData.beneficiary_bank.charAt(0).toUpperCase() +
                    detailData.beneficiary_bank.slice(1)}
              </p>
              <p>{detailData.account_number}</p>
              <p>{detailData.beneficiary_name}</p>
            </div>
          </li>
          <li>
            <p className="detail-trx-info-list-title">NOMINAL</p>
            <div className="detail-trx-info-list-content">
              <p>{formatCurrency.format(detailData.amount)}</p>
              <p>
                <span>Kode Unik: </span>
                {detailData.unique_code}
              </p>
            </div>
          </li>
          <li>
            <p className="detail-trx-info-list-title">CATATAN</p>
            <p className="detail-trx-info-list-content">{detailData.remark}</p>
          </li>
          <li>
            <p className="detail-trx-info-list-title">WAKTU DIBUAT</p>
            <p className="detail-trx-info-list-content">{tglBuat}</p>
          </li>
        </ul>
      </div>
      <button className="detail-trx-button" onClick={() => history.goBack()}>
        Kembali
      </button>
    </div>
  );
};

export default TransactionDetail;
