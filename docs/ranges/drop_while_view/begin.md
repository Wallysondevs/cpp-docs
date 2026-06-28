# std::ranges::drop_while_view&lt;V,Pred&gt;::begin

```cpp
constexpr auto begin();  // (desde C++20)
```

  
Retorna um iterator para o primeiro elemento da view.

Efetivamente retorna [ranges::find_if_not](<#/doc/algorithm/ranges/find>)(base_, [std::cref](<#/doc/utility/functional/ref>)(pred())), onde [`_base__`](<#/doc/ranges/drop_while_view>) é a view subjacente. O comportamento é indefinido se *this não armazena um predicate.

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), esta função armazena em cache o resultado dentro do objeto `drop_while_view` para uso em chamadas subsequentes.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento da view.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <ranges>
     
    int main()
    {
        static constexpr auto data = {0, -1, -2, 3, 1, 4, 1, 5};
        auto view = std::ranges::drop_while_view{data, { return x <= 0; }};
        assert(view.begin()[0] == 3);
    }
```

### Veja também

[ end](<#/doc/ranges/drop_while_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  