# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg` nos containers subjacentes [`_c_`](<#/doc/container/flat_multimap>) como se por: 
```
    for (const auto& e : rg)
    {
        c.keys.insert(c.keys.end(), e.first);
        c.values.insert(c.values.end(), e.second);
    }
```

Em seguida, ordena o range de elementos recém-inseridos em relação a `value_comp()`. Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado. 

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepuser ao container. 

| As informações sobre invalidação de iterator são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parameters

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
  
### Return value

(nenhum) 

### Complexity

`N + M·log(M)`, onde `N` é `size()` antes da operação e `M` é `[ranges::distance](<#/doc/iterator/ranges/distance>)(rg)`. 

### Notes

Como `insert_range` realiza uma operação de mesclagem in-place, isso pode alocar memória. 

### Example

Execute este código
```
    #include <iostream>
    #include <flat_map>
    #include <utility>
     
    void println(auto, auto const& container)
    {
        for (const auto& [key, value] : container)
            std::cout << '{' << key << ',' << value << '}' << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::flat_multimap{std::pair{1, 11}, {3, 33}, {2, 22}, {4, 44}};
        const auto rg = {std::pair{-1, -11}, {3, -33}, {-2, -22}};
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(rg);
    #else
        container.insert(rg.begin(), rg.end());
    #endif
        println("{}", container);
    }
```

Output: 
```
    {-2,-22} {-1,-11} {1,11} {2,22} {3,33} {3,-33} {4,44}
```

### See also

[ insert](<#/doc/container/flat_multimap/insert>) |  insere elementos   
(função membro pública)  