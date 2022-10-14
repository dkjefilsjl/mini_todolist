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
import { RemoveButton } from "../containers/todo-list/todo-component";
import { onCreate, removeLists } from "./todo-list-temp";

export const Categorys = () => {
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const lastId = useRecoilValue<number>(categoryLastId);

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

  const addHandeler = (e: any) => {
    e.preventDefault();
    console.log(e.target);
    setContent(e.target.value);
    console.log("content = " + content);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const data: categoryTypes = {
        id: lastId + 1,
        name: e.target.value,
        isChecked: false,
      };
      onCreate(data, "http://localhost:3000/categorys");
      setLists(categorys.concat(data));
      console.log("data = " + data);
    }
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
                  removeLists({
                    link: `http://localhost:3000/lists/${category.id}`,
                  });
                  setCategorys(categorys.filter((li) => li.id !== category.id));
                }}
              >
                {" "}
                x{" "}
              </RemoveButton>
              {"   "}
            </div>
          );
        })}
        <input
          value={content}
          onKeyDown={onKeyPress}
          onChange={(e) => {
            addHandeler(e);
          }}
        />
      </div>
    </>
  );
};
function setLists(arg0: any) {
  throw new Error("Function not implemented.");
}
