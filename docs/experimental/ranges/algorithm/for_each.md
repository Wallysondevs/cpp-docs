# std::experimental::ranges::for_each

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryInvocable<projected<I, Proj>> Fun >
ranges::tagged_pair<tag::in(I), tag::fun(Fun)>
for_each( I first, S last, Fun f, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryInvocable<projected<ranges::iterator_t<R>, Proj>> Fun >
ranges::tagged_pair<tag::in(ranges::safe_iterator_t<R>), tag::fun(Fun)>
for_each( R&& r, Fun f, Proj proj = Proj{} );
```

1) Invoca o objeto de função `f` fornecido com o resultado da invocação da projeção `proj` ao desreferenciar cada `iterator` no `range` `[`first`, `last`)` (isto é, `[ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(f, [ranges::invoke](<#/doc/experimental/ranges/functional/invoke>)(proj, *i))`), em ordem.

2) O mesmo que (1), mas usa `r` como o `range` de origem, como se usasse `[ranges::begin](<#/doc/ranges/begin>)(r)` como `first` e `[ranges::end](<#/doc/ranges/end>)(r)` como `last`.

Para ambas as sobrecargas, se o tipo do `iterator` for mutável, `f` pode modificar os elementos do `range` através do `iterator` desreferenciado. Se `f` retornar um resultado, o resultado é ignorado.

Ao contrário do restante dos algoritmos, `for_each` não tem permissão para fazer cópias dos elementos na sequência, mesmo que sejam trivialmente copiáveis.

Ao contrário de `[std::for_each](<#/doc/algorithm/for_each>)` (que requer apenas `[MoveConstructible](<#/doc/named_req/MoveConstructible>)`), essas funções exigem que `Fun` modele `[CopyConstructible](<#/doc/experimental/ranges/concepts/CopyConstructible>)`.

Não obstante as declarações descritas acima, o número real e a ordem dos parâmetros `template` para declarações de algoritmo são não especificados. Assim, se argumentos `template` explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first, last** — o `range` ao qual aplicar a função
- **r** — o `range` ao qual aplicar a função
- **f** — objeto chamável a ser aplicado a cada elemento projetado no `range`
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um objeto `tagged_pair` contendo os dois membros a seguir:

*   O primeiro membro, com a `tag` `tag::in`, é o `iterator` "past-the-end" do `range` de origem (isto é, um `iterator` do tipo `I` que se compara como igual ao `sentinel` `last`).
*   O segundo membro, com a `tag` `tag::fun`, é inicializado a partir de `std::move(f)` (após todas as aplicações do objeto de função).

### Complexidade

Exatamente `last - first` aplicações de `f` e `proj`.

### Implementação possível
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryInvocable<ranges::projected<I, Proj>> Fun>
    auto for_each(I first, S last, Fun f, Proj proj = Proj{})
        -> ranges::tagged_pair<tag::in(I), tag::fun(Fun)>
    {
        for (; first != last; ++first)
            ranges::invoke(f, ranges::invoke(proj, *first));
        return {std::move(first), std::move(f)};
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ transform](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/transform&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/transform \(page does not exist\)") | aplica uma função a um `range` de elementos
(modelo de função)
[ loop `for` baseado em `range`](<#/doc/language/range-for>)(C++11) | executa um loop sobre um `range`
---|---
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um `range` de elementos
(modelo de função)
[ for_each_n](<#/doc/algorithm/for_each_n>)(C++17) | aplica um objeto de função aos primeiros N elementos de uma sequência
(modelo de função)