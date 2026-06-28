# std::uninitialized_copy

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class InputIt, class NoThrowForwardIt >
NoThrowForwardIt uninitialized_copy( InputIt first, InputIt last,
NoThrowForwardIt d_first );
template< class ExecutionPolicy, class ForwardIt,
class NoThrowForwardIt >
NoThrowForwardIt uninitialized_copy( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
NoThrowForwardIt d_first );
```

1) Copia elementos do range `[`first`, `last`)` para uma área de memória não inicializada começando em d_first como se por

for (; first != last; ++d_first, (void) ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*d_first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type(*first);

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se d_first` + `[`​0​`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)` se sobrepõe a `[`first`, `last`)`, o comportamento é indefinido. | (desde C++20)

### Parâmetros

- **first, last** — o range dos elementos a serem copiados
- **d_first** — o início do range de destino
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções. Aplicar &* a um valor `NoThrowForwardIt` deve resultar em um ponteiro para seu tipo de valor.(até C++11)

### Valor de retorno

Iterator para o elemento após o último elemento copiado.

### Complexidade

Linear na distância entre first e last.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_copy>))

### Possível implementação
```cpp
    template<class InputIt, class NoThrowForwardIt>
    constexpr NoThrowForwardIt uninitialized_copy(InputIt first, InputIt last,
                                                  NoThrowForwardIt d_first)
    {
        using T = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = d_first;
        try
        {
            for (; first != last; ++first, (void) ++current)
                ::new (static_cast<void*>(std::addressof(*current))) T(*first);
            return current;
        }
        catch (...)
        {
            for (; d_first != current; ++d_first)
                d_first->~T();
            throw;
        }
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        const char *v[] = {"This", "is", "an", "example"};
    
        auto sz = std::size(v);
    
        if (void *pbuf = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
        {
            try
            {
                auto first = static_cast<std::string*>(pbuf);
                auto last = std::uninitialized_copy(std::begin(v), std::end(v), first);
    
                for (auto it = first; it != last; ++it)
                    std::cout << *it << '_';
                std::cout << '\n';
    
                std::destroy(first, last);
            }
            catch (...) {}
            std::free(pbuf);
        }
    }
```

Saída:
```
    This_is_an_example_
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto [LWG 866](<https://cplusplus.github.io/LWG/issue866>) | C++98 | dado `T` como o tipo de valor de `NoThrowForwardIt`, se
---|---|---
T::[operator new](<#/doc/memory/new/operator_new>) existir, o programa pode ser malformado | usa o replacement-new global em vez disso
[LWG 2133](<https://cplusplus.github.io/LWG/issue2133>) | C++98 | a descrição do efeito usava um loop for com a expressão de iteração
++d_first, ++first, o que resulta
em uma pesquisa dependente de argumento do operador, | descarta o valor
de um operando para desabilitar essa ADL
[LWG 2433](<https://cplusplus.github.io/LWG/issue2433>) | C++11 | este algoritmo pode ser sequestrado por um operator& sobrecarregado | usa [std::addressof](<#/doc/memory/addressof>)
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido não permitido

### Veja também

[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(C++11) | copia um número de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(C++20) | copia um range de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)