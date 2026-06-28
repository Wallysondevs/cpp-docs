# std::equal

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2 >
bool equal( InputIt1 first1, InputIt1 last1,
InputIt2 first2 );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
bool equal( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2 );
template< class InputIt1, class InputIt2, class BinaryPred >
bool equal( InputIt1 first1, InputIt1 last1,
InputIt2 first2, BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
bool equal( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, BinaryPred p );
template< class InputIt1, class InputIt2 >
bool equal( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2 );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
bool equal( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, InputIt2 last2 );
template< class InputIt1, class InputIt2, class BinaryPred >
bool equal( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2, BinaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
bool equal( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, InputIt2 last2, BinaryPred p );
```

Verifica se `[`first1`, `last1`)` e um range começando em `first2` são iguais:

*   Para as sobrecargas (1-4), o segundo range possui [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos.
*   Para as sobrecargas (5-8), o segundo range é `[`first2`, `last2`)`.

1,5) Os elementos são comparados usando o operador==.

3,7) Os elementos são comparados usando o predicado binário `p` fornecido.

2,4,6,8) O mesmo que (1,3,5,7), mas executado de acordo com a `policy`.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

### Parâmetros

- **first1, last1** — o primeiro range de elementos a comparar
- **first2, last2** — o segundo range de elementos a comparar
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna `true` se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que objetos dos tipos `InputIt1` e `InputIt2` possam ser desreferenciados e então implicitamente convertidos para `Type1` e `Type2` respectivamente.
Requisitos de tipo
-`InputIt1, InputIt2` devem atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2` devem atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve atender aos requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).

### Valor de retorno

1-4) Se cada elemento correspondente nos dois ranges for igual, retorna `true`. Caso contrário, retorna `false`.

5-8) Se [std::distance](<#/doc/iterator/distance>)(first1, last1) e [std::distance](<#/doc/iterator/distance>)(first2, last2) forem iguais, e cada elemento correspondente nos dois ranges for igual, retorna `true`. Caso contrário, retorna `false`.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1) No máximo \\(\scriptsize N_1\\)N1 comparações usando o operador==.

2) \\(\scriptsize O(N_1)\\)O(N1) comparações usando o operador==.

3) No máximo \\(\scriptsize N_1\\)N1 aplicações do predicado `p`.

4) \\(\scriptsize O(N_1)\\)O(N1) aplicações do predicado `p`.

5-8) Se `InputIt1` e `InputIt2` forem ambos [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), e `last1 - first1 != last2 - first2` for `true`, nenhuma comparação será feita.

Caso contrário, dado \\(\scriptsize N\\)N como \\(\scriptsize \min(N_1,N_2)\\)min(N1,N2):

5) No máximo \\(\scriptsize N\\)N comparações usando o operador==.

6) \\(\scriptsize O(N)\\)O(N) comparações usando o operador==.

7) No máximo \\(\scriptsize N\\)N aplicações do predicado `p`.

