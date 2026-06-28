# std::experimental::ranges::sort

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< RandomAccessIterator I, Sentinel<I> S,
class Comp = ranges::less<>, class Proj = ranges::identity >
requires Sortable<I, Comp, Proj>
I sort( I first, S last, Comp comp = Comp{}, Proj proj = Proj{} );
template< RandomAccessRange R,
class Comp = ranges::less<>, class Proj = ranges::identity >
requires Sortable<ranges::iterator_t<R>, Comp, Proj>
ranges::safe_iterator_t<R> sort( R&& r, Comp comp = Comp{}, Proj proj = Proj{} );
```

  
1) Ordena os elementos no range `[`first`, `last`)` em ordem crescente. A ordem de elementos iguais não é garantida de ser preservada. Os elementos são comparados usando comp após aplicar a projeção proj.

2) Ordena os elementos no range r, como se fosse por return [ranges::sort](<#/doc/experimental/ranges/algorithm/sort>)([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r), comp, proj);.

Não obstante as declarações descritas acima, o número e a ordem reais dos parâmetros de template para declarações de algoritmo são não especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável. 

### Parâmetros

first, last  |  \-  |  o range de elementos a ordenar   
---|---|---
r  |  \-  |  o range de elementos a ordenar   
comp  |  \-  |  o comparador a usar   
proj  |  \-  |  a projeção a aplicar aos elementos no range   
  
### Valor de retorno

Um iterator apontando para além do final do range (isto é, ele se compara igual a last para a sobrecarga (1), e `ranges::end(r)` para a sobrecarga (2)). 

### Complexidade

O(N·log(N)) comparações, onde N é igual ao número de elementos no range. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sort](<#/doc/algorithm/sort>) |  ordena um range em ordem crescente   
(modelo de função)  