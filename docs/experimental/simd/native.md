# std::experimental::simd_abi::native

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
using native = /*implementation-defined*/;
```

  
`native<T>` é um alias definido pela implementação para uma tag ABI. Esta é a tag ABI primária a ser usada para vetorização explícita eficiente.

### Notas

A intenção é usar a tag ABI que produz a execução paralela de dados mais eficiente para o tipo de elemento `T` que é suportado no sistema atualmente visado. Para arquiteturas de destino sem extensões ISA, os aliases `native<T>` e `compatible<T>` provavelmente serão os mesmos. Para arquiteturas de destino com extensões ISA, as flags do compilador podem influenciar o alias `native<T>`, enquanto `compatible<T>` será o mesmo independentemente de tais flags.

### Veja também

[ scalar](<#/doc/experimental/simd/scalar>)(parallelism TS v2) | tipo de tag para armazenar um único elemento   
(typedef)  
[ fixed_size](<#/doc/experimental/simd/fixed_size>)(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos  
(alias template)  
[ compatible](<#/doc/experimental/simd/compatible>)(parallelism TS v2) | tipo de tag que garante compatibilidade ABI  
(alias template)  
[ deducededuce_t](<#/doc/experimental/simd/deduce>)(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos   
(class template)