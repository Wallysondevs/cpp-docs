# std::future_error::operator=

```cpp
future_error& operator=( const future_error& other ) noexcept;  // (desde C++11)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::future_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto `future_error` para atribuir

### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo