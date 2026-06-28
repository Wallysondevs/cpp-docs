# std::ranges::remove, std::ranges::remove_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::permutable I, std::sentinel_for<I> S,
class T, class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr ranges::subrange<I>
remove( I first, S last, const T& value, Proj proj = {} );
(até C++26)
template< std::permutable I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr ranges::subrange<I>
remove( I first, S last, const T& value, Proj proj = {} );
template< ranges::forward_range R,
class T, class Proj = std::identity >
requires std::permutable<ranges::iterator_t<R>> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_subrange_t<R>
remove( R&& r, const T& value, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::permutable<ranges::iterator_t<R>> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::borrowed_subrange_t<R>
remove( R&& r, const T& value, Proj proj = {} );
template< std::permutable I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr ranges::subrange<I>
remove_if( I first, S last, Pred pred, Proj proj = {} );
template< ranges::forward_range R,
class Proj = std::identity,
std::indirect_unary_predicate
<std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
remove_if( R&& r, Pred pred, Proj proj = {} );
```

Remove todos os elementos que satisfazem critérios específicos do range `[`first`, `last`)` e retorna um subrange `[`ret`, `last`)`, onde ret é um iterator past-the-end para o novo final do range.

1) Remove todos os elementos que são iguais a value, usando [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i) == value para comparar.

3) Remove todos os elementos para os quais [std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) retorna true.

2,4) O mesmo que (1,3), mas usa r como o range, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

A remoção é feita deslocando (por meio de move assignment) os elementos no range de tal forma que os elementos que não devem ser removidos apareçam no início do range. A ordem relativa dos elementos que permanecem é preservada e o tamanho _físico_ do container permanece inalterado. Iterators apontando para um elemento entre o novo final _lógico_ e o final _físico_ do range ainda são dereferenciáveis, mas os próprios elementos têm valores não especificados (conforme a pós-condição de [MoveAssignable](<#/doc/named_req/MoveAssignable>)).

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first, last | \- | o range de elementos a processar
---|---|---
r | \- | o range de elementos a processar
value | \- | o valor dos elementos a remover
pred | \- | predicado a aplicar aos elementos projetados
proj | \- | projeção a aplicar aos elementos

### Valor de retorno

{ret, last}, onde `[`first`, `ret`)` é o subrange resultante após a remoção, e os elementos no subrange `[`ret`, `last`)` estão todos em um estado válido, mas não especificado, ou seja, `[`ret`, `last`)` é o subrange a ser apagado.

### Complexidade

Exatamente N aplicações do predicado correspondente e de qualquer projeção, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), e N - 1 operações de move no pior caso.

### Notas

Uma chamada para `ranges::remove` é tipicamente seguida por uma chamada para a função membro `erase` de um container, que apaga os valores não especificados e reduz o tamanho _físico_ do container para corresponder ao seu novo tamanho _lógico_. Essas duas invocações juntas constituem o chamado [idioma Erase-remove](<https://en.wikipedia.org/wiki/Erase-remove_idiom> "enwiki:Erase-remove idiom"), que pode ser alcançado pela função livre [std::erase](<#/doc/container/vector/erase2>) que possui [sobrecargas](<#/doc/container>) para todos os containers de _sequência_ padrão, ou [std::erase_if](<#/doc/container/vector/erase2>) que possui [sobrecargas](<#/doc/container>) para _todos_ os containers padrão.

As [funções membro](<#/doc/container>) de container com nomes semelhantes [`list::remove`](<#/doc/container/list/remove>), [`list::remove_if`](<#/doc/container/list/remove>), [`forward_list::remove`](<#/doc/container/forward_list/remove>) e [`forward_list::remove_if`](<#/doc/container/forward_list/remove>) apagam os elementos removidos.

Esses algoritmos geralmente não podem ser usados com containers associativos como [std::set](<#/doc/container/set>) e [std::map](<#/doc/container/map>) porque seus tipos de iterator não desreferenciam para tipos [MoveAssignable](<#/doc/named_req/MoveAssignable>) (as chaves nesses containers não são modificáveis).

Como `ranges::remove` recebe value por referência, ele pode ter um comportamento inesperado se for uma referência a um elemento do range `[`first`, `last`)`.

### Implementação possível

[remove](<#/doc/algorithm/ranges/remove>)
---
```cpp
    struct remove_fn
    {
        template<std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>>
        requires std::indirect_binary_predicate
                     <ranges::equal_to, std::projected<I, Proj>, const T*>
        constexpr ranges::subrange<I>
            operator()(I first, S last, const T& value, Proj proj = {}) const
        {
            first = ranges::find(std::move(first), last, value, proj);
            if (first != last)
            {
                for (I i{std::next(first)}; i != last; ++i)
                    if (value != std::invoke(proj, *i))
                    {
                        *first = ranges::iter_move(i);
                        ++first;
                    }
            }
            return {first, last};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>>
        requires std::permutable<ranges::iterator_t<R>> &&
                 std::indirect_binary_predicate
                     <ranges::equal_to,
                      std::projected<ranges::iterator_t<R>, Proj>, const T*>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, const T& value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value, std::move(proj));
        }
    };
    
    inline constexpr remove_fn remove {};
