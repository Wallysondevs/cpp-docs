# std::ranges::uninitialized_default_construct_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-iterator I >
requires std::default_initializable<std::iter_value_t<I>>
I uninitialized_default_construct_n( I first,
std::iter_difference_t<I> count );
(constexpr desde C++26)
```

Constrói objetos do tipo `std::iter_value_t<I>` na área de memória não inicializada `first + [0, count)` por [inicialização padrão](<#/doc/language/default_initialization>), como se retornasse `ranges::uninitialized_default_construct([std::counted_iterator](<#/doc/iterator/counted_iterator>)(first, count), std::default_sentinel)).base();`

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

As entidades tipo função descritas nesta página são _objetos de função de algoritmo_ (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para _argument-dependent lookup_.
  * Quando qualquer um deles é encontrado por _normal unqualified lookup_ como o nome à esquerda do operador de chamada de função, o _argument-dependent lookup_ é inibido.

### Parâmetros

- **first** — o início do _range_ de elementos a serem inicializados
- **count** — o número de elementos a serem construídos

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em `count`.

### Exceções

Qualquer exceção lançada na construção dos elementos no _range_ de destino.

### Notas

Uma implementação pode pular a construção dos objetos (sem alterar o efeito observável) se nenhum construtor padrão não trivial for chamado durante a inicialização padrão de um objeto `std::iter_value_t<I>`, o que pode ser detectado por `std::is_trivially_default_constructible`.

### Notas

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | `constexpr` para [algoritmos de memória especializados](<#/doc/memory>)

### Possível implementação
```cpp
    struct uninitialized_default_construct_n_fn
    {
        template<no-throw-forward-iterator I>
            requires std::default_initializable<std::iter_value_t<I>>
        constexpr I operator()(I first, std::iter_difference_t<I> count) const
        {
            auto iter = std::counted_iterator(first, count);
            return ranges::uninitialized_default_construct(iter, std::default_sentinel).base();
        }
    };
    
    inline constexpr uninitialized_default_construct_n_fn uninitialized_default_construct_n{};
```

---

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        struct S { std::string m{"█▓▒░ █▓▒░ "}; };
    
        constexpr int n{4};
        alignas(alignof(S)) char out[n * sizeof(S)];
    
        try
        {
            auto first{reinterpret_cast<S*>(out)};
            auto last = std::ranges::uninitialized_default_construct_n(first, n);
    
            auto count{1};
            for (auto it{first}; it != last; ++it)
                std::cout << count++ << ' ' << it->m << '\n';
    
            std::ranges::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
    
        // Para tipos escalares, uninitialized_default_construct_n
        // geralmente não preenche com zeros a área de memória não inicializada fornecida.
        constexpr int sample[]{1, 2, 3, 4, 5, 6};
        int v[]{1, 2, 3, 4, 5, 6};
        std::ranges::uninitialized_default_construct_n(std::begin(v), std::size(v));
        if (std::memcmp(v, sample, sizeof(v)) == 0)
        {
            // Comportamento indefinido, aguardando CWG 1997:
            // for (const int i : v) { std::cout << i << ' '; }
            for (const int i : sample)
                std::cout << i << ' ';
        }
        else
            std::cout << "Unspecified!";
        std::cout << '\n';
    }
```

Saída possível:
```
    1 █▓▒░ █▓▒░
    2 █▓▒░ █▓▒░
    3 █▓▒░ █▓▒░
    4 █▓▒░ █▓▒░
    1 2 3 4 5 6
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento `const` | mantido como não permitido

### Veja também

[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um _range_
(objeto de função de algoritmo)
[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um _range_
(objeto de função de algoritmo)
[ ranges::uninitialized_value_construct_n](<#/doc/memory/ranges/uninitialized_value_construct_n>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ uninitialized_default_construct_n](<#/doc/memory/uninitialized_default_construct_n>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(template de função)