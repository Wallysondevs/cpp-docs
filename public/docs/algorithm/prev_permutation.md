# std::prev_permutation

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt >
bool prev_permutation( BidirIt first, BidirIt last );
template< class BidirIt, class Compare >
bool prev_permutation( BidirIt first, BidirIt last, Compare comp );
```

Transforma o range `[`first`, `last`)` na [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation") anterior. Retorna true se tal permutação existir, caso contrário, transforma o range na última permutação (como se por [std::sort](<#/doc/algorithm/sort>) seguido por [std::reverse](<#/doc/algorithm/reverse>)) e retorna false.

1) O conjunto de todas as permutações é ordenado lexicograficamente em relação a operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) O conjunto de todas as permutações é ordenado lexicograficamente em relação a comp.

Se o tipo de *first não for [Swappable](<#/doc/named_req/Swappable>)(até C++11)`BidirIt` não for [ValueSwappable](<#/doc/named_req/ValueSwappable>)(desde C++11), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a permutar
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` uma move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo BidirIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [ValueSwappable](<#/doc/named_req/ValueSwappable>) e [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Valor de retorno

true se a nova permutação preceder a antiga em ordem lexicográfica. false se a primeira permutação foi alcançada e o range foi redefinido para a última permutação.

### Exceções

Quaisquer exceções lançadas a partir de operações de iterator ou da troca de elementos.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) No máximo \\(\scriptsize \frac{N}{2}\\)N
---
2
trocas.

### Possível implementação
```cpp
    template<class BidirIt>
    bool prev_permutation(BidirIt first, BidirIt last)
    {
        if (first == last)
            return false;
        BidirIt i = last;
        if (first == --i)
            return false;
    
        while (1)
        {
            BidirIt i1, i2;
    
            i1 = i;
            if (*i1 < *--i)
            {
                i2 = last;
                while (!(*--i2 < *i))
                    ;
                std::iter_swap(i, i2);
                std::reverse(i1, last);
                return true;
            }
    
            if (i == first)
            {
                std::reverse(first, last);
                return false;
            }
        }
    }
```

---

### Notas

Em média, sobre toda a sequência de permutações, implementações típicas usam cerca de 3 comparações e 1.5 trocas por chamada.

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator satisfaz [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não-trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Exemplo

O código a seguir imprime todas as seis permutações da string "cab" em ordem inversa.

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s = "cab";
    
        do
        {
            std::cout << s << ' ';
        }
        while (std::prev_permutation(s.begin(), s.end()));
    
        std::cout << s << '\n';
    }
```

Saída:
```
    cab bca bac acb abc cba
```

### Veja também

[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(function template)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(function template)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(algorithm function object)