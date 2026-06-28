# std::move_backward

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt1, class BidirIt2 >
BidirIt2 move_backward( BidirIt1 first, BidirIt1 last, BidirIt2 d_last );
(constexpr desde C++20)
```

Move os elementos do range `[`first`, `last`)` para outro range que termina em `d_last`. Os elementos são movidos em ordem inversa (o último elemento é movido primeiro), mas sua ordem relativa é preservada.

Se `d_last` estiver dentro de `(`first`, `last`]`, o comportamento é indefinido. Neste caso, [`std::move`](<#/doc/algorithm/move>) pode ser usado em vez disso.

### Parâmetros

- **first, last** — o range dos elementos a serem movidos
- **d_last** — fim do range de destino
Requisitos de tipo
-`BidirIt1, BidirIt2` devem satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Valor de retorno

Um iterator no range de destino, apontando para o último elemento movido.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) atribuições de movimento.

### Possível implementação
```cpp
    template<class BidirIt1, class BidirIt2>
    BidirIt2 move_backward(BidirIt1 first, BidirIt1 last, BidirIt2 d_last)
    {
        while (first != last)
            *(--d_last) = std::move(*(--last));
    
        return d_last;
    }
```

---

### Notas

Ao mover ranges sobrepostos, [`std::move`](<#/doc/algorithm/move>) é apropriado ao mover para a esquerda (o início do range de destino está fora do range de origem), enquanto `std::move_backward` é apropriado ao mover para a direita (o fim do range de destino está fora do range de origem).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <string_view>
    #include <vector>
    
    using container = std::vector<std::string>;
    
    void print(std::string_view comment, const container& src, const container& dst = {})
    {
        auto prn =  name, const container& cont)
        {
            std::cout << name;
            for (const auto &s : cont)
                std::cout << (s.empty() ? "∙" : s.data()) << ' ';
            std::cout << '\n';
        };
        std::cout << comment << '\n';
        prn("src: ", src);
        if (dst.empty())
            return;
        prn("dst: ", dst);
    }
    
    int main()
    {
        container src{"foo", "bar", "baz"};
        container dst{"qux", "quux", "quuz", "corge"};
        print("Non-overlapping case; before move_backward:", src, dst);
        std::move_backward(src.begin(), src.end(), dst.end());
        print("After:", src, dst);
    
        src = {"snap", "crackle", "pop", "lock", "drop"};
        print("Overlapping case; before move_backward:", src);
        std::move_backward(src.begin(), std::next(src.begin(), 3), src.end());
        print("After:", src);
    }
```

Saída:
```
    Non-overlapping case; before move_backward:
    src: foo bar baz
    dst: qux quux quuz corge
    After:
    src: ∙ ∙ ∙
    dst: qux foo bar baz
    Overlapping case; before move_backward:
    src: snap crackle pop lock drop
    After:
    src: ∙ ∙ snap crackle pop
```

### Veja também

[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(function template)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(algorithm function object)