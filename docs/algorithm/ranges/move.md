# std::ranges::move, std::ranges::move_result

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O >
requires std::indirectly_movable<I, O>
constexpr move_result<I, O>
move( I first, S last, O result );  // (1) (desde C++20)
template< ranges::input_range R, std::weakly_incrementable O >
requires std::indirectly_movable<ranges::iterator_t<R>, O>
constexpr move_result<ranges::borrowed_iterator_t<R>, O>
move( R&& r, O result );  // (2) (desde C++20)
Tipos auxiliares
template< class I, class O >
using move_result = ranges::in_out_result<I, O>;  // (3) (desde C++20)
```

1) Move os elementos no range, definido por `[`first`, `last`)`, para outro range começando em result. O comportamento é indefinido se result estiver dentro do range `[`first`, `last`)`. Nesse caso, [ranges::move_backward](<#/doc/algorithm/ranges/move_backward>) pode ser usado em vez disso.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

Os elementos no range _movido-de_ ainda conterão valores válidos do tipo apropriado, mas não necessariamente os mesmos valores de antes do move.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de modelo não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first** — o início do range de elementos a mover
- **last** — o fim do range de elementos a mover
- **r** — o range dos elementos a mover
- **result** — o início do range de destino

### Valor de retorno

{last, result + N}, onde

1) N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

2) N = [ranges::distance](<#/doc/iterator/ranges/distance>)(r).

### Complexidade

Exatamente N atribuições de move.

### Observações

Ao mover ranges sobrepostos, **ranges::move** é apropriado ao mover para a esquerda (o início do range de destino está fora do range de origem), enquanto [ranges::move_backward](<#/doc/algorithm/ranges/move_backward>) é apropriado ao mover para a direita (o fim do range de destino está fora do range de origem).

### Possível implementação
```
    struct move_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O>
        requires std::indirectly_movable<I, O>
        constexpr ranges::move_result<I, O>
            operator()(I first, S last, O result) const
        {
            for (; first != last; ++first, ++result)
                *result = ranges::iter_move(first);
            return {std::move(first), std::move(result)};
        }
        template<ranges::input_range R, std::weakly_incrementable O>
        requires std::indirectly_movable<ranges::iterator_t<R>, O>
        constexpr ranges::move_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result));
        }
    };
    
    inline constexpr move_fn move {};
```

---

### Exemplo

O código a seguir move objetos thread (que são _não copiáveis_) de um container para outro.

Execute este código
```
    #include <algorithm>
    #include <chrono>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <thread>
    #include <vector>
    using namespace std::literals::chrono_literals;
    
    void f(std::chrono::milliseconds n)
    {
        std::this_thread::sleep_for(n);
        std::cout << "thread with n=" << n.count() << "ms ended" << std::endl;
    }
    
    int main()
    {
        std::vector<std::jthread> v;
        v.emplace_back(f, 400ms);
        v.emplace_back(f, 600ms);
        v.emplace_back(f, 800ms);
    
        std::list<std::jthread> l;
    
        // std::ranges::copy() would not compile, because std::jthread is non-copyable
        std::ranges::move(v, std::back_inserter(l));
    }
```

Saída:
```
    thread with n=400ms ended
    thread with n=600ms ended
    thread with n=800ms ended
```

### Veja também

[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(objeto de função de algoritmo)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(objeto de função de algoritmo)
[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(modelo de função)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(modelo de função)