8) \\(\scriptsize O(N)\\)O(N) aplicações do predicado `p`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[equal (1)](<#/doc/algorithm/equal>)
---
```cpp
    template<class InputIt1, class InputIt2>
    constexpr //< since C++20
    bool equal(InputIt1 first1, InputIt1 last1, InputIt2 first2)
    {
        for (; first1 != last1; ++first1, ++first2)
            if (!(*first1 == *first2))
                return false;
    
        return true;
    }
```

[equal (3)](<#/doc/algorithm/equal>)
```cpp
    template<class InputIt1, class InputIt2, class BinaryPred>
    constexpr //< since C++20
    bool equal(InputIt1 first1, InputIt1 last1,
               InputIt2 first2, BinaryPred p)
    {
        for (; first1 != last1; ++first1, ++first2)
            if (!p(*first1, *first2))
                return false;
    
        return true;
    }
```

[equal (5)](<#/doc/algorithm/equal>)
```cpp
    namespace detail
    {
        // implementação de iterator de acesso aleatório (permite detecção rápida do tamanho do range)
        template<class RandomIt1, class RandomIt2>
        constexpr //< since C++20
        bool equal(RandomIt1 first1, RandomIt1 last1, RandomIt2 first2, RandomIt2 last2,
                   std::random_access_iterator_tag, std::random_access_iterator_tag)
        {
            if (last1 - first1 != last2 - first2)
                return false;
    
            for (; first1 != last1; ++first1, ++first2)
                if (!(*first1 == *first2))
                    return false;
    
            return true;
        }
    
        // implementação de iterator de entrada (precisa comparar manualmente com “last2”)
        template<class InputIt1, class InputIt2>
        constexpr //< since C++20
        bool equal(InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2,
                   std::input_iterator_tag, std::input_iterator_tag)
        {
            for (; first1 != last1 && first2 != last2; ++first1, ++first2)
                if (!(*first1 == *first2))
                    return false;
    
            return first1 == last1 && first2 == last2;
        }
    }
    
    template<class InputIt1, class InputIt2>
    constexpr //< since C++20
    bool equal(InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2)
    {
        details::equal(first1, last1, first2, last2,
                       typename std::iterator_traits<InputIt1>::iterator_category(),
                       typename std::iterator_traits<InputIt2>::iterator_category());
    }
```

[equal (7)](<#/doc/algorithm/equal>)
```cpp
    namespace detail
    {
        // implementação de iterator de acesso aleatório (permite detecção rápida do tamanho do range)
        template<class RandomIt1, class RandomIt2, class BinaryPred>
        constexpr //< since C++20
        bool equal(RandomIt1 first1, RandomIt1 last1,
                   RandomIt2 first2, RandomIt2 last2, BinaryPred p,
                   std::random_access_iterator_tag, std::random_access_iterator_tag)
        {
            if (last1 - first1 != last2 - first2)
                return false;
    
            for (; first1 != last1; ++first1, ++first2)
                if (!p(*first1, *first2))
                    return false;
    
            return true;
        }
    
        // implementação de iterator de entrada (precisa comparar manualmente com “last2”)
        template<class InputIt1, class InputIt2, class BinaryPred>
        constexpr //< since C++20
        bool equal(InputIt1 first1, InputIt1 last1,
                   InputIt2 first2, InputIt2 last2, BinaryPred p,
                   std::input_iterator_tag, std::input_iterator_tag)
        {
            for (; first1 != last1 && first2 != last2; ++first1, ++first2)
                if (!p(*first1, *first2))
                    return false;
    
            return first1 == last1 && first2 == last2;
        }
    }
    
    template<class InputIt1, class InputIt2, class BinaryPred>
    constexpr //< since C++20
    bool equal(InputIt1 first1, InputIt1 last1,
               InputIt2 first2, InputIt2 last2, BinaryPred p)
    {
        details::equal(first1, last1, first2, last2, p,
                       typename std::iterator_traits<InputIt1>::iterator_category(),
                       typename std::iterator_traits<InputIt2>::iterator_category());
    }
```

### Observações

`std::equal` não deve ser usado para comparar os ranges formados pelos iterators de [std::unordered_set](<#/doc/container/unordered_set>), [std::unordered_multiset](<#/doc/container/unordered_multiset>), [std::unordered_map](<#/doc/container/unordered_map>), ou [std::unordered_multimap](<#/doc/container/unordered_multimap>) porque a ordem em que os elementos são armazenados nesses containers pode ser diferente mesmo que os dois containers armazenem os mesmos elementos.

Ao comparar containers inteiros ou string views (desde C++17) para igualdade, o operador== para o tipo correspondente é geralmente preferido.

O `std::equal` sequencial não tem garantia de ser *short-circuit*. Por exemplo, se o primeiro par de elementos de ambos os ranges não for igual, o restante dos elementos também pode ser comparado. A comparação não *short-circuit* pode ocorrer quando os ranges são comparados com [std::memcmp](<#/doc/string/byte/memcmp>) ou algoritmos vetorizados específicos da implementação.

### Exemplo

O código a seguir usa [`std::equal`](<#/doc/algorithm/equal>) para testar se uma string é um palíndromo.

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    constexpr bool is_palindrome(const std::string_view& s)
    {
        return std::equal(s.cbegin(), s.cbegin() + s.size() / 2, s.crbegin());
    }
    
    void test(const std::string_view& s)
    {
        std::cout << std::quoted(s)
                  << (is_palindrome(s) ? " is" : " is not")
                  << " a palindrome\n";
    }
    
    int main()
    {
        test("radar");
        test("hello");
    }
```

Saída:
```
    "radar" is a palindrome
    "hello" is not a palindrome
```

### Ver também

[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna `true` se um range é lexicograficamente menor que outro
(modelo de função)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(objeto de função de algoritmo)
[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(modelo de classe)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)