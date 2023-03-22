import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditForm from "../../../../components/seller/EditForm";
import { api } from "../../../../utils/api";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const menus = api.merchant.getMenu.useQuery();
  const menu = menus.data?.find((data) => data.id == id);

  return (
    <>
      <Head>
        <title>Edit Item - Footies</title>
      </Head>
      <span>{id}</span>
      <EditForm page="edit" menu={menu} />
    </>
  );
}
