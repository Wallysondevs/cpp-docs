# std::ranges::lazy_split_view&lt;V,Pattern&gt;::end

```cpp
constexpr auto end() requires ranges::forward_range<V> && ranges::common_range<V>;  // (1) (desde C++20)
constexpr auto end() const;  // (2) (desde C++20)
```

  
Retorna um iterator ou, às vezes, um sentinel representando o fim do [`view`](<#/doc/ranges/view>). Seja `_[base_](<#/doc/ranges/lazy_split_view>)_` o view subjacente.

1) Retorna um iterator. Equivalente a: return /*outer_iterator*/</*simple_view*/&lt;V&gt;>{*this, [ranges::end](<#/doc/ranges/end>)(base_)};.

2) Retorna um [`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) ou um [std::default_sentinel](<#/doc/iterator/default_sentinel>).

Equivalente a:
```
    if constexpr (ranges::forward_range<V> && ranges::forward_range<const V> &&
                  ranges::common_range<const V>)
        return /*outer_iterator*/<true>{*this, ranges::end(base_)};
    else
        return std::default_sentinel;
```

### Valor de retorno

Um [`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) ou um [std::default_sentinel](<#/doc/iterator/default_sentinel>) representando o fim do [`view`](<#/doc/ranges/view>).

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string_view>
     
    int main()
    {
        constexpr std::string_view keywords{"false float for friend"};
        std::ranges::lazy_split_view kw{keywords, ' '};
        const auto count = std::ranges::distance(kw.begin(), kw.end());
        std::cout << "Words count: " << count << '\n';
    }
```

Saída:
```
    Words count: 4
```

### Veja também

[ begin](<#/doc/ranges/lazy_split_view/begin>) | retorna um iterator para o início   
(função membro pública)  
[ end](<#/doc/ranges/split_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública de `std::ranges::split_view<V,Pattern>`)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)