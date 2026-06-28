# operator==(std::ranges::take_view::sentinel&lt;Const&gt;)

```cpp
friend constexpr bool
operator==( const std::counted_iterator<ranges::iterator_t<Base>>& y,
const /*sentinel*/& x );  // (1) (desde C++20)
template< bool OtherC = !Const >
requires std::sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t</*add-const-if*/<OtherC, V>>>
friend constexpr bool
operator==( const std::counted_iterator<
ranges::iterator_t</*add-const-if*/<OtherC, V>>>& y,
const /*sentinel*/& x );  // (2) (desde C++20)
```

  
Compara um take_view::/*sentinel*/ com um [std::counted_iterator](<#/doc/iterator/counted_iterator>) (tipicamente obtido de uma chamada para [`take_view::begin`](<#/doc/ranges/take_view/begin>)).

Retorna true se y aponta para além do N-ésimo elemento (onde N é o número passado para o [construtor de `take_view`](<#/doc/ranges/take_view/take_view>)), ou se o fim da view subjacente for alcançado.

O alias template apenas para exposição /*add-const-if*/ é definido como  
template&lt;bool C, class T&gt;  
using /*add-const-if*/ = [std::conditional_t](<#/doc/types/conditional>)<C, const T, T>;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::take_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

y  |  \-  |  [std::counted_iterator](<#/doc/iterator/counted_iterator>) para comparar   
---|---|---
x  |  \-  |  sentinel para comparar   
  
### Valor de retorno

y.count() == 0 || y.base() == x.end_, onde `_end__` denota o sentinel subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
[LWG 3449](<https://cplusplus.github.io/LWG/issue3449>) | C++20  | comparação entre o iterator e o sentinel de  
`take_view` com qualificadores const diferentes não era suportada  | tornada suportada quando possível 