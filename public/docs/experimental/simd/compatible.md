# std::experimental::simd_abi::compatible

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
using compatible = /*implementation-defined*/;
```

  
compatible&lt;T&gt; é um alias definido pela implementação para uma tag ABI. 

### Notas

A intenção é usar a tag ABI que produz a execução paralela de dados mais eficiente para o tipo de elemento T, garantindo a compatibilidade ABI entre as unidades de tradução na arquitetura de destino. 

### Veja também

[ scalar](<#/doc/experimental/simd/scalar>)(parallelism TS v2) | tipo de tag para armazenar um único elemento   
(typedef)  
[ fixed_size](<#/doc/experimental/simd/fixed_size>)(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos  
(alias template)  
[ native](<#/doc/experimental/simd/native>)(parallelism TS v2) | tipo de tag que é mais eficiente  
(alias template)  
[ deducededuce_t](<#/doc/experimental/simd/deduce>)(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos   
(class template)