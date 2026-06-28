# std::ranges::take_while_view&lt;V,Pred&gt;::begin

```cpp
constexpr auto begin() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto begin() const requires
ranges::range<const V> &&
std::indirect_unary_predicate<const Pred, ranges::iterator_t<const V>>;  // (2) (desde C++20)
```

Retorna um iterator para o primeiro elemento da view. Efetivamente chama [ranges::begin](<#/doc/ranges/begin>) na view subjacente [`_base__`](<#/doc/ranges/take_while_view>).

A sobrecarga (1) não participa da resolução de sobrecarga se `V` for uma [simple view](<#/doc/ranges>) (isto é, se `V` e const V forem views com os mesmos tipos de iterator e sentinel).

### Parâmetros

(nenhum)

### Valor de retorno

[ranges::begin](<#/doc/ranges/begin>)(base_), onde [`_base__`](<#/doc/ranges/take_while_view>) é a view subjacente.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3450](<https://cplusplus.github.io/LWG/issue3450>) | C++20 | a sobrecarga const pode retornar um iterator não comparável ao sentinel | restrito

### Ver também

[ end](<#/doc/ranges/take_while_view/end>) | retorna um sentinel representando o fim
(função membro pública)
[ operator==](<#/doc/ranges/take_while_view/sentinel/operator_cmp>)(C++20) | compara um sentinel com um iterator retornado de `take_while_view::begin`
(função)