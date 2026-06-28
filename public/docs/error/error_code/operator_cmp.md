# std::operator==,!=,<,<=>(std::error_code)

Definido no cabeçalho `<system_error>`

```c
bool operator==( const std::error_code& lhs,
const std::error_code& rhs ) noexcept;
bool operator!=( const std::error_code& lhs,
const std::error_code& rhs ) noexcept;
(até C++20)
bool operator<( const std::error_code& lhs,
const std::error_code& rhs ) noexcept;
(até C++20)
std::strong_ordering operator<=>( const std::error_code& lhs,
const std::error_code& rhs ) noexcept;
```

Compara dois objetos error code.

1) Compara lhs e rhs por igualdade.

2) Compara lhs e rhs por igualdade.

3) Verifica se lhs é menor que rhs.

4) Obtém o resultado da comparação de três vias de lhs e rhs.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — códigos de erro para comparar

### Valor de retorno

1) true se a categoria de erro e o valor de erro forem iguais.

2) true se a categoria de erro ou o valor de erro não forem iguais.

3) true se lhs.category() < rhs.category(). Caso contrário, true se lhs.category() == rhs.category() && lhs.value() < rhs.value(). Caso contrário, false.

4) lhs.category() <=> rhs.category() se não for std::strong_ordering::equal. Caso contrário, lhs.value() <=> rhs.value().

### Ver também

[ category](<#/doc/error/error_code/category>) | obtém a error_category para este error_code
(função membro pública)
[ value](<#/doc/error/error_code/value>) | obtém o valor do `error_code`
(função membro pública)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_condition/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara `error_condition`s e `error_code`s
(função)