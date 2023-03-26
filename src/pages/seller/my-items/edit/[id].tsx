import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditForm from "../../../../components/seller/EditForm";
import { api } from "../../../../utils/api";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const menu = api.merchant.getSpecificMenu.useQuery(id as string, {
    keepPreviousData: false,
  });

  return (
    <>
      <Head>
        <title>Edit Item - Footies</title>
      </Head>
      <EditForm page="edit" menu={menu.data || undefined} />
    </>
  );
}
