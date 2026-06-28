# std::uninitialized_move

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class InputIt, class NoThrowForwardIt >
NoThrowForwardIt uninitialized_move( InputIt first, InputIt last,
NoThrowForwardIt d_first );
(constexpr desde C++26)
template< class ExecutionPolicy,
class ForwardIt, class NoThrowForwardIt >
NoThrowForwardIt uninitialized_move( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
NoThrowForwardIt d_first );
```

1) Copia os elementos de `[`first`, `last`)` (usando semântica de movimento, se suportado) para uma área de memória não inicializada começando em d_first como se por

for (; first != last; ++d_first, (void) ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*d_first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type(/* value */);
return d_first;

onde /* value */ é std::move(*first) se *first for de um tipo de referência lvalue, ou *first caso contrário.

Se uma exceção for lançada durante a inicialização, alguns objetos em `[`first`, `last`)` são deixados em um estado válido, mas não especificado, e os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se d_first` + `[`​0​`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)` se sobrepuser a `[`first`, `last`)`, o comportamento é indefinido. | (desde C++20)

### Parâmetros

- **first, last** — o range dos elementos a serem movidos
- **d_first** — o início do range de destino
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`NoThrowForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções.

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear na distância entre first e last.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Quando o iterador de entrada desreferencia para um rvalue, o comportamento de `std::uninitialized_move` é o mesmo que [std::uninitialized_copy](<#/doc/memory/uninitialized_copy>).

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_move>))

### Possível implementação
```cpp
    template<class InputIt, class NoThrowForwardIt>
    constexpr NoThrowForwardIt uninitialized_move(InputIt first, InputIt last,
                                                  NoThrowForwardIt d_first)
    {
        using ValueType = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        auto current = d_first;
        try
        {
            for (; first != last; ++first, (void) ++current)
            {
                auto addr = static_cast<void*>(std::addressof(*current));
                if constexpr (std::is_lvalue_reference_v<decltype(*first)>)
                    ::new (addr) ValueType(std::move(*first));
                else
                    ::new (addr) ValueType(*first);
            }
            return current;
        }
        catch (...)
        {
            std::destroy(d_first, current);
            throw;
        }
    }
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
        std::string in[]{"Home", "Work!"};
        print("initially, in: ", std::begin(in), std::end(in));
    
        if (
            constexpr auto sz = std::size(in);
            void* out = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
        {
            try
            {
                auto first{static_cast<std::string*>(out)};
                auto last{first + sz};
                std::uninitialized_move(std::begin(in), std::end(in), first);
    
                print("after move, in: ", std::begin(in), std::end(in));
                print("after move, out: ", first, last);
    
                std::destroy(first, last);
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
    initially, in: "Home" "Work!"
    after move, in: "" ""
    after move, out: "Home" "Work!"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo poderia criar objetos em um armazenamento const | mantido como não permitido
[LWG 3918](<https://cplusplus.github.io/LWG/issue3918>) | C++17 | materialização temporária adicional era necessária
quando o iterador de entrada desreferenciava para um prvalue | copia o elemento neste caso

### Veja também

[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | copia um range de objetos para uma área de memória não inicializada
(function template)
[ uninitialized_move_n](<#/doc/memory/uninitialized_move_n>)(C++17) | move um número de objetos para uma área de memória não inicializada
(function template)
[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(C++20) | move um range de objetos para uma área de memória não inicializada
(algorithm function object)