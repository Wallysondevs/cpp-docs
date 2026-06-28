# operator==,!= (std::uniform_int_distribution)

```cpp
friend bool operator==( const uniform_int_distribution& lhs,  
const uniform_int_distribution& rhs ); |  (1)  |  (desde C++11)  
---|---|---  
friend bool operator!=( const uniform_int_distribution& lhs,  
const uniform_int_distribution& rhs ); |  (2)  |  (desde C++11)   
(ate C++20)  
| |   
```
Compara dois objetos de distribuição. Dois objetos de distribuição são iguais quando os valores dos parâmetros e o estado interno são os mesmos. 

1) Compara dois objetos de distribuição para igualdade.

2) Compara dois objetos de distribuição para desigualdade.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::uniform_int_distribution<ResultType>` é uma classe associada dos argumentos. 

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  objetos de distribuição para comparar   
  
### Valor de retorno

1) `true` se os objetos de distribuição forem iguais, `false` caso contrário.

2) `true` se os objetos de distribuição não forem iguais, `false` caso contrário.

### Complexidade

Constante. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de igualdade era não especificada  
(poderiam ser hidden friends ou function templates livres)  | especificado para serem hidden friends 