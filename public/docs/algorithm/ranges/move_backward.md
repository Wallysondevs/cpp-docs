# std::ranges::move_backward, std::ranges::move_backward_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I1, std::sentinel_for<I1> S1,
std::bidirectional_iterator I2 >
requires std::indirectly_movable<I1, I2>
constexpr move_backward_result<I1, I2>
move_backward( I1 first, S1 last, I2 result );
template< ranges::bidirectional_range R, std::bidirectional_iterator I >
requires std::indirectly_movable<ranges::iterator_t<R>, I>
constexpr move_backward_result<ranges::borrowed_iterator_t<R>, I>
move_backward( R&& r, I result );
Tipos auxiliares
template< class I, class O >
using move_backward_result = ranges::in_out_result<I, O>;
```

1) Move os elementos no range, definido por `[`first`, `last`)`, para outro range `[`result - N`, `result`)`, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last). Os elementos são movidos em ordem inversa (o último elemento é movido primeiro), mas sua ordem relativa é preservada. O comportamento é indefinido se result estiver dentro de `(** first, last**]`. Nesse caso, [ranges::move](<#/doc/algorithm/ranges/move>) pode ser usado em vez disso.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

Os elementos no range _movido-de_ ainda conterão valores válidos do tipo apropriado, mas não necessariamente os mesmos valores de antes da movimentação, como se usasse *(result - n) = [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(last - n) para cada inteiro `n`, onde 0 ≤ n < N.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first** — o início do range de elementos a serem movidos
- **last** — o fim do range de elementos a serem movidos
- **r** — o range dos elementos a serem movidos
- **result** — o fim do range de destino

### Valor de retorno

`{last, result - N}.`

### Complexidade

1) Exatamente N atribuições de movimentação.

2) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(r) atribuições de movimentação.

### Observações

Ao mover ranges sobrepostos, [ranges::move](<#/doc/algorithm/ranges/move>) é apropriado ao mover para a esquerda (o início do range de destino está fora do range de origem), enquanto **ranges::move_backward** é apropriado ao mover para a direita (o fim do range de destino está fora do range de origem).

### Possível implementação
```cpp
    struct move_backward_fn
    {
        template<std::bidirectional_iterator I1, std::sentinel_for<I1> S1,
                 std::bidirectional_iterator I2>
        requires std::indirectly_movable<I1, I2>
        constexpr ranges::move_backward_result<I1, I2>
            operator()(I1 first, S1 last, I2 result) const
        {
            auto i {last};
            for (; i != first; *--result = ranges::iter_move(--i))
            {}
            return {std::move(last), std::move(result)};
        }
    
        template<ranges::bidirectional_range R, std::bidirectional_iterator I>
        requires std::indirectly_movable<ranges::iterator_t<R>, I>
        constexpr ranges::move_backward_result<ranges::borrowed_iterator_t<R>, I>
            operator()(R&& r, I result) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result));
        }
    };
    
    inline constexpr move_backward_fn move_backward {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <vector>
    
    using Vec = std::vector<std::string>;
    
    void print(std::string_view rem, Vec const& vec)
    {
        std::cout << rem << "[" << vec.size() << "]: ";
        for (const std::string& s : vec)
            std::cout << (s.size() ? s : std::string{"·"}) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        Vec a{"▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"};
        Vec b(a.size());
    
        print("Before move:\n" "a", a);
        print("b", b);
    
        std::ranges::move_backward(a, b.end());
    
        print("\n" "Move a >> b:\n" "a", a);
        print("b", b);
    
        std::ranges::move_backward(b.begin(), b.end(), a.end());
        print("\n" "Move b >> a:\n" "a", a);
        print("b", b);
    
        std::ranges::move_backward(a.begin(), a.begin()+3, a.end());
        print("\n" "Overlapping move a[0, 3) >> a[5, 8):\n" "a", a);
    }
```

Saída possível:
```
    Before move:
    a[8]: ▁ ▂ ▃ ▄ ▅ ▆ ▇ █
    b[8]: · · · · · · · ·
    
    Move a >> b:
    a[8]: · · · · · · · ·
    b[8]: ▁ ▂ ▃ ▄ ▅ ▆ ▇ █
    
    Move b >> a:
    a[8]: ▁ ▂ ▃ ▄ ▅ ▆ ▇ █
    b[8]: · · · · · · · ·
    
    Overlapping move a[0, 3) >> a[5, 8):
    a[8]: · · · ▄ ▅ ▁ ▂ ▃
```

### Veja também

[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(objeto de função de algoritmo)
[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(template de função)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(template de função)