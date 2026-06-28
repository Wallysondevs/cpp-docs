# std::experimental::ranges::search

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< ForwardIterator I1, Sentinel<I1> S1,
ForwardIterator I2, Sentinel<I2> S2, class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
I1 search( I1 first1, S1 last1, I2 first2, S2 last2,
Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
template< ForwardRange R1, ForwardRange R2, class Pred = ranges::equal_to<>,
class Proj1 = ranges::identity, class Proj2 = ranges::identity >
requires IndirectlyComparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
ranges::safe_iterator_t<R1> search( R1&& r1, R2&& r2, Pred pred = Pred{},
Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{} );
```

  
1) Procura pela primeira ocorrência da sequência de elementos `[`first2`, `last2`)` no range `[`first1`, `last1`)`. Os elementos são comparados usando pred após serem projetados com proj2 e proj1, respectivamente.

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

Não obstante as declarações descritas acima, o número e a ordem reais dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável. 

### Parâmetros

first1, last1  |  \-  |  o range de elementos a examinar   
---|---|---
r1  |  \-  |  o range de elementos a examinar   
first2, last2  |  \-  |  o range de elementos a procurar   
r2  |  \-  |  o range de elementos a procurar   
pred  |  \-  |  predicado a aplicar aos elementos projetados   
proj1  |  \-  |  projeção a aplicar aos elementos no primeiro range   
proj2  |  \-  |  projeção a aplicar aos elementos no segundo range   
  
### Valor de retorno

Um iterator para o início da primeira ocorrência da sequência `[`first2`, `last2`)` no range `[`first1`, `last1`)`. Se `[`first2`, `last2`)` estiver vazio, first1 é retornado. Se nenhuma ocorrência for encontrada, um iterator que se compara igual a last1 é retornado. 

### Complexidade

No máximo `S * N` aplicações do predicado e de cada projeção, onde S = last2 - first2 e N = last1 - first1. 

### Possível implementação
```cpp
    template<ForwardIterator I1, Sentinel<I1> S1,
             ForwardIterator I2, Sentinel<I2> S2, class Pred = ranges::equal_to<>,
             class Proj1 = ranges::identity, class Proj2 = ranges::identity>
        requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
    I1 search(I1 first1, S1 last1, I2 first2, S2 last2,
              Pred pred = Pred{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{})
    {
        for (; ; ++first1)
        {
            I1 it = first1;
            for (I2 it2 = first2; ; (void)++it, (void)++it2)
            {
                if (it2 == last2)
                    return first1;
                if (it == last1)
                    return it;
                if (!ranges::invoke(pred, ranges::invoke(proj1, *it),
                                          ranges::invoke(proj2, *it2)))
                    break;
            }
        }
    }
```
  
---  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ search](<#/doc/algorithm/search>) |  procura pela primeira ocorrência de um range de elementos   
(modelo de função)  
[ find_end](<#/doc/experimental/ranges/algorithm/find_end>) |  encontra a última sequência de elementos em um determinado range   
(modelo de função)  
[ includes](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/includes&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/includes \(page does not exist\)") |  retorna true se um conjunto é um subconjunto de outro   
(modelo de função)  
[ equal](<#/doc/experimental/ranges/algorithm/equal>) |  determina se dois conjuntos de elementos são os mesmos   
(modelo de função)  
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) |  encontra o primeiro elemento que satisfaz critérios específicos   
(modelo de função)  
[ lexicographical_compare](<#/doc/experimental/ranges/algorithm/lexicographical_compare>) |  retorna true se um range é lexicograficamente menor que outro   
(modelo de função)  
[ mismatch](<#/doc/experimental/ranges/algorithm/mismatch>) |  encontra a primeira posição onde dois ranges diferem   
(modelo de função)  
[ search_n](<#/doc/experimental/ranges/algorithm/search_n>) |  procura por um número de cópias consecutivas de um elemento em um range   
(modelo de função)