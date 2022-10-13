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

export const TodoLists = (props: todolistProps) => {
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
  const [content, setContent] = useRecoilState<string>(todoListContent);
  const [loading, setLoading] = useState<boolean>(false);
  const [callRemove, setCallRemove] = useState<number>();
  const lastId = useRecoilValue<number>(todoListLastId);
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);
  const [categoryId, setcategoryId] = useRecoilState<number>(categoryIdSelect);

  /*read*/
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/lists");
        setLists(res.data);
        console.log("fetch = " + res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchLists();
  }, []);

  /*create*/
  useEffect(() => {
    const addLists = async () => {
      if (!content || content === "") return;
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3000/lists",
          JSON.stringify({
            id: lastId + 1,
            contents: content,
            isCompleted: false,
            categoryId: categoryId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLists(lists.concat(res.data));
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    addLists();
  }, [content, setContent]);

  /*delete*/
  useEffect(() => {
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
  }, [callRemove, setCallRemove]);

  /*update*/

  if (loading) return <div>로딩중...</div>;
  return (
    <>
      {lists.map((list: todoListTypes) => {
        {
          /*let flag: boolean = true;
          categorys.map((category: categoryTypes) => {
          if (category.id === list.categoryId) flag = category.isChecked;
        });*/
        }
        if (props.id !== list.categoryId) return <div key={list.id}></div>;
        else {
          return (
            <div key={list.id}>
              <input
                type="checkbox"
                onChange={() => {
                  setLists(
                    lists.map((slist: todoListTypes) => {
                      return slist.id === list.id
                        ? {
                            ...slist,
                            isCompleted: !slist.isCompleted,
                          }
                        : slist;
                    })
                  );
                }}
              />
              {list.isCompleted ? "babo" : list.contents}
              <RemoveButton
                onClick={() => {
                  setCallRemove(list.id);
                }}
              >
                {" "}
                x{" "}
              </RemoveButton>
            </div>
          );
        }
      })}
    </>
  );
};
