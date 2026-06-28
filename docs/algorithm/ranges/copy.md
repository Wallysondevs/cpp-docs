# std::ranges::copy, std::ranges::copy_if, std::ranges::copy_result, std::ranges::copy_if_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O >
requires std::indirectly_copyable<I, O>
constexpr copy_result<I, O>
copy( I first, S last, O result );
template< ranges::input_range R, std::weakly_incrementable O >
requires std::indirectly_copyable<ranges::iterator_t<R>, O>
constexpr copy_result<ranges::borrowed_iterator_t<R>, O>
copy( R&& r, O result );
template< std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::indirectly_copyable<I, O>
constexpr copy_if_result<I, O>
copy_if( I first, S last, O result, Pred pred, Proj proj = {} );
template< ranges::input_range R, std::weakly_incrementable O,
class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::indirectly_copyable<ranges::iterator_t<R>, O>
constexpr copy_if_result<ranges::borrowed_iterator_t<R>, O>
copy_if( R&& r, O result, Pred pred, Proj proj = {} );
Tipos auxiliares
template< class I, class O >
using copy_result = ranges::in_out_result<I, O>;
template< class I, class O >
using copy_if_result = ranges::in_out_result<I, O>;
```

  
Copia os elementos no range, definido por `[`first`, `last`)`, para outro range começando em result.

1) Copia todos os elementos no range `[`first`, `last`)` começando de first e prosseguindo até last - 1. O comportamento é indefinido se result estiver dentro do range `[`first`, `last`)`. Neste caso, [ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>) pode ser usado em vez disso.

3) Copia apenas os elementos para os quais o predicado pred retorna true. A ordem relativa dos elementos copiados é preservada. O comportamento é indefinido se os ranges de origem e destino se sobrepuserem.

2,4) O mesmo que (1,3), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles. 
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>). 
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido. 

### Parâmetros

first, last  |  \-  |  o range de elementos a copiar   
---|---|---
r  |  \-  |  o range de elementos a copiar   
result  |  \-  |  o início do range de destino.   
pred  |  \-  |  predicado a aplicar aos elementos projetados   
proj  |  \-  |  projeção a aplicar aos elementos   
  
### Valor de retorno

Um [ranges::in_out_result](<#/doc/algorithm/ranges/return_types/in_out_result>) contendo um input iterator igual a last e um output iterator após o último elemento copiado. 

### Complexidade

1,2) Exatamente last - first atribuições.

3,4) Exatamente last - first aplicações do predicado e projeção, entre 0 e last - first atribuições (atribuição para cada elemento para o qual o predicado retorna true, dependendo do predicado e dos dados de entrada).

### Notas

Na prática, implementações de `ranges::copy` evitam múltiplas atribuições e usam funções de cópia em massa como [std::memmove](<#/doc/string/byte/memmove>) se o tipo de valor for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e os tipos de iterator satisfizerem [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>). 

Ao copiar ranges sobrepostos, `ranges::copy` é apropriado ao copiar para a esquerda (o início do range de destino está fora do range de origem), enquanto [`ranges::copy_backward`](<#/doc/algorithm/ranges/copy_backward>) é apropriado ao copiar para a direita (o fim do range de destino está fora do range de origem). 

### Possível implementação

[copy](<#/doc/algorithm/ranges/copy>)  
---
```
    struct copy_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::copy_result<I, O> operator()(I first, S last, O result) const
        {
            for (; first != last; ++first, (void)++result)
                *result = *first;
            return {std::move(first), std::move(result)};
        }
     
        template<ranges::input_range R, std::weakly_incrementable O>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O>
        constexpr ranges::copy_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result));
        }
    };
     
    inline constexpr copy_fn copy;
```
  
[copy_if](<#/doc/algorithm/ranges/copy>)
```
    struct copy_if_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::copy_if_result<I, O>
            operator()(I first, S last, O result, Pred pred, Proj proj = {}) const
        {
            for (; first != last; (void)++first)
                if (std::invoke(pred, std::invoke(proj, *first)))
                {
                    *result = *first;
                    (void)++result;
                }
            return {std::move(first), std::move(result)};
        }
     
        template<ranges::input_range R, std::weakly_incrementable O,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O>
        constexpr ranges::copy_if_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(result),
                           std::ref(pred), std::ref(proj));
        }
    };
     
    inline constexpr copy_if_fn copy_if;
```
  
### Exemplo

O código a seguir usa `ranges::copy` para copiar o conteúdo de um [std::vector](<#/doc/container/vector>) para outro e para exibir o `std::vector` resultante:

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
     
    int main()
    {
        std::vector<int> source(10);
        std::iota(source.begin(), source.end(), 0);
     
        std::vector<int> destination;
     
        std::ranges::copy(source.begin(), source.end(),
                          std::back_inserter(destination));
    // or, alternatively,
    //  std::vector<int> destination(source.size());
    //  std::ranges::copy(source.begin(), source.end(), destination.begin());
    // either way is equivalent to
    //  std::vector<int> destination = source;
     
        std::cout << "destination contains: ";
     
        std::ranges::copy(destination, std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
     
        std::cout << "odd numbers in destination are: ";
     
        std::ranges::copy_if(destination, std::ostream_iterator<int>(std::cout, " "),
                              { return (x % 2) == 1; });
        std::cout << '\n';
    }
```

Saída: 
```
    destination contains: 0 1 2 3 4 5 6 7 8 9
    odd numbers in destination are: 1 3 5 7 8 9
```

### Veja também

[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(desde C++20) |  copia um range de elementos em ordem inversa  
(objeto de função de algoritmo)  
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(desde C++20) |  cria uma cópia de um range que é invertido  
(objeto de função de algoritmo)  
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(desde C++20) |  copia um número de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(desde C++20) |  atribui um certo valor a um range de elementos  
(objeto de função de algoritmo)  
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(desde C++20)(desde C++20) |  copia um range de elementos omitindo aqueles que satisfazem critérios específicos  
(objeto de função de algoritmo)  
[ copycopy_if](<#/doc/algorithm/copy>)(desde C++11) |  copia um range de elementos para um novo local   
(modelo de função)