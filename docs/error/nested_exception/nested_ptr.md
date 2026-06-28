# std::nested_exception::nested_ptr

```cpp
std::exception_ptr nested_ptr() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

Retorna um ponteiro para a exceção armazenada, se houver.

### Parâmetros

(nenhum)

### Valor de retorno

Um `std::exception_ptr` para a exceção armazenada, se houver uma, ou um `std::exception_ptr` inicializado por padrão caso contrário.