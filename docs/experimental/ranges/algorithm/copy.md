# std::experimental::ranges::copy, std::experimental::ranges::copy_if

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I, Sentinel<I> S, WeaklyIncrementable O >
requires IndirectlyCopyable<I, O>
ranges::tagged_pair<tag::in(I), tag::out(O)>
copy( I first, S last, O result );
template< InputRange R, WeaklyIncrementable O >
requires IndirectlyCopyable<ranges::iterator_t<R>, O>
ranges::tagged_pair<tag::in(ranges::safe_iterator_t<R>), tag::out(O)>
copy( R&& r, O result );
template< InputIterator I, Sentinel<I> S, WeaklyIncrementable O,
class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
requires IndirectlyCopyable<I, O>
ranges::tagged_pair<tag::in(I), tag::out(O)>
copy_if( I first, S last, O result, Pred pred, Proj proj = Proj{} );
template< InputRange R, WeaklyIncrementable O,
class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
requires IndirectlyCopyable<iterator_t<R>, O>
ranges::tagged_pair<tag::in(ranges::safe_iterator_t<R>), tag::out(O)>
copy_if( R&& r, O result, Pred pred, Proj proj = Proj{} );
```

  
Copia elementos no range de origem (`[`first`, `last`)` ou r) para o range de destino começando em `result`, iniciando do primeiro elemento no range de origem e prosseguindo até o último.

1) Copia todos os elementos no range `[`first`, `last`)`. Para cada inteiro não negativo `n < (last - first)`, executa `*(result + n) = *(first + n)`. O comportamento é indefinido se `result` estiver dentro do range `[`first`, `last`)`. Neste caso, [ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>) pode ser usado em vez disso.

2) O mesmo que (1), mas usa `r` como o range de origem, como se fosse por [ranges::copy](<#/doc/experimental/ranges/algorithm/copy>)([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r), result); exceto que `result` pode não ser copiado.

3) Copia apenas os elementos para os quais o predicado `pred` retorna `true` quando aplicado ao valor do elemento conforme projetado pela projeção `proj`. A ordem dos elementos que são copiados é preservada. O comportamento é indefinido se os ranges de origem e destino se sobrepõem.

4) O mesmo que (3), mas usa `r` como o range de origem, como se fosse por [ranges::copy_if](<#/doc/experimental/ranges/algorithm/copy>)([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/>)(r), result, pred, proj); exceto que `result`, `pred` e `proj` podem não ser copiados.

Não obstante as declarações descritas acima, o número real e a ordem dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

first, last  |  \-  |  o range de elementos a copiar   
---|---|---
r  |  \-  |  o range de elementos a copiar   
result  |  \-  |  o início do range de destino   
pred  |  \-  |  predicado a aplicar aos elementos projetados   
proj  |  \-  |  projeção a aplicar aos elementos   
  
### Valor de retorno

Um objeto `tagged_pair` contendo os dois membros a seguir:

  * O primeiro membro, com a tag `tag::in`, é o iterator *past-the-end* do range de origem (isto é, um iterator do tipo `I` que se compara como igual ao sentinel `last`).
  * O segundo membro, com a tag `tag::out`, é o iterator *past-the-end* do range de resultado.

### Complexidade

1) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) atribuições.

2) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(r) atribuições.

3) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações da projeção e predicado correspondentes.

4) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(r) aplicações da projeção e predicado correspondentes.

### Possíveis implementações

Primeira versão   
---
```cpp
    template<InputIterator I, Sentinel<I> S, WeaklyIncrementable O>
        requires IndirectlyCopyable<I, O>()
    ranges::tagged_pair<tag::in(I), tag::out(O)>
        copy(I first, S last, O result)
    {
        for (; first != last; ++first, (void)++result)
            *result = *first;
        return {first, result};
    }
```  
  
Segunda versão 
```cpp
    template<InputRange R, WeaklyIncrementable O>
        requires IndirectlyCopyable<ranges::iterator_t<R>, O>()
    ranges::tagged_pair<tag::in(ranges::safe_iterator_t<R>), tag::out(O)>
        copy(R&& r, O result)
    {
       return ranges::copy(ranges::begin(r), ranges::end(r), result);
    }
```  
  
Terceira versão 
```cpp
    template<InputIterator I, Sentinel<I> S, WeaklyIncrementable O,
             class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
        requires IndirectlyCopyable<I, O>()
    ranges::tagged_pair<tag::in(I), tag::out(O)>
        copy_if(I first, S last, O result, Pred pred, Proj proj = Proj{})
    {
        for (; first != last; ++first)
            if (ranges::invoke(pred, ranges::invoke(proj, *first)))
            {
                *result = *first;
                ++result;
            }
        return {first, result};
    }
```  
  
Quarta versão 
```cpp
    template<InputRange R, WeaklyIncrementable O,
             class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred>
        requires IndirectlyCopyable<ranges::iterator_t<R>, O>()
    ranges::tagged_pair<tag::in(ranges::safe_iterator_t<R>), tag::out(O)>
        copy_if(R&& r, O result, Pred pred, Proj proj = Proj{})
    {
        return ranges::copy_if(ranges::begin(r), ranges::end(r), result, pred, proj);
    }
```  
  
### Exemplo

O código a seguir usa `copy` para copiar o conteúdo de um vetor para outro e para exibir o vetor resultante:

Execute este código
```cpp
    #include <experimental/ranges/algorithm>
    #include <experimental/ranges/iterator>
    #include <iostream>
    #include <numeric>
    #include <vector>
     
    int main()
    {
        // see https://en.cppreference.com/w/cpp/language/namespace_alias
        namespace ranges = std::experimental::ranges;
     
        std::vector<int> from_vector(10);
        std::iota(from_vector.begin(), from_vector.end(), 0);
     
        std::vector<int> to_vector;
        ranges::copy_if(from_vector.begin(), from_vector.end(),
                        ranges::back_inserter(to_vector),
                        
                        {
                           return i % 3;
                        });
    // or, alternatively,
    //  std::vector<int> to_vector(from_vector.size());
    //  std::copy(from_vector, to_vector.begin());
     
        std::cout << "to_vector contains: ";
     
        ranges::copy(to_vector, ranges::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída: 
```
    to_vector contains: 1 2 4 5 7 8
```

### Veja também

[ copycopy_if](<#/doc/algorithm/copy>)(C++11) |  copia um range de elementos para um novo local   
(modelo de função)  
[ copy_backward](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/copy_backward&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/copy backward \(page does not exist\)") |  copia um range de elementos em ordem inversa   
(modelo de função)  
[ reverse_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/reverse_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/reverse copy \(page does not exist\)") |  cria uma cópia de um range que é invertido   
(modelo de função)  
[ copy_n](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/copy_n&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/copy n \(page does not exist\)") |  copia um número de elementos para um novo local   
(modelo de função)  
[ fill](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/fill&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/fill \(page does not exist\)") |  atribui um certo valor a um range de elementos   
(modelo de função)  
[ remove_copyremove_copy_if](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/remove_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/remove copy \(page does not exist\)") |  copia um range de elementos omitindo aqueles que satisfazem critérios específicos   
(modelo de função)