import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <>
      <Wrapper>
        <FilterWrapper placeholder="find anything" />
        <SearchBox>
          <IoSearchOutline />
        </SearchBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FilterWrapper = styled.input`
  padding: 10px;
  border-radius: 18px;
  border: 1px solid gray;
`;
const SearchBox = styled.div`
  display: flex;
  position: relative;
  top: 0;
  right: 25px;
  cursor: pointer;
  justify-content: center;
`;
export default Search;
