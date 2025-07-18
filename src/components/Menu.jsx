import { useState } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import OrderModal from "./OrderModal";

function Menu() {
  // Redux store에서 menu, cart 상태 가져오기
  const menu = useSelector(state => state.menu);
  const cart = useSelector(state => state.cart);

  const [modalOn, setModalOn] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);

  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보가 없어요!
      </div>
    );

  const categorys = Object.keys(menu);

  return (
    <>
      {categorys.map((category) => {
        return (
          <section key={category}>
            <h2>{category}</h2>
            <ul className="menu">
              {menu[category].map((item) => (
                <Item
                  key={item.name}
                  item={item}
                  clickHandler={() => {
                    setModalMenu(item);
                    setModalOn(true);
                  }}
                />
              ))}
            </ul>
          </section>
        );
      })}
      {modalOn ? (
        <OrderModal
          modalMenu={modalMenu}
          setModalOn={setModalOn}
          cart={cart}
          // setCart prop은 제거하고, OrderModal도 Redux 사용하도록 변경 필요
          // setCart={setCart}
        />
      ) : null}
    </>
  );
}

export default Menu;
