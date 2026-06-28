# std::uninitialized_fill

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class NoThrowForwardIt, class T >
void uninitialized_fill( NoThrowForwardIt first,
NoThrowForwardIt last, const T& value );
template< class ExecutionPolicy, class NoThrowForwardIt, class T >
void uninitialized_fill( ExecutionPolicy&& policy,
NoThrowForwardIt first,
NoThrowForwardIt last, const T& value );
```

1) Copia value para uma área de memória não inicializada `[`first`, `last`)` como se por

for (; first != last; ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type(value);

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

### Parâmetros

- **first, last** — o range dos elementos a inicializar
- **value** — o valor com o qual construir os elementos
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções. Aplicar &* a um valor `NoThrowForwardIt` deve produzir um ponteiro para seu tipo de valor.(até C++11)

### Complexidade

Linear na distância entre first e last.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_fill>))

### Possível implementação
```cpp
    template<class NoThrowForwardIt, class T>
    constexpr void uninitialized_fill(NoThrowForwardIt first, NoThrowForwardIt last,
                                      const T& value)
    {
        using V = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = first;
        try
        {
            for (; current != last; ++current)
                ::new (static_cast<void*>(std::addressof(*current))) V(value);
        } 
        catch (...)
        {
            for (; first != current; ++first)
                first->~V();
            throw;
        }
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
    
    int main()
    {
        const std::size_t sz = 4;
        std::allocator<std::string> alloc;
        std::string* p = alloc.allocate(sz);
    
        std::uninitialized_fill(p, p + sz, "Example");
    
        for (std::string* i = p; i != p + sz; ++i)
        {
            std::cout << *i << '\n';
            i->~basic_string<char>();
        }
    
        alloc.deallocate(p, sz);
    }
```

Saída:
```
    Example
    Example
    Example
    Example
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 866](<https://cplusplus.github.io/LWG/issue866>) | C++98 | dado `T` como o tipo de valor de `NoThrowForwardIt`, se T::[operator new](<#/doc/memory/new/operator_new>) existir, o programa pode ser malformado | usa placement new global em vez disso
[LWG 2433](<https://cplusplus.github.io/LWG/issue2433>) | C++11 | este algoritmo pode ser sequestrado por operator& sobrecarregado | usa [std::addressof](<#/doc/memory/addressof>)
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)