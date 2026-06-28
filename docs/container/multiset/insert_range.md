# std::multiset&lt;Key,Compare,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg`.

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepuser ao container.

Nenhum iterator ou referência é invalidado.

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-[`value_type`](<#/doc/container/multiset>) deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `multiset` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

N·log(a.size() + N), onde `N` é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg). 

### Observações

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [sensíveis a ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <set>
     
    void println(auto, auto const& container)
    {
        for (const auto& elem : container)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::multiset{1, 3, 2, 4};
        const auto rg = {-1, 3, -2};
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(rg);
    #else
        container.insert(rg.begin(), rg.end());
    #endif
        println("{}", container);
    }
```

Saída: 
```
    -2 -1 1 2 3 3 4
```

### Veja também

[ insert](<#/doc/container/multiset/insert>) | insere elementos ou nós (desde C++17)   
(função membro pública)  