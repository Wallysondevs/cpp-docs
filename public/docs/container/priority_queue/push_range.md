# std::priority_queue&lt;T,Container,Compare&gt;::push_range

```cpp
template< container-compatible-range<value_type> R >
void push_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento de `rg` na `priority_queue`, como se por: 

  * `c.append_range([std::forward](<#/doc/utility/forward>)<R>(rg))` se essa for uma expressão válida (ou seja, o container subjacente `c` possui uma função membro `append_range` apropriada), ou 
  * `[ranges::copy](<#/doc/algorithm/ranges/copy>)(rg, [std::back_inserter](<#/doc/iterator/back_inserter>)(c))` caso contrário. 

Em seguida, restaura a propriedade de heap como se por `[ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(c, comp)`. Após a inserção, `[ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(c, comp)` é verdadeiro. 

Cada iterator no range `rg` é desreferenciado exatamente uma vez. 

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
  
### Valor de retorno

(nenhum) 

### Complexidade

A complexidade de `c.append_range` mais a complexidade de `[ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(c, comp)`. 

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [sensíveis a ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <queue>
     
    template<typename Adaptor>
    requires (std::ranges::input_range<typename Adaptor::container_type>)
    void println(auto, const Adaptor& adaptor)
    {
        struct Container : Adaptor // gain access to protected Adaptor::Container c;
        {
            auto const& container() const { return this->c; }
        };
     
        for (auto const& elem : static_cast<const Container&>(adaptor).container())
            std::cout << elem << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::priority_queue<int> adaptor;
        const auto rg = {1, 3, 2, 4};
     
    #ifdef __cpp_lib_containers_ranges
        adaptor.push_range(rg);
    #else
        std::ranges::for_each(rg, &adaptor{ adaptor.push(e); });
    #endif
     
        println("{}", adaptor);
    }
```

Output: 
```
    4 3 2 1
```

### Veja também

[ push](<#/doc/container/priority_queue/push>) | insere elemento e ordena o container subjacente   
(função membro pública)  