# std::ranges::take_while_view&lt;V,Pred&gt;::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto end() const requires
ranges::range<const V> &&
std::indirect_unary_predicate<const Pred, ranges::iterator_t<const V>>;  // (2) (desde C++20)
```

  
Retorna um [sentinel](<#/doc/ranges/take_while_view/sentinel>) representando o fim da view. 

Seja [`_base__`](<#/doc/ranges/take_while_view>) denotando a view subjacente. 

1) Efetivamente retorna /*sentinel*/&lt;false&gt;([ranges::end](<#/doc/ranges/end>)(base_), [std::addressof](<#/doc/memory/addressof>)(pred())).

2) Efetivamente retorna /*sentinel*/&lt;true&gt;([ranges::end](<#/doc/ranges/end>)(base_), [std::addressof](<#/doc/memory/addressof>)(pred())).

A sobrecarga (1) não participa da resolução de sobrecarga se `V` for uma [simple view](<#/doc/ranges>) (ou seja, se `V` e const V forem views com os mesmos tipos de iterator e sentinel). 

### Parâmetros

(nenhum) 

### Valor de retorno

Um [sentinel](<#/doc/ranges/take_while_view/sentinel>) representando o fim da view. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3450](<https://cplusplus.github.io/LWG/issue3450>) | C++20  | a sobrecarga const pode retornar um sentinel não comparável ao iterator  | restrito   
  
### Veja também

[ begin](<#/doc/ranges/take_while_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ operator==](<#/doc/ranges/take_while_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`take_while_view::begin`](<#/doc/ranges/take_while_view/begin>)   
(função)