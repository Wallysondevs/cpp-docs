# std::chrono::tzdb_list::front

```cpp
const std::chrono::tzdb& front() const noexcept;  // (desde C++20)
```

  
Obtém uma referência para o primeiro `std::chrono::tzdb` na lista. Chamadas simultâneas a esta função e a `[std::chrono::reload_tzdb](<#/doc/chrono/tzdb_functions>)()` não introduzem uma *data race*.

### Valor de retorno

Uma referência para o primeiro `std::chrono::tzdb` na lista.