# std::map&lt;Key,T,Compare,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<value_type> R >
void insert_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento no range `rg` se e somente se não houver nenhum elemento com chave equivalente à chave desse elemento em `*this`.

Cada iterator no range `rg` é desreferenciado exatamente uma vez. O comportamento é indefinido se `rg` se sobrepuser ao container.

Nenhum iterator ou referência é invalidado.

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-[`value_type`](<#/doc/container/map>) deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `map` a partir de `*[ranges::begin](<#/doc/ranges/begin>)(rg)`. Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

N·log(a.size() + N), onde `N` é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg). 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <utility>
     
    void println(auto, auto const& container)
    {
        for (const auto& [key, value] : container)
            std::cout << '{' << key << ',' << value << '}' << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        auto container = std::map{std::pair{1, 11}, {3, 33}, {2, 22}, {4, 44}};
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

[ insert](<#/doc/container/map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)  