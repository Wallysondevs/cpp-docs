# operator==, !=, &lt;, &lt;=, &gt;, &gt;=, &lt;=&gt;(std::optional)

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
Compara dois objetos `optional`
template< class T, class U >
constexpr bool operator==( const optional<T>& lhs, const optional<U>& rhs );
template< class T, class U >
constexpr bool operator!=( const optional<T>& lhs, const optional<U>& rhs );
template< class T, class U >
constexpr bool operator<( const optional<T>& lhs, const optional<U>& rhs );
template< class T, class U >
constexpr bool operator<=( const optional<T>& lhs, const optional<U>& rhs );
template< class T, class U >
constexpr bool operator>( const optional<T>& lhs, const optional<U>& rhs );
template< class T, class U >
constexpr bool operator>=( const optional<T>& lhs, const optional<U>& rhs );
template< class T, std::three_way_comparable_with<T> U >
constexpr std::compare_three_way_result_t<T, U>
operator<=>( const optional<T>& lhs, const optional<U>& rhs );
Compara um objeto `optional` com um `nullopt`
template< class T >
constexpr bool operator==( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator==( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr bool operator!=( const optional<T>& opt, std::nullopt_t ) noexcept;
(até C++20)
template< class T >
constexpr bool operator!=( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr bool operator<( const optional<T>& opt, std::nullopt_t ) noexcept;
(até C++20)
template< class T >
constexpr bool operator<( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr bool operator<=( const optional<T>& opt, std::nullopt_t ) noexcept;
(até C++20)
template< class T >
constexpr bool operator<=( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr bool operator>( const optional<T>& opt, std::nullopt_t ) noexcept;
(até C++20)
template< class T >
constexpr bool operator>( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr bool operator>=( const optional<T>& opt, std::nullopt_t ) noexcept;
(até C++20)
template< class T >
constexpr bool operator>=( std::nullopt_t, const optional<T>& opt ) noexcept;
(até C++20)
template< class T >
constexpr std::strong_ordering
operator<=>( const optional<T>& opt, std::nullopt_t ) noexcept;
Compara um objeto `optional` com um valor
template< class T, class U >
constexpr bool operator==( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator==( const U& value, const optional<T>& opt );
template< class T, class U >
constexpr bool operator!=( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator!=( const U& value, const optional<T>& opt );
template< class T, class U >
constexpr bool operator<( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator<( const U& value, const optional<T>& opt );
template< class T, class U >
constexpr bool operator<=( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator<=( const U& value, const optional<T>& opt );
template< class T, class U >
constexpr bool operator>( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator>( const U& value, const optional<T>& opt );
template< class T, class U >
constexpr bool operator>=( const optional<T>& opt, const U& value );
template< class U, class T >
constexpr bool operator>=( const U& value, const optional<T>& opt );
template< class T, std::three_way_comparable_with<T> U >
constexpr std::compare_three_way_result_t<T, U>
operator<=>( const optional<T>& opt, const U& value );
```

Realiza operações de comparação em objetos `optional`.

1-7) Compara dois objetos `optional`, `lhs` e `rhs`. Os valores contidos são comparados (usando o operador correspondente de `T`) somente se ambos `lhs` e `rhs` contiverem valores. Caso contrário,

  * `lhs` é considerado _igual a_ `rhs` se, e somente se, ambos `lhs` e `rhs` não contiverem um valor.
  * `lhs` é considerado _menor que_ `rhs` se, e somente se, `rhs` contiver um valor e `lhs` não.

1-6) Seja `@` o operador de comparação correspondente, para cada uma dessas funções: Se a expressão correspondente `*lhs @ *rhs` for malformada ou seu resultado não for conversível para `bool`, o programa é malformado. | (até C++26)
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se a expressão correspondente `*lhs @ *rhs` for bem-formada e seu resultado for conversível para `bool`. | (desde C++26)

```cpp
8-20) Compara `opt` com um `nullopt`. Equivalente a (1-6) ao comparar com um `optional` que não contém um valor. Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de `operator<=>` e `operator==` respectivamente.  // (desde C++20)
```

21-33) Compara `opt` com um valor. Os valores são comparados (usando o operador correspondente de `T`) somente se `opt` contiver um valor. Caso contrário, `opt` é considerado _menor que_ `value`.

21-32) Seja `@` o operador de comparação correspondente, para cada uma dessas funções: Se a expressão correspondente `*opt @ value` ou `value @ *opt` (dependendo das posições dos operandos) for malformada ou seu resultado não for conversível para `bool`, o programa é malformado. | (até C++26)
Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:

  * `U` não é uma especialização de [std::optional](<#/doc/utility/optional>).
  * A expressão correspondente `*opt @ value` ou `value @ *opt` (dependendo das posições dos operandos) é bem-formada e seu resultado é conversível para `bool`.

| (desde C++26)

### Parâmetros

- **lhs, rhs, opt** — um objeto `optional` para comparar
- **value** — valor para comparar com o valor contido

### Valor de retorno

1) lhs.has_value() != rhs.has_value() ? false :
(lhs.has_value() == false ? true : *lhs == *rhs)

2) lhs.has_value() != rhs.has_value() ? true :
(lhs.has_value() == false ? false : *lhs != *rhs)

3) !rhs ? false : (!lhs ? true : *lhs < *rhs)

4) !lhs ? false : (!rhs ? true : *lhs > *rhs)

5) !lhs ? true : (!rhs ? false : *lhs <= *rhs)

6) !rhs ? true : (!lhs ? false : *lhs >= *rhs)

7) lhs && rhs ? *lhs <=> *rhs : lhs.has_value() <=> rhs.has_value()

8,9) !opt

10,11) opt.has_value()

12) false

13) opt.has_value()

14) !opt

15) true

16) opt.has_value()

17) false

18) true

19) !opt

20) opt.has_value() <=> false

21) opt.has_value() ? *opt == value : false

22) opt.has_value() ? value == *opt : false

23) opt.has_value() ? *opt != value : true

24) opt.has_value() ? value != *opt : true

25) opt.has_value() ? *opt < value : true

26) opt.has_value() ? value < *opt : false

27) opt.has_value() ? *opt <= value : true

28) opt.has_value() ? value <= *opt : false

29) opt.has_value() ? *opt > value : false

30) opt.has_value() ? value > *opt : true

31) opt.has_value() ? *opt >= value : false

32) opt.has_value() ? value >= *opt : true

33) opt.has_value() ? *opt <=> value : std::strong_ordering::less

### Exceções

1-7) Pode lançar exceções definidas pela implementação.

21-33) Lança exceções quando e o que a comparação lança.

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constrained_equality`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | operadores de comparação restritos para [std::optional](<#/doc/utility/optional>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2945](<https://cplusplus.github.io/LWG/issue2945>) | C++17 | ordem dos parâmetros de template inconsistente para casos de comparação com T | tornada consistente