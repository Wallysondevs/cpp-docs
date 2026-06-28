# std::stop_source::operator=

```cpp
std::stop_source& operator=( const std::stop_source& other ) noexcept;  // (1) (desde C++20)
std::stop_source& operator=( std::stop_source&& other ) noexcept;  // (2) (desde C++20)
```

Substitui o estado de parada pelo de other.

1) Atribui por cópia o estado de parada de other para o de *this. Equivalente a stop_source(other).swap(*this).

2) Atribui por movimento o estado de parada de other para o de *this. Após a atribuição, *this contém o estado de parada anterior de other, e other não possui estado de parada. Equivalente a stop_source(std::move(other)).swap(*this).

### Parâmetros

- **other** — outro objeto `stop_source` para compartilhar o estado de parada ou adquirir o estado de parada dele