# std::ranges::split_view&lt;V,Pattern&gt;::begin

```cpp
constexpr /*iterator*/ begin();  // (desde C++20)
```

  
Retorna um [iterator](<#/doc/ranges/split_view/iterator>) para o primeiro sub-range encontrado.

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo [`range`](<#/doc/ranges/range>) concept, esta função armazena em cache o resultado dentro da `split_view` (por meio do membro `_[cached_begin_](<#/doc/ranges/split_view>)_`) para uso em chamadas subsequentes.

Seja `_[base_](<#/doc/ranges/split_view>)_` o membro de dados subjacente. Equivalente a:
```
    constexpr /*iterator*/ begin()
    {
        if (!cached_begin_.has_value())
            cached_begin_ = this->find_next(ranges::begin(base_));
        return {*this, ranges::begin(base_), cached_begin_.value()};
    }
```

### Return value

Um [iterator](<#/doc/ranges/split_view/iterator>).

### Complexity

Amortizada \\(\scriptsize \mathcal{O}(1)\\)O(1).

### Example

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view sentence{"Keep..moving..forward.."};
        constexpr std::string_view delim{".."};
        std::ranges::split_view words{sentence, delim};
    
        std::cout << "begin(): " << std::quoted(std::string_view{*words.begin()})
                  << "\nSubstrings: ";
        for (auto word : words)
            std::cout << std::quoted(std::string_view(word)) << ' ';
    
        std::ranges::split_view letters{sentence, std::string_view{""}};
        std::cout << "\nbegin(): " << std::quoted(std::string_view{*letters.begin()})
                  << "\nLetters: ";
        for (auto letter : letters)
            std::cout << std::string_view(letter) << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    begin(): "Keep"
    Substrings: "Keep" "moving" "forward" ""
    begin(): "K"
    Letters: K e e p . . m o v i n g . . f o r w a r d . .
```

### See also

[ end](<#/doc/ranges/split_view/end>) |  retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ begin](<#/doc/ranges/lazy_split_view/begin>) |  retorna um iterator para o início   
(função membro pública de `std::ranges::lazy_split_view<V,Pattern>`)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)