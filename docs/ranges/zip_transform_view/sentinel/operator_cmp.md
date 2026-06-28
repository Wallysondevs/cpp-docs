# operator==(ranges::zip_transform_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
friend constexpr bool operator==( const /*iterator*/<OtherConst>& x,
const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y. 

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `zip_transform_view::_sentinel_` é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/zip_transform_view>) para comparar   
---|---|---
y  |  \-  |  [sentinel](<#/doc/ranges/zip_transform_view>) para comparar   
  
### Valor de retorno

x.inner_ == y.inner_, onde `_inner__` denota o iterator ou sentinel subjacente, respectivamente. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   