# std::ranges::iota_view&lt;W, Bound&gt;::empty

```cpp
constexpr bool empty() const;  // (desde C++20)
```

  
Verifica se o range está vazio (ou seja, se o valor inicial é o mesmo que o valor sentinela). 

### Valor de retorno

`_[value_](<#/doc/ranges/iota_view>)_` `==` ` _[bound_](<#/doc/ranges/iota_view>)_`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto a = std::ranges::iota_view<int, int>();
        assert(a.empty());
    
        auto b = std::ranges::iota_view(4);
        assert(!b.empty());
    
        auto c = std::ranges::iota_view(4, 8);
        assert(!c.empty());
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 4001](<https://cplusplus.github.io/LWG/issue4001>) | C++20  | a função membro herdada `empty` nem sempre era válida  | `empty` é sempre fornecida   
  
### Veja também

[ size](<#/doc/ranges/iota_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).   
(função membro pública)  