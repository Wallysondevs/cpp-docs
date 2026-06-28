# operator==(ranges::adjacent_transform_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sentinel_for</*inner-sentinel*/<Const>,
/*inner-iterator*/<OtherConst>>
friend constexpr bool operator==( const /*iterator*/<OtherConst>& x,
const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y.

Equivalente a: return x. [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) ` `== y. [`_inner__`](<#/doc/ranges/adjacent_transform_view/sentinel>) ; .

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_transform_view::_sentinel_` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/adjacent_transform_view/iterator>) para comparar   
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/adjacent_transform_view/sentinel>) para comparar   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   