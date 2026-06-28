# std::experimental::ranges::equal_to

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires EqualityComparable<T>
Same<T, void>
/* == on two const T lvalues invokes a built-in operator comparing pointers */
struct equal_to;
template<>
struct equal_to<void>;
```

Objeto de função para realizar comparações. O template primário invoca o operador `==` em lvalues `const` do tipo `T`. A especialização `equal_to<void>` deduz os tipos dos parâmetros do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `equal_to` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos Membro

Tipo Membro | Definição
---|---
`is_transparent` (membro apenas da especialização `equal_to<void>`) | /* unspecified */

### Funções Membro

operator() | verifica se os argumentos são _iguais_
(função membro pública)

## std::experimental::ranges::equal_to::operator()

constexpr bool operator()(const T& x, const T& y) const; | (1) | (membro apenas do template primário `equal_to<T>`)
template< class T, class U >
requires EqualityComparableWith<T, U>
/* std::declval&lt;T&gt;() == std::declval&lt;U&gt;() resolves to
a built-in operator comparing pointers */
constexpr bool operator()(T&& t, U&& u) const; | (2) | (membro apenas da especialização `equal_to<void>`)

1) Compara `x` e `y`. Equivalente a `return [ranges::equal_to](<#/doc/experimental/ranges/functional/equal_to>)<>{}(x, y);`.

2) Compara `t` e `u`. Equivalente a `return [std::forward](<#/doc/utility/forward>)<T>(t) == [std::forward](<#/doc/utility/forward>)<U>(u);`, exceto quando essa expressão se resolve para uma chamada a um operador `==` embutido que compara ponteiros.

Quando uma chamada para (1) ou (2) invocaria um operador embutido que compara ponteiros do tipo `P`, o resultado é determinado da seguinte forma:

*   Retorna `false` se um dos valores (possivelmente convertidos) do primeiro argumento e o valor (possivelmente convertido) do segundo argumento precede o outro na ordenação total estrita definida pela implementação sobre todos os valores de ponteiro do tipo `P`. Esta ordenação total estrita é consistente com a ordem parcial imposta pelos operadores embutidos `<`, `>`, `<=`, e `>=`.
*   Caso contrário (nenhum precede o outro), retorna `true`.

O comportamento é indefinido a menos que as sequências de conversão de `T` e `U` para `P` preservem a igualdade (veja abaixo).

### Preservação de Igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

*   As entradas para uma expressão consistem em seus operandos.
*   As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

### Notas

Ao contrário de [`std::equal_to`](<#/doc/utility/functional/equal_to>), `ranges::equal_to` exige que `==` e `!=` sejam válidos (através das constraints [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>) e [`EqualityComparableWith`](<#/doc/experimental/ranges/concepts/EqualityComparable>)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[`equal_to`](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(class template)