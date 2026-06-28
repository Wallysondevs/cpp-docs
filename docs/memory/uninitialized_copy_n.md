# std::uninitialized_copy_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class InputIt, class Size, class NoThrowForwardIt >
NoThrowForwardIt uninitialized_copy_n( InputIt first, Size count,
NoThrowForwardIt d_first );
(constexpr desde C++26)
template< class ExecutionPolicy, class ForwardIt,
class Size, class NoThrowForwardIt >
NoThrowForwardIt uninitialized_copy_n( ExecutionPolicy&& policy,
ForwardIt first, Size count,
NoThrowForwardIt d_first );
```

1) Copia `count` elementos de um `range` começando em `first` para uma área de memória não inicializada começando em `d_first` como se por

for (; count > 0; ++d_first, (void) ++first, \--count)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*d_first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type(*first);

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a `policy`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

Se `d_first` + `[`​0​`, `count`)` se sobrepuser com `first` + `[`​0​`, `count`)`, o comportamento é indefinido. | (desde C++20)

### Parâmetros

- **first** — o início do `range` dos elementos a serem copiados
- **count** — o número de elementos a serem copiados
- **d_first** — o início do `range` de destino
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções.

### Valor de retorno

Iterator para o elemento após o último elemento copiado.

### Complexidade

Linear em `count`.

### Exceções

A sobrecarga com um parâmetro de `template` chamado `ExecutionPolicy` reporta erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | `constexpr` para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_copy_n>))

### Possível implementação
```cpp
    template<class InputIt, class Size, class NoThrowForwardIt>
    constexpr NoThrowForwardIt uninitialized_copy_n(InputIt first, Size count,
                                                    NoThrowForwardIt d_first)
    {
        using T = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = d_first;
        try
        {
            for (; count > 0; ++first, (void) ++current, --count)
                ::new (static_cast<void*>(std::addressof(*current))) T(*first);
        }
        catch (...)
        {
            for (; d_first != current; ++d_first)
                d_first->~T();
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
    #include <vector>
    
    int main()
    {
        std::vector<std::string> v = {"This", "is", "an", "example"};
    
        std::string* p;
        std::size_t sz;
        std::tie(p, sz) = std::get_temporary_buffer<std::string>(v.size());
        sz = std::min(sz, v.size());
    
        std::uninitialized_copy_n(v.begin(), sz, p);
    
        for (std::string* i = p; i != p + sz; ++i)
        {
            std::cout << *i << ' ';
            i->~basic_string<char>();
        }
        std::cout << '\n';
    
        std::return_temporary_buffer(p);
    }
```

Saída possível:
```
    This is an example
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2133](<https://cplusplus.github.io/LWG/issue2133>) | C++98 | a descrição do efeito usava um loop `for` com a expressão de iteração
++d_first, ++first, \--count, o que
resulta em `lookups` dependentes de argumento do operador, | descarta o valor
de um operando para
desabilitar esses ADLs
[LWG 2433](<https://cplusplus.github.io/LWG/issue2433>) | C++11 | este algoritmo poderia ser "sequestrado" por um `operator&` sobrecarregado | usa [std::addressof](<#/doc/memory/addressof>)
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo poderia criar objetos em um armazenamento `const` | mantido como não permitido

### Veja também

[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | copia um `range` de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_copy_n](<#/doc/memory/ranges/uninitialized_copy_n>)(C++20) | copia um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)