import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { addToWishList, removeFromWishList } from "../store/slices/postSlice";
import { fetchSinglePostDynamically } from "../store/api/actions";

const DataAll = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // useStates
  const [fav, setFav] = useState(true);

  // calling the dynamic Data
  const dynmaicLoader = useSelector((state) => state?.apiData.dynamicData);
  // console.log("this should be dynmaic", dynmaicLoader);

  // useEffect for calling the api
  useEffect(() => {
    dispatch(fetchSinglePostDynamically(id));
  }, [dispatch, id]);

  return (
    <>
      <Container>
        <BoxWrapper>
          <div>
            <IconWrapper>
              <NavigationLink to="/">
                <RxCross2 />
              </NavigationLink>
              {fav ? (
                <CiHeart
                  onClick={() => {
                    dispatch(addToWishList(dynmaicLoader)), setFav(false);
                  }}
                />
              ) : (
                <IoMdHeart
                  onClick={() => {
                    dispatch(removeFromWishList(id)), setFav(true);
                  }}
                />
              )}
            </IconWrapper>
            <h4>{dynmaicLoader?.title}</h4>
            <p>{dynmaicLoader?.body}</p>
            <TagsAndReactionsWrapper>
              <span>{dynmaicLoader?.tags}</span>
              <span>{dynmaicLoader?.reactions}</span>
            </TagsAndReactionsWrapper>
          </div>
        </BoxWrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  margin-top: 8rem;
`;

const BoxWrapper = styled.div`
  width: 30%;
  margin: 20px;
  border: 1px solid gray;
  border-radius: 18px;
  padding: 10px;
`;

const TagsAndReactionsWrapper = styled.div`
  display: flex;
  color: gray;
  justify-content: space-between;
`;
const NavigationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

export default DataAll;
