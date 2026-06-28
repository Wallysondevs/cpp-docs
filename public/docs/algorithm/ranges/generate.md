# std::ranges::generate

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_or_output_iterator O, std::sentinel_for<O> S,
std::copy_constructible F >
requires std::invocable<F&> && std::indirectly_writable<O, std::invoke_result_t<F&>>
constexpr O
generate( O first, S last, F gen );
template< class R, std::copy_constructible F >
requires std::invocable<F&> && ranges::output_range<R, std::invoke_result_t<F&>>
constexpr ranges::borrowed_iterator_t<R>
generate( R&& r, F gen );
```

  
1) Atribui o resultado de invocações _sucessivas_ do objeto de função gen a cada elemento no range `[`first`, `last`)`.

2) O mesmo que (1), mas usa r como o range, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (conhecidos informalmente como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles. 
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>). 
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido. 

### Parâmetros

first, last  |  \-  |  o range de elementos a modificar   
---|---|---
r  |  \-  |  o range de elementos a modificar   
gen  |  \-  |  o objeto de função gerador   
  
### Valor de retorno

Um iterator de saída que se compara como igual a last. 

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) invocações de gen() e atribuições. 

### Possível implementação
```cpp
    struct generate_fn
    {
        template<std::input_or_output_iterator O, std::sentinel_for<O> S,
                 std::copy_constructible F>
        requires std::invocable<F&> && std::indirectly_writable<O, std::invoke_result_t<F&>>
        constexpr O operator()(O first, S last, F gen) const
        {
            for (; first != last; *first = std::invoke(gen), ++first)
            {}
            return first;
        }
    
        template<class R, std::copy_constructible F>
        requires std::invocable<F&> && ranges::output_range<R, std::invoke_result_t<F&>>
        constexpr ranges::borrowed_iterator_t<R> operator()(R&& r, F gen) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(gen));
        }
    };
    
    inline constexpr generate_fn generate {};
```
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <random>
    #include <string_view>
    
    auto dice()
    {
        static std::uniform_int_distribution<int> distr{1, 6};
        static std::random_device device;
        static std::mt19937 engine {device()};
        return distr(engine);
    }
    
    void iota(auto& r, int init)
    {
        std::ranges::generate(r, [init] mutable { return init++; });
    }
    
    void print(std::string_view comment, const auto& v)
    {
        for (std::cout << comment; int i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::array<int, 8> v;
    
        std::ranges::generate(v.begin(), v.end(), dice);
        print("dice: ", v);
        std::ranges::generate(v, dice);
        print("dice: ", v);
    
        iota(v, 1);
        print("iota: ", v);
    }
```

Saída possível: 
```
    dice: 4 3 1 6 6 4 5 5
    dice: 4 2 5 3 6 2 6 2
    iota: 1 2 3 4 5 6 7 8
```

### Veja também

[ ranges::generate_n](<#/doc/algorithm/ranges/generate_n>)(C++20) |  salva o resultado de N aplicações de uma função  
(objeto de função de algoritmo)  
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) |  atribui um range de elementos a um certo valor  
(objeto de função de algoritmo)  
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) |  atribui um valor a um número de elementos  
(objeto de função de algoritmo)  
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) |  aplica uma função a um range de elementos  
(objeto de função de algoritmo)  
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) |  preenche um range com números aleatórios de um gerador de bits aleatórios uniforme  
(objeto de função de algoritmo)  
[ generate](<#/doc/algorithm/generate>) |  atribui os resultados de chamadas de função sucessivas a cada elemento em um range   
(template de função)