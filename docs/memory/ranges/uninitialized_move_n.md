# std::ranges::uninitialized_move_n, std::ranges::uninitialized_move_n_result

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
`template< std::input_iterator I, no-throw-forward-iterator O, no-throw-sentinel-for<O> S > requires std::constructible_from<std::iter_value_t<O>, std::iter_rvalue_reference_t<I>> uninitialized_move_n_result<I, O> uninitialized_move_n( I ifirst, std::iter_difference_t<I> count, O ofirst, S olast );`
`(constexpr desde C++26)`
Tipos auxiliares
`template< class I, class O > using uninitialized_move_n_result = ranges::in_out_result<I, O>;`
```

Seja \\(\scriptsize N\\)N igual a [ranges::min](<#/doc/algorithm/ranges/min>)(count, [ranges::distance](<#/doc/iterator/ranges/distance>)(ofirst, olast)).

Copia \\(\scriptsize N\\)N elementos do range começando em `ifirst` (usando move semantics, se suportado) para uma área de memória não inicializada `[`ofirst`, `olast`)` como se por
`auto ret = [ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)([std::counted_iterator](<#/doc/iterator/counted_iterator>)(std::move(ifirst), count), [std::default_sentinel](<#/doc/iterator/default_sentinel>), ofirst, olast);`
`return {std::move(ret.in).base(), ret.out};`

Se uma exceção for lançada durante a inicialização, os objetos já construídos em `[`ofirst`, `olast`)` são destruídos em uma ordem não especificada. Além disso, os objetos no range de entrada começando em `ifirst`, que já foram movidos, são deixados em um estado válido, mas não especificado.

Se `[`ofirst`, `olast`)` se sobrepuser a `ifirst` `+` `[`​0​`, `count`)`, o comportamento é indefinido.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **ifirst** — o início do range de entrada de elementos a serem movidos
- **ofirst, olast** — par iterador-sentinela denotando o range de saída de elementos a serem inicializados
- **n** — o número de elementos a serem movidos

### Valor de retorno

Conforme descrito acima.

### Complexidade

\\(\scriptsize\mathcal{O}(N)\\)𝓞(N).

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Observações

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_move_n`, por exemplo, usando [ranges::copy_n](<#/doc/algorithm/ranges/copy_n>), se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | `constexpr` para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/ranges/uninitialized_move_n>))

### Possível implementação
```cpp
    struct uninitialized_move_n_fn
    {
        template<std::input_iterator I,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S>
            requires std::constructible_from<std::iter_value_t<O>,
                                             std::iter_rvalue_reference_t<I>>
        constexpr ranges::uninitialized_move_n_result<I, O>
            operator()(I ifirst, std::iter_difference_t<I> count, O ofirst, S olast) const
        {
            auto iter = std::counted_iterator(std::move(ifirst), count);
            auto ret = ranges::uninitialized_move(iter, std::default_sentinel, ofirst, olast);
            return {std::move(ret.in).base(), ret.out};
        }
    };
    
    inline constexpr uninitialized_move_n_fn uninitialized_move_n{};
```

---

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <string>
    
    void print(auto rem, auto first, auto last)
    {
        for (std::cout << rem; first != last; ++first)
            std::cout << std::quoted(*first) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::string in[]{ "No", "Diagnostic", "Required", };
        print("initially, in: ", std::begin(in), std::end(in));
    
        if (
            constexpr auto sz = std::size(in);
            void* out = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz)
        )
        {
            try
            {
                auto first{static_cast<std::string*>(out)};
                auto last{first + sz};
                std::ranges::uninitialized_move_n(std::begin(in), sz, first, last);
    
                print("after move, in: ", std::begin(in), std::end(in));
                print("after move, out: ", first, last);
    
                std::ranges::destroy(first, last);
            }
            catch (...)
            {
                std::cout << "Exception!\n";
            }
            std::free(out);
        }
    }
```

Saída possível:
```
    initially, in: "No" "Diagnostic" "Required"
    after move, in: "" "" ""
    after move, out: "No" "Diagnostic" "Required"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Ver também

[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(C++20) | move um range de objetos para uma área de memória não inicializada (objeto de função de algoritmo)
---|---
[ uninitialized_move_n](<#/doc/memory/uninitialized_move_n>)(C++17) | move um número de objetos para uma área de memória não inicializada (modelo de função)