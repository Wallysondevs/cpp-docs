# std::nested_exception::operator=

```cpp
nested_exception& operator=( const nested_exception& other ) noexcept = default;
```
```cpp
  // (desde C++11)
(constexpr desde C++26)
```

Substitui a exceção armazenada pela que está contida em `other`.

### Parâmetros

- **other** — exceção aninhada para substituir o conteúdo

### Valor de retorno

`*this`