# std::experimental::ranges::find_end

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2,
class Proj = ranges::identity,
IndirectRelation<I2, projected<I1, Proj>> Pred = ranges::equal_to<> >
I1 find_end( I1 first1, S1 last1, I2 first2, S2 last2,
Pred pred = Pred{}, Proj proj = Proj{} );
template< ForwardRange R1, ForwardRange R2, class Proj = ranges::identity,
IndirectRelation<ranges::iterator_t<R2>,
projected<ranges::iterator_t<R1>, Proj>> Pred = ranges::equal_to<> >
ranges::safe_iterator_t<R1> find_end( Rng1&& rng1, Rng2&& rng2,
Pred pred = Pred{}, Proj proj = Proj{} );
```

1) Procura pela última ocorrência da sequência `[`first2`, `last2`)` no range `[`first1`, `last1`)` (após projeção com proj).

2) O mesmo que (1), mas usa r1 como o primeiro range de origem e r2 como o segundo range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

Não obstante as declarações apresentadas acima, o número e a ordem reais dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first1, last1** — o range de elementos a examinar
- **r1** — o range de elementos a examinar
- **first2, last2** — o range de elementos a procurar
- **r2** — o range de elementos a procurar
- **pred** — predicado para comparar os elementos
- **proj** — projeção a aplicar aos elementos no primeiro range

### Valor de retorno

Um iterator para o início da última ocorrência da sequência `[`first2`, `last2`)` no range `[`first1`, `last1`)` (após projeção com proj).

Se `[`first2`, `last2`)` estiver vazio ou se nenhuma sequência for encontrada, um iterator que se compara como igual a last1 é retornado.

### Complexidade

No máximo `S * (N - S + 1)` aplicações do predicado e da projeção, onde S = last2 - first2 e N = last1 - first1.

### Notas

A projeção é aplicada apenas ao range `[`first1`, `last1`)`.

### Possível implementação
```cpp
    template<ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2,
             class Proj = ranges::identity,
             IndirectRelation<I2, projected<I1, Proj>> Pred = ranges::equal_to<>>
    I1 find_end(I1 first1, S1 last1, I2 first2, S2 last2,
                Pred pred = Pred{}, Proj proj = Proj{})
    {
        I1 result = ranges::next(first1, last1);
        if (first2 == last2)
            return result;
        while (true)
        {
            I1 new_result = ranges::search(first1, last1, first2, last2, pred, proj);
            if (new_result == last1)
                break;
            else
            {
                result = new_result;
                first1 = result;
                ++first1;
            }
        }
        return result;
    }
```

---

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ search](<#/doc/experimental/ranges/algorithm/search>) | procura por um range de elementos
(modelo de função)
[ includes](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/includes&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/includes \(page does not exist\)") | retorna true se um conjunto é um subconjunto de outro
(modelo de função)
[ adjacent_find](<#/doc/experimental/ranges/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ find_first_of](<#/doc/experimental/ranges/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(modelo de função)
[ search_n](<#/doc/experimental/ranges/algorithm/search_n>) | procura por um número de cópias consecutivas de um elemento em um range
(modelo de função)