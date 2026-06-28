# std::ranges::uninitialized_value_construct

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-iterator I, no-throw-sentinel-for<I> S >
requires std::default_initializable<std::iter_value_t<I>>
I uninitialized_value_construct( I first, S last );
(constexpr desde C++26)
template< no-throw-forward-range R >
requires std::default_initializable<ranges::range_value_t<R>>
ranges::borrowed_iterator_t<R>
uninitialized_value_construct( R&& r );
(constexpr desde C++26)
```

  
1) Constrói objetos do tipo [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt; na área de memória não inicializada `[`first`, `last`)` por [inicialização por valor](<#/doc/language/value_initialization>), como se por 

for (; first != last; ++first)  
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))  
` `[std::remove_reference_t](<#/doc/types/remove_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>();  
return first;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) Equivalente a ranges::uninitialized_value_construct([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r)).

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles. 
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>). 
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida. 

### Parâmetros

first, last  |  \-  |  par de iterador-sentinela denotando o range de elementos a serem inicializados por valor   
---|---|---
r  |  \-  |  o range dos elementos a serem inicializados por valor   
  
### Valor de retorno

Conforme descrito acima. 

### Complexidade

Linear na distância entre first e last. 

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino. 

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_value_construct`, por exemplo, usando [ranges::fill](<#/doc/algorithm/ranges/fill>), se o tipo de valor do range for um [CopyAssignable](<#/doc/named_req/CopyAssignable>) [TrivialType](<#/doc/named_req/TrivialType>). 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1,2](<#/doc/memory/ranges/uninitialized_value_construct>))  
  
### Possível implementação
```cpp
    struct uninitialized_value_construct_fn
    {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S>
            requires std::value_initializable<std::iter_value_t<I>>
        constexpr I operator()(I first, S last) const
        {
            using ValueType = std::remove_reference_t<std::iter_reference_t<I>>;
            if constexpr (std::is_trivially_default_constructible_v<ValueType>)
                return ranges::fill(first, last, ValueType());
            I rollback{first};
            try
            {
                for (; !(first == last); ++first)
                    ::new (static_cast<void*>(std::addressof(*first))) ValueType();
                return first;
            }
            catch (...) // rollback: destrói elementos construídos
            {
                for (; rollback != first; ++rollback)
                    ranges::destroy_at(std::addressof(*rollback));
                throw;
            }
        }
    
        template<no-throw-forward-range R>
            requires std::default_initializable<ranges::range_value_t<R>>
        constexpr ranges::borrowed_iterator_t<R> operator()(R&& r) const
        {
            return (*this)(ranges::begin(r), ranges::end(r));
        }
    };
    
    inline constexpr uninitialized_value_construct_fn uninitialized_value_construct{};
```  
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        struct S { std::string m{"▄▀▄▀▄▀▄▀"}; };
    
        constexpr int n{4};
        alignas(alignof(S)) char out[n * sizeof(S)];
    
        try
        {
            auto first{reinterpret_cast<S*>(out)};
            auto last{first + n};
    
            std::ranges::uninitialized_value_construct(first, last);
    
            auto count{1};
            for (auto it{first}; it != last; ++it)
                std::cout << count++ << ' ' << it->m << '\n';
    
            std::ranges::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
    
        // Para tipos escalares, uninitialized_value_construct
        // preenche com zeros a área de memória não inicializada fornecida.
        int v[]{0, 1, 2, 3};
        std::cout << ' ';
        for (const int i : v)
            std::cout << ' ' << static_cast<char>(i + 'A');
        std::cout << "\n ";
        std::ranges::uninitialized_value_construct(std::begin(v), std::end(v));
        for (const int i : v)
            std::cout << ' ' << static_cast<char>(i + 'A');
        std::cout << '\n';
    }
```

Saída: 
```
    1 ▄▀▄▀▄▀▄▀
    2 ▄▀▄▀▄▀▄▀
    3 ▄▀▄▀▄▀▄▀
    4 ▄▀▄▀▄▀▄▀
      A B C D
      A A A A
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20  | este algoritmo pode criar objetos em um armazenamento const  | mantido como não permitido   
  
### Veja também

[ ranges::uninitialized_value_construct_n](<#/doc/memory/ranges/uninitialized_value_construct_n>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem  
(objeto de função de algoritmo)  
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range  
(objeto de função de algoritmo)  
[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem  
(objeto de função de algoritmo)  
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range   
(modelo de função)