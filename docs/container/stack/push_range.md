# std::stack&lt;T,Container&gt;::push_range

```cpp
template< container-compatible-range<value_type> R >
void push_range( R&& rg );  // (desde C++23)
```

  
Insere uma cópia de cada elemento de rg na `stack`, como se por: 

  * c.append_range([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg)) se essa for uma expressão válida (ou seja, o container subjacente c possui uma função membro `append_range` apropriada), ou 
  * [ranges::copy](<#/doc/algorithm/ranges/copy>)(rg, [std::back_inserter](<#/doc/iterator/back_inserter>)(c)) caso contrário. 

  
Cada iterator no range rg é desreferenciado exatamente uma vez. 

### Parameters

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
  
### Return value

(nenhum) 

### Complexity

Idêntica à complexidade de c.append_range ou [ranges::copy](<#/doc/algorithm/ranges/copy>)(rg, [std::back_inserter](<#/doc/iterator/back_inserter>)(c)) (dependendo de qual função é usada internamente). 

### Notes

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [sensíveis a ranges](<#/doc/ranges/to>)   
  
### Example

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <stack>
     
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
        std::stack<int> adaptor;
        const auto rg = {1, 3, 2, 4};
     
    #ifdef __cpp_lib_containers_ranges
        adaptor.push_range(rg);
    #else
        std::ranges::for_each(rg, &adaptor{ adaptor.push(e); });
    #endif
     
        println("{}", adaptor);
    }
```

Saída: 
```
    1 3 2 4
```

### See also

[ push](<#/doc/container/stack/push>) |  insere elemento no topo   
(função membro pública)  