# std::partial_ordering

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
class partial_ordering;
```

O tipo de classe `std::partial_ordering` é o tipo de resultado de uma [comparação de três vias](<#/doc/language/operator_comparison>) que:

  * Admite todos os seis operadores relacionais (`==`, `!=`, `<`, `<=`, `>`, `>=`).

  * Não implica substituibilidade: se a é equivalente a b, f(a) pode não ser equivalente a f(b), onde f denota uma função que lê apenas o estado saliente para comparação que é acessível através dos membros `const` públicos do argumento. Em outras palavras, valores equivalentes podem ser distinguíveis.
  * [Admite valores incomparáveis](<https://en.wikipedia.org/wiki/Connected_relation> "enwiki:Connected relation"): a < b, a == b, e a > b podem ser todos falsos.

### Constantes

O tipo `std::partial_ordering` possui quatro valores válidos, implementados como membros de dados `const static` de seu tipo:

Nome | Definição
---|---
inline constexpr std::partial_ordering less[static] | um valor válido indicando uma relação de "menor que" (ordenado antes)
(constante membro estática pública)
inline constexpr std::partial_ordering equivalent[static] | um valor válido indicando equivalência (nem ordenado antes nem ordenado depois)
(constante membro estática pública)
inline constexpr std::partial_ordering greater[static] | um valor válido indicando uma relação de "maior que" (ordenado depois)
(constante membro estática pública)
inline constexpr std::partial_ordering unordered[static] | um valor válido indicando uma relação com um valor incomparável
(constante membro estática pública)

### Conversões

`std::partial_ordering` não pode ser implicitamente convertido para outros tipos de categoria de comparação, enquanto `std::strong_ordering` e `std::weak_ordering` são implicitamente conversíveis para `partial_ordering`.

### Comparações

Operadores de comparação são definidos entre valores deste tipo e o literal `0`. Isso suporta as expressões `a <=> b == 0` ou `a <=> b < 0` que podem ser usadas para converter o resultado de um operador de comparação de três vias para uma relação booleana; veja [`std::is_eq`](<#/doc/utility/compare/named_comparison_functions>), [`std::is_lt`](<#/doc/utility/compare/named_comparison_functions>), etc.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [lookup dependente de argumento](<#/doc/language/adl>) quando `std::partial_ordering` é uma classe associada dos argumentos.

O comportamento de um programa que tenta comparar um `partial_ordering` com qualquer coisa diferente do literal inteiro `0` é indefinido.

** operator==operator&lt;operator&gt;operator<=operator>=operator<=>** | compara com zero ou um `partial_ordering`
(função)

## operator==

```cpp
friend constexpr bool operator==( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool
operator==( partial_ordering v, partial_ordering w ) noexcept = default;  // (2)
```

### Parâmetros

- **v, w** — valores `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `equivalent`, `false` se `v` for `less`, `greater`, ou `unordered`

2) `true` se ambos os parâmetros contiverem o mesmo valor, `false` caso contrário

## operator<

```cpp
friend constexpr bool operator<( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<( /*unspecified*/ u, partial_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `less`, e `false` se `v` for `greater`, `equivalent`, ou `unordered`

2) `true` se `v` for `greater`, e `false` se `v` for `less`, `equivalent`, ou `unordered`

## operator<=

```cpp
friend constexpr bool operator<=( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<=( /*unspecified*/ u, partial_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `less` ou `equivalent`, e `false` se `v` for `greater` ou `unordered`

2) `true` se `v` for `greater` ou `equivalent`, e `false` se `v` for `less` ou `unordered`

## operator>

```cpp
friend constexpr bool operator>( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>( /*unspecified*/ u, partial_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `greater`, e `false` se `v` for `less`, `equivalent`, ou `unordered`

2) `true` se `v` for `less`, e `false` se `v` for `greater`, `equivalent`, ou `unordered`

## operator>=

```cpp
friend constexpr bool operator>=( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>=( /*unspecified*/ u, partial_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `greater` ou `equivalent`, e `false` se `v` for `less` ou `unordered`

2) `true` se `v` for `less` ou `equivalent`, e `false` se `v` for `greater` ou `unordered`

## operator<=>

```cpp
friend constexpr partial_ordering operator<=>( partial_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr partial_ordering operator<=>( /*unspecified*/ u, partial_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::partial_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) v.

2) `greater` se `v` for `less`, `less` se `v` for `greater`, caso contrário `v`.

### Notas

O [operador `operator<=>` embutido](<#/doc/language/operator_comparison>) entre valores de ponto flutuante usa esta ordenação: o zero positivo e o zero negativo comparam como `equivalent`, mas podem ser distinguidos, e valores NaN comparam como `unordered` com qualquer outro valor.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(classe)
[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(classe)