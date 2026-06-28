# std::ranges::copy_backward, std::ranges::copy_backward_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I1, std::sentinel_for<I1> S1,
std::bidirectional_iterator I2 >
requires std::indirectly_copyable<I1, I2>
constexpr copy_backward_result<I1, I2>
copy_backward( I1 first, S1 last, I2 result );
template< ranges::bidirectional_range R, std::bidirectional_iterator I >
requires std::indirectly_copyable<ranges::iterator_t<R>, I>
constexpr copy_backward_result<ranges::borrowed_iterator_t<R>, I>
copy_backward( R&& r, I result );
Tipos auxiliares
template< class I1, class I2 >
using copy_backward_result = ranges::in_out_result<I1, I2>;
```

1) Copia os elementos do range, definido por `[`first`, `last`)`, para outro range `[`result - N`, `result`)`, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last). Os elementos são copiados em ordem inversa (o último elemento é copiado primeiro), mas sua ordem relativa é preservada. O comportamento é indefinido se result estiver dentro de `(** first, last**]`. Nesse caso, std::[ranges::copy](<#/doc/algorithm/ranges/copy>) pode ser usado em vez disso.

2) O mesmo que (1), mas usa r como o range de origem, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
* Nenhuma delas é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
* Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first** — o início do range de elementos a serem copiados
- **last** — o fim do range de elementos a serem copiados
- **r** — o range dos elementos a serem copiados
- **result** — o fim do range de destino

### Valor de retorno

`{last, result - N}`

### Complexidade

Exatamente N atribuições.

### Observações

Ao copiar ranges sobrepostos, `[`ranges::copy`](<#/doc/algorithm/ranges/copy>)` é apropriado ao copiar para a esquerda (o início do range de destino está fora do range de origem), enquanto `ranges::copy_backward` é apropriado ao copiar para a direita (o fim do range de destino está fora do range de origem).

### Possível implementação
```cpp
    struct copy_backward_fn
    {
        template<std::bidirectional_iterator I1, std::sentinel_for<I1> S1,
                 std::bidirectional_iterator I2>
        requires std::indirectly_copyable<I1, I2>
        constexpr ranges::copy_backward_result<I1, I2>
            operator()(I1 first, S1 last, I2 result) const
        {
            I1 last1 {ranges::next(first, std::move(last))};
            for (I1 i {last1}; i != first;)
                *--result = *--i;
            return {std::move(last1), std::move(result)};
        }
    
        template<ranges::bidirectional_range R, std::bidirectional_iterator I>
        requires std::indirectly_copyable<ranges::iterator_t<R>, I>
        constexpr ranges::copy_backward_result<ranges::borrowed_iterator_t<R>, I>
            operator()(R&& r, I result) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result));
        }
    };
    
    inline constexpr copy_backward_fn copy_backward{};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <vector>
    
    void print(std::string_view rem, std::ranges::forward_range auto const& r)
    {
        for (std::cout << rem << ": "; auto const& elem : r)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        const auto src = {1, 2, 3, 4};
        print("src", src);
    
        std::vector<int> dst(src.size() + 2);
        std::ranges::copy_backward(src, dst.end());
        print("dst", dst);
    
        std::ranges::fill(dst, 0);
        const auto [in, out] =
            std::ranges::copy_backward(src.begin(), src.end() - 2, dst.end());
        print("dst", dst);
    
        std::cout
            << "(in - src.begin) == " << std::distance(src.begin(), in) << '\n'
            << "(out - dst.begin) == " << std::distance(dst.begin(), out) << '\n';
    }
```

Saída:
```
    src: 1 2 3 4
    dst: 0 0 1 2 3 4
    dst: 0 0 0 0 1 2
    (in - src.begin) == 2
    (out - dst.begin) == 4
```

### Ver também

[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(objeto de função de algoritmo)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que é invertido
(objeto de função de algoritmo)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(objeto de função de algoritmo)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(objeto de função de algoritmo)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(objeto de função de algoritmo)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(modelo de função)