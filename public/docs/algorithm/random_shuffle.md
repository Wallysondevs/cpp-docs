# std::random_shuffle, std::shuffle

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void random_shuffle( RandomIt first, RandomIt last );
(removido em C++17)
template< class RandomIt, class RandomFunc >
void random_shuffle( RandomIt first, RandomIt last, RandomFunc& r );
template< class RandomIt, class RandomFunc >
void random_shuffle( RandomIt first, RandomIt last, RandomFunc&& r );
(obsoleto desde C++14)
(removido em C++17)
template< class RandomIt, class URBG >
void shuffle( RandomIt first, RandomIt last, URBG&& g );
```

Reordena os elementos no dado range `[`first`, `last`)` de forma que cada permutação possível desses elementos tenha igual probabilidade de aparecer.

1) A fonte de aleatoriedade é definida pela implementação, mas a função [std::rand](<#/doc/numeric/random/rand>) é frequentemente usada.

2) A fonte de aleatoriedade é o objeto de função r.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * O tipo de retorno de r não é conversível para [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt&gt;::difference_type.
  * Dado um valor positivo n do tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt&gt;::difference_type, o resultado de r(n) não é um valor escolhido aleatoriamente no intervalo `[`​0​`, `n`)`.

3) A fonte de aleatoriedade é o objeto g.

Dado o tipo `T` como [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;URBG&gt;, se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `T` não é um [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>).

  * `T::result_type` não é conversível para [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt&gt;::difference_type.

| (até C++20)

Se o tipo de *first não for [Swappable](<#/doc/named_req/Swappable>)(até C++11)`RandomIt` não for [ValueSwappable](<#/doc/named_req/ValueSwappable>)(desde C++11), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos para embaralhar aleatoriamente
- **r** — objeto de função que retorna um valor escolhido aleatoriamente
- **g** — objeto gerador que retorna um valor escolhido aleatoriamente
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) - 1 trocas.

### Implementação possível

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4551>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L3066>).

[random_shuffle (1)](<#/doc/algorithm/random_shuffle>)
---
```cpp
    template<class RandomIt>
    void random_shuffle(RandomIt first, RandomIt last)
    {
        typedef typename std::iterator_traits<RandomIt>::difference_type diff_t;
    
        for (diff_t i = last - first - 1; i > 0; --i)
        {
            using std::swap;
            swap(first[i], first[std::rand() % (i + 1)]);
            // rand() % (i + 1) não está realmente correto, porque o número gerado não é
            // uniformemente distribuído para a maioria dos valores de i. O código correto seria
            // uma variação da implementação de std::uniform_int_distribution do C++11.
        }
    }
```

[random_shuffle (2)](<#/doc/algorithm/random_shuffle>)
```cpp
    template<class RandomIt, class RandomFunc>
    void random_shuffle(RandomIt first, RandomIt last, RandomFunc&& r)
    {
        typedef typename std::iterator_traits<RandomIt>::difference_type diff_t;
    
        for (diff_t i = last - first - 1; i > 0; --i)
        {
            using std::swap;
            swap(first[i], first[r(i + 1)]);
        }
    }
```

[shuffle (3)](<#/doc/algorithm/random_shuffle>)
```cpp
    template<class RandomIt, class URBG>
    void shuffle(RandomIt first, RandomIt last, URBG&& g)
    {
        typedef typename std::iterator_traits<RandomIt>::difference_type diff_t;
        typedef std::uniform_int_distribution<diff_t> distr_t;
        typedef typename distr_t::param_type param_t;
    
        distr_t D;
        for (diff_t i = last - first - 1; i > 0; --i)
        {
            using std::swap;
            swap(first[i], first[D(g, param_t(0, i))]);
        }
    }
```

### Observações

Note que a implementação não é ditada pelo padrão, então mesmo que você use exatamente o mesmo `RandomFunc` ou `URBG` (Gerador de Números Aleatórios Uniforme), você pode obter resultados diferentes com diferentes implementações da standard library.

A razão para remover `std::random_shuffle` em C++17 é que a versão somente com iterador geralmente depende de [std::rand](<#/doc/numeric/random/rand>), que agora também está sendo discutido para depreciação. ([std::rand](<#/doc/numeric/random/rand>) deve ser substituído pelas classes do cabeçalho [`<random>`](<#/doc/header/random>), pois [std::rand](<#/doc/numeric/random/rand>) é _considerado prejudicial_.) Além disso, a versão `std::random_shuffle` somente com iterador geralmente depende de um estado global. O algoritmo de embaralhamento de `std::shuffle` é o substituto preferido, pois usa um `URBG` como seu 3º parâmetro.

### Exemplo

Embaralha aleatoriamente a sequência `[`1`, `10`]` de inteiros:

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
        std::random_device rd;
        std::mt19937 g(rd());
    
        std::shuffle(v.begin(), v.end(), g);
    
        std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída possível:
```
    8 6 10 4 2 3 7 1 9 5
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 395](<https://cplusplus.github.io/LWG/issue395>) | C++98 | a fonte de aleatoriedade da sobrecarga (1) não foi especificada, e
[std::rand](<#/doc/numeric/random/rand>) não poderia ser a fonte devido ao requisito da biblioteca C | é definida pela implementação,
e o uso de [std::rand](<#/doc/numeric/random/rand>) é permitido
[LWG 552](<https://cplusplus.github.io/LWG/issue552>)
([N2423](<https://wg21.link/N2423>)) | C++98 | r não era exigido como a fonte
de aleatoriedade da sobrecarga (2)[1](<#/doc/algorithm/random_shuffle>) | exigido

1. [↑](<#/doc/algorithm/random_shuffle>) A sobrecarga (3) tem o mesmo defeito, mas essa parte da resolução não é aplicável ao C++98.

### Veja também

[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(objeto de função de algoritmo)