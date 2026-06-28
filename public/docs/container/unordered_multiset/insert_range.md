# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range rg.

Cada iterator no range rg é desreferenciado exatamente uma vez. O comportamento é indefinido se rg se sobrepuser ao container.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_multiset/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_multiset/bucket_count>) ocorre um rehashing.
Se ocorrer rehashing (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados.

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-[`value_type`](<#/doc/container/unordered_multiset>) deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_multiset` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Caso médio O(N), onde N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg), pior caso O(N·(a.size() + 1)). 

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>)   
  
### Exemplo

Run this code
```
    #include <iostream>
    #include <unordered_set>
     
    void println(auto, auto const& container)
    {
        for (const auto& elem : container)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::unordered_multiset{1, 3, 2, 4};
        const auto rg = {-1, 3, -2};
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(rg);
    #else
        container.insert(rg.begin(), rg.end());
    #endif
        println("{}", container);
    }
```

Possible output: 
```
    1 -2 3 3 2 -1 4
```

### Ver também

[ insert](<#/doc/container/unordered_multiset/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)  