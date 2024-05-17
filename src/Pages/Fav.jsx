import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { removeFromWishList } from "../store/slices/postSlice";
import { Link } from "react-router-dom";

const Fav = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.apiData);

  return (
    <>
      <Container>
        {wishList.length === 0 ? (
          <div>
            <h5>nothing in wish list move back</h5>
            <NavigationLink to="/home">
              <p style={{ textAlign: "center" }}>click me</p>
            </NavigationLink>
          </div>
        ) : (
          wishList.map((e) => (
            <BoxWrapper key={e.id}>
              <RxCross2
                onClick={() => dispatch(removeFromWishList({ id: e.id }))}
              />
              <div>
                <h4>{e.title}</h4>
                <p>{e.body}</p>
                <TagsAndReactionsWrapper>
                  <span>{e.tags.join(" ")}</span>
                  <span>{e.reactions}</span>
                </TagsAndReactionsWrapper>
              </div>
            </BoxWrapper>
          ))
        )}
      </Container>
    </>
  );
};

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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

export default Fav;
