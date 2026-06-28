# std::error_category::operator==,!=,<,<=>

```cpp
bool operator==( const error_category& rhs ) const noexcept;  // (1) (desde C++11)
bool operator!=( const error_category& rhs ) const noexcept;  // (2) (desde C++11)
(ate C++20)
bool operator<( const error_category& rhs ) const noexcept;  // (3) (desde C++11)
(ate C++20)
std::strong_ordering operator<=>( const error_category& rhs ) const noexcept;  // (4) (desde C++20)
```

Compara com outra categoria de erro.

1) Verifica se *this e rhs se referem ao mesmo objeto.

2) Verifica se *this e rhs não se referem ao mesmo objeto.

3) Ordena *this e rhs pela ordem de this e &rhs. Equivalente a [std::less](<#/doc/utility/functional/less>)&lt;const error_category*&gt;()(this, &rhs).

4) Ordena *this e rhs pela ordem de this e &rhs. Equivalente a [std::compare_three_way](<#/doc/utility/compare/compare_three_way>)()(this, &rhs).

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```

### Parâmetros

- **rhs** — especifica a `error_category` a ser comparada

### Valor de retorno

1) true se *this e rhs se referem ao mesmo objeto, false caso contrário.

2) true se *this e rhs não se referem ao mesmo objeto, false caso contrário.

3) true se *this for menor que rhs conforme definido pela ordem de this e &rhs.

4) std::strong_order::less se *this for menor que rhs conforme definido pela ordem de this e &rhs, caso contrário std::strong_order::greater se rhs for menor que *this na ordem, caso contrário std::strong_order::equal.