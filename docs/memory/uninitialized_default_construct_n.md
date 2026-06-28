# std::uninitialized_default_construct_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class NoThrowForwardIt, class Size >
NoThrowForwardIt uninitialized_default_construct_n
( NoThrowForwardIt first, Size count );
(constexpr desde C++26)
template< class ExecutionPolicy, class NoThrowForwardIt, class Size >
NoThrowForwardIt uninitialized_default_construct_n
( ExecutionPolicy&& policy, NoThrowForwardIt first, Size count );
```

1) Constrói objetos do tipo typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type na área de memória não inicializada `first` + `[`​0​`, `count`)` por [inicialização padrão](<#/doc/language/default_initialization>), como se por

for (; count > 0; (void)++first, \--count)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)<NoThrowForwardIt>::value_type;
return first;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)<ExecutionPolicy>> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<ExecutionPolicy>> é true. | (desde C++20)

### Parâmetros

- **first** — o início do range de elementos a serem inicializados
- **count** — o número de elementos a serem construídos
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções.

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em n.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_default_construct_n>))

### Possível implementação
```cpp
    template<class NoThrowForwardIt, class Size>
    constexpr ForwardIt uninitialized_default_construct_n(NoThrowForwardIt first, Size count)
    {
        using T = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = first;
    
        try
        {
            for (; count > 0; (void) ++current, --count)
                ::new (static_cast<void*>(std::addressof(*current))) T;
            return current;
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

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <memory>
    #include <string>
    
    struct S
    {
        std::string m{"default value"};
    };
    
    int main()
    {
        constexpr int n{3};
        alignas(alignof(S)) unsigned char mem[n * sizeof(S)];
    
        try
        {
            auto first{reinterpret_cast<S*>(mem)};
            auto last = std::uninitialized_default_construct_n(first, n);
    
            for (auto it{first}; it != last; ++it)
                std::cout << it->m << '\n';
    
            std::destroy(first, last);
        }
        catch(...)
        {
            std::cout << "Exception!\n";
        }
    
        // For scalar types, uninitialized_default_construct_n
        // generally does not zero-initialize the given uninitialized memory area.
        int v[]{1, 2, 3, 4};
        const int original[]{1, 2, 3, 4};
        std::uninitialized_default_construct_n(std::begin(v), std::size(v));
    
        // An attempt to access v might be an undefined behavior,
        // pending CWG 1997 to be resolved:
        // for (const int i : v)
        //     std::cout << i << ' ';
    
        // The result is unspecified:
        std::cout << (std::memcmp(v, original, sizeof(v)) == 0 ? "un" : "") << "modified\n";
    }
```

Saída possível:
```
    default value
    default value
    default value
    unmodified
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(modelo de função)
[ uninitialized_value_construct_n](<#/doc/memory/uninitialized_value_construct_n>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e contagem
(objeto de função de algoritmo)