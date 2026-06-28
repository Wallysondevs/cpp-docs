# std::mergeable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I1, class I2, class Out, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
concept mergeable =
std::input_iterator<I1> &&
std::input_iterator<I2> &&
std::weakly_incrementable<Out> &&
std::indirectly_copyable<I1, Out> &&
std::indirectly_copyable<I2, Out> &&
std::indirect_strict_weak_order<Comp,
std::projected<I1, Proj1>,
std::projected<I2, Proj2>>;
```

  
O concept `mergeable` especifica os requisitos para algoritmos que mesclam dois ranges de entrada em um único range de saída de acordo com a ordenação estrita fraca imposta por `Comp`. 

### Requisitos semânticos

`mergeable` é modelado apenas se todos os concepts que ele subsume forem modelados. 

### Veja também

[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) |  mescla dois ranges ordenados  
(objeto de função de algoritmo)  
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) |  calcula a união de dois conjuntos  
(objeto de função de algoritmo)  
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) |  calcula a interseção de dois conjuntos  
(objeto de função de algoritmo)  
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) |  calcula a diferença entre dois conjuntos  
(objeto de função de algoritmo)  
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) |  calcula a diferença simétrica entre dois conjuntos  
(objeto de função de algoritmo)