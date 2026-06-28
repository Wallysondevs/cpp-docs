# std::next_permutation

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt >
bool next_permutation( BidirIt first, BidirIt last );
template< class BidirIt, class Compare >
bool next_permutation( BidirIt first, BidirIt last, Compare comp );
```

Permuta o range `[`first`, `last`)` para a próxima [permutação](<https://en.wikipedia.org/wiki/permutation> "enwiki:permutation"). Retorna true se tal "próxima permutação" existir; caso contrário, transforma o range na primeira permutação lexicográfica (como se por [std::sort](<#/doc/algorithm/sort>)) e retorna false.

1) O conjunto de todas as permutações é ordenado lexicograficamente em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) O conjunto de todas as permutações é ordenado lexicograficamente em relação a comp.

Se o tipo de *first não for [Swappable](<#/doc/named_req/Swappable>)(até C++11)`BidirIt` não for [ValueSwappable](<#/doc/named_req/ValueSwappable>)(desde C++11), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a permutar
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2`, independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo BidirIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Valor de retorno

true se a nova permutação for lexicograficamente maior que a antiga. false se a última permutação foi alcançada e o range foi redefinido para a primeira permutação.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) No máximo \\(\scriptsize \frac{N}{2}\\)N
---
2
trocas.

### Exceções

Quaisquer exceções lançadas por operações de iterator ou pela troca de elementos.

### Possível implementação
```cpp
    template<class BidirIt>
    bool next_permutation(BidirIt first, BidirIt last)
    {
        auto r_first = std::make_reverse_iterator(last);
        auto r_last = std::make_reverse_iterator(first);
        auto left = std::is_sorted_until(r_first, r_last);
    
        if (left != r_last)
        {
            auto right = std::upper_bound(r_first, left, *left);
            std::iter_swap(left, right);
        }
    
        std::reverse(left.base(), last);
        return left != r_last;
    }
```

---

### Notas

Em média, sobre toda a sequência de permutações, implementações típicas usam cerca de 3 comparações e 1.5 trocas por chamada.

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator satisfaz [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Exemplo

O código a seguir imprime todas as três permutações da string "aba".

Rodar este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s = "aba";
    
        do
        {
            std::cout << s << '\n';
        }
        while (std::next_permutation(s.begin(), s.end()));
    
        std::cout << s << '\n';
    }
```

Saída:
```
    aba
    baa
    aab
```

### Veja também

[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(function template)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(function template)
[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(algorithm function object)