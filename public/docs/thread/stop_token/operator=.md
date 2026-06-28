# std::stop_token::operator=

```cpp
std::stop_token& operator=( const std::stop_token& other ) noexcept;  // (1) (desde C++20)
std::stop_token& operator=( std::stop_token&& other ) noexcept;  // (2) (desde C++20)
```

Substitui o estado de parada associado pelo de other.

1) Atribui por cópia o estado de parada associado de other ao de *this. Equivalente a stop_token(other).swap(*this).

2) Atribui por movimento o estado de parada associado de other ao de *this. Após a atribuição, *this contém o estado de parada associado anterior de other, e other não possui estado de parada associado. Equivalente a stop_token(std::move(other)).swap(*this).

### Parâmetros

- **other** — outro objeto `stop_token` para compartilhar o estado de parada ou adquirir o estado de parada dele