# std::experimental::ranges::greater

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires StrictTotallyOrdered<T>
Same<T, void>
/* < on two const T lvalues invokes a built-in operator comparing pointers */
struct greater;
template<>
struct greater<void>;
```

Objeto de função para realizar comparações. O template primário invoca operator< em lvalues const do tipo `T` com a ordem dos argumentos invertida. A especialização `greater<void>` deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `greater` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos de Membro

Tipo de Membro | Definição
---|---
`is_transparent` (membro apenas da especialização `greater<void>`) | /* não especificado */

### Funções Membro

operator() | verifica se o primeiro argumento é _maior_ que o segundo
(função membro pública)

## std::experimental::ranges::greater::operator()

constexpr bool operator()(const T& x, const T& y) const; | (1) | (membro apenas do template primário `greater<T>`)
template< class T, class U >
requires StrictTotallyOrderedWith<T, U>
/* std::declval&lt;T&gt;() < std::declval&lt;U&gt;() resolves to
a built-in operator comparing pointers */
constexpr bool operator()(T&& t, U&& u) const; | (2) | (membro apenas da especialização `greater<void>`)

1) Compara `x` e `y`. Equivalente a `return [ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}(y, x);`.

2) Compara `t` e `u`. Equivalente a `return [ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}([std::forward](<#/doc/utility/forward>)<U>(u), [std::forward](<#/doc/utility/forward>)<T>(t));`.

### Notas

Ao contrário de [std::greater](<#/doc/utility/functional/greater>), `ranges::greater` exige que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através dos conceitos [`StrictTotallyOrdered`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>) e [`StrictTotallyOrderedWith`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>)) e é inteiramente definido em termos de `ranges::less`. No entanto, a implementação é livre para usar `operator>` diretamente, porque esses conceitos exigem que os resultados dos operadores de comparação sejam consistentes.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(class template)