# std::ranges::split_view&lt;V,Pattern&gt;::end

```cpp
constexpr auto end() const;  // (desde C++20)
```

  
Retorna um [iterator](<#/doc/ranges/split_view/iterator>) ou um [sentinel](<#/doc/ranges/split_view/sentinel>) representando o fim do sub-range resultante. Equivalente a: 

constexpr auto end()  
{  
if constexpr ([ranges::common_range](<#/doc/ranges/common_range>)&lt;V&gt;)  
return` `[` _iterator_`](<#/doc/ranges/split_view/iterator>){*this, [ranges::end](<#/doc/ranges/end>)(`_[base_](<#/doc/ranges/split_view>)_`), {}};  
else  
return` `[` _sentinel_`](<#/doc/ranges/split_view/sentinel>){*this};  
}

### Valor de retorno

Um [iterator](<#/doc/ranges/split_view/iterator>) ou um [sentinel](<#/doc/ranges/split_view/sentinel>). 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view keywords{"bitand bitor bool break"};
        std::ranges::split_view kw{keywords, ' '};
        assert(4 == std::ranges::distance(kw.begin(), kw.end()));
    }
```

### Veja também

[ begin](<#/doc/ranges/split_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ end](<#/doc/ranges/lazy_split_view/end>) |  retorna um iterator ou um sentinel para o fim   
(função membro pública de `std::ranges::lazy_split_view<V,Pattern>`)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)