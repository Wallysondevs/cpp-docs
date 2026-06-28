# std::ranges::generate_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_or_output_iterator O, std::copy_constructible F >
requires std::invocable<F&> && std::indirectly_writable<O, std::invoke_result_t<F&>>
constexpr O
generate_n( O first, std::iter_difference_t<O> n, F gen );
```

Atribui o resultado de invocações _sucessivas_ do objeto de função gen a cada elemento no range `[`first`, `first + n`)`, se 0 < n. Não faz nada caso contrário.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first** — o início do range de elementos a serem modificados
- **n** — número de elementos a serem modificados
- **gen** — o objeto de função gerador.

### Valor de retorno

Iterator um após o último elemento atribuído se 0 < count, first caso contrário.

### Complexidade

Exatamente n invocações de gen() e atribuições.

### Possível implementação
```
    struct generate_n_fn
    {
        template<std::input_or_output_iterator O, std::copy_constructible F>
        requires std::invocable<F&> && std::indirectly_writable<O, std::invoke_result_t<F&>>
        constexpr O operator()(O first, std::iter_difference_t<O> n, F gen) const
        {
            for (; n-- > 0; *first = std::invoke(gen), ++first)
            {}
            return first;
        }
    };
     
    inline constexpr generate_n_fn generate_n {};
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <random>
    #include <string_view>
     
    auto dice()
    {
        static std::uniform_int_distribution<int> distr {1, 6};
        static std::random_device engine;
        static std::mt19937 noise {engine()};
        return distr(noise);
    }
     
    void print(const auto& v, std::string_view comment)
    {
        for (int i : v)
            std::cout << i << ' ';
        std::cout << '(' << comment << ")\n";
    }
     
    int main()
    {
        std::array<int, 8> v;
     
        std::ranges::generate_n(v.begin(), v.size(), dice);
        print(v, "dice");
     
        std::ranges::generate_n(v.begin(), v.size(), [n {0}] mutable { return n++; });
        // same effect as std::iota(v.begin(), v.end(), 0);
        print(v, "iota");
    }
```

Saída possível:
```
    5 5 2 2 6 6 3 5 (dice)
    0 1 2 3 4 5 6 7 (iota)
```

### Veja também

[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) | preenche um range com números aleatórios de um gerador de bits aleatórios uniforme
(objeto de função de algoritmo)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(objeto de função de algoritmo)
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(objeto de função de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ generate_n](<#/doc/algorithm/generate_n>) | atribui os resultados de chamadas de função sucessivas a N elementos em um range
(modelo de função)