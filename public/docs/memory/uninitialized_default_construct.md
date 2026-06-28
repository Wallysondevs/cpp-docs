# std::uninitialized_default_construct

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class NoThrowForwardIt >
void uninitialized_default_construct( NoThrowForwardIt first,
NoThrowForwardIt last );
(constexpr desde C++26)
template< class ExecutionPolicy, class NoThrowForwardIt >
void uninitialized_default_construct( ExecutionPolicy&& policy,
NoThrowForwardIt first,
NoThrowForwardIt last );
```

1) Constrói objetos do tipo typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type na área de memória não inicializada `[`first`, `last`)` por [inicialização padrão](<#/doc/language/default_initialization>), como se por

for (; first != last; ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range dos elementos a serem inicializados
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções.

### Complexidade

Linear na distância entre first e last.

### Exceções

A sobrecarga com um parâmetro de template nomeado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_default_construct>))

### Possível implementação
```cpp
    template<class NoThrowForwardIt>
    constexpr void uninitialized_default_construct(NoThrowForwardIt first,
                                                   NoThrowForwardIt last)
    {
        using Value = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = first;
        try
        {
            for (; current != last; ++current)
            {
                ::new (static_cast<void*>(std::addressof(*current))) Value;
            }
        }
        catch (...)
        {
            std::destroy(first, current);
            throw;
        }
    }
```

---

### Exemplo

Run this code
```cpp
    #include <cstring>
    #include <iostream>
    #include <memory>
    #include <string>
    
    struct S
    {
        std::string m{"Default value"};
    };
    
    int main()
    {
        constexpr int n{3};
        alignas(alignof(S)) unsigned char mem[n * sizeof(S)];
    
        try
        {
            auto first{reinterpret_cast<S*>(mem)};
            auto last{first + n};
    
            std::uninitialized_default_construct(first, last);
    
            for (auto it{first}; it != last; ++it)
                std::cout << it->m << '\n';
    
            std::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
    
        // For scalar types, uninitialized_default_construct
        // generally does not zero-fill the given uninitialized memory area.
        int v[]{1, 2, 3, 4};
        const int original[]{1, 2, 3, 4};
        std::uninitialized_default_construct(std::begin(v), std::end(v));
    
        // Maybe undefined behavior, pending CWG 1997 to be resolved.
        // for (const int i : v)
        //     std::cout << i << ' ';
    
        // The result is unspecified.
        std::cout <<
            (std::memcmp(v, original, sizeof(v)) == 0 ? "Unmodified\n" : "Modified\n");
    }
```

Saída possível:
```
    Default value
    Default value
    Default value
    Unmodified
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ uninitialized_default_construct_n](<#/doc/memory/uninitialized_default_construct_n>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(modelo de função)
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)