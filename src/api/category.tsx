import axios from "axios";
import { setDefaultResultOrder } from "dns/promises";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListTypes } from "../interface/todo-list-state-interface";
import {
  todoListContent,
  todoListLastId,
  todoListState,
} from "../recoil/todo-recoil";

export const Categorys = () => {
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
  const [content, setContent] = useRecoilState<string>(todoListContent);
  const [loading, setLoading] = useState<boolean>(false);
  const [callRemove, setCallRemove] = useState<number>();
  const lastId = useRecoilValue<number>(todoListLastId);

  /*read*/
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/categorys");
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
            {list.isCompleted ? list.contents : "babo"}
            <button
              onClick={() => {
                setCallRemove(list.id);
              }}
            >
              {" "}
              삭제{" "}
            </button>
          </div>
        );
      })}
    </>
  );
};
