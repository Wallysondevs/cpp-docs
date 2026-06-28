# std::find_end

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt1, class ForwardIt2 >
ForwardIt1 find_end( ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
ForwardIt1 find_end( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last );
template< class ForwardIt1, class ForwardIt2, class BinaryPred >
ForwardIt1 find_end( ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last,
BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
ForwardIt1 find_end( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last,
BinaryPred p );
```

Procura pela última ocorrência da sequência `[`s_first`, `s_last`)` no range `[`first`, `last`)`.

1) Os elementos são comparados usando o operador==.

3) Os elementos são comparados usando o predicado binário p fornecido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **s_first, s_last** — o range de elementos a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que objetos dos tipos `ForwardIt1` e `ForwardIt2` possam ser desreferenciados e então implicitamente convertidos para `Type1` e `Type2` respectivamente. ​
Requisitos de tipo
-`ForwardIt1` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o início da última ocorrência da sequência `[`s_first`, `s_last`)` no range `[`first`, `last`)`.

Se `[`s_first`, `s_last`)` estiver vazio ou se nenhuma sequência for encontrada, `last` é retornado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last) e \\(\scriptsize S\\)S como [std::distance](<#/doc/iterator/distance>)(s_first, s_last):

1,2) No máximo \\(\scriptsize S\cdot(N-S+1)\\)S·(N-S+1) comparações usando o operador==.

3,4) No máximo \\(\scriptsize S\cdot(N-S+1)\\)S·(N-S+1) aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[find_end (1)](<#/doc/algorithm/find_end>)
---
```cpp
    template<class ForwardIt1, class ForwardIt2>
    constexpr // < desde C++20
    ForwardIt1 find_end(ForwardIt1 first, ForwardIt1 last,
                        ForwardIt2 s_first, ForwardIt2 s_last)
    {
        if (s_first == s_last)
            return last;
    
        ForwardIt1 result = last;
        while (true)
        {
            ForwardIt1 new_result = std::search(first, last, s_first, s_last);
            if (new_result == last)
                break;
            else
            {
                result = new_result;
                first = result;
                ++first;
            }
        }
        return result;
    }
```

[find_end (3)](<#/doc/algorithm/find_end>)
```cpp
    template<class ForwardIt1, class ForwardIt2, class BinaryPred>
    constexpr // < desde C++20
    ForwardIt1 find_end(ForwardIt1 first, ForwardIt1 last,
                        ForwardIt2 s_first, ForwardIt2 s_last,
                        BinaryPred p)
    {
        if (s_first == s_last)
            return last;
    
        ForwardIt1 result = last;
        while (true)
        {
            ForwardIt1 new_result = std::search(first, last, s_first, s_last, p);
            if (new_result == last)
                break;
            else
            {
                result = new_result;
                first = result;
                ++first;
            }
        }
        return result;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cmath>
    #include <iostream>
    
    auto print_result = 
    {
        result == v.end()
            ? std::cout << "Sequence not found\n"
            : std::cout << "Last occurrence is at: " << std::distance(v.begin(), result)
                        << '\n';
    };
    
    int main()
    {
        const auto v = {1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4};
    
        for (auto const& x : {std::array{1, 2, 3}, {4, 5, 6}})
        {
            auto iter = std::find_end(v.begin(), v.end(), x.begin(), x.end()); // overload (1)
            print_result(iter, v);
        }
    
        for (auto const& x : {std::array{-1, -2, -3}, {-4, -5, -6}})
        {
            auto iter = std::find_end(v.begin(), v.end(), x.begin(), x.end(), // overload (3)
                                      
                                      {
                                          return std::abs(x) == std::abs(y);
                                      });
            print_result(iter, v);
        }
    }
```

Saída:
```
    Last occurrence is at: 8
    Sequence not found
    Last occurrence is at: 8
    Sequence not found
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | o valor de retorno era incerto se `[`s_first`, `s_last`)` estivesse vazio | retorna last neste caso
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | a condição de “ocorrência de sequência” estava incorreta | corrigida

### Veja também

[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)
[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ find_first_of](<#/doc/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(modelo de função)
[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)