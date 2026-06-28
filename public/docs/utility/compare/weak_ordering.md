# std::weak_ordering

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
class weak_ordering;
```

O tipo de classe `std::weak_ordering` é o tipo de resultado de uma [comparação de três vias](<#/doc/language/operator_comparison>) que:

*   Admita todos os seis operadores relacionais (`==`, `!=`, `<`, `<=`, `>`, `>=`).
*   Não implica substitutibilidade: se a é equivalente a b, f(a) pode não ser equivalente a f(b), onde f denota uma função que lê apenas o estado saliente para comparação que é acessível através dos membros `const` públicos do argumento. Em outras palavras, valores equivalentes podem ser distinguíveis.
*   [Não permite valores incomparáveis](<https://en.wikipedia.org/wiki/Connected_relation> "enwiki:Connected relation"): exatamente uma das condições a < b, a == b, ou a > b deve ser verdadeira.

### Constantes

O tipo `std::weak_ordering` possui três valores válidos, implementados como membros de dados `const static` de seu tipo:

Nome | Definição
---|---
inline constexpr std::weak_ordering less[static] | um valor válido indicando uma relação de "menor que" (ordenado antes)
(constante membro estática pública)
inline constexpr std::weak_ordering equivalent[static] | um valor válido indicando equivalência (nem ordenado antes nem ordenado depois)
(constante membro estática pública)
inline constexpr std::weak_ordering greater[static] | um valor válido indicando uma relação de "maior que" (ordenado depois)
(constante membro estática pública)

### Conversões

`std::weak_ordering` é implicitamente conversível para `std::partial_ordering`, enquanto `std::strong_ordering` é implicitamente conversível para `weak_ordering`.

** operator partial_ordering** | conversão implícita para `std::partial_ordering`
(função membro pública)

## std::weak_ordering::operator partial_ordering

constexpr operator partial_ordering() const noexcept;

### Valor de retorno

`std::partial_ordering::less` se `v` for `less`, `std::partial_ordering::greater` se `v` for `greater`, `std::partial_ordering::equivalent` se `v` for `equivalent`.

### Comparações

Operadores de comparação são definidos entre valores deste tipo e o literal `0`. Isso suporta as expressões `a <=> b == 0` ou `a <=> b < 0` que podem ser usadas para converter o resultado de um operador de comparação de três vias para uma relação booleana; veja [`std::is_eq`](<#/doc/utility/compare/named_comparison_functions>), [`std::is_lt`](<#/doc/utility/compare/named_comparison_functions>), etc.

Essas funções não são visíveis para a [busca não qualificada](<#/doc/language/unqualified_lookup>) ou [busca qualificada](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas pela [busca dependente de argumento](<#/doc/language/adl>) quando `std::weak_ordering` é uma classe associada dos argumentos.

O comportamento de um programa que tenta comparar um `weak_ordering` com algo diferente do literal inteiro `0` é comportamento indefinido.

** operator==operator&lt;operator&gt;operator<=operator>=operator<=>** | compara com zero ou um `weak_ordering`
(função)

## operator==

```cpp
friend constexpr bool operator==( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator==( weak_ordering v, weak_ordering w ) noexcept = default;  // (2)
```

### Parâmetros

- **v, w** — valores `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `equivalent`, `false` se `v` for `less` ou `greater`

2) `true` se ambos os parâmetros contiverem o mesmo valor, `false` caso contrário

## operator<

```cpp
friend constexpr bool operator<( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<( /*unspecified*/ u, weak_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `less`, e `false` se `v` for `greater` ou `equivalent`

2) `true` se `v` for `greater`, e `false` se `v` for `less` ou `equivalent`

## operator<=

```cpp
friend constexpr bool operator<=( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator<=( /*unspecified*/ u, weak_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `less` ou `equivalent`, e `false` se `v` for `greater`

2) `true` se `v` for `greater` ou `equivalent`, e `false` se `v` for `less`

## operator>

```cpp
friend constexpr bool operator>( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>( /*unspecified*/ u, weak_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `greater`, e `false` se `v` for `less` ou `equivalent`

2) `true` se `v` for `less`, e `false` se `v` for `greater` ou `equivalent`

## operator>=

```cpp
friend constexpr bool operator>=( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr bool operator>=( /*unspecified*/ u, weak_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `true` se `v` for `greater` ou `equivalent`, e `false` se `v` for `less`

2) `true` se `v` for `less` ou `equivalent`, e `false` se `v` for `greater`

## operator<=>

```cpp
friend constexpr weak_ordering operator<=>( weak_ordering v, /*unspecified*/ u ) noexcept;  // (1)
friend constexpr weak_ordering operator<=>( /*unspecified*/ u, weak_ordering v ) noexcept;  // (2)
```

### Parâmetros

- **v** — um valor `std::weak_ordering` para verificar
- **u** — um parâmetro não utilizado de qualquer tipo que aceite o argumento literal zero

### Valor de retorno

1) `v`.

2) `greater` se `v` for `less`, `less` se `v` for `greater`, caso contrário `v`.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(classe)
[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(classe)