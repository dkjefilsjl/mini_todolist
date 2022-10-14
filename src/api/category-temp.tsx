import axios from "axios";
import { setDefaultResultOrder } from "dns/promises";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryTypes,
  todoListTypes,
} from "../interface/todo-list-state-interface";
import {
  categoryLastId,
  categoryState,
  todoListContent,
  todoListLastId,
  todoListState,
} from "../recoil/todo-recoil";

/*read*/
useEffect(() => {
  const fetchLists = async () => {
    const [categorys, setCategorys] =
      useRecoilState<categoryTypes[]>(categoryState);
    try {
      const res = await axios.get("http://localhost:3000/categorys");
      setCategorys(res.data);
      console.log("fetch = " + res.data);
    } catch (e) {
      console.log(e);
    }
  };
  fetchLists();
}, []);

/*create*/
/*
export const AddLists = async () => {
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);
  if (!rname || rname === "") return;
  try {
    const res = await axios.post(
      "http://localhost:3000/categorys",
      JSON.stringify({
        id: lastId + 1,
        name: rname,
        isChecked: false,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCategorys(categorys.concat(res.data));
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
  setRname("");
};*/

/*delete*/
/*
export const RemoveLists = async (rid: number) => {
  try {
    setLoading(true);
    const res = await axios.delete(`http://localhost:3000/categorys/${rid}`);
    setCategorys(categorys.filter((category) => category.id !== rid));
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
  setLoading(false);
};
categorys.map((category) => {
  if (category.id === callRemove) removeLists(category.id);
});*/

/*update*/
