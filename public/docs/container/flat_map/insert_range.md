# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg` nos containers subjacentes [`_c_`](<#/doc/container/flat_map>) como se por: 
```cpp 
    for (const auto& e : rg)
    {
        c.keys.insert(c.keys.end(), e.first);
        c.values.insert(c.values.end(), e.second);
    }
```

Em seguida, ordena o range de elementos recém-inseridos em relação a `value_comp()`. Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado. Finalmente, apaga os elementos duplicados como se por: 
```cpp 
    auto zv = views::zip(c.keys, c.values);
    auto it = ranges::unique(zv, key_equiv(compare)).begin();
    auto dist = std::distance(zv.begin(), it);
    c.keys.erase(c.keys.begin() + dist, c.keys.end());
    c.values.erase(c.values.begin() + dist, c.values.end());
```

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepuser ao container. 

| Informações sobre invalidação de iterators são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
  
### Valor de retorno

(nenhum) 

### Complexidade

N + M·log(M), onde `N` é size() antes da operação e `M` é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg). 

### Observações

Como `insert_range` realiza uma operação de mesclagem in-place, isso pode alocar memória. 

### Exemplo

Execute este código
```cpp 
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
        auto container = std::flat_map{std::pair{1, 11}, {3, 33}, {2, 22}, {4, 44}};
        const auto rg = {std::pair{-1, -11}, {3, -33}, {-2, -22}};
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
    {-2,-22} {-1,-11} {1,11} {2,22} {3,33} {4,44}
```

### Veja também

[ insert](<#/doc/container/flat_map/insert>) |  insere elementos   
(função membro pública)  