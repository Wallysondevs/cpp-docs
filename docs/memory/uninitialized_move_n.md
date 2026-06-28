# std::uninitialized_move_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class InputIt, class Size, class NoThrowForwardIt >
std::pair<InputIt, NoThrowForwardIt>
uninitialized_move_n( InputIt first, Size count,
NoThrowForwardIt d_first );
(constexpr desde C++26)
template< class ExecutionPolicy,
class ForwardIt, class Size, class NoThrowForwardIt >
std::pair<ForwardIt, NoThrowForwardIt>
uninitialized_move_n( ExecutionPolicy&& policy, ForwardIt first,
Size count, NoThrowForwardIt d_first );
```

1) Copia os elementos de first` + `[`​0​`, `count`)` (usando semântica de movimento se suportado) para uma área de memória não inicializada começando em d_first como se por

for (; count > 0; ++d_first, (void) ++first, \--count)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*d_first))
` `typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;NoThrowForwardIt&gt;::value_type(/* value */);
return {first, d_first};

onde /* value */ é std::move(*first) se *first for de um tipo de referência lvalue, ou *first caso contrário.

Se uma exceção for lançada durante a inicialização, alguns objetos em first` + `[`​0​`, `count`)` são deixados em um estado válido, mas não especificado, e os objetos já construídos são destruídos em uma ordem não especificada.

2) O mesmo que (1), mas executado de acordo com policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se d_first` + `[`​0​`, `count`)` se sobrepuser a first` + `[`​0​`, `count`)`, o comportamento é indefinido. | (desde C++20)

### Parâmetros

- **first** — o início do range dos elementos a serem movidos
- **d_first** — o início do range de destino
- **count** — o número de elementos a serem movidos
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`NoThrowForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `NoThrowForwardIt` pode lançar exceções.

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em count.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Quando o iterator de entrada desreferencia para um rvalue, o comportamento de `std::uninitialized_move_n` é o mesmo que [std::uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>).

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/uninitialized_move_n>))

### Possível implementação
```cpp
    template<class InputIt, class Size, class NoThrowForwardIt>
    constexpr std::pair<InputIt, NoThrowForwardIt>
        uninitialized_move_n(InputIt first, Size count, NoThrowForwardIt d_first)
    {
        using ValueType = typename std::iterator_traits<NoThrowForwardIt>::value_type;
        NoThrowForwardIt current = d_first;
        try
        {
            for (; count > 0; ++first, (void) ++current, --count) {
                auto addr = static_cast<void*>(std::addressof(*current));
                if constexpr (std::is_lvalue_reference_v<decltype(*first)>)
                    ::new (addr) ValueType(std::move(*first));
                else
                    ::new (addr) ValueType(*first);
            }
        }
        catch (...)
        {
            std::destroy(d_first, current);
            throw;
        }
        return {first, current};
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
        std::string in[]{"One", "Definition", "Rule"};
        print("initially, in: ", std::begin(in), std::end(in));
    
        if (constexpr auto sz = std::size(in);
            void* out = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
        {
            try
            {
                auto first{static_cast<std::string*>(out)};
                auto last{first + sz};
                std::uninitialized_move_n(std::begin(in), sz, first);
    
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
    initially, in: "One" "Definition" "Rule" 
    after move, in: "" "" "" 
    after move, out: "One" "Definition" "Rule"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido
[LWG 3918](<https://cplusplus.github.io/LWG/issue3918>) | C++17 | materialização temporária adicional era necessária
quando o iterator de entrada desreferenciava para um prvalue | copia o elemento neste caso

### Veja também

[ uninitialized_move](<#/doc/memory/uninitialized_move>)(C++17) | move um range de objetos para uma área de memória não inicializada
(modelo de função)
[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(C++11) | copia um número de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_move_n](<#/doc/memory/ranges/uninitialized_move_n>)(C++20) | move um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)