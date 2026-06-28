# operator==(ranges::elements_view::sentinel)

```cpp
template< bool OtherConst >  
requires std::sentinel_for<ranges::sentinel_t<Base>,  
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>  
friend constexpr bool operator==( const /*iterator*/<OtherConst>& x,  
const /*sentinel*/& y );
```
| | | (desde C++20)

Compara o iterator subjacente de x com o sentinel subjacente de y.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `elements_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

- **x** — [iterator](<#/doc/ranges/elements_view/iterator>) para comparar
- **y** — sentinel para comparar

### Valor de retorno

`x.base() == y.base()`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo