# std::experimental::ranges::greater_equal

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires StrictTotallyOrdered<T>
Same<T, void>
/* < on two const T lvalues invokes a built-in operator comparing pointers */
struct greater_equal;
template<>
struct greater_equal<void>;
```

Objeto de função para realizar comparações. O template primário invoca `operator<` em lvalues `const` do tipo `T` e nega o resultado. A especialização `greater_equal<void>` deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `greater_equal` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos de Membro

Tipo de Membro | Definição
---|---
`is_transparent` (membro apenas da especialização `greater_equal<void>`) | /* não especificado */

### Funções de Membro

operator() | verifica se o primeiro argumento é _maior_ ou _igual_ ao segundo
(função de membro pública)

## std::experimental::ranges::greater_equal::operator()

constexpr bool operator()(const T& x, const T& y) const; | (1) | (membro apenas do template primário `greater_equal<T>`)
template< class T, class U >
requires StrictTotallyOrderedWith<T, U>
/* std::declval&lt;T&gt;() < std::declval&lt;U&gt;() resolves to
a built-in operator comparing pointers */
constexpr bool operator()(T&& t, U&& u) const; | (2) | (membro apenas da especialização `greater_equal<void>`)

1) Compara `x` e `y`. Equivalente a `return ![ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}(x, y);`.

2) Compara `t` e `u`. Equivalente a `return ![ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}([std::forward](<#/doc/utility/forward>)<T>(t), [std::forward](<#/doc/utility/forward>)<U>(u));`.

### Notas

Ao contrário de [std::greater_equal](<#/doc/utility/functional/greater_equal>), `ranges::greater_equal` requer que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através das restrições [`StrictTotallyOrdered`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>) e [`StrictTotallyOrderedWith`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>)) e é inteiramente definido em termos de `ranges::less`. No entanto, a implementação é livre para usar `operator>=` diretamente, porque esses concepts exigem que os resultados dos operadores de comparação sejam consistentes.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ greater_equal](<#/doc/utility/functional/greater_equal>) | objeto de função que implementa x >= y
(modelo de classe)