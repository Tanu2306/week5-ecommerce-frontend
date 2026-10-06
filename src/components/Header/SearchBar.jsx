import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../store/productSlice.js';
import useDebounce from '../../utils/useDebounce.js';

export default function SearchBar() {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const items = useSelector((s) => s.products.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debounced = useDebounce(text, 150);

  const suggestions = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return [];
    return items.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [debounced, items]);

  const close = () => {
    setOpen(false);
    setActive(-1);
  };

  const goToProduct = (p) => {
    setText('');
    close();
    navigate(`/products/${p.id}`);
  };

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && suggestions[active]) return goToProduct(suggestions[active]);
    dispatch(setFilter({ query: text.trim() }));
    close();
    navigate('/products');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === 'Escape') {
      close();
    }
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className="relative w-full sm:max-w-sm"
      ref={boxRef}
      onBlur={(e) => !boxRef.current.contains(e.relatedTarget) && close()}
    >
      <input
        type="search"
        className="field"
        placeholder="Search the shop"
        aria-label="Search products"
        aria-autocomplete="list"
        aria-expanded={open && suggestions.length > 0}
        aria-controls="search-suggestions"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && suggestions.length > 0 && (
        <ul id="search-suggestions" role="listbox" className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-lg border border-pine-100 bg-white shadow-lg">
          {suggestions.map((p, i) => (
            <li key={p.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => goToProduct(p)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${i === active ? 'bg-pine-50' : 'hover:bg-pine-50'}`}
              >
                <span>{p.name}</span>
                <span className="text-pine-900/50">{p.category}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
