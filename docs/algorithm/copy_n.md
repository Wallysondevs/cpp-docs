# std::copy_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class Size, class OutputIt >
OutputIt copy_n( InputIt first, Size count, OutputIt result );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class Size, class ForwardIt2 >
ForwardIt2 copy_n( ExecutionPolicy&& policy,
ForwardIt1 first, Size count, ForwardIt2 result );
```

1) Copia exatamente count valores do range que começa em first para o range que começa em result. Formalmente, para cada inteiro i em `[`​0​`, `count`)`, executa *(result + i) = *(first + i).

A sobreposição de ranges é formalmente permitida, mas leva a uma ordenação imprevisível dos resultados.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

### Parâmetros

- **first** — o início do range de elementos a serem copiados
- **count** — número de elementos a serem copiados
- **result** — o início do range de destino
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator no range de destino, apontando para depois do último elemento copiado se count > 0 ou para result caso contrário.

### Complexidade

Zero atribuições se count < 0; count atribuições caso contrário.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class InputIt, class Size, class OutputIt>
    constexpr //< since C++20
    OutputIt copy_n(InputIt first, Size count, OutputIt result)
    {
        if (count > 0)
        {
            *result = *first;
            ++result;
            for (Size i = 1; i != count; ++i, ++result)
                *result = *++first;
        }
    
        return result;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::string in {"1234567890"};
        std::string out;
    
        std::copy_n(in.begin(), 4, std::back_inserter(out));
        std::cout << out << '\n';
    
        std::vector<int> v_in(128);
        std::iota(v_in.begin(), v_in.end(), 1);
        std::vector<int> v_out(v_in.size());
    
        std::copy_n(v_in.cbegin(), 100, v_out.begin());
        std::cout << std::accumulate(v_out.begin(), v_out.end(), 0) << '\n';
    }
```

Saída:
```
    1234
    5050
```

### Veja também

[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto de função de algoritmo)