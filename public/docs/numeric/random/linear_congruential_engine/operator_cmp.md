# operator==,!=(std::linear_congruential_engine)

```cpp
friend bool operator==( const linear_congruential_engine& lhs,
const linear_congruential_engine& rhs );  // (1) (desde C++11)
friend bool operator!=( const linear_congruential_engine& lhs,
const linear_congruential_engine& rhs );  // (2) (desde C++11)
(ate C++20)
```

  
Compara dois motores de números pseudoaleatórios. Dois motores são iguais se seus estados internos são equivalentes, ou seja, se eles gerariam valores equivalentes para qualquer número de chamadas de operator(). 

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)<UIntType, a, c, m> é uma classe associada dos argumentos. 

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  motores para comparar   
  
### Valor de retorno

1) true se os motores são iguais, false caso contrário.

2) true se os motores não são iguais, false caso contrário.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de igualdade era não especificada  | especificado para serem hidden friends 