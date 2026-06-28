# operator==,!=,<,<=>(std::error_condition)

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
bool operator==( const std::error_condition& lhs,
const std::error_condition& rhs ) noexcept;
bool operator!=( const std::error_condition& lhs,
const std::error_condition& rhs ) noexcept;
(até C++20)
bool operator<( const std::error_condition& lhs,
const std::error_condition& rhs ) noexcept;
(até C++20)
std::strong_ordering operator<=>( const std::error_condition& lhs,
const std::error_condition& rhs ) noexcept;
bool operator==( const std::error_code& code,
const std::error_condition& cond ) noexcept;
bool operator==( const std::error_condition& cond,
const std::error_code& code ) noexcept;
(até C++20)
bool operator!=( const std::error_code& code,
const std::error_condition& cond ) noexcept;
(até C++20)
bool operator!=( const std::error_condition& cond,
const std::error_code& code ) noexcept;
(até C++20)
```

Compara duas condições de erro.

1) Verifica se lhs e rhs são iguais.

2) Verifica se lhs e rhs não são iguais.

3) Verifica se lhs é _menor que_ rhs.

4) Obtém o resultado da comparação de três vias de lhs e rhs.

5) Verifica se code é uma correspondência semântica para cond.

6) Verifica se code não é uma correspondência semântica para cond.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs, cond** — condições de erro para comparar
- **code** — o código de erro para comparar

### Valor de retorno

1) true se a categoria de erro e o valor de erro compararem como iguais.

2) true se a categoria de erro ou o valor de erro não compararem como iguais.

3) true se lhs.category() < rhs.category(). Caso contrário, true se lhs.category() == rhs.category() && lhs.value() < rhs.value(). Caso contrário, false.

4) lhs.category() <=> rhs.category() se não for std::strong_ordering::equal. Caso contrário, lhs.value() <=> rhs.value().

5) true se code.category().equivalent(code.value(), cond) ou cond.category().equivalent(code, cond.value()).

6) true se nem code.category().equivalent(code.value(), cond) nem cond.category().equivalent(code, cond.value()).

### Veja também

[ equivalent](<#/doc/error/error_category/equivalent>)[virtual] | compara `error_code` e `error_condition` por equivalência
(função membro pública virtual de `std::error_category`)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_code/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara dois `error_code`s
(função)