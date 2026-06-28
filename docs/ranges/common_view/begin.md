# std::ranges::common_view&lt;V&gt;::begin

```cpp
constexpr auto begin() requires (!__simple_view<V>);  // (1) (desde C++20)
constexpr auto begin() const requires range<const V>;  // (2) (desde C++20)
```

  
1) Retorna um iterator para o primeiro elemento da `common_view`, ou seja: 

  * [ranges::begin](<#/doc/ranges/begin>)(base_), se ambos [ranges::random_access_range](<#/doc/ranges/random_access_range>)&lt;V&gt; e [ranges::sized_range](<#/doc/ranges/sized_range>)&lt;V&gt; forem satisfeitos, 
  * [std::common_iterator](<#/doc/iterator/common_iterator>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;, [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>([ranges::begin](<#/doc/ranges/begin>)(base_)) caso contrário. 

Aqui `_base__` (o nome é apenas para fins de exposição) é a view subjacente.

2) O mesmo que (1), mas `V` é qualificado como const.

### Parâmetros

(nenhum) 

### Valor de retorno

Um iterator para o início da view subjacente. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <numeric>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        constexpr auto common = std::views::iota(1)
                              | std::views::take(3)
                              | std::views::common
                              ;
    
        for (int i{}; int e : common)
            std::cout << (i++ ? " + " : "") << e;
    
        std::cout << " = " << std::accumulate(common.begin(), common.end(), 0) << '\n';
    }
```

Saída: 
```
    1 + 2 + 3 = 6
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 4012](<https://cplusplus.github.io/LWG/issue4012>) | C++20  | sobrecarga não-const não verificou simple-view  | adicionado   
  
### Veja também

[ end](<#/doc/ranges/common_view/end>) |  retorna um iterator para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)