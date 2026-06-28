# std::ranges::drop_while_view&lt;V,Pred&gt;::end

```cpp
constexpr auto end();  // (desde C++20)
```

  
Retorna um sentinel ou um iterator representando o fim da `drop_while_view`. 

Efetivamente retorna [ranges::end](<#/doc/ranges/end>)(base_), onde [`_base__`](<#/doc/ranges/drop_while_view>) é a view subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um sentinel ou um iterator representando o fim da view. 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        static constexpr auto data = {0, -1, -2, 3, 1, 4, 1, 5}; 
        auto view = std::ranges::drop_while_view{data,  { return x <= 0; }};
        assert(view.end()[-1] == 5);
    }
```

### Veja também

[ begin](<#/doc/ranges/drop_while_view/begin>) | retorna um iterator para o início   
(função membro pública)  