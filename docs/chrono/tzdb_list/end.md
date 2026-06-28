# std::chrono::tzdb_list::end, std::chrono::tzdb_list::cend

```cpp
const_iterator end() const noexcept;  // (desde C++20)
const_iterator cend() const noexcept;  // (desde C++20)
```

  
Retorna o iterator past-the-end da `tzdb_list`. Tentar desreferenciar este iterator resulta em comportamento indefinido.

### Valor de retorno

O iterator past-the-end.