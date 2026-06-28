# std::equal_range

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
std::pair<ForwardIt, ForwardIt>
equal_range( ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr std::pair<ForwardIt, ForwardIt>
equal_range( ForwardIt first, ForwardIt last, const T& value );
template< class ForwardIt, class T, class Compare >
std::pair<ForwardIt, ForwardIt>
equal_range( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type,
class Compare >
constexpr std::pair<ForwardIt, ForwardIt>
equal_range( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
```

Retorna um range contendo todos os elementos equivalentes a value no range particionado `[`first`, `last`)`.

1) A equivalência é verificada usando operator<: Retorna os resultados de [std::lower_bound](<#/doc/algorithm/lower_bound>)(first, last, value) e [std::upper_bound](<#/doc/algorithm/upper_bound>)(first, last, value). Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para qualquer elemento elem de `[`first`, `last`)`, bool(elem < value) não implica !bool(value < elem).
  * Os elementos elem de `[`first`, `last`)` não estão [particionados](<#/doc/algorithm>) em relação às expressões bool(elem < value) e !bool(value < elem).

| (até C++20)
---|---
Equivalente a std::equal_range(first, last, value, [std::less](<#/doc/utility/functional/less>){}). | (desde C++20)

2) A equivalência é verificada usando comp:

Retorna os resultados de [std::lower_bound](<#/doc/algorithm/lower_bound>)(first, last, value, comp) e [std::upper_bound](<#/doc/algorithm/upper_bound>)(first, last, value, comp).

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para qualquer elemento elem de `[`first`, `last`)`, bool(comp(elem, value)) não implica !bool(comp(value, elem)).
  * Os elementos elem de `[`first`, `last`)` não estão [particionados](<#/doc/algorithm>) em relação às expressões bool(comp(elem, value)) e !bool(comp(value, elem)).

### Parâmetros

- **first, last** — o range particionado de elementos a examinar
- **value** — valor para comparar os elementos
- **comp** — predicado binário que retorna true se o primeiro argumento for ordenado antes do segundo.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo T possa ser implicitamente convertido para Type1 e Type2, e um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para Type1 e Type2. ​

Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>). Não é exigido que satisfaça [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Um [std::pair](<#/doc/utility/pair>) contendo um par de iteradores, onde

  * `first` é um iterador para o primeiro elemento do range `[`first`, `last`)` não ordenado antes de value (ou last se nenhum elemento for encontrado), e
  * `second` é um iterador para o primeiro elemento do range `[`first`, `last`)` ordenado após value (ou last se nenhum elemento for encontrado).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize 2\log_{2}(N)+O(1)\\)2log2(N)+O(1) comparações com value usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize 2\log_{2}(N)+O(1)\\)2log2(N)+O(1) aplicações do comparador comp.

No entanto, se `ForwardIt` não for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o número de incrementos do iterador é linear em \\(\scriptsize N\\)N. Notavelmente, os iteradores de [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>) não são de acesso aleatório, e portanto suas funções membro [std::set::equal_range](<#/doc/container/set/equal_range>) (respectivamente [std::multiset::equal_range](<#/doc/container/multiset/equal_range>)) devem ser preferidas.

### Observações

Embora `std::equal_range` exija apenas que `[`first`, `last`)` seja particionado, este algoritmo é geralmente usado no caso em que `[`first`, `last`)` está ordenado, para que a busca binária seja válida para qualquer valor.

Além dos requisitos de [std::lower_bound](<#/doc/algorithm/lower_bound>) e [std::upper_bound](<#/doc/algorithm/upper_bound>), `std::equal_range` também exige que operator< ou comp sejam assimétricos (ou seja, a < b e b < a sempre têm resultados diferentes).

Portanto, os resultados intermediários da busca binária podem ser compartilhados por [std::lower_bound](<#/doc/algorithm/lower_bound>) e [std::upper_bound](<#/doc/algorithm/upper_bound>). Por exemplo, o resultado da chamada [std::lower_bound](<#/doc/algorithm/lower_bound>) pode ser usado como o argumento de `first` na chamada [std::upper_bound](<#/doc/algorithm/upper_bound>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/equal_range>))

### Possível implementação

[equal_range (1)](<#/doc/algorithm/equal_range>)
---
```cpp
    template<class ForwardIt,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    constexpr std::pair<ForwardIt, ForwardIt>
        equal_range(ForwardIt first, ForwardIt last, const T& value)
    {
        return std::equal_range(first, last, value, std::less{});
    }
```

[equal_range (2)](<#/doc/algorithm/equal_range>)
```cpp
    template<class ForwardIt,
             class T = typename std::iterator_traits<ForwardIt>::value_type,
             class Compare>
    constexpr std::pair<ForwardIt, ForwardIt>
        equal_range(ForwardIt first, ForwardIt last, const T& value, Compare comp)
    {
        return std::make_pair(std::lower_bound(first, last, value, comp),
                              std::upper_bound(first, last, value, comp));
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    struct S
    {
        int number;
        char name;
        // note: name is ignored by this comparison operator
        bool operator<(const S& s) const { return number < s.number; }
    };
    
    struct Comp
    {
        bool operator()(const S& s, int i) const { return s.number < i; }
        bool operator()(int i, const S& s) const { return i < s.number; }
    };
    
    int main()
    {
        // note: not ordered, only partitioned w.r.t. S defined below
        const std::vector<S> vec{{1, 'A'}, {2, 'B'}, {2, 'C'},
                                 {2, 'D'}, {4, 'G'}, {3, 'F'}};
        const S value{2, '?'};
    
        std::cout << "Compare using S::operator<(): ";
        const auto p = std::equal_range(vec.begin(), vec.end(), value);
    
        for (auto it = p.first; it != p.second; ++it)
            std::cout << it->name << ' ';
        std::cout << '\n';
    
        std::cout << "Using heterogeneous comparison: ";
        const auto p2 = std::equal_range(vec.begin(), vec.end(), 2, Comp{});
    
        for (auto it = p2.first; it != p2.second; ++it)
            std::cout << it->name << ' ';
        std::cout << '\n';
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}, {3, 1}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto p3 = std::equal_range(nums.cbegin(), nums.cend(), {2, 0}, cmpz);
        #else
            auto p3 = std::equal_range(nums.cbegin(), nums.cend(), CD{2, 0}, cmpz);
        #endif
    
        for (auto it = p3.first; it != p3.second; ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    Compare using S::operator<(): B C D
    Using heterogeneous comparison: B C D
    (2,2) (2, 1)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 270](<https://cplusplus.github.io/LWG/issue270>) | C++98 | `Compare` era exigido para satisfazer [Compare](<#/doc/named_req/Compare>) e `T` era exigido para ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) (ordenação fraca estrita exigida) | apenas um particionamento é exigido; comparações heterogêneas permitidas
[LWG 384](<https://cplusplus.github.io/LWG/issue384>) | C++98 | no máximo \\(\scriptsize 2\log_{2}(N)+1\\)2log2(N)+1 comparações eram permitidas, o que não é implementável[1](<#/doc/algorithm/equal_range>) | corrigido para \\(\scriptsize 2\log_{2}(N)+O(1)\\)2log2(N)+O(1)

1. [↑](<#/doc/algorithm/equal_range>) Aplicar `equal_range` a um range de um único elemento requer 2 comparações, mas no máximo 1 comparação é permitida pelo requisito de complexidade.

### Veja também

[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterador para o primeiro elemento _não menor_ que o valor dado (modelo de função)
---|---
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterador para o primeiro elemento _maior_ que um certo valor (modelo de função)
[ binary_search](<#/doc/algorithm/binary_search>) | determina se um elemento existe em um range parcialmente ordenado (modelo de função)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos (modelo de função)
[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos (modelo de função)
[ equal_range](<#/doc/container/set/equal_range>) | retorna range de elementos que correspondem a uma chave específica (função membro pública de `std::set<Key,Compare,Allocator>`)
[ equal_range](<#/doc/container/multiset/equal_range>) | retorna range de elementos que correspondem a uma chave específica (função membro pública de `std::multiset<Key,Compare,Allocator>`)
[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna range de elementos que correspondem a uma chave específica (objeto de função de algoritmo)