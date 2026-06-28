# operator==,!=(std::subtract_with_carry_engine)

```cpp
friend bool operator==( const subtract_with_carry_engine& lhs,
const subtract_with_carry_engine& rhs );  // (1) (desde C++11)
friend bool operator!=( const subtract_with_carry_engine& lhs,
const subtract_with_carry_engine& rhs );  // (2) (desde C++11)
(até C++20)
```

  
Compara dois *engines* de números pseudoaleatórios. Dois *engines* são iguais se seus estados internos são equivalentes, ou seja, se eles gerariam valores equivalentes para qualquer número de chamadas de `operator()`.

Essas funções não são visíveis para *lookup* comum [não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)<UIntType, w, s, r> é uma classe associada dos argumentos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  *engines* para comparar   
  
### Valor de retorno

1) true se os *engines* forem iguais, false caso contrário.

2) true se os *engines* não forem iguais, false caso contrário.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de igualdade era não especificada  | especificado como hidden friends 