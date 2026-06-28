# std::search

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt1, class ForwardIt2 >
ForwardIt1 search( ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
ForwardIt1 search( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last );
template< class ForwardIt1, class ForwardIt2, class BinaryPred >
ForwardIt1 search( ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last,
BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
ForwardIt1 search( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last,
BinaryPred p );
template< class ForwardIt, class Searcher >
ForwardIt search( ForwardIt first, ForwardIt last,
const Searcher& searcher );
(constexpr desde C++20)
```

1-4) Procura pela primeira ocorrência da sequência de elementos `[`s_first`, `s_last`)` no range `[`first`, `last`)`.

1) Os elementos são comparados usando o operator==.

3) Os elementos são comparados usando o predicado binário p fornecido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

5) Procura no range `[`first`, `last`)` pelo padrão especificado no construtor de searcher.

A standard library fornece os seguintes searchers: | [ default_searcher](<#/doc/utility/functional/default_searcher>)(C++17) | implementação do algoritmo de busca da standard library C++
(modelo de classe)
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore
(modelo de classe)
[ boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore-Horspool
(modelo de classe)
(desde C++17)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **s_first, s_last** — o range de elementos a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **searcher** — o searcher que encapsula o algoritmo de busca e o padrão a ser procurado
- **p** — predicado binário que retorna true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)). Os tipos Type1 e Type2 devem ser tais que objetos dos tipos ForwardIt1 e ForwardIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2, respectivamente.
Requisitos de tipo
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).

### Valor de retorno

1-4) Iterator para o início da primeira ocorrência da sequência `[`s_first`, `s_last`)` no range `[`first`, `last`)`. Se nenhuma ocorrência for encontrada, last é retornado.

Se `[`s_first`, `s_last`)` estiver vazio, first é retornado.

5) searcher(first, last).first.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last) e \\(\scriptsize S\\)S como [std::distance](<#/doc/iterator/distance>)(s_first, s_last):

1,2) No máximo \\(\scriptsize N\cdot S\\)N·S comparações usando operator==.

3,4) No máximo \\(\scriptsize N\cdot S\\)N·S aplicações do predicado p.

5) Depende do searcher.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[search (1)](<#/doc/algorithm/search>)
---
```
    template<class ForwardIt1, class ForwardIt2>
    constexpr //< since C++20
    ForwardIt1 search(ForwardIt1 first, ForwardIt1 last,
                      ForwardIt2 s_first, ForwardIt2 s_last)
    {
        while (true)
        {
            ForwardIt1 it = first;
            for (ForwardIt2 s_it = s_first; ; ++it, ++s_it)
            {
                if (s_it == s_last)
                    return first;
                if (it == last)
                    return last;
                if (!(*it == *s_it))
                    break;
            }
            ++first;
        }
    }
```

[search (3)](<#/doc/algorithm/search>)
```
    template<class ForwardIt1, class ForwardIt2, class BinaryPred>
    constexpr //< since C++20
    ForwardIt1 search(ForwardIt1 first, ForwardIt1 last,
                      ForwardIt2 s_first, ForwardIt2 s_last, BinaryPred p)
    {
        while (true)
        {
            ForwardIt1 it = first;
            for (ForwardIt2 s_it = s_first; ; ++it, ++s_it)
            {
                if (s_it == s_last)
                    return first;
                if (it == last)
                    return last;
                if (!p(*it, *s_it))
                    break;
            }
            ++first;
        }
    }
```

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <vector>
    
    using namespace std::literals;
    
    bool contains(const auto& cont, std::string_view s)
    {
        // str.find() (or str.contains(), since C++23) can be used as well
        return std::search(cont.begin(), cont.end(), s.begin(), s.end()) != cont.end();
    }
    
    int main()
    {
        const auto str{"why waste time learning, when ignorance is instantaneous?"sv};
        assert(contains(str, "learning"));
        assert(not contains(str, "lemming"));
    
        const std::vector vec(str.begin(), str.end());
        assert(contains(vec, "learning"));
        assert(not contains(vec, "leaning"));
    
        // The C++17 overload with searchers demo:
        constexpr auto quote
        {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
            "do eiusmod tempor incididunt ut labore et dolore magna aliqua"sv
        };
    
        for (const auto word : {"pisci"sv, "Pisci"sv})
        {
            std::cout << "The string " << std::quoted(word) << ' ';
            const std::boyer_moore_searcher searcher(word.begin(), word.end());
            const auto it = std::search(quote.begin(), quote.end(), searcher);
            if (it == quote.end())
                std::cout << "not found\n";
            else
                std::cout << "found at offset " << std::distance(quote.begin(), it) << '\n';
        }
    }
```

Saída:
```
    The string "pisci" found at offset 43
    The string "Pisci" not found
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | o valor de retorno era incerto se `[`s_first`, `s_last`)` estivesse vazio | retorna first neste caso
[LWG 1338](<https://cplusplus.github.io/LWG/issue1338>) | C++98 | a resolução do [LWG issue 1205](<https://cplusplus.github.io/LWG/issue1205>) foi aplicada incorretamente, fazendo com que first fosse retornado se nenhuma ocorrência fosse encontrada | retorna last neste caso
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | a condição de “ocorrência de sequência” estava incorreta | corrigido

### Ver também

[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)
[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(modelo de função)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)
[ default_searcher](<#/doc/utility/functional/default_searcher>)(C++17) | implementação do algoritmo de busca da standard library C++
(modelo de classe)
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore
(modelo de classe)
[ boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore-Horspool
(modelo de classe)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)