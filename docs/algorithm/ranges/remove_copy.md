# std::ranges::remove_copy, std::ranges::remove_copy_if, std::ranges::remove_copy_result, std::ranges::remove_copy_if_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O, class T, class Proj = std::identity >
requires std::indirectly_copyable<I, O> &&
std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr remove_copy_result<I, O>
remove_copy( I first, S last, O result, const T& value, Proj proj = {} );
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O, class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirectly_copyable<I, O> &&
std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr remove_copy_result<I, O>
remove_copy( I first, S last, O result, const T& value, Proj proj = {} );
template< ranges::input_range R,
std::weakly_incrementable O, class T, class Proj = std::identity >
requires std::indirectly_copyable<ranges::iterator_t<R>, O> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr remove_copy_result<ranges::borrowed_iterator_t<R>, O>
remove_copy( R&& r, O result, const T& value, Proj proj = {} );
(até C++26)
template< ranges::input_range R,
std::weakly_incrementable O, class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::indirectly_copyable<ranges::iterator_t<R>, O> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr remove_copy_result<ranges::borrowed_iterator_t<R>, O>
remove_copy( R&& r, O result, const T& value, Proj proj = {} );
template< std::input_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O, class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::indirectly_copyable<I, O>
constexpr remove_copy_if_result<I, O>
remove_copy_if( I first, S last, O result, Pred pred, Proj proj = {} );
template< ranges::input_range R,
std::weakly_incrementable O, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::indirectly_copyable<ranges::iterator_t<R>, O>
constexpr remove_copy_if_result<ranges::borrowed_iterator_t<R>, O>
remove_copy_if( R&& r, O result, Pred pred, Proj proj = {} );
Tipos auxiliares
template< class I, class O >
using remove_copy_result = ranges::in_out_result<I, O>;
template< class I, class O >
using remove_copy_if_result = ranges::in_out_result<I, O>;
```

  
Copia elementos do range de origem `[`first`, `last`)` para o range de destino começando em result, omitindo os elementos que (após serem projetados por proj) satisfazem critérios específicos. O comportamento é indefinido se os ranges de origem e destino se sobrepõem.

1) Ignora todos os elementos que são iguais a value.

3) Ignora todos os elementos para os quais o predicado pred retorna true.

2,4) O mesmo que (1,3), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles. 
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>). 
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida. 

### Parâmetros

first, last  |  \-  |  o range de origem dos elementos   
---|---|---
r  |  \-  |  o range de origem dos elementos   
result  |  \-  |  o início do range de destino   
value  |  \-  |  o valor dos elementos **não** a serem copiados   
comp  |  \-  |  o predicado binário para comparar os elementos projetados   
proj  |  \-  |  a projeção a ser aplicada aos elementos   
  
### Valor de retorno

{last, result + N}, onde N é o número de elementos copiados. 

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do predicado correspondente comp e de qualquer projeção proj. 

### Notas

O algoritmo é estável, ou seja, preserva a ordem relativa dos elementos copiados. 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/remove_copy>))  
  
### Possível implementação

[remove_copy](<#/doc/algorithm/ranges/remove_copy>)  
---
```cpp
    struct remove_copy_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 std::weakly_incrementable O, class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>>
        requires std::indirectly_copyable<I, O> &&
                 std::indirect_binary_predicate<ranges::equal_to,
                                                std::projected<I, Proj>, const T*>
        constexpr ranges::remove_copy_result<I, O>
            operator()(I first, S last, O result, const T& value, Proj proj = {}) const
        {
            for (; !(first == last); ++first)
                if (value != std::invoke(proj, *first))
                {
                    *result = *first;
                    ++result;
                }
            return {std::move(first), std::move(result)};
        }
    
        template<ranges::input_range R, 
                 std::weakly_incrementable O, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O> &&
                 std::indirect_binary_predicate<ranges::equal_to,
                 std::projected<ranges::iterator_t<R>, Proj>, const T*>
        constexpr ranges::remove_copy_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result, const T& value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result), value,
                           std::move(proj));
        }
    };
    
    inline constexpr remove_copy_fn remove_copy {};
```  
  
[remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)
```cpp
    struct remove_copy_if_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::remove_copy_if_result<I, O>
            operator()(I first, S last, O result, Pred pred, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (false == std::invoke(pred, std::invoke(proj, *first)))
                {
                    *result = *first;
                    ++result;
                }
            return {std::move(first), std::move(result)};
        }
    
        template<ranges::input_range R, std::weakly_incrementable O,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O>
        constexpr ranges::remove_copy_if_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result),
                           std::move(pred), std::move(proj));
        }
    };
    
    inline constexpr remove_copy_if_fn remove_copy_if {};
```  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <vector>
    
    void println(const auto rem, const auto& v)
    {
        std::cout << rem << ' ';
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        // Filtra o símbolo de hash da string fornecida.
        const std::string_view str{"#Small #Buffer #Optimization"};
        std::cout << "antes: " << std::quoted(str) << '\n';
    
        std::cout << "depois:  \"";
        std::ranges::remove_copy(str.begin(), str.end(),
                                 std::ostream_iterator<char>(std::cout), '#');
        std::cout << "\"\n";
    
        // Copia apenas os números complexos com parte imaginária positiva.
        using Ci = std::complex<int>;
        constexpr std::array<Ci, 5> source
        {
            Ci{1, 0}, Ci{0, 1}, Ci{2, -1}, Ci{3, 2}, Ci{4, -3}
        };
        std::vector<std::complex<int>> target;
    
        std::ranges::remove_copy_if
        (
            source,
            std::back_inserter(target),
             { return imag <= 0; },
             { return z.imag(); }
        );
    
        println("origem:", source);
        println("destino:", target);
    
        std::vector<std::complex<float>> nums{{2, 2}, {1, 3}, {4, 8}, {1, 3}};
        std::vector<std::complex<double>> outs;
        #ifdef __cpp_lib_algorithm_default_value_type
            std::remove_copy(nums.cbegin(), nums.cend(), std::back_inserter(outs),
                             {1, 3}); // T é deduzido para std::complex<float>
        #else
            std::remove_copy(nums.cbegin(), nums.cend(), std::back_inserter(outs),
                             std::complex<float>{1, 3});
        #endif
        println("nums:  ", nums);
        println("outs:  ", outs);
    }
```

Saída: 
```
    before: "#Small #Buffer #Optimization"
    after:  "Small Buffer Optimization"
    source: (1,0) (0,1) (2,-1) (3,2) (4,-3)
    target: (0,1) (3,2)
    nums:   (2,2) (1,3) (4,8) (1,3)
    outs:   (2,2) (4,8)
```

### Veja também

[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) |  remove elementos que satisfazem critérios específicos  
(objeto de função de algoritmo)  
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) |  copia um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) |  copia um número de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) |  copia um range de elementos em ordem inversa  
(objeto de função de algoritmo)  
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) |  copia um range, substituindo elementos que satisfazem critérios específicos por outro valor  
(objeto de função de algoritmo)  
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) |  cria uma cópia de um range que está invertido  
(objeto de função de algoritmo)  
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) |  copia e rotaciona um range de elementos  
(objeto de função de algoritmo)  
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) |  cria uma cópia de um range de elementos que não contém duplicatas consecutivas  
(objeto de função de algoritmo)  
[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) |  copia um range de elementos omitindo aqueles que satisfazem critérios específicos   
(template de função)