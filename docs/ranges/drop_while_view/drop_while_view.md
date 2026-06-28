# std::ranges::drop_while_view&lt;V,Pred&gt;::drop_while_view

```cpp
drop_while_view() requires std::default_initializable<V> &&
std::default_initializable<Pred> = default;  // (1) (desde C++20)
constexpr explicit drop_while_view( V base, Pred pred );  // (2) (desde C++20)
```

  
Constrói um `drop_while_view`. 

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente [`_base__`](<#/doc/ranges/drop_while_view>) e o predicado [`_pred__`](<#/doc/ranges/drop_while_view>).

2) Constrói por movimento (move constructs) a view subjacente `_base__` a partir de `base` e o predicado `_pred__` a partir de `pred`.

### Parâmetros

base  |  \-  |  view subjacente   
---|---|---
pred  |  \-  |  predicado   
  
### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        static constexpr auto a = {-2, -7, -1, -8, -2, +-+8, 3, 1, 4, 1, 5};
        auto positive =  { return 0 < x; };
        for (auto v = std::ranges::drop_while_view{a, std::not_fn(positive)}; int x : v)
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    3 1 4 1 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)  
([P2711R1](<https://wg21.link/P2711R1>))  | C++20  | o construtor com múltiplos parâmetros não era explícito  | tornou-se explícito   
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | se `Pred` não for [`default_initializable`](<#/doc/concepts/default_initializable>), o construtor padrão  
constrói um `drop_while_view` que não contém um `Pred` | o `drop_while_view` também  
não é [`default_initializable`](<#/doc/concepts/default_initializable>)