# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg` no container subjacente [`_c_`](<#/doc/container/flat_multiset>) como se por: 
```
    for (const auto& e : rg)
        c.insert(c.end(), e);
```

Em seguida, ordena o range de elementos recém-inseridos em relação a [`_compare_`](<#/doc/container/flat_multiset>). Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado. 

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepuser ao container. 

| Informações sobre invalidação de iterators são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), isto é, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
  
### Valor de retorno

(nenhum) 

### Complexidade

N + M·log(M), onde `N` é size() antes da operação e `M` é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg). 

### Notas

Como `insert_range` executa uma operação de mesclagem in-place, isso pode alocar memória. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <flat_set>
     
    void println(auto, auto const& container)
    {
        for (const auto& elem : container)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::flat_multiset{1, 3, 2, 4};
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

### Ver também

[ insert](<#/doc/container/flat_multiset/insert>) |  insere elementos   
(função membro pública)  