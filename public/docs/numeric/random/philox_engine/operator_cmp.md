# operator==(std::philox_engine)

```cpp
friend bool operator==( const philox_engine& lhs, const philox_engine& rhs );  // (desde C++26)
```

  
Compara dois *engines* de números pseudoaleatórios. Dois *engines* são iguais se seus estados internos são equivalentes, ou seja, se eles gerariam valores equivalentes para qualquer número de chamadas de operator().

Esta função não é visível para *lookup* comum [não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando decltype(*this) é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parameters

lhs, rhs  |  \-  |  engines para comparar   
  
### Return value

true se os engines forem iguais, false caso contrário.