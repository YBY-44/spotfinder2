import { AddValet } from "../organisms/AddValet";
import { ListValets } from "../organisms/ListValets";
// import {ListValets} from '../organisms/ListValets';
export const ManageValet = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddValet />
      </div>
      <ListValets />
    </div>
  );
};