```

[remove_if](<#/doc/algorithm/ranges/remove>)
```cpp
    struct remove_if_fn
    {
        template<std::permutable I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr ranges::subrange<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            first = ranges::find_if(std::move(first), last, pred, proj);
            if (first != last)
            {
                for (I i{std::next(first)}; i != last; ++i)
                    if (!std::invoke(pred, std::invoke(proj, *i)))
                    {
                        *first = ranges::iter_move(i);
                        ++first;
                    }
            }
            return {first, last};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), pred, std::move(proj));
        }
    };
    
    inline constexpr remove_if_fn remove_if {};
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/remove>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <cctype>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        std::string v1{"No - Diagnostic - Required"};
        std::cout << std::quoted(v1) << " (v1, size: " << v1.size() << ")\n";
        const auto ret = std::ranges::remove(v1, ' ');
        std::cout << std::quoted(v1) << " (v1 after `remove`, size: " << v1.size() << ")\n";
        std::cout << ' ' << std::string(std::distance(v1.begin(), ret.begin()), '^') << '\n';
        v1.erase(ret.begin(), ret.end());
        std::cout << std::quoted(v1) << " (v1 after `erase`, size: " << v1.size() << ")\n\n";
    
        // remove_if with custom unary predicate:
        auto rm =  { return !std::isupper(c); };
        std::string v2{"Substitution Failure Is Not An Error"};
        std::cout << std::quoted(v2) << " (v2, size: " << v2.size() << ")\n";
        const auto [first, last] = std::ranges::remove_if(v2, rm);
        std::cout << std::quoted(v2) << " (v2 after `remove_if`, size: " << v2.size() << ")\n";
        std::cout << ' ' << std::string(std::distance(v2.begin(), first), '^') << '\n';
        v2.erase(first, last);
        std::cout << std::quoted(v2) << " (v2 after `erase`, size: " << v2.size() << ")\n\n";
    
        // creating a view into a container that is modified by `remove_if`:
        for (std::string s : {"Small Object Optimization", "Non-Type Template Parameter"})
            std::cout << std::quoted(s) << " => "
                << std::string_view{begin(s), std::ranges::remove_if(s, rm).begin()} << '\n';
    
        std::vector<std::complex<double>> nums{{2, 2}, {1, 3}, {4, 8}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto e = std::ranges::remove(nums, {1, 3}); // T gets deduced
        #else
            auto e = std::ranges::remove(nums, std::complex<double>{1, 3});
        #endif
        nums.erase(e.begin(), e.end());
        assert((nums == std::vector<std::complex<double>>{{2, 2}, {4, 8}}));
    }
```

Saída possível:
```
    "No - Diagnostic - Required" (v1, size: 26)
    "No_Diagnostic_Requiredired" (v1 after `remove`, size: 26)
     ^^^^^^^^^^^^^^^^^^^^^^
    "No_Diagnostic_Required" (v1 after `erase`, size: 22)
    
    "Substitution Failure Is Not An Error" (v2, size: 36)
    "SFINAEtution Failure Is Not An Error" (v2 after `remove_if`, size: 36)
     ^^^^^^
    "SFINAE" (v2 after `erase`, size: 6)
    
    "Small Object Optimization" => SOO
    "Non-Type Template Parameter" => NTTP
```

### Veja também

[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)
[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão