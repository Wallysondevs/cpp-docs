# std::uniform_random_bit_generator

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class G >
concept uniform_random_bit_generator =
std::invocable<G&> && std::unsigned_integral<std::invoke_result_t<G&>> &&
requires {
{ G::min() } -> std::same_as<std::invoke_result_t<G&>>;
{ G::max() } -> std::same_as<std::invoke_result_t<G&>>;
requires std::bool_constant<(G::min() < G::max())>::value;
};
```

  
O concept `uniform_random_bit_generator<G>` especifica que `G` é o tipo de um gerador de bits aleatórios uniformes, ou seja, objetos do tipo `G` são um function object que retorna valores inteiros sem sinal, de modo que cada valor no intervalo de resultados possíveis tenha (idealmente) igual probabilidade de ser retornado. 

### Requisitos semânticos

`uniform_random_bit_generator<G>` é modelado apenas se, dado qualquer objeto `g` do tipo `G`: 

  * `g()` está no intervalo `[`G::min()`, `G::max()`]`, 
  * `g()` tem complexidade constante amortizada. 

### Observações

Para satisfazer o requisito [std::bool_constant](<#/doc/types/integral_constant>)<(G::min() < G::max())>::value, tanto G::min() quanto G::max() devem ser expressões constantes, e o resultado da comparação deve ser verdadeiro. 