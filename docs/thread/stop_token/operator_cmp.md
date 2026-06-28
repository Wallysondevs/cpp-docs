# operator==(std::stop_token)

```cpp
friend bool operator==( const stop_token& lhs, const stop_token& rhs ) noexcept;  // (desde C++20)
```

  
Compara dois valores `stop_token`.

Esta função não é visível para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento (ADL)](<#/doc/language/adl>) quando `std::stop_token` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

lhs, rhs  |  \-  |  `stop_token`s para comparar   
  
### Valor de retorno

`true` se `lhs` e `rhs` tiverem o mesmo estado de parada associado, ou ambos não tiverem estado de parada associado, caso contrário `false`.