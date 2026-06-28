# std::ranges::join_view&lt;V&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`join_view::end`](<#/doc/ranges/join_view/end>) quando qualquer um dos ranges subjacentes (`V` ou [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt;) não é um [`common_range`](<#/doc/ranges/common_range>), ou quando o `join_view` pai não é um [`forward_range`](<#/doc/ranges/forward_range>). 

Se `V` não for uma [simple view](<#/doc/ranges>), `Const` é true para sentinels retornados das sobrecargas const, e false caso contrário. Se `V` for uma simple view, `Const` é true. 

### Tipos de membros

Membro  |  Definição   
---|---
`_Parent_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::join_view](<#/doc/ranges/join_view>)&lt;V&gt;>  
(tipo de membro apenas para exposição*)  
`_Base_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo de membro apenas para exposição*)  
  
### Membros de dados

Membro  |  Definição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; `_end__` (privado) |  Um sentinel obtido de `V` (possivelmente qualificado como const)  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/join_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/join_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`join_view::begin`](<#/doc/ranges/join_view/begin>)   
(função)  