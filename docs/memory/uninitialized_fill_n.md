# std::uninitialized_fill_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class NoThrowForwardIt, class Size, class T >
NoThrowForwardIt uninitialized_fill_n( NoThrowForwardIt first,
Size count, const T& value );
template< class ExecutionPolicy,
class NoThrowForwardIt, class Size, class T >
NoThrowForwardIt uninitialized_fill_n( ExecutionPolicy&& policy,
NoThrowForwardIt first,
Size count, const T& value );
```

1) Copia value para uma área de memória não inicializada `first` + `[`​0​`, `count`)` como se por

for (; count\--; ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)<NoThrowForwardIt>::value_type(value);
return first;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)<ExecutionPolicy>> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<ExecutionPolicy>> é verdadeiro. | (desde C++20)

### Parâmetros

- **first** — o início do range dos elementos a serem inicializados
- **count** — número de elementos a serem construídos
- **value** — o valor com o qual construir os elementos
Requisitos de tipo
-`NoThrowForwardIt` deve satisfazer os requisitos de [`LegacyForwardIterator`](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções. Aplicar &* a um valor `NoThrowForwardIt` deve produzir um ponteiro para seu tipo de valor.(até C++11)

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em count.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [`políticas padrão`](<#/doc/algorithm/execution_policy_tag_t>), [`std::terminate`](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [`std::bad_alloc`](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [`algoritmos de memória especializados`](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_fill_n>))

### Possível implementação
```cpp
    template<class NoThrowForwardIt, class Size, class T>
    constexpr NoThrowForwardIt uninitialized_fill_n(NoThrowForwardIt first,
                                                    Size count, const T& value)
    {
        using V = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = first;
        try
        {
            for (; count > 0; ++current, (void) --count)
                ::new (static_cast<void*>(std::addressof(*current))) V(value);
            return current;
        }
        catch (...)
        {
            for (; first != current; ++first)
                first->~V();
            throw;
        }
        return current;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <memory>
    #include <string>
    #include <tuple>
    
    int main()
    {
        std::string* p;
        std::size_t sz;
        std::tie(p, sz) = std::get_temporary_buffer<std::string>(4);
        std::uninitialized_fill_n(p, sz, "Example");
    
        for (std::string* i = p; i != p + sz; ++i)
        {
            std::cout << *i << '\n';
            i->~basic_string<char>();
        }
        std::return_temporary_buffer(p);
    }
```

Saída:
```
    Example
    Example
    Example
    Example
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 866](<https://cplusplus.github.io/LWG/issue866>) | C++98 | dado `T` como o tipo de valor de `NoThrowForwardIt`, se
T::[operator new](<#/doc/memory/new/operator_new>) existir, o programa pode ser malformado | usa global placement new em vez disso
[LWG 1339](<https://cplusplus.github.io/LWG/issue1339>) | C++98 | a localização do primeiro elemento após
o range de preenchimento não foi retornada | retornada
[LWG 2433](<https://cplusplus.github.io/LWG/issue2433>) | C++11 | este algoritmo pode ser sequestrado por `operator&` sobrecarregado | usa [`std::addressof`](<#/doc/memory/addressof>)
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) | copia um objeto para uma área de memória não inicializada, definida por um range
(modelo de função)
[ ranges::uninitialized_fill_n](<#/doc/memory/ranges/uninitialized_fill_n>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)