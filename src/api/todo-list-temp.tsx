import axios from "axios";
import { setDefaultResultOrder } from "dns/promises";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  categoryTypes,
  todoListTypes,
} from "../interface/todo-list-state-interface";
import {
  categoryState,
  categoryIdSelect,
  todoListContent,
  todoListLastId,
  todoListState,
} from "../recoil/todo-recoil";

interface todolistProps {
  id: number;
}

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: #a81414;
`;

/*read*/
export const OnRead = () => {
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
  useEffect(() => {
    const fetchLists = async () => {
      // const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
      try {
        const res = await axios.get("http://localhost:3000/lists");
        setLists(res.data);
        console.log("fetch = " + res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLists();
  }, []);
};

/*create*/
export const onCreate = async (
  data: todoListTypes | categoryTypes,
  link: string
) => {
  try {
    const res = await axios.post(link, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("create = " + res.data);
  } catch (e) {
    console.log(e);
  }
};

/*delete*/
/*
    const removeLists = async (rid: number) => {
      try {
        setLoading(true);
        const res = await axios.delete(`http://localhost:3000/lists/${rid}`);
        setLists(lists.filter((list) => list.id !== rid));
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    lists.map((list) => {
      if (list.id === callRemove) removeLists(list.id);
    });
*/
/*update*/