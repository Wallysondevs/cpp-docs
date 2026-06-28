# operator==,!=(std::shuffle_order_engine)

```cpp
friend bool operator==( const shuffle_order_engine& lhs,  
const shuffle_order_engine& rhs );
```
| (1) | (desde C++11) |
|---|---|
```cpp
friend bool operator!=( const shuffle_order_engine& lhs,  
const shuffle_order_engine& rhs );
```
| (2) | (desde C++11) (até C++20) |
|---|---|
  
Compara dois adaptadores de engine de números pseudoaleatórios. Dois adaptadores de engine são iguais se seus engines subjacentes forem iguais e seu estado interno (se houver) for igual, ou seja, se eles gerariam valores equivalentes para qualquer número de chamadas de operator().

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::shuffle_order_engine<Engine, k>` é uma classe associada dos argumentos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  adaptadores de engine para comparar   
  
### Valor de retorno

1) `true` se os adaptadores de engine forem equivalentes, `false` caso contrário.

2) `true` se os adaptadores de engine não forem equivalentes, `false` caso contrário.

### Exceções

Não lança exceções.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de igualdade era não especificada  | especificado para serem hidden friends 