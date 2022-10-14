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
import { RemoveButton } from "./todo-component";

export const Categorys = () => {
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);
  const [rname, setRname] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const lastId = useRecoilValue<number>(categoryLastId);
  const [callRemove, setCallRemove] = useState<number>();

  /*read*/
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/categorys");
        setCategorys(res.data);
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
      if (!rname || rname === "") return;
      try {
        setLoading(true);
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
      setLoading(false);
    };

    addLists();
  }, [rname, setRname]);

  /*delete*/
  useEffect(() => {
    const removeLists = async (rid: number) => {
      try {
        setLoading(true);
        const res = await axios.delete(
          `http://localhost:3000/categorys/${rid}`
        );
        setCategorys(categorys.filter((category) => category.id !== rid));
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    categorys.map((category) => {
      if (category.id === callRemove) removeLists(category.id);
    });
  }, [callRemove, setCallRemove]);

  /*update*/

  const onClick = (value: string) => {
    setRname(value);
  };
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") onClick(e.target.value);
  };

  if (loading) return <div>로딩중...</div>;
  return (
    <>
      <div>
        {categorys.map((category: categoryTypes) => {
          return (
            <div key={category.id}>
              <input
                type="checkbox"
                onChange={() => {
                  setCategorys(
                    categorys.map((slist: categoryTypes) => {
                      return slist.id === category.id
                        ? {
                            ...slist,
                            isChecked: !slist.isChecked,
                          }
                        : slist;
                    })
                  );
                }}
              />
              {category.name}
              <RemoveButton
                onClick={() => {
                  setCallRemove(category.id);
                }}
              >
                {" "}
                x{" "}
              </RemoveButton>
              {"   "}
            </div>
          );
        })}
        <input onKeyDown={onKeyPress} />
      </div>
    </>
  );
};
