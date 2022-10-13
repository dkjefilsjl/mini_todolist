import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoryTypes } from "../../interface/todo-list-state-interface";
import { categoryState, categoryIdSelect } from "../../recoil/todo-recoil";

export const SelectVariants = () => {
  const [categoryId, setcategoryId] = useRecoilState<number>(categoryIdSelect);
  const [category, setcategory] = useState<string>("");
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);

  const handleChange = (event: SelectChangeEvent) => {
    categorys.map((cg: categoryTypes) => {
      setcategory(event.target.value);
      if (event.target.value === cg.name) return setcategoryId(cg.id);
    });
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: [-1, 1, 1, -1], minWidth: 80 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="category"
        >
          {categorys.map((cg: categoryTypes) => {
            return <MenuItem value={cg.name}>{cg.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
};
