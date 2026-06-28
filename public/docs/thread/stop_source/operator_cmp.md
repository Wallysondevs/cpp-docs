# operator==(std::stop_source)

```cpp
friend bool operator==( const stop_source& lhs, const stop_source& rhs ) noexcept;  // (desde C++20)
```

  
Compara dois valores de `stop_source`.

Esta função não é visível para a [pesquisa não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando std::stop_source é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

lhs, rhs  |  \-  |  `stop_source`s para comparar   
  
### Valor de retorno

true se lhs e rhs tiverem o mesmo stop-state, ou ambos não tiverem stop-state, caso contrário, false.