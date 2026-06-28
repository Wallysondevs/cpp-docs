# std::ranges::transform, std::ranges::unary_transform_result, std::ranges::binary_transform_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
std::copy_constructible F, class Proj = std::identity >
requires std::indirectly_writable<O,
std::indirect_result_t<F&, std::projected<I, Proj>>>
constexpr unary_transform_result<I, O>
transform( I first1, S last1, O result, F op, Proj proj = {} );
template< ranges::input_range R, std::weakly_incrementable O,
std::copy_constructible F, class Proj = std::identity >
requires std::indirectly_writable<O,
std::indirect_result_t<F&, std::projected<ranges::iterator_t<R>, Proj>>>
constexpr unary_transform_result<ranges::borrowed_iterator_t<R>, O>
transform( R&& r, O result, F op, Proj proj = {} );
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O,
std::copy_constructible F,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_writable<O,
std::indirect_result_t<F&,
std::projected<I1, Proj1>,
std::projected<I2, Proj2>>>
constexpr binary_transform_result<I1, I2, O>
transform( I1 first1, S1 last1, I2 first2, S2 last2, O result,
F binary_op, Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1,
ranges::input_range R2,
std::weakly_incrementable O,
std::copy_constructible F,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_writable<O,
std::indirect_result_t<F&,
std::projected<ranges::iterator_t<R1>, Proj1>,
std::projected<ranges::iterator_t<R2>, Proj2>>>
constexpr binary_transform_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>, O>
transform( R1&& r1, R2&& r2, O result, F binary_op,
Proj1 proj1 = {}, Proj2 proj2 = {} );
Tipos auxiliares
template< class I, class O >
using unary_transform_result = ranges::in_out_result<I, O>;
template< class I1, class I2, class O >
using binary_transform_result = ranges::in_in_out_result<I1, I2, O>;
```

Aplica a função fornecida a um range e armazena o resultado em outro range, começando em result.

1) A operação unária op é aplicada ao range definido por `[`first1`, `last1`)` (após projetar com a projeção proj).

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

3) A operação binária binary_op é aplicada a pares de elementos de dois ranges: um definido por `[`first1`, `last1`)` e o outro definido por `[`first2`, `last2`)` (após projetar respectivamente com as projeções proj1 e proj2).

4) O mesmo que (3), mas usa r1 como o primeiro range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1 e [ranges::end](<#/doc/ranges/end>)(r1) como last1, e similarmente para r2.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a transformar
- **r, r1** — o primeiro range de elementos a transformar
- **first2, last2** — o segundo range de elementos a transformar
- **r2** — o segundo range de elementos a transformar
- **result** — o início do range de destino, pode ser igual a first1 ou first2
- **op, binary_op** — operação a aplicar ao(s) elemento(s) projetado(s)
- **proj1** — projeção a aplicar aos elementos no primeiro range
- **proj2** — projeção a aplicar aos elementos no segundo range

### Valor de retorno

1,2) Um `unary_transform_result` contém um iterator de entrada igual a last e um iterator de saída para o elemento após o último elemento transformado.

3,4) Um `binary_transform_result` contém iterators de entrada para os últimos elementos transformados dos ranges `[`first1`, `last1`)` e `[`first2`, `last2`)` como `in1` e `in2` respectivamente, e o iterator de saída para o elemento após o último elemento transformado como `out`.

### Complexidade

1,2) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) aplicações de op e proj.

3,4) Exatamente [ranges::min](<#/doc/algorithm/ranges/min>)([ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1), [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2)) aplicações de binary_op e projeções.

### Possível implementação
```cpp
    struct transform_fn
    {
        // First version
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
                 std::copy_constructible F, class Proj = std::identity>
        requires std::indirectly_writable<O, std::indirect_result_t<F&,
                                                                    std::projected<I, Proj>>>
        constexpr ranges::unary_transform_result<I, O>
            operator()(I first1, S last1, O result, F op, Proj proj = {}) const
        {
            for (; first1 != last1; ++first1, (void)++result)
                *result = std::invoke(op, std::invoke(proj, *first1));
    
            return {std::move(first1), std::move(result)};
        }
    
        // Second version
        template<ranges::input_range R, std::weakly_incrementable O,
                 std::copy_constructible F, class Proj = std::identity>
        requires std::indirectly_writable<O,
                     std::indirect_result_t<F&, std::projected<ranges::iterator_t<R>, Proj>>>
        constexpr ranges::unary_transform_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result, F op, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result),
                           std::move(op), std::move(proj));
        }
    
        // Third version
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O,
                 std::copy_constructible F,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_writable<O,
                     std::indirect_result_t<F&,
                                            std::projected<I1, Proj1>,
                                            std::projected<I2, Proj2>>>
        constexpr ranges::binary_transform_result<I1, I2, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                       F binary_op, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; first1 != last1 && first2 != last2;
                 ++first1, (void)++first2, (void)++result)
                *result = std::invoke(binary_op,
                                      std::invoke(proj1, *first1),
                                      std::invoke(proj2, *first2));
    
            return {std::move(first1), std::move(first2), std::move(result)};
        }
    
        // Fourth version
        template<ranges::input_range R1, ranges::input_range R2,
                 std::weakly_incrementable O, std::copy_constructible F,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::indirectly_writable<O,
                     std::indirect_result_t<F&,
                         std::projected<ranges::iterator_t<R1>, Proj1>,
                         std::projected<ranges::iterator_t<R2>, Proj2>>>
        constexpr ranges::binary_transform_result<ranges::borrowed_iterator_t<R1>,
                                                  ranges::borrowed_iterator_t<R2>, O>
            operator()(R1&& r1, R2&& r2, O result,
                       F binary_op, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(result), std::move(binary_op),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr transform_fn transform;
```

---

### Notas

`ranges::transform` não garante a aplicação em ordem de op ou binary_op. Para aplicar uma função a uma sequência em ordem ou para aplicar uma função que modifica os elementos de uma sequência, use [ranges::for_each](<#/doc/algorithm/ranges/for_each>).

### Exemplo

O código a seguir usa `ranges::transform` para converter uma string no local para maiúsculas usando a função [std::toupper](<#/doc/string/byte/toupper>) e então transforma cada char em seu valor ordinal. Em seguida, `ranges::transform` com uma projeção é usado para transformar elementos de [std::vector](<#/doc/container/vector>)&lt;Foo&gt; em chars para preencher uma [std::string](<#/doc/string/basic_string>).

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <functional>
    #include <iostream>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::string s{"hello"};
        auto op =  -> unsigned char { return std::toupper(c); };
    
        namespace ranges = std::ranges;
    
        // uppercase the string in-place
        ranges::transform(s.begin(), s.end(), s.begin(), op );
    
        std::vector<std::size_t> ordinals;
        // convert each char to size_t
        ranges::transform(s, std::back_inserter(ordinals),
                           -> std::size_t { return c; });
    
        std::cout << s << ':';
        for (auto ord : ordinals)
            std::cout << ' ' << ord;
    
        // double each ordinal
        ranges::transform(ordinals, ordinals, ordinals.begin(), std::plus {});
    
        std::cout << '\n';
        for (auto ord : ordinals)
            std::cout << ord << ' ';
        std::cout << '\n';
    
        struct Foo
        {
            char bar;
        };
        const std::vector<Foo> f = {{'h'},{'e'},{'l'},{'l'},{'o'}};
        std::string result;
        // project, then uppercase
        ranges::transform(f, std::back_inserter(result), op, &Foo::bar);
        std::cout << result << '\n';
    }
```

Saída:
```
    HELLO: 72 69 76 76 79
    144 138 152 152 158
    HELLO
```

### Veja também

[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::transform_viewviews::transform](<#/doc/ranges/transform_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) de uma sequência que aplica uma função de transformação a cada elemento
(template de classe) (objeto adaptador de range)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(template de função)