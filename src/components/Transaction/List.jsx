import React, { useEffect } from "react";
import "./List.scss";

const List = (props) => {
  let border = "";
  let list_status = "";
  let sender_bank = "";
  let beneficiary_bank = "";
  let beneficiary_name = "";

  if (props.data.sender_bank) {
    sender_bank = props.data.sender_bank;
  }

  if (props.data.beneficiary_bank) {
    beneficiary_bank = props.data.beneficiary_bank;
  }

  if (props.data.beneficiary_name) {
    beneficiary_name = props.data.beneficiary_name.toUpperCase();
  }

  const status = props.data.status;

  if (status === "SUCCESS") {
    border = "tr-list-border-green";
    list_status = "Berhasil";
  } else if (status === "PENDING") {
    border = "tr-list-border-orange";
    list_status = "Pengecekan";
  }

  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  let dd = "";
  let mm = "";
  let yy = "";
  let ddc = "";
  let mmc = "";
  let yyc = "";
  let tgl_buat = "";
  let tgl_selesai = "";

  if (props.data.created_at) {
    const initTglBuat = props.data.created_at.substring(0, 10);
    dd = initTglBuat.substring(8, 10);
    mm = initTglBuat.substring(5, 7);
    yy = initTglBuat.substring(0, 4);
  }

  if (props.data.completed_at) {
    const initTglSelesai = props.data.completed_at.substring(0, 10);
    ddc = initTglSelesai.substring(8, 10);
    mmc = initTglSelesai.substring(5, 7);
    yyc = initTglSelesai.substring(0, 4);
  }

  if (props.data.created_at || props.data.completed_at) {
    if (mm === "01" || mmc === "01") {
      mm = "Januari";
      mmc = "Januari";
    } else if (mm === "02" || mmc === "02") {
      mm = "Februari";
      mmc = "Februari";
    } else if (mm === "03" || mmc === "03") {
      mm = "Maret";
      mmc = "Maret";
    } else if (mm === "04" || mmc === "04") {
      mm = "April";
      mmc = "April";
    } else if (mm === "05" || mmc === "05") {
      mm = "Mei";
      mmc = "Mei";
    } else if (mm === "06" || mmc === "06") {
      mm = "Juni";
      mmc = "Juni";
    } else if (mm === "07" || mmc === "07") {
      mm = "Juli";
      mmc = "Juli";
    } else if (mm === "08" || mmc === "08") {
      mm = "Agustus";
      mmc = "Agustus";
    } else if (mm === "09" || mmc === "09") {
      mm = "September";
      mmc = "September";
    } else if (mm === "10" || mmc === "10") {
      mm = "Oktober";
      mmc = "Oktober";
    } else if (mm === "11" || mmc === "11") {
      mm = "November";
      mmc = "November";
    } else if (mm === "12" || mmc === "12") {
      mm = "Deesember";
      mmc = "Deesember";
    }

    tgl_buat = `${dd} ${mm} ${yy}`;
    tgl_selesai = `${ddc} ${mmc} ${yyc}`;
  }

  return (
    <li
      className={`tr-list ${border}`}
      onClick={() => props.goDetail(props.data.id)}
    >
      <div className="tr-list-info">
        <p className="tr-list-info-bank">
          {sender_bank.length === 3 || sender_bank.length === 4
            ? sender_bank.toUpperCase()
            : sender_bank.charAt(0).toUpperCase() + sender_bank.slice(1)}
          <i className="fas fa-arrow-right" />
          {beneficiary_bank.length === 3 || beneficiary_bank.length === 4
            ? beneficiary_bank.toUpperCase()
            : beneficiary_bank.charAt(0).toUpperCase() +
              beneficiary_bank.slice(1)}
        </p>
        <p className="tr-list-info-beneficiary-name">{beneficiary_name}</p>
        <p className="tr-list-info-amount">
          {formatCurrency.format(props.data.amount)}
          <i className="fas fa-circle" />
          {status === "SUCCESS" ? tgl_selesai : tgl_buat}
        </p>
      </div>
      <div className="tr-list-status">
        <span className={`tr-list-status-${status}`}>{list_status}</span>
      </div>
    </li>
  );
};

export default List;
