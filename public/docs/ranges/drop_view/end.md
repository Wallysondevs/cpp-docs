# std::ranges::drop_view&lt;V&gt;::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++20)
```

  
Retorna um sentinel ou um iterator representando o fim da `drop_view`.

Efetivamente retorna [ranges::end](<#/doc/ranges/end>)(base_), onde [`_base__`](<#/doc/ranges/drop_view>) é a view subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

Um sentinel ou um iterator representando o fim da view.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <ranges>
     
    int main()
    {
        namespace ranges = std::ranges;
        constexpr char url[]{"https://cppreference.com"};
     
        const auto p = std::distance(ranges::begin(url), ranges::find(url, '/'));
        auto site = ranges::drop_view{url, p + 2}; // drop the prefix "https://"
     
        for (auto it = site.begin(); it != site.end(); ++it)
            std::cout << *it;
        std::cout << '\n';
    }
```

Saída: 
```
    cppreference.com
```

### Veja também

[ begin](<#/doc/ranges/drop_view/begin>) | retorna um iterator para o início   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)