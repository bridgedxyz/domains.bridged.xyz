import Head from "next/head";
import React, { useState } from "react";
import Axios, { AxiosError } from "axios";

interface Tld {
  tld: string;
  tld_type: number;
  whois_privacy: boolean;
  auto_renew_only: boolean;
  idn: boolean;
  minimum_registration: number;
  registration_enabled: boolean;
  renewal_enabled: boolean;
  transfer_enabled: boolean;
  dnssec_interface_type: "ds" | "key" | null;
}

export default function Tlds({ tlds }: { tlds: Tld[] }) {
  return (
    <>
      <Head>
        <title>Supported TLDs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>Tlds</h2>
        <p>{}</p>
        <ul>
          {tlds?.map(({ tld }) => (
            <li key={tld}>{tld}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }: any) {
  // 2592000 = a month
  res.setHeader("Cache-Control", "public, max-age=2592000");

  const client = Axios.create({
    baseURL: "http://localhost:3010" + "/api",
  });
  const response = await client.get("/tlds");

  return {
    props: { tlds: response.data },
  };
}
