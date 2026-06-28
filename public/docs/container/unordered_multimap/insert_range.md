# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg`.

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepõe ao container.

Se após a operação o novo número de elementos for maior que `max_load_factor()` antigo `*` `bucket_count()`, ocorre um rehashing.  
Se o rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados.

### Parameters

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Type requirements   
-[`value_type`](<#/doc/container/unordered_multimap>) deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_multimap` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Return value

(nenhum)

### Complexity

Caso médio O(N), onde N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg), pior caso O(N·(a.size() + 1)).

### Notes

Macro de teste de funcionalidade | Valor | Std | Funcionalidade   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Example

Execute este código
```
    #include <iostream>
    #include <unordered_map>
    #include <utility>
     
    void println(auto, auto const& container)
    {
        for (const auto& [key, value] : container)
            std::cout << '{' << key << ',' << value << '}' << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::unordered_multimap{std::pair{1, 11}, {3, 33}, {2, 22}, {4, 44}};
        const auto rg = {std::pair{-1, -11}, {3, -33}, {-2, -22}};
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(rg);
    #else
        container.insert(rg.begin(), rg.end());
    #endif
        println("{}", container);
    }
```

Saída possível:
```
    {1,11} {-2,-22} {3,-33} {3,33} {2,22} {-1,-11} {4,44}
```

### See also

[ insert](<#/doc/container/unordered_multimap/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)  