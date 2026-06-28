# std::ranges::generate_random

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
Assinatura da chamada
template< class R, class G >
requires ranges::output_range<R, std::invoke_result_t<G&>> &&
std::uniform_random_bit_generator<std::remove_cvref_t<G>>
constexpr ranges::borrowed_iterator_t<R>
generate_random( R&& r, G&& g );
template< class G, std::output_iterator<std::invoke_result_t<G&>> O,
std::sentinel_for<O> S >
requires std::uniform_random_bit_generator<std::remove_cvref_t<G>>
constexpr O
generate_random( O first, S last, G&& g );
template< class R, class G, class D >
requires ranges::output_range<R, std::invoke_result_t<D&, G&>> &&
std::invocable<D&, G&> &&
std::uniform_random_bit_generator<std::remove_cvref_t<G>> &&
std::is_arithmetic_v<std::invoke_result_t<D&, G&>>
constexpr ranges::borrowed_iterator_t<R>
generate_random( R&& r, G&& g, D&& d );
template< class G, class D, std::output_iterator<std::invoke_result_t<D&, G&>> O,
std::sentinel_for<O> S >
requires std::invocable<D&, G&> &&
std::uniform_random_bit_generator<std::remove_cvref_t<G>> &&
std::is_arithmetic_v<std::invoke_result_t<D&, G&>>
constexpr O
generate_random( O first, S last, G&& g, D&& d );
```

Tenta gerar números aleatórios com a função membro `generate_random` do gerador de números aleatórios ou da distribuição, o que é esperado ser mais eficiente. Recorre à geração elemento a elemento se nenhuma função membro `generate_random` estiver disponível.

Considere a operação de fallback como chamar `ranges::generate(std::forward<R>(r), std::ref(g))` ou `ranges::generate(std::forward<R>(r), [&d, &g] { return std::invoke(d, g); })` para (1) ou (3) respectivamente.

1) Chama `g.generate_random(std::forward<R>(r))` se esta expressão for bem-formada.

Caso contrário, seja I `std::invoke_result_t<G&>`. Se `R` modela `sized_range`, preenche r com `ranges::size(r)` valores de I realizando um número não especificado de invocações da forma `g()` ou `g.generate_random(s)`, se tal expressão for bem-formada para um valor `N` e um objeto s do tipo `std::span<I, N>`.

Caso contrário, executa a operação de fallback.

3) Chama `d.generate_random(std::forward<R>(r), g)` se esta expressão for bem-formada.

Caso contrário, seja I `std::invoke_result_t<D&, G&>`. Se `R` modela `sized_range`, preenche r com `ranges::size(r)` valores do tipo I realizando um número não especificado de invocações da forma `std::invoke(d, g)` ou `d.generate_random(s, g)`, se tal expressão for bem-formada para um valor `N` e um objeto s do tipo `std::span<I, N>`.

Caso contrário, executa a operação de fallback.

2,4) Equivalente a (1,3) respectivamente, onde r é obtido de `ranges::subrange<O, S>(std::move(first), last)`.

Se os efeitos de (1) ou (3) não forem equivalentes aos da operação de fallback correspondente, o comportamento é indefinido.

O valor de `N` pode diferir entre invocações. As implementações podem selecionar valores menores para ranges mais curtos.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — par iterador-sentinela que denota o range para o qual os números aleatórios são escritos
- **r** — range para o qual os números aleatórios são escritos
- **g** — gerador de bits aleatórios uniformes
- **d** — objeto de distribuição de números aleatórios

### Notas

No momento da padronização de `std::ranges::generate_random`, não há nenhum gerador de números aleatórios ou distribuição na standard library que forneça uma função membro `generate_random`.

`std::ranges::generate_random` pode ser mais eficiente quando usado com um gerador de números aleatórios definido pelo usuário que encapsula uma API vetorizada subjacente.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges_generate_random`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | `std::ranges::generate_random`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <random>
    
    int main()
    {
        std::default_random_engine eng;
        std::default_random_engine::result_type rs[16]{};
        std::ranges::generate_random(rs, eng);
    
        std::cout << std::left;
        for (int i{}; auto n : rs)
            std::cout << std::setw(11) << n << (++i % 4 ? ' ' : '\n');
    }
```

Saída possível:
```
    16807       282475249   1622650073  984943658 
    1144108930  470211272   101027544   1457850878
    1458777923  2007237709  823564440   1115438165
    1784484492  74243042    114807987   1137522503
```

### Veja também

[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ uniform_random_bit_generator](<#/doc/numeric/random/UniformRandomBitGenerator>)(C++20) | especifica que um tipo se qualifica como um gerador de bits aleatórios uniformes
(concept)