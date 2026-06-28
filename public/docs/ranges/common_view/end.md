# std::ranges::common_view&lt;V&gt;::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++20)
```

  
1) Retorna um iterator representando o fim da `common_view`, ou seja: 

  * [ranges::begin](<#/doc/ranges/begin>)(base_) + [ranges::distance](<#/doc/iterator/ranges/distance>)(base_), se ambos [ranges::random_access_range](<#/doc/ranges/random_access_range>)&lt;V&gt; e [ranges::sized_range](<#/doc/ranges/sized_range>)&lt;V&gt; forem satisfeitos, 
  * [std::common_iterator](<#/doc/iterator/common_iterator>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;, [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>([ranges::end](<#/doc/ranges/end>)(base_)) caso contrário. 

Aqui `_base__` (o nome é apenas para fins de exposição) é a view subjacente.

2) O mesmo que (1), mas `V` é qualificado como const.

### Parâmetros

(nenhum) 

### Valor de retorno

Um iterator representando o fim da view subjacente. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <numeric>
    #include <ranges>
     
    int main()
    {
        constexpr int n{4};
     
        constexpr auto v1 = std::views::iota(1)
                          | std::views::take(n)
                          | std::views::common
                          ;
        constexpr auto v2 = std::views::iota(2)
                          | std::views::take(n)
                          ;
        const int product = std::inner_product(v1.begin(), v1.end(),
                                               v2.begin(),
                                               0);
        std::cout << product << '\n';
    }
```

Output: 
```
    40
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 4012](<https://cplusplus.github.io/LWG/issue4012>) | C++20  | sobrecarga não-constante perdeu a verificação simple-view  | adicionado   
  
### Veja também

[ begin](<#/doc/ranges/common_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)