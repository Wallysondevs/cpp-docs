# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range rg se e somente se não houver nenhum elemento com chave equivalente à chave desse elemento em *this.

Cada iterator no range rg é desreferenciado exatamente uma vez. O comportamento é indefinido se rg se sobrepuser ao container.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_map/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_map/bucket_count>), um rehashing ocorre.
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados.

### Parameters

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Type requirements   
-[`value_type`](<#/doc/container/unordered_map>) deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_map` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Return value

(nenhum)

### Complexity

Caso médio O(N), onde N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg), pior caso O(N·(a.size() + 1)).

### Notes

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [Construção e inserção cientes de Ranges](<#/doc/ranges/to>)   
  
### Example

Run this code
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
        auto container = std::unordered_map{std::pair{1, 11}, {3, 33}, {2, 22}, {4, 44}};
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
    {4,44} {-1,-11} {2,22} {3,33} {-2,-22} {1,11}
```

### See also

[ insert](<#/doc/container/unordered_map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)  