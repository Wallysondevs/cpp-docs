# std::experimental::ranges::not_equal_to

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires EqualityComparable<T>
Same<T, void>
/* == on two const T lvalues invokes a built-in operator comparing pointers */
struct not_equal_to;
template<>
struct not_equal_to<void>;
```

Objeto de função para realizar comparações. O template primário invoca o operador `==` em lvalues `const` do tipo `T` e nega o resultado. A especialização `not_equal_to<void>` deduz os tipos dos parâmetros do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `not_equal_to` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos membro

Tipo membro | Definição
---|---
`is_transparent` (membro apenas da especialização `not_equal_to<void>`) | /* não especificado */

### Funções membro

operator() | verifica se os argumentos são _diferentes_
(função membro pública)

## std::experimental::ranges::not_equal_to::operator()

constexpr bool operator()(const T& x, const T& y) const; | (1) | (membro apenas do template primário `not_equal_to<T>`)
template< class T, class U >
requires EqualityComparableWith<T, U>
/* std::declval&lt;T&gt;() == std::declval&lt;U&gt;() resolves to
a built-in operator comparing pointers */
constexpr bool operator()(T&& t, U&& u) const; | (2) | (membro apenas da especialização `not_equal_to<void>`)

1) Compara `x` e `y`. Equivalente a `return !ranges::equal_to<>{}(x, y);`.

2) Compara `t` e `u`. Equivalente a `return !ranges::equal_to<>{}([std::forward](<#/doc/utility/forward>)<T>(t), [std::forward](<#/doc/utility/forward>)<U>(u));`.

### Notas

Ao contrário de [std::not_equal_to](<#/doc/utility/functional/not_equal_to>), `ranges::not_equal_to` requer que tanto `==` quanto `!=` sejam válidos (através dos [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>) e [`EqualityComparableWith`](<#/doc/experimental/ranges/concepts/EqualityComparable>) constraints), e é inteiramente definido em termos de `ranges::equal_to`. No entanto, a implementação é livre para usar `operator!=` diretamente, porque esses concepts exigem que os resultados de `==` e `!=` sejam consistentes.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ not_equal_to](<#/doc/utility/functional/not_equal_to>) | objeto de função que implementa `x != y`
(template de classe)