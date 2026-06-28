# std::experimental::ranges::projected

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< Readable I, IndirectRegularUnaryInvocable<I> Proj >
struct projected {
using value_type =
std::remove_cv_t<std::remove_reference_t<ranges::indirect_result_of_t<Proj&(I)>>>;
ranges::indirect_result_of_t<Proj&(I)> operator*() const;
};
```

  
template< WeaklyIncrementable I, class Proj >  
struct difference_type<[projected](<#/doc/experimental/ranges/iterator/projected>)<I, Proj>> {  
using type = ranges::difference_type_t&lt;I&gt;;  
}; |  |  (ranges TS)  

  
O template de classe `projected` agrupa um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) `I` e uma função `Proj` em um novo tipo `Readable` cujo tipo de `referência` é o resultado de aplicar `Proj` ao tipo de `referência` de `I`. Ele existe unicamente para facilitar a especificação de constraints, e por isso seu operator*() pode não estar realmente definido. 