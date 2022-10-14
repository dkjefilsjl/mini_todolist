import axios from "axios";
import { setDefaultResultOrder } from "dns/promises";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoListTypes } from "../../interface/todo-list-state-interface";
import { todoListState } from "../../recoil/todo-recoil";
import { deleteProps, OnRead, removeLists } from "../../api/todo-list-temp";

interface todolistProps {
  id: number;
}

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: #a81414;
`;

export const TodoComponent = (props: todolistProps) => {
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLists = async () => {
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

  if (loading) return <div>로딩중...</div>;
  return (
    <>
      {lists.map((list: todoListTypes) => {
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
                  removeLists({
                    link: `http://localhost:3000/lists/${list.id}`,
                  });
                  setLists(lists.filter((li) => li.id !== list.id));
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
