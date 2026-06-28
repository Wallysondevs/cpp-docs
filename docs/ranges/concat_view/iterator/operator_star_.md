# std::ranges::concat_view&lt;Views...&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++26)
```

  
Retorna uma referência para o elemento atual no [`concat_view`](<#/doc/ranges/concat_view>). 

Equivalente a  using reference =` ` _[concat-reference-t](<#/doc/ranges/concat_view>)_` ﻿<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>...>;  
return [std::visit](<#/doc/utility/variant/visit>)([](auto&& it) -> reference { return *it; },` ` _[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿); . 

Se `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() for true, o comportamento é indefinido. 

### Valor de retorno

Conforme descrito acima. 

### Observações

operator-> não é fornecido. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/ranges/concat_view/iterator/operator_at>)(C++26) | acessa um elemento por índice   
(função membro pública)  