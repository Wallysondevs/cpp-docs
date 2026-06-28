# std::is_permutation

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt1, class ForwardIt2 >
bool is_permutation( ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2 );
(constexpr desde C++20)
template< class ForwardIt1, class ForwardIt2,
class BinaryPredicate >
bool is_permutation( ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, BinaryPredicate p );
(constexpr desde C++20)
template< class ForwardIt1, class ForwardIt2 >
bool is_permutation( ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2 );
(constexpr desde C++20)
template< class ForwardIt1, class ForwardIt2,
class BinaryPredicate >
bool is_permutation( ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
BinaryPredicate p );
(constexpr desde C++20)
```

Verifica se `[`first1`, `last1`)` é uma [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation") de um range começando em first2:

*   Para as sobrecargas (1,2), o segundo range possui [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos.
*   Para as sobrecargas (3,4), o segundo range é `[`first2`, `last2`)`.

1,3) Os elementos são comparados usando operator==.

2,4) Os elementos são comparados usando o predicado binário p fornecido.

Se `ForwardIt1` e `ForwardIt2` tiverem [tipos de valor](<#/doc/iterator>) diferentes, o programa é malformado.

Se a função de comparação não for uma [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki:equivalence relation"), o comportamento é indefinido.

### Parâmetros

- **first1, last1** — o range de elementos a comparar
- **first2, last2** — o segundo range a comparar
- **p** — predicado binário que retorna ​true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2 respectivamente. ​
Requisitos de tipo
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

true se o range `[`first1`, `last1`)` é uma permutação do range `[`first2`, `last2`)`, false caso contrário.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first1, last1):

1) Exatamente \\(\scriptsize N\\)N comparações usando operator== se os dois ranges forem iguais, caso contrário \\(\scriptsize O(N^2)\\)O(N2 ) comparações no pior caso.

2) Exatamente \\(\scriptsize N\\)N aplicações do predicado p se os dois ranges forem iguais, caso contrário \\(\scriptsize O(N^2)\\)O(N2 ) aplicações no pior caso.

3,4) Se `ForwardIt1` e `ForwardIt2` forem ambos [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), e last1 - first1 != last2 - first2 for true, nenhuma comparação será feita.

Caso contrário:

3) Exatamente \\(\scriptsize N\\)N comparações usando operator== se os dois ranges forem iguais, caso contrário \\(\scriptsize O(N^2)\\)O(N2 ) comparações no pior caso.

4) Exatamente \\(\scriptsize N\\)N aplicações do predicado p se os dois ranges forem iguais, caso contrário \\(\scriptsize O(N^2)\\)O(N2 ) aplicações no pior caso.

### Possível implementação
```cpp
    template<class ForwardIt1, class ForwardIt2>
    bool is_permutation(ForwardIt1 first, ForwardIt1 last,
                        ForwardIt2 d_first)
    {
        // pula prefixo comum
        std::tie(first, d_first) = std::mismatch(first, last, d_first);
    
        // itera sobre o restante, contando quantas vezes cada elemento
        // de [first, last) aparece em [d_first, d_last)
        if (first != last)
        {
            ForwardIt2 d_last = std::next(d_first, std::distance(first, last));
            for (ForwardIt1 i = first; i != last; ++i)
            {
                if (i != std::find(first, i, *i))
                    continue; // este *i já foi verificado
    
                auto m = std::count(d_first, d_last, *i);
                if (m == 0 || std::count(i, last, *i) != m)
                    return false;
            }
        }
        return true;
    }
```

---

### Nota

O `std::is_permutation` pode ser usado em _testes_, ou seja, para verificar a correção de algoritmos de rearranjo (por exemplo, ordenação, embaralhamento, particionamento). Se `x` é um range original e `y` é um range _permutado_, então std::is_permutation(x, y) == true significa que `y` consiste nos _"mesmos"_ elementos, talvez permanecendo em outras posições.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    
    template<typename Os, typename V>
    Os& operator<<(Os& os, const V& v)
    {
        os << "{ ";
        for (const auto& e : v)
            os << e << ' ';
        return os << '}';
    }
    
    int main()
    {
        static constexpr auto v1 = {1, 2, 3, 4, 5};
        static constexpr auto v2 = {3, 5, 4, 1, 2};
        static constexpr auto v3 = {3, 5, 4, 1, 1};
    
        std::cout << v2 << " is a permutation of " << v1 << ": " << std::boolalpha
                  << std::is_permutation(v1.begin(), v1.end(), v2.begin()) << '\n'
                  << v3 << " is a permutation of " << v1 << ": "
                  << std::is_permutation(v1.begin(), v1.end(), v3.begin()) << '\n';
    }
```

Saída:
```
    { 3 5 4 1 2 } is a permutation of { 1 2 3 4 5 }: true
    { 3 5 4 1 1 } is a permutation of { 1 2 3 4 5 }: false
```

### Veja também

[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ equivalence_relation](<#/doc/concepts/equivalence_relation>)(C++20) | especifica que uma [`relation`](<#/doc/concepts/relation>) impõe uma relação de equivalência
(concept)
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(C++20) | determina se uma sequência é uma permutação de outra sequência
(objeto de função de algoritmo)
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão