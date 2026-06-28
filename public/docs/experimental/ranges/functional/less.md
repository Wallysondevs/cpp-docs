# std::experimental::ranges::less

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires StrictTotallyOrdered<T>
Same<T, void>
/* < on two const T lvalues invokes a built-in operator comparing pointers */
struct less;
template<>
struct less<void>;
```

Objeto de função para realizar comparações. O template primário invoca o operator< em lvalues const do tipo `T`. A especialização `less<void>` deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `less` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos de membro

Tipo de membro | Definição
---|---
`is_transparent` (membro apenas da especialização `less<void>`) | /* não especificado */

### Funções membro

operator() | verifica se o primeiro argumento é _menor_ que o segundo
(função membro pública)

## std::experimental::ranges::less::operator()

constexpr bool operator()(const T& x, const T& y) const; | (1) | (membro apenas do template primário `less<T>`)
template< class T, class U >
requires StrictTotallyOrderedWith<T, U>
/* std::declval&lt;T&gt;() < std::declval&lt;U&gt;() resolves to
a built-in operator comparing pointers */
constexpr bool operator()(T&& t, U&& u) const; | (2) | (membro apenas da especialização `less<void>`)

1) Compara `x` e `y`. Equivalente a return [ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}(x, y);.

2) Compara `t` e `u`. Equivalente a return [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) < [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u);, exceto quando essa expressão se resolve para uma chamada a um operator< embutido que compara ponteiros.

Quando uma chamada para (1) ou (2) invocaria um operador embutido que compara ponteiros do tipo `P`, o resultado é determinado da seguinte forma:

*   Retorna true se o valor (possivelmente convertido) do primeiro argumento precede o valor (possivelmente convertido) do segundo argumento na ordenação total estrita definida pela implementação sobre todos os valores de ponteiro do tipo `P`. Esta ordenação total estrita é consistente com a ordem parcial imposta pelos operadores embutidos `<`, `>`, `<=`, e `>=`.
*   Caso contrário, retorna false.

O comportamento é indefinido a menos que as sequências de conversão de `T` e `U` para `P` preservem a igualdade (veja abaixo).

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

*   As entradas para uma expressão consistem em seus operandos.
*   As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

### Notas

Ao contrário de [std::less](<#/doc/utility/functional/less>), `ranges::less` exige que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através das constraints [`StrictTotallyOrdered`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>) e [`StrictTotallyOrderedWith`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(template de classe)