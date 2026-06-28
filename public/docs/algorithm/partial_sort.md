# std::partial_sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void partial_sort( RandomIt first, RandomIt middle, RandomIt last );
template< class ExecutionPolicy, class RandomIt >
void partial_sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt middle, RandomIt last );
template< class RandomIt, class Compare >
void partial_sort( RandomIt first, RandomIt middle, RandomIt last,
Compare comp );
template< class ExecutionPolicy, class RandomIt, class Compare >
void partial_sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt middle, RandomIt last,
Compare comp );
```

Reorganiza os elementos de forma que o range `[`first`, `middle`)` contenha os `middle − first` menores elementos ordenados no range `[`first`, `last`)`.

A ordem de elementos iguais não é garantida de ser preservada. A ordem dos elementos restantes no range `[`middle`, `last`)` é não especificada.

1) Os elementos são [ordenados](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Os elementos são ordenados em relação a `comp`.

2,4) O mesmo que (1,3), mas executado de acordo com a `policy`.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `middle`)` ou `[`middle`, `last`)` não é um [range válido](<#/doc/iterator>).

  * O tipo de `*first` não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de `*first` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de `*first` não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — iteradores de acesso aleatório que definem o range
- **middle** — iterador de acesso aleatório que define o iterador um-depois-do-final do range a ser ordenado
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento é _menor_ que (ou seja, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `RandomIt` possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize M\\)M como `middle - first`, \\(\scriptsize N\\)N como `last - first`:

1,2) Aproximadamente \\(\scriptsize N \cdot \log(M)\\)N·log(M) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) Aproximadamente \\(\scriptsize N \cdot \log(M)\\)N·log(M) aplicações do comparador `comp`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1915>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L5025>).

[partial_sort (1)](<#/doc/algorithm/partial_sort>)
---
```cpp
    template<typename RandomIt>
    constexpr //< since C++20
    void partial_sort(RandomIt first, RandomIt middle, RandomIt last)
    {
        typedef typename std::iterator_traits<RandomIt>::value_type VT;
        std::partial_sort(first, middle, last, std::less<VT>());
    }
```

[partial_sort (3)](<#/doc/algorithm/partial_sort>)
```cpp
    namespace impl
    {
        template<typename RandomIt, typename Compare>
        constexpr //< since C++20
        void sift_down(RandomIt first, RandomIt last, const Compare& comp)
        {
            // sift down element at “first”
            const auto length = static_cast<std::size_t>(last - first);
            std::size_t current = 0;
            std::size_t next = 2;
            while (next < length)
            {
                if (comp(*(first + next), *(first + (next - 1))))
                    --next;
                if (!comp(*(first + current), *(first + next)))
                    return;
                std::iter_swap(first + current, first + next);
                current = next;
                next = 2 * current + 2;
            }
            --next;
            if (next < length && comp(*(first + current), *(first + next)))
                std::iter_swap(first + current, first + next);
        }
    
        template<typename RandomIt, typename Compare>
        constexpr //< since C++20
        void heap_select(RandomIt first, RandomIt middle, RandomIt last, const Compare& comp)
        {
            std::make_heap(first, middle, comp);
            for (auto i = middle; i != last; ++i)
            {
                if (comp(*i, *first))
                {
                    std::iter_swap(first, i);
                    sift_down(first, middle, comp);
                }
            }
        }
    } // namespace impl
    
    template<typename RandomIt, typename Compare>
    constexpr //< since C++20
    void partial_sort(RandomIt first, RandomIt middle, RandomIt last, Compare comp)
    {
        impl::heap_select(first, middle, last, comp);
        std::sort_heap(first, middle, comp);
    }
```

### Notas

#### Algoritmo

O algoritmo usado é tipicamente _heap select_ para selecionar os menores elementos, e _heap sort_ para ordenar os elementos selecionados no heap em ordem crescente.

Para selecionar elementos, um heap é usado (veja [heap](<https://en.wikipedia.org/wiki/Heap_\(data_structure\)#Applications> "enwiki:Heap \(data structure\)")). Por exemplo, para `operator<` como função de comparação, um _max-heap_ é usado para selecionar os `middle − first` menores elementos.

[Heap sort](<https://en.wikipedia.org/wiki/Heapsort> "enwiki:Heapsort") é usado após a seleção para ordenar os elementos selecionados `[`first`, `middle`)` (veja [std::sort_heap](<#/doc/algorithm/sort_heap>)).

#### Uso pretendido

Os algoritmos `std::partial_sort` são destinados a serem usados para _pequenos números constantes_ de elementos selecionados em `[`first`, `middle`)`.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iostream>
    
    void print(const auto& s, int middle)
    {
        for (int a : s)
            std::cout << a << ' ';
        std::cout << '\n';
        if (middle > 0)
        {
            while (middle-- > 0)
                std::cout << "--";
            std::cout << '^';
        }
        else if (middle < 0)
        {
            for (auto i = s.size() + middle; --i; std::cout << "  ")
            {}
    
            for (std::cout << '^'; middle++ < 0; std::cout << "--")
            {}
        }
        std::cout << '\n';
    };
    
    int main()
    {
        std::array<int, 10> s{5, 7, 4, 2, 8, 6, 1, 9, 0, 3};
        print(s, 0);
        std::partial_sort(s.begin(), s.begin() + 3, s.end());
        print(s, 3);
        std::partial_sort(s.rbegin(), s.rbegin() + 4, s.rend());
        print(s, -4);
        std::partial_sort(s.rbegin(), s.rbegin() + 5, s.rend(), std::greater{});
        print(s, -5);
    }
```

Saída possível:
```
    5 7 4 2 8 6 1 9 0 3
    
    0 1 2 7 8 6 5 9 4 3
    ------^
    4 5 6 7 8 9 3 2 1 0
              ^--------
    4 3 2 1 0 5 6 7 8 9
            ^----------
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P0896R4](<https://wg21.link/P0896R4>) | C++98 | `[`first`, `middle`)` e `[`middle`, `last`)` não eram obrigados a ser ranges válidos | o comportamento é indefinido se qualquer um deles for inválido

### Veja também

[ nth_element](<#/doc/algorithm/nth_element>) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(function template)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(function template)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(function template)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(function template)
[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(algorithm function object)