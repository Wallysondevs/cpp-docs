# std::ranges::equal_range

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr ranges::subrange<I> equal_range( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr ranges::subrange<I> equal_range( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_subrange_t<R>
equal_range( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_subrange_t<R>
equal_range( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
```

1) Retorna uma view contendo todos os elementos equivalentes a value no range `[`first`, `last`)`.

O range `[`first`, `last`)` deve ser pelo menos parcialmente ordenado em relação a value, ou seja, deve satisfazer todos os seguintes requisitos:

  * particionado em relação a element < value ou comp(element, value) (isto é, todos os elementos para os quais a expressão é verdadeira precedem todos os elementos para os quais a expressão é falsa).
  * particionado em relação a !(value < element) ou !comp(value, element).
  * para todos os elementos, se element < value ou comp(element, value) for verdadeiro, então !(value < element) ou !comp(value, element) também é verdadeiro.

Um range totalmente ordenado atende a esses critérios.

A view retornada é construída a partir de dois iterators, um apontando para o primeiro elemento que _não é menor_ que value e outro apontando para o primeiro elemento _maior_ que value. O primeiro iterator pode ser obtido alternativamente com std::ranges::lower_bound(), o segundo - com std::ranges::upper_bound().

2) O mesmo que (1), mas usa r como o range de origem, como se estivesse usando o range [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **value** — valor para comparar os elementos
- **comp** — se o primeiro argumento é _menor_ que (isto é, é ordenado antes) o segundo
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

[std::ranges::subrange](<#/doc/ranges/subrange>) contendo um par de iterators que definem o range desejado, o primeiro apontando para o primeiro elemento que _não é menor_ que value e o segundo apontando para o primeiro elemento _maior_ que value.

Se não houver elementos _não menores_ que value, o último iterator (iterator que é igual a last ou [ranges::end](<#/doc/ranges/end>)(r)) é retornado como o primeiro elemento. Similarmente, se não houver elementos _maiores_ que value, o último iterator é retornado como o segundo elemento.

### Complexidade

O número de comparações realizadas é logarítmico na distância entre first e last (no máximo 2 * log2(last - first) + O(1) comparações). No entanto, para um iterator que não modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>), o número de incrementos do iterator é linear.

### Possível implementação
```cpp
    struct equal_range_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity, class T = std::projected_value_t<I, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<I, Proj>> Comp = ranges::less>
        constexpr ranges::subrange<I>
            operator()(I first, S last, const T& value, Comp comp = {}, Proj proj = {}) const
        {
            return ranges::subrange
            (
                ranges::lower_bound(first, last, value, std::ref(comp), std::ref(proj)),
                ranges::upper_bound(first, last, value, std::ref(comp), std::ref(proj))
            );
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<ranges::iterator_t<R>,
                                               Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, const T& value, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value,
                           std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr equal_range_fn equal_range;
```

---

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | Inicialização por lista para algoritmos ([1,2](<#/doc/algorithm/ranges/equal_range>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <compare>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    struct S
    {
        int number {};
        char name {};
        // note: name is ignored by these comparison operators
        friend bool operator== (const S s1, const S s2) { return s1.number == s2.number; }
        friend auto operator<=>(const S s1, const S s2) { return s1.number <=> s2.number; }
        friend std::ostream& operator<<(std::ostream& os, S o)
        {
            return os << '{' << o.number << ", '" << o.name << "'}";
        }
    };
    
    void println(auto rem, const auto& v)
    {
        for (std::cout << rem; const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        // note: not ordered, only partitioned w.r.t. S defined below
        std::vector<S> vec
        {
            {1,'A'}, {2,'B'}, {2,'C'}, {2,'D'}, {4, 'D'}, {4,'G'}, {3,'F'}
        };
    
        const S value{2, '?'};
    
        namespace ranges = std::ranges;
    
        auto a = ranges::equal_range(vec, value);
        println("1. ", a);
    
        auto b = ranges::equal_range(vec.begin(), vec.end(), value);
        println("2. ", b);
    
        auto c = ranges::equal_range(vec, 'D', ranges::less {}, &S::name);
        println("3. ", c);
    
        auto d = ranges::equal_range(vec.begin(), vec.end(), 'D', ranges::less {}, &S::name);
        println("4. ", d);
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}, {3, 1}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto p3 = ranges::equal_range(nums, {2, 0}, cmpz);
        #else
            auto p3 = ranges::equal_range(nums, CD{2, 0}, cmpz);
        #endif
        println("5. ", p3);
    }
```

Saída:
```
    1. {2, 'B'} {2, 'C'} {2, 'D'}
    2. {2, 'B'} {2, 'C'} {2, 'D'}
    3. {2, 'D'} {4, 'D'}
    4. {2, 'D'} {4, 'D'}
    5. (2,2) (2,1)
```

### Veja também

[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(objeto de função de algoritmo)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(objeto de função de algoritmo)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(objeto de função de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(objeto de função de algoritmo)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna o range de elementos que correspondem a uma chave específica
(template de função)