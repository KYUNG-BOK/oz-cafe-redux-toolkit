import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/redux'; // redux 액션 import
import data from '../assets/data';

function OrderModal({ modalMenu, setModalOn }) {
  const dispatch = useDispatch();

  // 옵션 상태 (온도, 진하기, 사이즈)
  const [options, setOptions] = useState({ 온도: 0, 진하기: 0, 사이즈: 0 });
  // 수량 상태
  const [quantity, setQuantity] = useState(1);

  const itemOptions = data.options;

  // 장바구니에 아이템 추가하는 함수
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: modalMenu.id,
        options,
        quantity,
      })
    );
    setModalOn(false); // 모달 닫기
  };

  if (!modalMenu) return null;

  return (
    <section className="modal-backdrop" onClick={() => setModalOn(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-item">
          <img src={modalMenu.img} alt={modalMenu.name} />
          <div>
            <h3>{modalMenu.name}</h3>
            <div>{modalMenu.description}</div>
          </div>
        </div>
        <ul className="options">
          {Object.keys(itemOptions).map((optionName) => (
            <Option
              key={optionName}
              name={optionName}
              options={options}
              setOptions={setOptions}
              itemOptions={itemOptions[optionName]}
            />
          ))}
        </ul>
        <div className="submit">
          <div>
            <label htmlFor="count">개수</label>
            <input
              id="count"
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button onClick={handleAddToCart}>장바구니 넣기</button>
        </div>
      </div>
    </section>
  );
}

function Option({ name, options, setOptions, itemOptions }) {
  return (
    <li className="option">
      {name}
      <ul>
        {itemOptions.map((optionValue, idx) => (
          <li key={optionValue}>
            <input
              type="radio"
              name={name}
              checked={options[name] === idx}
              onChange={() => setOptions({ ...options, [name]: idx })}
            />
            {optionValue}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default OrderModal;
